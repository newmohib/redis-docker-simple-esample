const mysql = require('mysql2');
// const logger = require('./logger');

const database = mysql.createConnection({
  host     : 'localhost',
  port     : "3307",
  user     : 'root',
  password : 'root',
  database : 'testdb'
});

database.connect((err)=> {
    if (err) {
      console.error('error connecting: ' + err.stack);
      //logger.log("error", "Database Err "+ err)
      return;
    }
    console.log('connected as id ' + database.threadId);
  });
 
//database.end();

// const createExecution = (queryStatement, value, cb)=>{
//    return database.query(queryStatement,value, (error, results)=> {
//         if (error) return {data:{}, errors:{code: 400, msg:"Err"}};
//         return {data: results};
//       });
// }

// const selectExecution = (queryStatement, value)=>{
//     database.query(queryStatement,value, (error, results)=> {
//         if (error) return {data:{}, errors:{code: 400, msg:"Err"}};
//         return {data: results};
//       });
// }
// const updateExecution = (queryStatement, value)=>{
//     database.query(queryStatement,value, (error, results)=> {
//         if (error) return {data:{}, errors:{code: 400, msg:"Err"}};
//         return {data: results};
//       });
// }

// const deleteExecution = (queryStatement, value)=>{
//     database.query(queryStatement,value, (error, results)=> {
//         if (error) return {data:{}, errors:{code: 400, msg:"Err"}};
//         return {data: results};
//       });
// }

// module.exports = { database, createExecution, selectExecution, updateExecution, deleteExecution };

module.exports = { database };