const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");

//routes
const userRouter = require("../routes/user.router.js");
const coursesRouter = require("../routes/course.router.js");

dotenv.config();
const port = process.env.PORT || 7777;
const app = express();
app.use(cors());
app.use(express.static(path.join(process.cwd(), "db/files")));
app.use(express.json());
app.use(fileUpload());

app.use(userRouter);
app.use(coursesRouter);
app.all("*", (req, res) => {
  res.status(404).send("Resource not founded");
});

app.listen(port, console.log("port " + port));
