import express from "express";
import { createTicket, ticketInfo } from "../controllers/ticketController.js";
const router = express.Router();

router.route("/").post(createTicket);
router.route("/").get(ticketInfo);
export default router;
