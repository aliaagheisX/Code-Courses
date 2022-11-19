const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const db = require("./config/database");

const app = express();

dotenv.config({ path: "./.env" }); // Using dotenv just for more security

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

db.connectToDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", require("./routes/users"));
const PORT = process.env.PORT || 3000;
app.use("/auth", require("./routes/auth"));

app.listen(PORT, (err) => {
  if (err) return console.error("Error setting up server", err);
  console.log(`Server is listening at port ${PORT}`);
});
