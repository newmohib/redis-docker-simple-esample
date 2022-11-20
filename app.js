const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const service = require('./services/service')
const { scheduler } = require('./services/scheduleTask')
const { database } = require('./config/database')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Scheduler 
const task = () => {
    console.log('running a task every minute', new Date());
}
scheduler('*/5 * * * * *', task);

app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    var sql = "INSERT INTO users (first_name,last_name,email,password) VALUES ?";
    var values = [[firstName, lastName, email, password]];

    database.query(sql, [values], (error, results) => {
        console.log(error, results);
        if (error) {
            res.send({ data: { errors: { code: 400, message: "Err" } } });
        } else {
            console.log(results);
            let insertId = results.insertId;
            res.send({ data: { insertId } });
        }
    });
});

app.post('/set-string', (req, res) => {

    service.setString(req.body.key, req.body.value)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

app.get('/get-string', (req, res) => {

    service.getString(req.body.key)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

app.post('/set-hash', (req, res) => {

    service.setHash(req.body.key, req.body.value)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

app.get('/get-hash', (req, res) => {

    service.getHash(req.body.key, req.body.field)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

app.get('/get-all-hash', (req, res) => {
    service.getALlHash(req.body.key)
        .then(result => {
            console.log("Redis Connected", result);
            res.send(result)
        }).catch(err => {
            console.error("Redis Connection Err", err);
            res.send(err)
        })
});

// app.post('/set-json', (req, res) => {
//     service.setStreams(req.body.key, req.body.fieldName, req.body.value)
//         .then(result => {
//             console.log("Redis Connected", result);
//             res.send(result)
//         }).catch(err => {
//             console.error("Redis Connection Err", err);
//             res.send(err)
//         })
// });

// app.get('/get-json', (req, res) => {
//     service.getStreams(req.body.key)
//         .then(result => {
//             console.log("Redis Connected", result);
//             res.send(result)
//         }).catch(err => {
//             console.error("Redis Connection Err", err);
//             res.send(err)
//         })
// });

app.listen(port, () => {
    console.log('app listening on port!', port);
});
