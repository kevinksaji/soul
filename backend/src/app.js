// import necessary modules
const express = require('express'); //
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

// create an express app
const app = express();
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// basic route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
})

// set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});