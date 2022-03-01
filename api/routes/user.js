const express = require("express");
const router = express.Router(); //Router is an fn returning an router object

let usersval = [
  {
    Username: "Vedansh",
    id: 1,
  },
  {
    Username: "Shubham",
    id: 2,
  },
];

let users = [
  {
    Username: "Nandini",
    id: 1,
  },
  {
    Username: "dazzler",
    id: 2,
  },
];

// router.get("/", (req, res, next) => {
//     res.json({
//       message: "This is coming from /users/route when we use GET verb",
//     });
//   });

// router.post("users/Vedansh", (req, res, next) => {
//   res.json({
//     message: "This is coming from /users/route when we use POSt verb",
//   });
// });

//create user

//get all user
router.get("/", (req, res, next) => {
  res.json({
    heading: "This is a User data",
    users: usersval,
    users: users, //here this can be also written as only users becoz the variable name and here data coming from (array) name is same
  });
});

//get single user

//update single user

//delete single user

module.exports = router;
