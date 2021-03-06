const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/api/auth");
const projectRoutes = require("./routes/api/projects");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 9000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB connected!");
});

app.use("/api", authRoutes);
app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
