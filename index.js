const express = require("express");
const db = require("./models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let databaseReady = false;
let databasePromise = null;

async function connectDatabase() {
  await db.sequelize.authenticate();
  console.log("Database connection successfully");

  await db.sequelize.sync({ alter: false });
  console.log("Database synchronized");
}

app.use(async (req, res, next) => {
  try {
    if (!databaseReady) {
      if (!databasePromise) {
        databasePromise = connectDatabase();
      }

      await databasePromise;
      databaseReady = true;
    }

    next();
  } catch (error) {
    console.error("Database initialization failed:", error.message);

    databasePromise = null;

    return res.status(500).json({
      message: "Database initialization failed."
    });
  }
});

app.use("/api", require("./routes/api"));

module.exports = app;