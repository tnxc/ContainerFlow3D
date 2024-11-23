const express = require('express')
const path = require('path')

module.exports = (app) => {
    // ให้บริการไฟล์ static
    app.use('/css', express.static(path.join(__dirname, '../css')));
    app.use('/js', express.static(path.join(__dirname, '../js')));
    app.use('/img', express.static(path.join(__dirname, '../img')));
    app.use(express.static('public'));
};
