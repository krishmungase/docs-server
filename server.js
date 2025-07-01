import express from "express";
import Config from "./config/index.js";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";

import errorHandler from "./middleware/error-handler.js"
import cors from "cors"

import { authRoutes, documentRoutes } from "./routes/index.js"
import EVENTS from "./constants/events.js";
const app = express();

app.use(cors({
  origin: ["*"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

app.get("/hello", (req, res) => {
  logger.info({ event: EVENTS.HELLO });
  return res.send("Hello from BLSheet backend!");
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/documents", documentRoutes)


const startServer = async () => {
  const PORT = Config.PORT || 5050;
  try {
    await connectDB();
    logger.info("Database connected successfully.");
    app.listen(PORT, () => logger.info(`Server listening on ${PORT}`));
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

app.use(errorHandler)
void startServer();

export default app;