const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./Database/database");
const { UserRouter } = require("./routes/user.route");
const { TableRouter } = require("./routes/table.route");
const { ProjectRouter } = require("./routes/project.route");
const { authenticateToken } = require("./Middleware/authenticateToken.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/", UserRouter);
app.use("/api", authenticateToken, TableRouter)
app.use("/api", authenticateToken, ProjectRouter)

app.get("/", (req, res) => {
  res.send("Welcome to the backend server");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log({ msg: "MongoDB is connected with the backend" });
  } catch (err) {
    console.log({ error: err });
  }
  console.log(`Backend is running on port ${process.env.port}`);
});
