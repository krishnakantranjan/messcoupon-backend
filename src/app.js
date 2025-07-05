const express = require('express');
const app = express();
const connectDB = require('./config/database');
const UserModel = require('./models/users');


app.post('/signup', async (req, res) => {
    try {
        const user = new UserModel({
            firstName: "Nicky",
            lastName: "Kumari",
            branch: "ece",
            rollno: 2204116,
            emailId: "nicky@gmail.com",
            password: "Nicky@123",
        });
        await user.save();
        res.send("User Added Successfully");
    } catch (err) {
        res.status(400).send("ERROR" + err.message);
    }
});




// Connect DB and start server
connectDB().then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch((error) => {
    console.error('Database connection failed:', error.message);
});