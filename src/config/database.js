const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://krishnakantranjan50:2NIeuWBbNfyTKIxD@krishnacluster.owtuulo.mongodb.net/MessCoupon'
    );
};

module.exports = connectDB;