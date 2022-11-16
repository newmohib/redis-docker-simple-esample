const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const service = require('./services/service')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/set-string', (req, res) => {

    service.setString(req.body.key, req.body.value)
        .then(result => {
            console.log("Redis Connected",result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err",err);
            res.send(err)
        })
});

app.get('/get-string', (req, res) => {

    service.getString(req.body.key)
        .then(result => {
            console.log("Redis Connected",result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err",err);
            res.send(err)
        })
});

app.post('/set-hash', (req, res) => {

    service.setHash(req.body.key, req.body.value)
        .then(result => {
            console.log("Redis Connected",result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err",err);
            res.send(err)
        })
});

app.get('/get-hash', (req, res) => {

    service.getHash(req.body.key, req.body.field)
        .then(result => {
            console.log("Redis Connected",result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err",err);
            res.send(err)
        })
});

app.get('/get-all-hash', (req, res) => {

    service.getALlHash(req.body.key)
        .then(result => {
            console.log("Redis Connected",result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err",err);
            res.send(err)
        })
});

app.listen(port, () => {
    console.log('app listening on port!', port);
});
