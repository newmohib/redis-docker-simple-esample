const express = require('express');


const service = require('../services/service')

const router = express.Router();



router.post('/set-string', (req, res) => {

    service.setString(req.body.key, req.body.value)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

router.get('/get-string', (req, res) => {

    service.getString(req.body.key)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

router.post('/set-hash', (req, res) => {

    service.setHash(req.body.key, req.body.value)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

router.get('/get-hash', (req, res) => {

    service.getHash(req.body.key, req.body.field)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

router.get('/get-all-hash', (req, res) => {
    service.getALlHash(req.body.key)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});


module.exports = router;