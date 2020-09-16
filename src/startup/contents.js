const path = require('path');
const express = require('express'); 
 
module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (_, res) => {
        res.send('<h1 style="color:#2196f3;font-size:50px">Welcome to Order Processing Service (OPS)!</h1>');
    });
    app.use('/assets', express.static('public'));
}