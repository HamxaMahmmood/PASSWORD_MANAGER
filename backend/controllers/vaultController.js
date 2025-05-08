import Credential from "../models/credentials.js";
import User from "../models/user.js";

export const saveCredential = async (req, res) => {
  try {
    const { userEmail, siteName, username, encryptedPassword, notes } = req.body;

    if (!userEmail || !siteName || !encryptedPassword) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User email not found." });
    }

    const newCredential = new Credential({
      userEmail,
      siteName,
      username,
      encryptedPassword,
      notes
    });

    await newCredential.save();

    res.status(201).json({ message: "Credential saved successfully." });
  } catch (error) {
    console.error("Save credential error:", error);
    res.status(500).json({ message: "Server error." });
  }
};




export const getCredentialsByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;

    if (!userEmail) {
      return res.status(400).json({ message: "Email parameter is required." });
    }

    const credentials = await Credential.find({ userEmail });

    if (credentials.length === 0) {
      return res.status(404).json({ message: "No credentials found for this email." });
    }

    res.status(200).json(credentials);
  } catch (error) {
    console.error("Fetch credentials error:", error);
    res.status(500).json({ message: "Server error." });
  }
};



export const updatePasswordForSite = async (req, res) => {
  try {
    const { userEmail, siteName, newEncryptedPassword } = req.body;

    if (!userEmail || !siteName || !newEncryptedPassword) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const credential = await Credential.findOne({ userEmail, siteName });

    if (!credential) {
      return res.status(404).json({ message: "Credential not found for this site and email." });
    }

    credential.encryptedPassword = newEncryptedPassword;
    await credential.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Update credential error:", error);
    res.status(500).json({ message: "Server error." });
  }
};



export const deleteCredentialForSite = async (req, res) => {
  try {
    const { userEmail, siteName } = req.body;

    if (!userEmail || !siteName) {
      return res.status(400).json({ message: "Missing userEmail or siteName." });
    }

    const deleted = await Credential.findOneAndDelete({ userEmail, siteName });

    if (!deleted) {
      return res.status(404).json({ message: "Credential not found for this site and email." });
    }

    res.status(200).json({ message: "Credential deleted successfully." });
  } catch (error) {
    console.error("Delete credential error:", error);
    res.status(500).json({ message: "Server error." });
  }
};