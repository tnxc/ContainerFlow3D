const { request } = require('express');
const mongoose = require('mongoose');

// Box model
const boxSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // เก็บ userId
    namecontainer: { type: String, required: true },
    nameInput: { type: String, required: true },
    boxId: { type: String, required: true },
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
    color: { type: String, required: true },
    createdDate: { type: String, required: true }
});

const Box = mongoose.model('Box', boxSchema);
module.exports = Box;
