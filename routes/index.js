const express = require('express');
const router = express.Router();
const https = require("https");
const dotenv = require('dotenv');

dotenv.config();

router.get('/', function (req, response) {
    const options = {
        "method": "GET",
        "hostname": "transfermarket.p.rapidapi.com",
        "port": null,
        "path": "/clubs/get-squad?id=11",
        "headers": {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": process.env.API_HOST,
            "useQueryString": true
        }
    };

    let data ="";

    https.get(options, function(res) {
        console.log("Connected");

        res.on("data", chunk => {
            data += chunk;
        });

        res.on("end", () => {
            var json = JSON.parse(data);
            response.set('Content-Type', 'text/html');
            response.render('index', {result: json});
        });
    });
});

module.exports = router;
