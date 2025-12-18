const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");
const contactRoute = require("./routes/contactRoute");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.onrender.com"
    ],
    credentials: true
  })
);

// routes
app.use("/api", imageRoutes);
app.use("/api/v1/admin", require("./routes/adminRoute"));
app.use("/api", contactRoute);

// static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// serve frontend in production
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname1, "frontend", "build", "index.html")
    )
  );
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on port ${port}`.bgCyan
      .yellow.bold
  );
});
