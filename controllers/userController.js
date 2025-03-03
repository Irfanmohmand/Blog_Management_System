import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { User } from "../models/userModel.js";
import { generateCookie } from "../utils/feature.js";


// Home router
const homePage = ("/", (req, res) => {
  res.json({
    success: true,
    name: "Irfan Ullah",
    email: "irfanmohmand987"
  })
});


// Register route
const register = ("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.status(404).json({
      success: false,
      message: "User already exists.."
    });
  }
  else {
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      name,
      email,
      password: hashPassword
    });

    generateCookie(createUser, res, 201, "User registration successfully..")

  }
});



// //login route
const login = ("/login", async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    return res.status(400).json({
      success: false,
      message: "User email or password is incorrect.."
    })
  }

  const isMatch = await bcrypt.compare(password, findUser.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "User email or password is incorrect.."
    })
  }

  generateCookie(findUser, res, 201, `Welcome ${findUser.name}`)
});



// logout route
const logout = ("/logout", (req, res) => {
  res.status(200).cookie("token", "", {
    expires: new Date(Date.now())
  }).json({
    success: true,
    message: "Logout Successfully.."
  })
});


const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
}



// get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  const findUserById = await User.findById(id);

  if (!findUserById) return res.status(404).json({
    success: false,
    message: "User not find.."
  })

  res.json({
    success: true,
    message: "This is the current user..",
    findUserById
  })
}


export { homePage, register, login, logout, getMyProfile, getUserById }