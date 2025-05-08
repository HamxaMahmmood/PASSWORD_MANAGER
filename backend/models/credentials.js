import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  siteName: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Credential = mongoose.model("Credential", credentialSchema);
export default Credential;
