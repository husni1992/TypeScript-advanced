import express from "express";
import rateLimit from "express-rate-limit";
import asyncHandler from "express-async-handler";
import { UserController } from "../app/controllers/UserController";
import { authUser } from "../app/middlewares/userAuth";
import { featureFlagInstance } from "../config/featureFlags";

const router = express.Router();
const userController = new UserController();

router.use(authUser);

const rateLimitEnabled = featureFlagInstance.getFlag("ENABLE_RATE_LIMIT").enabled;

// Enable rate limiting
const limiter = rateLimit({
  windowMs: 2000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
});

router.use("/users/:id/check-auth-level", rateLimitEnabled ? limiter : (req, res, next) => next());

router.get("/users/getActiveUsers", userController.getActiveUsers);

// Grouped route for /users/:id with chainable route handlers
router
  .route("/users/:id")
  .get(asyncHandler(userController.getUser))
  .put(asyncHandler(userController.updateUser))
  .delete(asyncHandler(userController.deleteUser));

// Specific sub-route for checking the auth level
router.get(
  "/users/:id/check-auth-level",
  asyncHandler(userController.checkAvailableAuthLevelOfUser),
);

router.get("/users/:id/getUserData", asyncHandler(userController.getUserData));

// Route for creating a user and adding hobbies
router.route("/users").post(asyncHandler(userController.createUser));
router.post("/users/:id/hobbies", asyncHandler(userController.addNewHobbies));

// Catch-all for undefined routes
router.use("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

export { router as userRoutes };
