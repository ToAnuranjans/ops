const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/token');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean
});

userSchema.methods.getToken = function () {
    try {
        return getToken({ _id: this._id, isAdmin: this.isAdmin });
    } catch (error) {
        return null;
    }
}

userSchema.methods.comparePassword = async function (password) {
    try {
        const user = this;
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        return false;
    }
}

userSchema.pre('save', async function (next) {
    const user = this;
    try {
        if (!user.isModified('password')) return next();

        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);

        next();
    } catch (error) {
        console.log('[User Pre Save] error', error);
        next(error);
    }
});


const User = mongoose.model('User', userSchema);



function validateUser(user) {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    });

    try {
        return joiSchema.validate(user);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports.User = User;
module.exports.validate = validateUser;