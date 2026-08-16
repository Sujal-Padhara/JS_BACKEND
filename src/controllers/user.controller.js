import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnClodinary} from "../utils/cloudinary.js"
import { app } from "../app.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //     message: "ok"
  // })

  // get user details from frontend
  // validation - not emtpy
  // check if user already exist -usernam, email
  // check for images , check for avatar
  // upload them to cloudinary, avatar
  // create user object - creae entry ini DB
  // remove password and refresh token filed from response
  // check for user creation
  // return response

  const { fullname, email, username, password } = req.body;
  console.log("email: ", email);

  //  if(fullname == ""){
  //     throw new ApiError(400, "fullname is required")
  //  }

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields is required");
  }

  const existedUSer = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUSer) {
    throw new ApiError(409, "User with email or username already Exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is Required")
  }

  const avatar = await uploadOnClodinary(avatarLocalPath);
  const coverImage = await uploadOnClodinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400, "Avatar file is Required")
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    uername: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registerd successfully")
  )

});

export { registerUser };
