const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cartRouter = require('./cartRouter')
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));
// еще вариант
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api/cart', cartRouter);

app.get('/api/products', (req, res) => {
    fs.readFile(path.resolve(__dirname, './db/products.json'), 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});