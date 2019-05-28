const proxy = require('http-proxy-middleware');

// See https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
// See https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/context-matching.md

// Matches landing page at / alone
var landingPageFilter = function (pathname, req) {
    return pathname.match('^\/$') && req.method === 'GET';
};

module.exports = function (app) {
    app.use(proxy('/api', { target: 'http://localhost:3001/' }));
    app.use(proxy(landingPageFilter, { target: 'http://localhost:3001/' }));
};
