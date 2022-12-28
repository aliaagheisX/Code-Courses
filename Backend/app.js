const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const db = require("./config/database");
const { Server } = require("socket.io");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CodeCourses API",
      version: "1.0.0",
      description: "Our DB Project API Documentation",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use("/images", express.static("images"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
app.use("/auth", require("./routes/auth"));
app.use("/students", require("./routes/students"));
app.use("/articles", require("./routes/articles"));
app.use("/instructors", require("./routes/instructor"));
app.use("/topics", require("./routes/topics"));
app.use("/comments", require("./routes/comments"));
app.use("/courses", require("./routes/courses"));
app.use("/questions", require("./routes/questions"));
app.use("/choices", require("./routes/choices"));
app.use("/quizzes", require("./routes/quizzes"));
app.use("/lessons", require("./routes/lessons"));
app.use("/discussions", require("./routes/discussions"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, (err) => {
  if (err) return console.error("Error setting up server", err);
  console.log(`Server is listening at port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {  // data = roomId
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {   //data = message object
    await db.DBconnection.query(`INSERT INTO messages (TXT, SENDER, CID) VALUES ('${data.message}', '${data.author}', ${data.room})`, (err, rows) => {
      if (err) return console.log(err);
      return rows;
    })
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});