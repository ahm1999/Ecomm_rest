const { hash } = require("bcrypt");
const { User } = require("../models/User.js");
const { Cart } = require("../models/cart.js");
const { sendErrorResponse } = require("../util/util.js");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");

const createAccount_POST = async (req, res, next) => {
  let bodyObject = new BodyObject(
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.confirmedPassword
  );

  let missingValue = BodyObject.checkUndefined(bodyObject);
  if (missingValue) {
    return sendErrorResponse(400, `missing value ${missingValue}`,next);
  }
  //checking if the values of password and the confirmed match
  if (bodyObject.password !== bodyObject.confirmedPassword) {
    return sendErrorResponse(
      400,
      "the password and confirmed password do not match",next
    );
  }
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  try {
    const hashedPassword = await hash(bodyObject.password, 10);

    let user = new User(bodyObject.name, bodyObject.email, hashedPassword);
    user_email = user.dataValues.email;

    //checking the email if email already registered
    if (await User.email_registered(user_email)) {
      return sendErrorResponse(409, "email already registered previosly",next);
    }
    //creating a value on the data base
    await user.save();
    await Cart.create({UserId:user.dataValues.id})
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

const logIn_POST = async (req, res, next) => {
  let logIn_body = new LogIn_bodyObject(req.body.email, req.body.password);
  //console.log(logIn_body);
  //check wether the body is valid
  let missingValue = BodyObject.checkUndefined(logIn_body);
  if (missingValue) {
    return sendErrorResponse(400,  `missing value ${missingValue}`,next);
  }
  //check if email registered

  if (!(await User.email_registered(logIn_body.email))) {
    return sendErrorResponse(404, `email or password are wrong`,next);
  }
  let userId = await User.logIn_User(logIn_body.email, logIn_body.password);
  if (!(await userId)) {
    return sendErrorResponse(404,  `wrong password `,next);
  }
  console.log(userId);
  jwt.sign(
   
    { id: userId},
    "dfadgagop65464fa65d46gg74s654f4s",{expiresIn:'1d'},
    (err, data) => {
      if (err) {
        next(err);
      }
      res.json({ status: "logged in", loginToken: data });
    }
  );
};
const LogInAdmin_POST = async (req,res,next)=>{
  let logIn_body = new LogIn_bodyObject(req.body.email, req.body.password);
  let missingValue = BodyObject.checkUndefined(logIn_body);
  if (missingValue) {
    return sendErrorResponse(400,  `missing value ${missingValue}`,next);
  }
  //check if email registered

  if (!(await User.email_registered(logIn_body.email))) {
    return sendErrorResponse(404, `email or password are wrong`,next);
  }
  let userId = await User.logIn_User(logIn_body.email, logIn_body.password);
  if (!(await userId)) {
    return sendErrorResponse(404,  `wrong password `,next);
  }
  let role = await User.getRole(userId)
  if(role !== "admin"){
    return sendErrorResponse(401,  `Not authorized`,next);
  }

  jwt.sign(
   
    { id: userId},
    "dfadgagop65464fa65d46gg74s654f4s",{expiresIn:'1d'},
    (err, data) => {
      if (err) {
        next(err);
      }
      res.json({ status: "logged in", loginToken: data });
    }
  );

}
class BodyObject {
  constructor(name, email, password, confirmedPassword) {
    (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.confirmedPassword = confirmedPassword);
  }

  static checkUndefined(bodyObject) {
    for (const key in bodyObject) {
      if (typeof bodyObject[key] === "undefined") {
        return key;
      }
    }
    return false;
  }

  static checkValidity() {
    return [
      body("name").isAlpha(),
      body("email").isEmail(),
      body("password").isStrongPassword({
        minNumbers: 3,
        minUppercase: 1,
        minLength: 4,
        minSymbols: 0,
      }),
    ];
  }
}

class LogIn_bodyObject {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }

  static checkValidity() {
    return [body("email").isEmail()];
  }
}

module.exports = {
  BodyObject,
  createAccount_POST,
  logIn_POST,
  LogInAdmin_POST,
  LogIn_bodyObject,
};
