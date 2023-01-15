const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

/**
 * Default Route, get Arsenal contract data
 *
 *
*/
router.get('/', function (req, response) {
    const opt = {
        headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": 'transfermarket.p.rapidapi.com',
            "useQueryString": true
        }
    };

    axios.get("https://transfermarket.p.rapidapi.com/clubs/get-squad?id=11", opt)
        .then((resp) => {
            //sort response on contractUntil property
            resp.data.squad.sort((a, b) => (a.contractUntil > b.contractUntil) ? 1 : -1);

            response.set('Content-Type', 'text/html');
            response.render('index', {club: "Arsenal", result: resp.data});
        })
        .catch((error => {
            console.log(error);
        }));
});

/**
 * /time Route, get last/next 5 Arsenal games
 *
 *
*/
router.get('/time', function (req, response) {
    const opt = {
        headers: {
            "X-Auth-Token": process.env.API_KEY2,
            'Accept': 'application/json'
        }
    };

    axios.all([
        axios.get("https://api.football-data.org/v2/teams/57/matches?status=FINISHED&limit=5", opt),
        axios.get("https://api.football-data.org/v2/teams/57/matches?status=SCHEDULED", opt)
    ]).then(axios.spread((resp1, resp2) => {
        response.set('Content-Type', 'text/html');
        response.render('time', {past: resp1.data, future: resp2.data});
    })).catch(error => {
        console.log(error);
    });
});

/**
 * /malmo Route, get Malmö FF contract data
 *
 *
*/
router.get('/malmo', function (req, response) {
    const opt = {
        headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": 'transfermarket.p.rapidapi.com',
            "useQueryString": true
        }
    };

    axios.get("https://transfermarket.p.rapidapi.com/clubs/get-squad?id=496", opt)
        .then((resp) => {
            //sort response on contractUntil property
            resp.data.squad.sort((a, b) => (a.contractUntil > b.contractUntil) ? 1 : -1);

            response.set('Content-Type', 'text/html');
            response.render('index', {club: "Malmö FF", result: resp.data});
        })
        .catch((error => {
            console.log(error);
        }));
});

module.exports = router;
