const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils /appError");

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  });

  //jsonwebtoken signin
  const token = signInToken(newUser._id);
  // console.log(token);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
};

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  //check email and password is provided or not
  if (!email || !password) {
    return next(new AppError("Please enter email and password", 400));
  }
  //check if user exits and password is correct

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = signInToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
};