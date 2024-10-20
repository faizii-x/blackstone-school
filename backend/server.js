const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./database/db");
require("dotenv").config();

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
