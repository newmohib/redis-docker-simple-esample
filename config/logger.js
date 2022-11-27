// const winston = require('winston');
const { createLogger, transports, format } = require('winston');
const expressWinston = require('express-winston');
require('winston-mongodb');

let logType = process.env.LOGGER_ENVIRONMENT;
logType = logType ? Number(logType): 0 ;


const logger = createLogger({

  transports: [
    new transports.Console(),
    new transports.File({
        level: 'warn',
        filename: './logs/logsWarning.log'
    }),
    new transports.File({
        level: 'error',
        filename: './logs/logsErrors.log'
    }),
    // store mongodb

    // new transports.MongoDB({
    //     db: 'uri',
    //     collection: 'logs'
    // }),
],
format: format.combine(
    format.json(),
    format.timestamp(),
    format.metadata(),
    format.prettyPrint()
)
  
});

// custom Logger

const myFormat = format.printf(({level, meta, timestamp})=>{
  return `${timestamp} ${level}: ${meta.message}`;
})

const customLogger = createLogger({

  transports: [
    new transports.Console(),
    new transports.File({
        filename: './logs/logsInternalErrors.log'
    })
],
format: format.combine(
    format.json(),
    format.timestamp(),
    // format.metadata(),
    // format.prettyPrint()
    myFormat
)});


const expressWinstonLogger = expressWinston.logger({
  winstonInstance: logger,
  statusLevels: true
});

// custom Logger
const customExpressWinstonLogger =expressWinston.errorLogger({
  winstonInstance: customLogger,
  statusLevels: true
});


module.exports = { expressWinstonLogger, customExpressWinstonLogger, logger, customLogger };