const redis = require('../config/redis')

module.exports = {
    setHash : async (key, value)=>{
        let result = await redis.hmset(key, value);
        return result;
    },
    getHash : async (key, field)=>{
        let result =  await redis.hget(key, field);
        return result;
    },
    getALlHash : async (key)=>{
      let result =  await redis.hgetall(key);
      return result;
    },
    isExistsHash : async ( key, field )=>{
        let result =  await redis.hexists(key, field);
        return result ? true: false;
    },
    deleteHash : async (key, field)=>{
        let result =  await redis.hdel(key, field);
        return result ? true: false;
    },
    deleteListHash : async (key, field)=>{
        let result =  await redis.hdel(key, [...field]);
        return result ? true: false;
    },
    // string
    setString: async (key, value)=>{
        let result =  await redis.set(key, value);
        return result;
    },
    getString: async (key)=>{
        let result =  await redis.get(key);
        return result;
    },
}