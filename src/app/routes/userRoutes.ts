import express from "express";
import { UserController } from "../controllers/UserController";
import { authUser } from "../middlewares/userAuth";

const router = express.Router();
const userController = new UserController();

// Param middleware that will run for every route that includes the :id param
// router.param("id", userController.preloadUser);

router.use(authUser);

// Grouped route for /users/:id with chainable route handlers
router
  .route("/users/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// Specific sub-route for checking the auth level
router.get("/users/:id/check-auth-level", userController.checkAvailableAuthLevelOfUser);

router.get("/users/:id/getUserData", userController.getUserData);

// Route for creating a user and adding hobbies
router.route("/users").post(userController.createUser);
router.post("/users/:id/hobbies", userController.addNewHobbies);

export { router as userRoutes };
