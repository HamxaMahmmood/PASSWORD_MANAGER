
import User from "../models/user.js";



export const registerUser = async (req, res) => {
  try {
    const { name, email, passwordHash } = req.body;

    if (!name || !email || !passwordHash) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error." });
  }
};



export const loginUser = async (req, res) => {
    try {
      const { email, passwordHash } = req.body;
  
      if (!email || !passwordHash) {
        return res.status(400).json({ message: "Email and passwordHash are required." });
      }
  
      const user = await User.findOne({ email });
      if (!user || user.passwordHash !== passwordHash) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
  