import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { JsonWebTokenError } from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      requied: [true, "Password is required !!!"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("Save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPaswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  jwt.sign(
    {
    id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
    }
);
};
userSchema.methods.generateRefreshToken = async function () {
    jwt.sign(
        {
        id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
