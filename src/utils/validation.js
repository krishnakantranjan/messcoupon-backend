const validator = require('validator');
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, age } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    else if (age <= 0) {
        throw new Error("Age is not valid");
    }
};


module.exports = {validateSignUpData};