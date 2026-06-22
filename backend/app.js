require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Parsing JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sajikan file statis frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Prefix untuk semua rute API
app.use("/api", router);

// Middleware Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running pada http://localhost:${PORT}`);
});