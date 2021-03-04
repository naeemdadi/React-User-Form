const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Email is already registered!!!'],
        lowercase: true,
        // Email needs to validated
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    dob: {
        type: Date,
        required: true,
        // Date needs to validated
        validate(value) {
            if (!validator.isDate(value)) {
                throw new Error('Date is Invalid')
            }
        }
    },
    description: {
        type: String,
        // Maxlength of the bio set as 100
        maxlength: 100,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;