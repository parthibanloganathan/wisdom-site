const proxy = require('http-proxy-middleware');
require('dotenv').config();

// See https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
// See https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/context-matching.md

// Matches landing page at / alone
var landingPageFilter = function (pathname, req) {
    return pathname.match('^\/$') && req.method === 'GET';
};

const serverUrl = 'http://localhost:3001/';

module.exports = function (app) {
    app.use(proxy('/wisdomapi', { target: serverUrl }));
    app.use(proxy('/tos', { target: serverUrl }));
    app.use(proxy('/privacy', { target: serverUrl }));
    app.use(proxy('/business', { target: serverUrl }));
    app.use(proxy(landingPageFilter, { target: serverUrl }));
};
