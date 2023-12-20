import express, { Request, Response } from "express";
import { userRoutes } from "./routes/userRoutes";
import { errorHandler } from "./app/middlewares/errorHandler";
import { requestLogger } from "./app/middlewares/requestLogger";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(requestLogger);

app.use("/api", userRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, Typescript with Express!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
