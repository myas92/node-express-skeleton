const asyncRedis = require("async-redis");
const mongoose = require("mongoose");
const config = require("./config");
class Initializer {
  static async runInitializer() {
    await Initializer.redisConfig();
    await Initializer.mongodbConfig();
  }
  static async redisConfig() {
    Initializer.redisClient = asyncRedis.createClient({
      host: config.REDIS_HOST,
      db: config.REDIS_DB,
    });
    Initializer.redisPubSub = asyncRedis.createClient({
      host: config.REDIS_HOST_PUB_SUB,
      db: config.REDIS_DB_PUB_SUB,
    });
  }
  static async mongodbConfig() {
    try {
      await mongoose.connect(`${config.MONGO_DB_URL}/${config.MONGO_DB_NAME}`, {
      // await mongoose.connect("mongodb://yaser1:27017,yaser1:27018,yaser1:27019/revyaser?replicaSet=rs", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify : false,
        retryWrites: false
      });
      console.log(`Mongodb Is OK : ${config.MONGO_DB_NAME}`);
    } catch (error) {
      console.warn("mongodb Warning", error);
    }
  }
}

module.exports = Initializer;
