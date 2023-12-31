const express = require('express');
const _ = require('lodash');
const {
    Card,
    validateCard,

} = require('../models/cardModel');
const User = require('../models/authUserModel');

module.exports = {

    createCard: async (req, res) => {
        try {
            const { errors } = validateCard(req.body);
            if (errors) return res.status(400).send(errors);

            let card = new Card({
                title: req.body.title,
                subTitle: req.body.subTitle,
                description: req.body.description,
                phone: req.body.phone,
                email: req.body.email,
                web: req.body.web,
                state: req.body.state,
                country: req.body.country,
                city: req.body.city,
                street: req.body.street,
                houseNum: req.body.houseNum,
                zip: req.body.zip,
                imageUrl: req.body.imageUrl
                    ? req.body.imageUrl
                    : 'https://cdn.pixabay.com/photo/2018/05/20/16/13/flower-3416140_640.jpg',
                     user_id: req.user._id,
            });

            post = await card.save();
            res.status(200).send(post);
        } catch (err) {
            return res.status(400).send(err);
        }
    },


    getCard: async (req, res) => {
        try {
            const card = await Card.findOne({
                _id: req.params.id,
            });
            if (!card)
                return res
                    .status(404)
                    .send('The card with the given ID was not found.');
            res.send(card);
        } catch (err) {
            return res.status(400).send(err)
        }
    },


    updateCard: async (req, res) => {
        try {
            const { error } = validateCard(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const user = await User.findOne({ _id: req.user._id })
            if (!user || !user.isAdmin) {
                return res.status(404).send('Unauthorized to edit cards')
            }

            let card = await Card.findOneAndUpdate(
                { _id: req.params.id },
                req.body
            );
            if (!card)
                return res
                    .status(404)
                    .send('The card with the given ID was not found.');

            card = await Card.findOne({
                _id: req.params.id,
       
            });
            res.send(card);
        } catch (err) {
            return res.status(400).send(err)

        }
    },


    deleteCard: async (req, res) => {
        try {
            const card = await Card.findOneAndRemove({
                _id: req.params.id,

            });
            if (!card)
                return res
                    .status(404)
                    .send('The card with the given ID was not found.');
            res.send(card);
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    myCards: async (req, res) => {
        if (!req.user.isAdmin) return res.status(401).send('Access denied.');
        const user = req.user;
        const cards = await Card.find({ user_id: user._id });
        res.send(cards);
    },

    getAllCards: async (req, res) => {
        try {
            const cards = await Card.find();
            res.send(cards);
        } catch (err) {

            res.status(500).send('Internal Server Error');
        }
    },
    getUserFavoriteCards: async function (req, res, next) {
        try {
            const user = await User.findById(req.user._id).populate(
                'favorites'
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const favoriteCards = user.favorites;

            return res.status(200).json(favoriteCards);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: 'fail',
                message: err.message,
            });
        }
    },
    setFavorite: async function (req, res, next) {
        const cardId = req.params.id;
        const userId = req.user._id;
        console.log("CARD>>>", cardId);
        console.log("USERID>>>", userId);
        let status = false;
        try {
            const card = await Card.findById(cardId);
            const user = await User.findById(userId);
            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }

            const cardIndex = card.favorites.indexOf(userId);
            const userIndex = user.favorites.indexOf(cardId);

            if (cardIndex === -1) {
                card.favorites.push(userId);
                status = true;
            } else {
                card.favorites.splice(cardIndex, 1);
                status = false;
            }

            if (userIndex === -1) {
                user.favorites.push(cardId);
            } else {
                user.favorites.splice(userIndex, 1);
            }

            await card.save();
            await user.save();
            const { title } = card;

            return res.status(200).json({ title, status });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: 'fail',
                message: err.message,
            });
        }
    },
};
