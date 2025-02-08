import express from "express";
import cors from "cors";
import "dotenv/config";
import constantsRoutes from "./routes/constantsRoutes.js";
import brandingRoutes from "./routes/brandingRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import configureRoutes from "./routes/configureRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.set("trust proxy", 1);

app.use(rateLimiter);

app.use("/auth", authRoutes);
app.use("/constants", constantsRoutes);
app.use("/branding", brandingRoutes);
app.use("/profile", profileRoutes);
app.use("/configure", configureRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/book", bookRoutes);
app.use("/status", statusRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status,
    message,
    err,
  });
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
