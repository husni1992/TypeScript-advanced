import express from "express";
import { userRoutes } from "./app/routes/userRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Typescript with Express!");
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
