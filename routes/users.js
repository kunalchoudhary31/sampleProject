var express = require("express");
var router = express.Router();
var database = require("../database/data.json");
const util = require("util");
let jwtsign = require("jsonwebtoken").sign;
let verify = util.promisify(require("jsonwebtoken").verify);
require("../env");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resourcesssssssssssssssss");
  next();
});

router.post("/login", async (req, res, next) => {
  //Set issue and expiry time of jwt token, used to verify validity of the token
  let element;
  let token;
  let response;
  for (const key in database) {
      if (key === req.body.username) {
        if(database[key]["password"] === req.body.password){
        element = database[key];
          break;
        }
      }
  }

  if (element !== undefined) {
    element.iat = Math.floor(Date.now() / 1000);
    element.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 8760;

    response = {
      message : "Success",
      token : jwtsign(element, process.env.jwt_secret)
    };

  } else {
    response = {
      message : "User or password does not match",
      token : ""
    };
  }

  res.send(JSON.stringify( response ));
});
module.exports = router;
