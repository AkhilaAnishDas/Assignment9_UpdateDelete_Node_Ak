const express = require('express');

const mongoose = require('mongoose');

const userModel = require('../model/userModel');

const userRouter = express.Router();


userRouter.patch('/api/users/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid MongoDB ID'
            });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await userModel.findByIdAndUpdate(id, updatedData);

        res.status(200).json({
            message: 'User updated successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Database error',
            error: error.message
        });

    }

});


userRouter.delete('/api/users/:id', async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid MongoDB ID'
            });
        }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await userModel.findByIdAndDelete(id);

        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Database error',
            error: error.message
        });

    }

});

module.exports = userRouter;