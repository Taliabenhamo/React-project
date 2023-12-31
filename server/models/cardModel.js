const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');


const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    web: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    imageAlt: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    houseNum: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: false,
    },

    bizNumber: {
        type: Number,
        unique: [true, 'Card number already exists'],
        default: ()=>Math.floor(1000000+Math.random()*9000000)
    },
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],

});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        subTitle: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(2).max(1024).required(),
        phone: Joi.string()
            .min(9)
            .max(10)
            .required()
            .regex(/^0[2-9]\d{7,8}$/),
        email: Joi.string().email().lowercase().trim().required(),
        web: Joi.string().min(2).max(255).allow(""),
        imageUrl: Joi.string().min(11).max(1024),
        imageAlt: Joi.string().min(2).max(1024).allow(""),
        state: Joi.string().min(2).max(400).allow(""),
        country: Joi.string().min(2).max(400).required(),
        city: Joi.string().min(2).max(400).required(),
        street: Joi.string().min(2).max(400).required(),
        houseNum: Joi.string().min(1).max(400).required(),
        zip: Joi.string().min(2).max(9),
        bizNumber:Joi.number(),
        user_id: Joi.string().optional(),
    });

    return schema.validate(card);
}



exports.Card = Card;
exports.validateCard = validateCard;

