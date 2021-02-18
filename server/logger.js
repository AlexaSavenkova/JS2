const moment = require('moment');
const fs = require('fs');
const path = require('path');
const statsPath =  path.resolve(__dirname, './db/stats.json');

const logger = (name, action) => {
    fs.readFile(statsPath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const stat = JSON.parse(data);
            stat.push({
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                prod_name: name,
                action: action,
            });
            fs.writeFile(statsPath, JSON.stringify(stat, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
};

module.exports = logger;
