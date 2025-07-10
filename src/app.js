const express = require('express');
const app = express();
const connectDB = require('./config/database');
const UserModel = require('./models/users');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());


app.post('/signup', async (req, res) => {
    try {
        const { firstName, middleName, lastName, branch, rollno, emailId, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ emailId });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            firstName,
            middleName,
            lastName,
            branch,
            rollno,
            emailId,
            password: passwordHash
        });
        // Save user to database
        await newUser.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await UserModel.findOne({ emailId });
        if (!user) {
            return res.status(400).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            //Create a JWT token

            const token = await jwt.sign({ userId: user._id }, 'MESS&Coupon$2204121', { expiresIn: '7d' });
            console.log(token);
            // Set the token in a cookie
            res.cookie('token', token);
            res.send("Login successful");
        } else {
            return res.status(400).send("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

app.get('/profile', async (req, res) => {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
        return res.status(401).send("Please login!");
    }
    const decoded = await jwt.verify(token, 'MESS&Coupon$2204121');
    const { userId } = decoded;
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.json({
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        branch: user.branch,
        rollno: user.rollno,
        emailId: user.emailId
    });
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