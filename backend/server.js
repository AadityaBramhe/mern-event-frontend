const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* Routes */
app.use("/auth", require("./routes/auth"));
app.use("/events", require("./routes/events"));

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
