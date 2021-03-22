const app = require("./app");
const config = require("./config");
app.listen(config.PORT, () => {
  console.log(`Server Port: ${config.PORT}`);
  console.log("Server Is Runnig")
});
