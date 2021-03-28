const dbConfig = require("../initializer");
const staticVariables = require("../const/static-variables");
class RedisController {
  constructor() {}

  async setExpireTime(
    folder = "general",
    id,
    time = staticVariables.EXPIRE_TIME_REDIS_TOKEN
  ) {
    try {
      id = typeof id !== "string" ? id.toString() : id;
      dbConfig.redisClient.expire(`${folder}:${id}`, time);
    } catch (error) {
      throw error;
    }
  }
  async set(folder = "general", id, token) {
    try {
      id = typeof id !== "string" ? id.toString() : id;
      // await dbConfig.redisClient.set(id, token);
      await dbConfig.redisClient.set(`${folder}:${id}`, token); // بخواهیم بصورت یک فولدر باشد
      return true;
    } catch (error) {
      throw error;
    }
  }
  async get(folder = "general", id) {
    try {
      id = typeof id !== "string" ? id.toString() : id;
      // let result = await dbConfig.redisClient.get(id);
      let result = await dbConfig.redisClient.get(`${folder}:${id}`); // بخواهیم بصورت یک فولدر باشد
      return result;
    } catch (error) {
      throw error;
    }
  }
  async incr(folder = "general", id) {
    try {
      id = typeof id !== "string" ? id.toString() : id;
      // let result = await dbConfig.redisClient.get(id);
      await dbConfig.redisClient.incr(`${folder}:${id}`); // بخواهیم بصورت یک فولدر باشد
    } catch (error) {
      throw error;
    }
  }
  async delete(folder = "general", id) {
    try {
      id = typeof id !== "string" ? id.toString() : id;
      // let result = await dbConfig.redisClient.get(id);
      await dbConfig.redisClient.del(`${folder}:${id}`); 
    } catch (error) {
      throw error;
    }
  }

  async hset(folder = "general", id, token, data = {created_date : Date()}) {
    try {
      data = JSON.stringify(data);
      id = typeof id !== "string" ? id.toString() : id;
      // await dbConfig.redisClient.set(id, token);
      await dbConfig.redisClient.hset(`${folder}:${id}`, token, data); // بخواهیم بصورت یک فولدر باشد
      return true;
    } catch (error) {
      throw error;
    }
  }
  async hget(folder = "general", id, token) {
    try {
      id = typeof id !== "string" ? id.toString() : id;
      // let result = await dbConfig.redisClient.get(id);
      let result = await dbConfig.redisClient.hget(`${folder}:${id}`, token); // بخواهیم بصورت یک فولدر باشد
      return result;
    } catch (error) {
      throw error;
    }
  }
  async hdelete(folder = "general", id, token) {
    try {
      id = typeof id !== "string" ? id.toString() : id;
      // let result = await dbConfig.redisClient.get(id);
      await dbConfig.redisClient.hdel(`${folder}:${id}`, token); // بخواهیم بصورت یک فولدر باشد
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RedisController();
