const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    user_id:{
        type:String
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
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
        required: true,
    },
 cards:[{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],

    createdAt: { type: Date, default: Date.now },
   
    favorites: [{type: mongoose.Schema.Types.ObjectId,
        ref: "Card"}]
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get('jwtKey')
    );
    return token;
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
