import express from "express";

const app = express();  // create an express app

app.use(express.json());

// import the routes
import userRouter from "./routes/user.route.js";

// declaration of the route
app.use("/api/v1/users", userRouter);


export default app;
