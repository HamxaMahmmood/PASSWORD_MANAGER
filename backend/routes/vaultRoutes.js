import express from "express";
import { saveCredential } from "../controllers/vaultController.js";
import { getCredentialsByEmail } from "../controllers/vaultController.js";
import { updatePasswordForSite } from "../controllers/vaultController.js";
import { deleteCredentialForSite } from "../controllers/vaultController.js";

const router = express.Router();

router.post("/save", saveCredential);
router.get("/:email", getCredentialsByEmail);
router.put("/update", updatePasswordForSite); 
router.delete("/delete", deleteCredentialForSite);


export default router;
