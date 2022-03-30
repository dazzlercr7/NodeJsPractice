const express = require("express");
const router = express.Router(); //Router is an fn returning an router object
const {
  user_signup,
  get_all_users,
  get_single_user,
  delete_single_user,
  update_single_user,
  user_login,
} = require("../controllers/user.js"); //use of destructuring
//  `${backend_address}/users`

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
router.post("/signup", user_signup);
// router.post("/", (req, res, next) => {
//   users.push(req.body); //pushes into array user the requested body data
//   //   console.log(req.body);
//   //   console.log("regular array unspreaded >>>>>>>");
//   //   console.log(users);
//   //   console.log("====================================");
//   //   console.log(...users);
//   //   console.log("Spreded array above this <<<<<<<<<");

//   //   Array Spread Operator
//   const [, , anotherVariable] = users;
//   console.log(anotherVariable.name);
//   console.log(anotherVariable.id);

//   //   Object Spread Operator
//   const { name, id } = anotherVariable;
//   console.log(name);
//   console.log(id);
//   //   const { name, ids } = users[0];
//   //   console.log(users[0].name);
//   //   console.log(users[0].ids);

//   //   console.log(users[1].name);
//   //   console.log(users[1].id);
//   //   console.log(users[0].name);
//   //   console.log(users[0].id);

//   res.json({
//     message: "Successfully pushed through POSt request",
//   });
// });

//get all user
router.get("/", get_all_users);
// router.get("/", (req, res, next) => {
//   res.json({
//     heading: "This is a User data",
//     // user: usersval,
//     users: users, //here this can be also written as only users becoz the variable name and here data coming from (array) name is same
//   });
// });

//get single user
router.get("/:userId", get_single_user);

//update single user
router.patch("/:userId", update_single_user);
//delete single user
router.delete("/:userId", delete_single_user);

router.post("/login", user_login);

module.exports = router;
