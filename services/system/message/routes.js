const express = require("express");
const messageController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");
const Song = require('./model');
const router = express.Router();

router.post("/from/:sid/to/:tid", messageController.sendMessage);

router.get("/",  function(req, res) {
    return Song.find(
        {"name" : "t1"}
    ).then(function(song) { 
        // return orders when resolved
        res.send(song);
        // console.log(id);
        res.json('works yesss');
    })
    .catch(function (err) {
        // handle error
        res.status(400).json('Error: '+err)
    })
})

router.get("/:id", messageController.getMessageById);

router.post("/", messageController.createMessage);

router.patch("/:id", messageController.updateMessage);

router.delete("/:id", messageController.deleteMessage);


module.exports = router;
