/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Message = require("./models/message");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    res.send({});
  } else {
    res.send(req.user);
  }
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/chat", (req, res) => {
  const query = { "recipient._id": "ALL" };
  Message.find(query).then((messages) => res.send(messages));
});

router.post("/message", (req, res) => {
  //  WAS CODE IN THE TOP AS WELL,
  // console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // insert this message into the database
  if (req.body.content.length !== 0) {
    const message = new Message({
      recipient: {
        _id: "ALL",
        name: "ALL",
      },
      sender: {
        _id: 0,
        name: req.body.name,
      },
      content: req.body.content,
    });
    message.save();
    socketManager.getIo().emit("message", message);
    res.send({ result: "Message Sent" });
  }
  res.send({ result: "Message Empty" });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
