import express from "express";
import {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.route("/").post(createUser).get(protect, getUsers);
router.route("/:id").get(getOneUser).delete(deleteUser).put(updateUser);
router.route("/login").post(loginUser);
export default router;
