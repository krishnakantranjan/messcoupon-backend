const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        //DB level validation
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(" Email is Inavlid " + value);
            }
        }
    },
    password: {
        type: String,
        required: true
    },
}, { runValidators: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
