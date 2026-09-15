const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const userRouter = require('./router/userRouter');

dotenv.config();

const app = express();

app.use(express.json());

app.use(userRouter);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        app.listen(3000, () => {
            console.log('Server running at http://localhost:3000');
        });
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error.message);
    });