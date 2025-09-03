import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleError } from "../constants/constants.js";

const signUp = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await userModel.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: userModel,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      success: true,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Identify user
const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export { signUp, login, getMe };
