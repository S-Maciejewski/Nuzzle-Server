const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For demo purposes only
const dummyUsers = [
    {
        login: 'jan@test.com',
        password: 'jan',
        token: 'jantoken'
    },
    {
        login: 'sebastian@test.com',
        password: 'sebastian',
        token: 'sebastiantoken'
    },
    {
        login: 'bach@test.com',
        password: 'bach',
        token: 'bachtoken'
    },
]

async function setupServer() {
    // Some DBMS connection?
    app.listen(port, () => console.log(`Nuzzle server listening on port ${port}`));
}

function getAuthorization(login, password) {
    let userMatch = dummyUsers.filter(user => user.login === login && user.password === password)[0]
    if (userMatch) return { success: true, message: userMatch.token };
    return { success: false, message: 'Błąd logowania - sprawdź swój login i hasło' };
}

app.post('/login', (req, res) => {
    try {
        res.send(getAuthorization(req.body.login, req.body.password));
    } catch (err) {
        console.log('Login failed with error ', err);
    }
});

setupServer();
