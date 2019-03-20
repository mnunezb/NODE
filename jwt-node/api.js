const express = require("express");
const apiRoutes = express.Router();
const User = require("./app/models/user");
const jwt = require('jsonwebtoken');
const auth = require('./app/middlewares');

apiRoutes.post("/authenticate", (req, res) => {
  User.findOne({
    name: req.body.name
  })
    .then(user => {
      if (!user) {
        return res.json({ message: "User not found" });
      }
      else if(user){
          if (user.password != req.body.password){
              return res.json({message: 'passwors incorrecto'})
          }else{
              const token = jwt.sign({user}, req.app.get('supersecret'));
              res.json({
                  succes: true,
                  message: 'toma tu token',
                  token
              })
          }
      }
      res.json({ user });
    })
    .catch(error => {
      console.log(error);
    });
});



apiRoutes.get("/", (req, res) => {
  res.json({ message: "Welcome REYMar" });
});

apiRoutes.get("/users", auth.ensureAuth, (req, res) => {
  User.find().then(users => {
    res.json({ users });
  });
});

module.exports = apiRoutes;
