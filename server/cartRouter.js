const express = require('express');
const fs = require('fs');
const handler = require('./handlers');
const router = express.Router();
const path = require('path');
const cartPath =  path.resolve(__dirname, './db/userCart.json');

router.get('/',(req,res) => {
    fs.readFile(cartPath, 'utf-8', (err,data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

router.post('/', (req, res) => {
    handler(req, res, 'add', cartPath);
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', cartPath);
});


router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', cartPath);
});

module.exports = router;