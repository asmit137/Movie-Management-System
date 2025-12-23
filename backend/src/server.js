import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import movieRoute from "./routes/movieRoutes.js";
import connectDB from "./config/db.js";
import { startMovieQueueWorker } from "./utils/queue.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);

connectDB();
startMovieQueueWorker();

app.get('/',(req, res)=>{
  res.send({message: "You are in backend"})
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
