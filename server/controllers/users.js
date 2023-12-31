const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const joi = require('joi');
const User = require('../models/authUserModel');
const { Card, getCards, validateCards } = require('../models/cardModel');
const AuthUserModelJOI = require('../models/authUserModelJoi');
const _ = require('lodash');

module.exports = {
    // REGISTER

    signup: async (request, response) => {
        try {
            const userModel = new AuthUserModelJOI(request.body);
            const errors = userModel.validateRegistration();
            if (errors) return response.status(400).send(errors);

            let user = await User.findOne({ email: request.body.email });
            if (user)
                return response.status(400).send('User already registered.');

            user = new User(
                _.pick(request.body, [
                    'firstName',
                    'lastName',
                    'middleName',
                    'email',
                    'password',
                    'phone',
                    'imageUrl',
                    'imageAlt',
                    'state',
                    'country',
                    'city',
                    'street',
                    'houseNum',
                    'zip',
                    'cards',
                ])
            );

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            await user.save();

            response
                .status(200)
                .send(_.pick(user, ['_id', 'firstName', 'email']));
        } catch (err) {
            response.status(500).send(err.message);
            console.log(err);
        }
    },

    // Login
    login: async (request, response) => {
        try {
            const userModel = new AuthUserModelJOI(request.body);
            const errors = userModel.validateLogin();
            if (errors) return response.status(400).send(errors);

            const user = await User.findOne({ email: request.body.email });
            if (!user)
                return response.status(400).json({ email: 'Invalid email.' });

            const password = await bcrypt.compare(
                request.body.password,
                user.password
            );
            if (!password)
                return response.status(400).send('Invalid password.');

            response.status(200).json({
                token: user.generateAuthToken(), user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    isAdmin: user.isAdmin,
                    cards: user.cards

                }
            });
        } catch (err) {
            response.status(500).send(err.message);
        }
    },


    editUser: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string(),
                firstName: joi.string().required().min(3).max(20),
                middleName: joi.string().min(3).max(20).allow(""),
                lastName: joi.string().required().min(3).max(20),
                email: joi.string().required().email().min(6).max(50),
                phone: joi.string().required(),
                imageUrl: joi.string().min(2).max(1000).allow(""),
                imageAlt: joi.string().min(2).max(20).allow(""),
                state: joi.string().min(2).max(20).allow(""),
                country: joi.string().min(2).max(30),
                city: joi.string().min(2).max(30),
                street: joi.string().min(2).max(30),
                houseNum: joi.string().min(1).max(15),
                zip: joi.string().min(4).max(9),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({
                    error: 'invalid data',
                    details: error.details,
                });
                return;
            }

            const user = await User.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                value
            );

            if (!user) return res.status(404).send('Given ID was not found.');

            const updated = await User.findOne({ _id: req.params.id });
            res.json(updated);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: 'fail to update data' });
        }
    },
    // show cards under specific user

    myCards: async (req, res) => {
        try {
            const user = req.user;

            const myCards = await Card.find({ user_id: user._id });

            res.status(200).json({
                status: 'success',
                results: myCards.length,
                data: myCards,
            });
        } catch (err) {

            res.status(404).json({
                status: 'fail',
                message: err.message,

            });

        }
    },

    // Show personal details

    myDetails: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select('-password');
            res.status(200).send(user);
        } catch (err) {
            res.status(401).send(err.message);
        }
    },
    favorite: async (req, res) => {
        const { businessId } = req.params;
        const userId = req.user._id;
        try {
            const user = await User.findById(userId);
            let type;
            const index = (user.favorites || []).indexOf(businessId);
            if (index > -1) {
                user.favorites.splice(index, 1);
                type = 'Removed from';
            } else {
                user.favorites.push(businessId);
                type = 'Added to';
            }
            await user.save();

            res.status(200).send({ success: true, type });
        } catch (err) {
            console.log(err);
            res.status(401).send(err.message);
        }
    },
};
