const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const friendsRoutes = require("./routes/Friend");
const chatRoutes = require("./routes/Chat");
const mediaRoutes = require("./routes/Media");
const searchRoute = require("./routes/Search");
const storyRoute = require("./routes/Story");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
// since we require that our backend entertain the rquests from frontend, therefore we require cors
const cors = require("cors");
const { cloudinaryConnect } = require("./utils/fileUploader");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const { handleSocketConnections } = require("./controllers/SocketController");

// importing http
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://socio-sync.vercel.app",
    // origin: "http://localhost:3000",
    credentials: true,
  },
});

// Initialize Socket IO controllers
handleSocketConnections(io);
// creating an instance of socketIO
dotenv.config();
const PORT = process.env.PORT || 4000;

// connect to db
database.connect();
console.log("db connect");
// middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    // by writing these 2 --> we can store the media in temp files rather
    // than the permanent storage
  })
);

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["https://socio-sync.vercel.app", "http://localhost:3000"],
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  // "http://localhost:3000"
  res.header("Access-Control-Allow-Origin", "https://socio-sync.vercel.app");
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Mounting Of Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/friends", friendsRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/story", storyRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

httpServer.listen(PORT, () => {
  console.log(`App is running successfully at ${PORT}`);
});
