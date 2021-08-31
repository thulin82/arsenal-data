const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

router.get('/', function (req, response) {
    const opt = {
        headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": 'transfermarket.p.rapidapi.com',
            "useQueryString": true
        }
    };

    axios.get(process.env.URL, opt)
        .then((resp) => {
            //sort response on contractUntil property
            resp.data.squad.sort((a, b) => (a.contractUntil > b.contractUntil) ? 1 : -1);

            response.set('Content-Type', 'text/html');
            response.render('index', {result: resp.data});
        })
        .catch((error => {
            console.log(error);
        }));
});

router.get('/time', function (req, response) {
    const opt = {
        headers: {
            "X-Auth-Token": process.env.API_KEY2,
            'Accept': 'application/json'
        }
    };

    axios.all([
        axios.get(process.env.URL2, opt),
        axios.get(process.env.URL3, opt)
    ]).then(axios.spread((resp1, resp2) => {
        response.set('Content-Type', 'text/html');
        response.render('time', {past: resp1.data, future: resp2.data});
    })).catch(error => {
        console.log(error);
    });
});

module.exports = router;
