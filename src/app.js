const express = require('express');
const app = express();

app.use('/test', (req, res) => {
    res.send("Testing api");
});

app.listen(3000, () => {
    console.log("App is listen on port 3000");
});