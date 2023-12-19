import express, { Request, Response } from "express";
import { userRoutes } from "./app/routes/userRoutes";
import errorHandler from "./app/middlewares/errorHandler";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, Typescript with Express!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
