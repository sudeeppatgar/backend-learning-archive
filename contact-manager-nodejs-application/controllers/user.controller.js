import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const err = new Error("Allfeilds are required");
    err.statusCode = 400;
    throw err;
  }
  const userexist = await User.findOne({ email });
  if (userexist) {
    const err = new Error("user already exist");
    err.statusCode = 400;
    throw err;
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashpassword,
  });
  if (user) {
    res.status(201).json({ id: user.id, email: user.email });
  } else {
    const err = new Error("user data is not valid");
    err.statusCode = 400;
    throw err;
  }
});
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error("Allfeilds are required");
    err.statusCode = 400;
    throw err;
  }
  const userexist = await User.findOne({ email });
  if (userexist && (await bcrypt.compare(password, userexist.password))) {
    const token = jwt.sign(
      {
        user: {
          id: userexist.id,
          name: userexist.name,
          email: userexist.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({ token });
  } else {
    const err = new Error("Email or Password is not valid");
    err.statusCode = 401;
    throw err;
  }
  if (!userexist) {
    const err = new Error("user Not Found");
    err.statusCode = 400;
    throw err;
  }
});

export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    const err = new Error("No Users found");
    err.statusCode = 400;
    throw err;
  }
  res.status(200).json({ users });
});
export const getUserById = expressAsyncHandler(async (req, res) => {
  //   const { id } = req.params;
  //   const findUser = await User.findById(id);
  //   if (!findUser) {
  //     const err = new Error("user not found");
  //     err.statusCode = 400;
  //     throw err;
  //   }
  const findUser = req.user;
  res.status(200).json({ findUser });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const findUser = await User.findById(id);
  if (!findUser) {
    const err = new Error("user not found");
    err.statusCode = 400;
    throw err;
  }
  const updateuser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ updateuser });
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const findUser = await User.findById(id);
  if (!findUser) {
    const err = new Error("user not found");
    err.statusCode = 400;
    throw err;
  }
  const deleteuser = await User.findByIdAndDelete(id);

  res.status(200).json({ deleteuser });
});
