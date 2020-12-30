const app = require("./app");
// let init = require("./initializer");
// init.runInitializer()
//   .then(() => {
//     app.listen(8080, () => {
//       console.log("server port is 8080");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

  app.listen(8080, () => {
    console.log("server port is 8080")
  })
