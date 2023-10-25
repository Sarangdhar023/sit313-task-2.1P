const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const api_key = 'key-16b7db209e23dbfaa47c168b5737118f'; 
const domain = 'sandbox9d7ca6e5813c4f458649523ba189d722.mailgun.org'; 
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const index = express();
index.use(bodyParser.urlencoded({ extended: true }));
index.use(express.static('public'));

index.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

index.post('/', (req, res) => {
    const email = req.body.email;

    const dataofmail = {
        from: 'From Sarangdhar <sarangdhar4837.be22@chitkara.edu.in>',
        to: email,
        subject: 'Hii, test',
        text: 'Testing',
    };

    mailgunInstance.messages().send(dataofmail, function (error, body) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error");
        } else {
            console.log(body);
            res.sendFile(__dirname + '/index.html');
        }
    });
});


index.listen(8000, () => {
    console.log("The Server is running");
});
