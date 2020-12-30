const asyncRedis = require("async-redis");
const mongoose = require("mongoose");
class Initializer {
  static async runInitializer() {
    //await Initializer.redisDb();
    await Initializer.mongoDb();
  }
  static async redisDb() {
    Initializer.redisClinet = asyncRedis.createClient({
      host: "127.0.0.1",
      db: 13,
    });
  }

  static async mongoDb() {
    try {
      await mongoose.connect("mongodb://localhost/revaal", {
      // await mongoose.connect("mongodb://yaser1:27017,yaser1:27018,yaser1:27019/revyaser?replicaSet=rs", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        retryWrites: false
      });
      console.log("mongodb is OK");
    } catch (error) {
      console.warn("mongodb Warning", error);
    }
  }
}

module.exports = Initializer;
