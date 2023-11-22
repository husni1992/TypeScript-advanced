import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();
const userController = new UserController();

// Define routes
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUser);
router.get("/users/:id/check-auth-level", userController.checkAvailableAuthLevelOfUser);
router.put("/users/:id", userController.updateUser);
router.post("/users/:id/hobbies", userController.addNewHobbies);
router.delete("/users/:id", userController.deleteUser);

export default router;
