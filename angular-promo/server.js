// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const sitemap = require('sitemap.xml');

// Get our API routes

const app = express();
app.use(compression());

app.use(sitemap(__dirname + '/sitemap.xml'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname)));



// Catch all other routes and return the index file
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));