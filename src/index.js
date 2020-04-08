import cors from "cors";
import bp from "body-parser";
import express from "express";
import consola from "consola";
import mongoose from "mongoose";
import passport from "passport";

// Config Import
import { APP_DB as DB, PORT as APP_PORT } from "./config";

// Routes Import
import jobRoutes from "./routes/jobs";
import userRoutes from "./routes/users";

const app = express();

require("./middleware/auth");

// Application Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

// Routes Middleware
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    consola.success({
      message: `Database connected successfully \n${DB}`,
      badge: true,
    });
    app.listen(APP_PORT, () =>
      consola.success({
        message: `Server started on port ${APP_PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    console.log(err);
    consola.error({
      message: err.message,
      badge: true,
    });
  }
};

startApp();
