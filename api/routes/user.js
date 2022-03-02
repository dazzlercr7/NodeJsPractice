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
  {
    Username: "Shreshta",
    id: 3,
  },
];

// router.get("/", (req, res, next) => {
//     res.json({
//       message: "This is coming from /users/route when we use GET verb",
//     });
//   });

// router.post("users/Vedansh", (req, res, next) => {
//      res.json({
//     message: "This is coming from /users/route when we use POSt verb",
//   });
// });

//create user
router.post("/", (req, res, next) => {
  users.push(req.body); //pushes into array user the requested body data
  //   console.log(req.body);
  //   console.log("regular array unspreaded >>>>>>>");
  //   console.log(users);
  //   console.log("====================================");
  //   console.log(...users);
  //   console.log("Spreded array above this <<<<<<<<<");

  //   Array Spread Operator
  const [, , anotherVariable] = users;
  console.log(anotherVariable.name);
  console.log(anotherVariable.id);

  //   Object Spread Operator
  const { name, id } = anotherVariable;
  console.log(name);
  console.log(id);
  //   const { name, ids } = users[0];
  //   console.log(users[0].name);
  //   console.log(users[0].ids);

  //   console.log(users[1].name);
  //   console.log(users[1].id);
  //   console.log(users[0].name);
  //   console.log(users[0].id);

  res.json({
    message: "Successfully pushed through POSt request",
  });
});

//get all user
router.get("/", (req, res, next) => {
  res.json({
    heading: "This is a User data",
    // user: usersval,
    users: users, //here this can be also written as only users becoz the variable name and here data coming from (array) name is same
  });
});

//get single user

//update single user

//delete single user

module.exports = router;
