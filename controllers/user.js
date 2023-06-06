import User from "../models/User.js";

export const creat = async (req, res,next)=>{
  const {username,password,email}= req.body
   
  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
 res.status(400).json("Email has already been registered");
  }
  // Create new users
  const user = await User.create({
    username,
    email,
    password,
  });
 res.status(201).json(user);
}



export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}