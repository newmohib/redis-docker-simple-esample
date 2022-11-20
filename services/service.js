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
    //list
    setList: async (key, value)=>{
        // vlaue = [1,2,3,45,6]
        let result = await redis.lpush(key, value);
        return result;
    },
    getEndFromList: async (key)=>{
        let result = await redis.lpop(key);
        return result;
    },
    getList: async (key, start, end)=>{
        // start = index 0
        // end = index -1 then all list
        let result = await redis.lrange(key, start, end);
        return result;
    },
    //JSON ======= 403====
    setJson: async (key, jsonData)=>{
        // let result = await redis.call("JSON.SET", "doc", "$", '{"f1": {"a":1, "b": 2}, "f2":{"a":2}}');
        let result = await redis.call("JSON.SET", key, "$", jsonData);
        return result;
    },
    //JSON ======= 403====
    getJson: async (key)=>{
        // let result = await redis.call("JSON.GET", key, "$..f1");
        let result = await redis.call("JSON.GET", key);
        return result;
    },
    setStreams: async (key, fieldName, value)=>{
        let result = await redis.xadd(key, "*", fieldName, value);
        console.log({result});
        return result;
    },
    getStreams: async (key)=>{
        let messages = await redis.xread(["STREAMS", key, 0]);
        console.log();
        let _messages = messages[0][1];
        let messageList = []
        for (let i = 0; i < _messages.length; i++) {
            let obj = {}
            let msg = _messages[i];
            console.log(msg[1][0], msg[1][1]);
            obj[msg[1][0].toString()] = msg[1][1].toString() ;
            console.log("reading message:", obj);
            messageList.push(obj)
        }
        return messageList;
    },
}
