const queries = require('./queries.js');
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const path = require('path');
const dbPath = path.resolve(__dirname, 'NuzzleDB.sqlite3'); // Useful in case of path problems when deployed to heroku

const app = express();
const port = 3000;

var db;
var authData;
var tokenMap;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function connect() {
    // DBMS should be changed if we proceed to production, as SQLite doesn't support concurrency
    db = new sqlite3.Database(dbPath, (err) => {
        console.log('Connection to SQLite error occured, perhaps database file is missing? Error:', err); // null error is thrown for some reason, even though connection is working properly
    });

    // For demo purposes only, tokens should be JWT with HS256 encryption
    db.all(queries.authData, (err, data) => {
        authData = data;
    });

    db.all(queries.tokenMap, (err, data) => {
        tokenMap = data;
    });
}

async function setupServer() {
    await connect();
    app.listen(process.env.PORT || port, () => console.log(`Nuzzle server listening on port ${process.env.PORT || port}`));
}

function getAuthorization(login, password) {
    let userMatch = authData.filter(user => user.Login === login && user.Password === password)[0];
    if (userMatch) return { success: true, message: userMatch.Token };
    return { success: false, message: 'Błąd logowania - sprawdź swój login i hasło' };
}

function getUserID(token) {
    return tokenMap.filter(entry => entry.Token === token.replace('Bearer ', ''))[0].UserID;
}

function executeUpdateQuery(query) {
    console.log('Executing update query:', query);
    return db.run(query);
}

function getQueryResult(query, callback) {
    return db.all(query, callback);
}
// No token validation on each request implemented for now, if we proceed to production: authentication on each request
app.post('/login', (req, res) => {
    res.send(getAuthorization(req.body.login, req.body.password));
});

app.get('/user', (req, res) => {
    getQueryResult(queries.getUser(getUserID(req.headers.authorization)), (err, result) => res.send(result));
});

app.get('/user/:id', (req, res) => {
    getQueryResult(queries.getUser(req.params.id), (err, result) => res.send(result));
});

// Offer
app.post('/offer', (req, res) => {
    console.debug('POST /offer, req.body:', req.body);
    res.send({ success: executeUpdateQuery(queries.postOffer(getUserID(req.headers.authorization), req.body)).open });
});

app.get('/offer', (req, res) => {
    getQueryResult(queries.offers, (err, result) => res.send(result));
});

app.get('/offerList', (req, res) => {
    getQueryResult(queries.offerList, (err, result) => res.send(result));
});

app.get('/myOffers', (req, res) => {
    getQueryResult(queries.getMyOffers(getUserID(req.headers.authorization)), (err, result) => res.send(result));
});

app.get('/myOfferList', (req, res) => {
    getQueryResult(queries.getMyOfferList(getUserID(req.headers.authorization)), (err, result) => res.send(result));
});

app.get('/offer/:id', (req, res) => {
    getQueryResult(queries.getOffer(req.params.id), (err, result) => res.send(result));
});

app.delete('/offer/:id', (req, res) => {
    res.send({ success: executeUpdateQuery(queries.deleteOffer(req.params.id)).open });
});


// OfferType
app.get('/offerType', (req, res) => {
    getQueryResult(queries.offerTypes, (err, result) => res.send(result));
});

// Address
app.post('/address', (req, res) => {
    console.debug('POST /address, req.body:', req.body);
    res.send({ success: executeUpdateQuery(queries.postAddress(getUserID(req.headers.authorization), req.body)).open });
});

app.get('/address', (req, res) => {
    getQueryResult(queries.getMyAddresses(getUserID(req.headers.authorization)), (err, result) => res.send(result));
});

app.get('/address/:id', (req, res) => {
    getQueryResult(queries.getAddress(req.params.id), (err, result) => res.send(result));
});

setupServer();
