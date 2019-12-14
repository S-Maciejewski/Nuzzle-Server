const queries = require('./queries.js');
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 3000;

var db;
var authData;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function connect() {
    db = new sqlite3.Database('./NuzzleDB.sqlite3', (err) => {
        console.log('Connection to SQLite failed, perhaps database file is missing?', err);
    });

    // For demo purposes only, tokens should be JWT with HS256 encryption
    db.all(queries.authData, (err, data) => {
        authData = data;
    });
}

async function setupServer() {
    await connect();
    app.listen(process.env.PORT || port, () => console.log(`Nuzzle server listening on port ${process.env.PORT || port}`));
}

function getAuthorization(login, password) {
    let userMatch = authData.filter(user => user.Login === login && user.Password === password)[0]
    if (userMatch) return { success: true, message: userMatch.Token };
    return { success: false, message: 'Błąd logowania - sprawdź swój login i hasło' };
}

app.post('/login', (req, res) => {
    try {
        res.send(getAuthorization(req.body.login, req.body.password));
    } catch (err) {
        console.log('Login failed with error ', err);
    }
});

app.get('/test', (req, res) => {
    res.send({ success: true })
})

setupServer();
