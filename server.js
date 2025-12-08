const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const cors = require("cors");               // 👈 add this
const connectDB = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// 🔓 allow frontend (5173) to call backend (8080)
app.use(
  cors({
    origin: "http://localhost:5173",        // your Vite dev URL
  })
);

// routes
app.use("/api", imageRoutes);
app.use("/api/v1/admin", require("./routes/adminRoute"));

// static uploads (if any)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on port ${port}`.bgCyan
      .yellow.bold
  );
});
