var express = require("express");
var router = express.Router();
const util = require("util");
let jwtsign = require("jsonwebtoken").sign;
// let verify = util.promisify(require("jsonwebtoken").verify);
const Employee = require('../models/employee');
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
      if (database[key]["password"] === req.body.password) {
        element = database[key];
        break;
      }
    }
  }

  if (element !== undefined) {
    element.iat = Math.floor(Date.now() / 1000);
    element.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 8760;

    response = {
      message: "Success",
      token: jwtsign(element, process.env.jwt_secret)
    };

  } else {
    response = {
      message: "User or password does not match",
      token: ""
    };
  }

  res.send(JSON.stringify(response));
});


router.get('/salary', async (req, res) => {
  // Mongoose create new object by itself , which we used to do in mongodb native client

  try {

    let employees = await Employee.find({})
    if (!employees) {
      return res.status(404).send(); // to stop the function execution
    }
    let obj = {}

    for (let index = 0; index < employees.length; index++) {

      employees[index]["year"] = Math.abs(new Date(Date.now() - (new Date(employees[index]["dob"]).getTime())).getUTCFullYear() - 1970);

      if (!obj.hasOwnProperty(employees[index]["year"])) {
        obj[employees[index]["year"]] = [employees[index]["salary"]]
      } else {
        obj[employees[index]["year"]].push(employees[index]["salary"])
      }
    }

    let ress = []

    for (const key in obj) {
      ress.push({
        avgSalary: obj[key].reduce((a, b) => a + b, 0) / obj[key].length,
        ageGroup: key
      })
    }

    res.send(ress);

  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

module.exports = router;
