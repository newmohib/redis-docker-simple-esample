var cron = require('node-cron');

const scheduler = (scheduleTime, taskMethod)=>{
  var valid = cron.validate(scheduleTime);
  console.log({valid});
  if (valid) {
    const task = cron.schedule(scheduleTime, taskMethod);
    return task;
  }else{
    console.log("Invalid Schedule Time", scheduleTime);
    return;
  }
}

// task.start();

module.exports = { scheduler }