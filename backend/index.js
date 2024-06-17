const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/db");

const habitRouter = require("./route/habit.router");
const userRouter = require("./route/user.router");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["https://habit-tracker-1whq.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("http://localhost:5000");
});

app.get("/", (req, res) => {
  res.send("Hello Somya!!!");
});

app.use("/habit", habitRouter);
app.use("/user", userRouter);

dbConnect();
