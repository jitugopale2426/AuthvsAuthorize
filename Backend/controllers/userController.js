import { prismaClient } from "../routes/userRoute.js";
import { hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//Create User
export const CreateUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const alreadyExists = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (alreadyExists) {
    return res
      .status(400)
      .json({ message: "Email already exists", alreadyExists });
  }

  const user = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password,10),
    },
  });

  return res.json({ message: "User created successfully", user });
};

export const LoginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "user not exists" });
  }

  if (user.email === ADMIN_EMAIL && user.password === ADMIN_PASSWORD) {
    const token = jwt.sign({ id: user.id, role:'Admin' }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({ message: "Admin Login successfully", user, token });
  } else {
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.json({ message: "Invalid Password" });
    }
    console.log("secret", JWT_SECRET);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    return res.json({ message: "User Login successfully", user, token });
  }
};