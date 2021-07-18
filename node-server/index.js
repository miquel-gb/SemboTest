const express = require("express");
const app = express();
const request = require('requestretry');
const async = require("async");
const cors = require('cors')

// Port to be used to serve the node app
const appPort = 3000;

// Serves frontend page when accessing '/' route and server start on appPort
app.use('/', express.static('../sembo-frontend/dist/sembo-frontend'));
app.use(express.json());
app.use(cors());
app.listen(appPort, () => {
    console.log("Starting server...");
    console.log(`Connect to http://localhost:${appPort} to view the WebApp.`);
});

// Main Sembo's API url
const apiHost = 'developers.sembo.com';
// Mail hashed with SHA1 to be used as API Key
const apiKey = '3ce85e9273a5444928b5446c54c8139708707218';
// Endpoint to be fetched, replace {iso} with it, es or fr
const apiCall = '/sembo/hotels-test/countries/{iso}/hotels';

const countries = {
    ES: 'Spain (es)',
    IT: 'Italy (it)',
    FR: 'France (fr)'
}

/**
 * Initial testing API endpoint.
 * Listening to /RetrieveHotelsData GET endpoint, returns the computed data for each country listed
 * in countries list
 */
app.get('/RetrieveHotelsData', function(req, res) {

    var endpointsList = [];
    for (const isoCode of Object.keys(countries)) {
        endpointsList.push(`https://${apiHost}${apiCall.replace('{iso}', isoCode.toLowerCase())}`)
    }

    async.map(endpointsList, function(endpoint, callback) {
        const options = {
            url: endpoint,
            headers: {
                'X-API-Key': apiKey
            },
            maxAttempts: 50,
            retryDelay: 5
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(`Data retrieved after ${response.attempts} attemps...`);
                const jsonBody = JSON.parse(body);
                const responseData = computeHotelsData(jsonBody);
                callback(null, responseData);
            } else {
                console.log('Error: ', error, response.statusCode);
                callback('ERROR', null);
            }
        });
    }, function(error, results) {
        if (error == null && results != null) {
            res.send(results);
        }
    });


});

/**
 * Computes the receive data from Sembo's API and returns the right value to be displayed
 * 
 * @param {array} data List of hotels with their values
 * @returns computed data, average score and top three hotels
 */
function computeHotelsData(data) {
    var avgScore = data.reduce((sum, item) => sum + item.score, 0) / data.length;
    var topThree = data.sort((a, b) => b.score - a.score).slice(0, 3);
    var hotelsInfo = { country: countries[topThree[0].isoCountryId], averageScore: avgScore, topThreeHotels: topThree };
    return hotelsInfo;
}