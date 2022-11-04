const express = require("express");
require("dotenv").config();
require("express-async-errors");
const path = require("path");
const app = express();
// import security middleware
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");

//  import middlewware
const cookieParser = require("cookie-parser");
const connectDB = require("./Connect/connectDB");

// import Routers
const authRouter = require("./Routes/authRouter");
const userRouter = require("./Routes/userRouter");
const jobsRouter = require("./Routes/jobRouter");
// import other middleware
const NotFoundMiddleware = require("./Middleware/NotFoundMiddleware");
const errorHandlerMiddleware = require("./Middleware/ErrorHandlerMiddleware");

// security
app.set("trust proxy", 1);
app.use(cors({ origin: "https://jobius.netlify.app", credentials: true }));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
// middleware

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobsRouter);
// other Middleware
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

const Port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(Port, console.log(`server listening port ${Port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
