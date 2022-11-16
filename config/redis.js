const Redis = require("ioredis");

const redis = new Redis({
    port: 6379, // Redis port
    host: "localhost", // Redis host
    // host: "127.0.0.1", // Redis host
    // username: "default", // needs Redis >= 6
    // password: "my-top-secret",
    db: 0, // Defaults to 0
});

redis.set("foo", "bar", (err, result)=> {
    if (err) {
        console.error("Redis Connection Err",err);
    } else {
        console.log("Redis Connected",result);
    }
});

redis.del("foo");

module.exports = redis;