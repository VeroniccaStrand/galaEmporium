import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./backend/config/db.js";
import { errorHandler } from "./backend/middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("./frontend"));

dotenv.config();
connectDB();

//routes
import userRoutes from "./backend/routes/userRoutes.js";
import eventRoutes from "./backend/routes/eventRoutes.js";
import ticketRoutes from "./backend/routes/ticketRoutes.js";
import clubRoutes from "./backend/routes/clubRoutes.js";

app.use("/api/clubs", clubRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tickets/info", ticketRoutes);

app.use(errorHandler);

export default app;
