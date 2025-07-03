const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/users');
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('./utils/validation');

// Middleware
app.use(express.json());
// app.post('/login', (req, res) => {
//   res.send({firstname: 'John', lastname: 'Doe'});
// }); 
app.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, branch, rollno, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, branch, rollno, emailId, password: passwordHash });
        await user.save();

        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Something went wrong " + err.message);
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