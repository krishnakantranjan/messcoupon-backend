const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type :String
    },
    lastName: {
        type: String,
        required : true
    },
    branch: {
        type: String,
    },
    rollno: {
        type: Number,
    },
    emailId: {
        type: String,
        required: true,
        unique: true, // it also create index
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
