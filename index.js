const express = require('express');
const app = express();
const port = 3000;
const admin = require('firebase-admin');
const serviceAccount = require('./tracing-covid19-firebase-adminsdk-1nr32-d619b0edff.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());

app.post('/api-student', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    console.log(req.body.uid)

    admin
        .auth()
        .createCustomToken(req.body.uid)
        .then((customToken) => {
            
            admin
                .firestore()
                .collection('student')
                .doc(req.body.uid)
                .update({
                    token: customToken
                })
                .then(() => {
                    console.log(`Token UID:${req.body.uid} Updated`)
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

            admin
                .firestore()
                .collection('admin')
                .doc(req.body.username)
                .update({
                    token: customToken
                })
                .then(() => {
                    console.log(`Token UID:${req.body.username} Updated`)
                })
        })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})