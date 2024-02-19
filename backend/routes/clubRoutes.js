import express from "express";
import {
  createClub,
  getClubs,
  getOneClub,
  deleteClubs,
  updateClub,
} from "../controllers/clubController.js";
const router = express.Router();

router.route("/").post(createClub).get(getClubs);
router.route("/:id").get(getOneClub).delete(deleteClubs).put(updateClub);

export default router;
