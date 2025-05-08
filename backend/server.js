import express from "express";
import cors from "cors";
import connectToDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import vaultRoutes from "./routes/vaultRoutes.js";




const app = express();
const port = 5000;

connectToDB(); // Connecting to MongoDB

app.use(cors({ origin: 'http://localhost:3000' })); // Adjust origin as needed
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/vault", vaultRoutes);



app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});