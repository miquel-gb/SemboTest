const express = require("express");
const app = express();
const request = require('requestretry');

// Port to be used to serve the node app
const appPort = 3000;
// Main Sembo's API url
const apiHost = 'developers.sembo.com';
// Mail hashed with SHA1 to be used as API Key
const apiKey = '3ce85e9273a5444928b5446c54c8139708707218';
// Endpoint to be fetched, replace {iso} with en, es or fr
const apiCall = '/sembo/hotels-test/countries/{iso}/hotels';

// Serves frontend page when accessing '/' route and server start on appPort
app.use('/', express.static('../sembo-frontend/dist/sembo-frontend'));
app.use(express.json());
app.listen(appPort, () => {
    console.log("Starting server...");
    console.log(`Connect to http://localhost:${appPort} to view the WebApp.`);
});

/**
 * Initial testing API endpoint.
 * Listening to /test endpoint, returns for now the computed data only for spanish hotels
 * TODO: Change this to retrieve data from every region hotel, parallel if possible
 */
app.get('/test', function(req, res) {

    const options = {
        url: `https://${apiHost}${apiCall.replace('{iso}', 'es')}`,
        headers: {
            'X-API-Key': apiKey
        },
        maxAttempts: 20,
        retryDelay: 5
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(`Data retrieved after ${response.attempts} attemps...`);
            const jsonBody = JSON.parse(body);
            var responseData = computeHotelsData(jsonBody);
            res.send(responseData);
        } else {
            console.log('Error: ', error, response.statusCode);
            res.send('ERROR');
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
    var hotelsInfo = { averageScore: avgScore, topThreeHotels: topThree };
    return hotelsInfo;
}