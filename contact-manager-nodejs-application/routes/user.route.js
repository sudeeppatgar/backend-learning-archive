import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  login,
  Register,
  updateUser,
} from "../controllers/user.controller.js";
import { validateToken } from "../middlewares/validatetokenHandler.js";

const router = Router();
router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/").get(getUsers);
router
  .route("/:id")
  .get(validateToken, getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
