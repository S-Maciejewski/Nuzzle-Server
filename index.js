const express = require('express');
const cors = require('cors');
// const https = require('https')

const app = express();
const port = 3000;
// const httpsOptions = {
    // key: fs.readFileSync('./key.pem'),
    // cert: fs.readFileSync('./cert.pem')
// }

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For demo purposes only, tokens should be JWT with HS256 encryption
// Users should have id, login (email), name, surname, password, address, phone number etc.
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
    {
        login: 'maciejewski.torun@gmail.com',
        password: 'a',
        token: 'testToken'
    },
]

async function setupServer() {
    // Some DBMS connection?
    app.listen(process.env.PORT || port, () => console.log(`Nuzzle server listening on port ${process.env.PORT || port}`));
    // https.createServer(httpsOptions, app).listen(port, () => console.log(`Nuzzle server listening on port ${port}`));
}

function getAuthorization(login, password) {
    let userMatch = dummyUsers.filter(user => user.login === login && user.password === password)[0]
    if (userMatch) return { success: true, message: userMatch.token };
    return { success: false, message: 'Błąd logowania - sprawdź swój login i hasło' };
}

app.post('/login', (req, res) => {
    console.log('got login request, user:', req.body)
    try {
        res.send(getAuthorization(req.body.login, req.body.password));
    } catch (err) {
        console.log('Login failed with error ', err);
    }
});

app.get('/test', (req, res) => {
    console.log('got test request');
    res.send({ success: true })
})

setupServer();
