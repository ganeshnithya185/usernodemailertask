import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbconfig.js";
import userrouter from "./Routers/user.router.js";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userrouter);
connectDB();
app.get("/", (req, res) => {
  res.send("Hello, this is your Express API!");
});
app.listen(port, () => {
  console.log("My app is listening in port");
});
