const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')
const admin = require('firebase-admin');
const serviceAccount = require('./tracing-covid19-firebase-adminsdk-1nr32-d619b0edff.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use('/token', express.static('token'));
app.use(express.json());

app.post('/api-student', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    console.log(req.body.uid)

    admin
        .auth()
        .createCustomToken(req.body.uid)
        .then((customToken) => {
            
            const token = {
                token: customToken
            }

            const jsonToken = JSON.stringify(token)
            fs.writeFile(`./token/${req.body.uid}.json`, jsonToken, err => {
                if(err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
        })
})

app.post('/api-admin', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    console.log(req.body.username)

    admin
        .auth()
        .createCustomToken(req.body.username)
        .then((customToken) => {
            
            const token = {
                token: customToken
            }

            const jsonToken = JSON.stringify(token)
            fs.writeFile(`./token/${req.body.username}.json`, jsonToken, err => {
                if(err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
        })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})