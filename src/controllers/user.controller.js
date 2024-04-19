import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // check user Detail
    // validation - empty
    // check if user already exists or not
    // check for image or avatar
    // check for cloudinary upload
    // create user object - create entry in db
    // remove password and refresh token
    // check for user creating 
    // return res

    const  {fullName , userName , email , password} = req.body
    console.log("Full Name: " , fullName);


    if(
        [fullName , email , password , userName].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All Fields are required.")
    }

    const existedUser = User.findOne({
        $or: [{userName} , {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or usename already Exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400 , "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400 , "Avatar is required");
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url,
        userName: userName.toLowerCase(),
        password,
        email
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" 
    )

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user.")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User Registered Successfully")
    )
} )


export {
    registerUser,
}