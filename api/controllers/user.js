const User = require("../models/user.js");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user_signup = (req, res, next) => {
  console.log("This is the user:");
  console.log(req.body);
  // 1. try finding if the user email exists alread
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      console.log("This is the found user");
      console.log(user);
      console.log("user ends");
      // 2. if user email is found. That means user already exists. That means, we have to return a conflict
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        // create a hash by salting and hashing the incomping password

        bcryptjs.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email.toLowerCase(),
              password: hash,
              accessLevel: req.body.accessLevel,
            });

            user.save().then((result) => {
              // in the then block, we capture the success result.
              console.log("This is the result from saving the user");
              console.log(result);
              // constructing successful response
              res.status(201).json({
                message: "user successfully created",
                user: result,
              });
            });
          }
        });
      }
    })

    // If we are in this block, that means user is not found. That means we have to create a new user.

    .catch((err) => {
      // if there is error in any part of execution, catch it here and create error response and send
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// const create_user = (req, res, next) => {
//   // 1.try finding if the user email esistes already
//   User.find({ email: req.body.email })
//     .exec()
//     .then((user) => {
//       console.log("This is the User");
//       console.log(user);
//       console.log("user ends");

//       // 2. If user email is found. that means user already exist.that means we have to return a conflict
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Email already exist",
//         });
//       } else {
//         //   3.If we are in this block, that means user is not found. that means we havre to create a new user
//         const user = new User({
//           _id: new mongoose.Types.ObjectId(),
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
//           email: req.body.email,
//           password: req.body.password,
//           accessLevel: req.body.accessLevel,
//         });

//         user.save().then((result) => {
//           // in the then block, we capture the success result.
//           console.log("This is the result from saving the user");
//           console.log(result);
//           // constructing successful response
//           res.status(201).json({
//             message: "user successfully created",
//             user: result,
//           });
//         });
//       }
//     })
//     .catch((err) => {
//       // if there is error in any part of execution, catch it here and create error response ans send
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

const get_all_users = (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      const responseObject = {
        count: users.length,
        message: "Got all users successfully",
        users: users.map((user) => {
          return {
            user,
            request: {
              type: "GET",
              url: `http://localhost:4000/users/${user._id}`,
            },
          };
        }),
      };

      res.status(200).json(responseObject);
    })
    .catch((err) => console.log(err));
};

// let users = [
//   {
//     Username: "Nandini",
//     id: 1,
//   },
//   {
//     Username: "dazzler",
//     id: 2,
//   },
//   {
//     Username: "Shreshta",
//     id: 3,
//   },
// ];

// const create_user = (req, res, next) => {
//   users.push(req.body); //pushes into array user the requested body data

//   res.json({
//     message: "Successfully pushed through POSt request",
//   });
// };

// const get_user = (req, res, next) => {
//   res.json({
//     heading: "This is a User data",
//     // user: usersval,
//     users: users, //here this can be also written as only users becoz the variable name and here data coming from (array) name is same
//   });
// };

const get_single_user = (req, res, next) => {
  let userId = req.params.userId;

  let foundUser = User.find({
    _id: userId,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        console.log("This is the found user");
        console.log(user);
        res.status(200).json({
          message: "Api ran successfully",
          user,
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error is",
        err,
      })
    );

  console.log(req.params.userId);
};

const delete_single_user = (req, res, next) => {
  // return console.log(req.params);

  User.remove({
    _id: req.params.userId,
  })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted successfully",
        result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "There has been an error",
        err,
      })
    );
};

const update_single_user = (req, res, next) => {
  // const userId = req.params;
  const updateOps = {};

  for (const [key, value] of Object.entries(req.body)) {
    //object.entries return an array of every single entry array with its key and value pair  eg.[[key1, value1], [key2,value2]]
    updateOps[key] = value;
  }
  User.update({ _id: req.params.userId }, { $set: updateOps })
    .exec()
    .then((updateduser) => {
      res.status(200).json({
        message: "User updated successfully",
        updateduser,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "There has been an error",
        err,
      })
    );
};

const user_login = (req, res, next) => {
  User.find({
    email: req.body.email.toLowerCase(),
  })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log("password comparison failed");
          return res.status(401).json({
            message: "Auth failed",
          });
        }

        if (result) {
          // generate jwt token here

          const token = jwt.sign(
            {
              email: user[0].email,
              accessLevel: user[0].accessLevel,
            },
            "sarthak",
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "Auth Successful",
            token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There has been an error",
        error: err,
      });
    });
};

module.exports = {
  user_signup, //create_user: create_user
  get_all_users,
  get_single_user,
  delete_single_user,
  update_single_user,
  user_login,
};
