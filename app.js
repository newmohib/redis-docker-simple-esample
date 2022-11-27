require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const { scheduler } = require('./services/scheduleTask')
const { database } = require('./config/database')
const { expressWinstonLogger, customExpressWinstonLogger, logger, customLogger } = require('./config/logger');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

// routers
const redisRouters = require('./routers/redis')

// Scheduler
const task = () => {
    console.log('running a task every minute', new Date());
}
scheduler('*/5 * * * * *', task);
// close scheduler



// logger
app.use(expressWinstonLogger);

app.get('/', (req, res)=>{
    //logger.info("This is an info logger message")
    res.sendStatus(200)
})

app.get('/400', (req, res)=>{
    res.sendStatus(400)
})

app.get('/500', (req, res)=>{
    res.sendStatus(500)
})

app.get('/error', (req, res)=>{
    throw new Error('This is a  custom Error')
})

app.use('/redis', redisRouters);


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


// custom Logger
app.use(customExpressWinstonLogger);

app.listen(port, () => {
    console.log('app listening on port!', port);
});
