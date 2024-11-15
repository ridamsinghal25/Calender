import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import { errorHandler } from "./middlewares/error.middleware.js";

import eventRouters from "./routers/event.routes.js";
import userRouters from "./routers/user.routes.js";

// route declaration
app.use("/api/v1/users", userRouters);
app.use("/api/v1/events", eventRouters);

app.use(errorHandler);

export { app };
