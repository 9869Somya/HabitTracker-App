const mongoose = require("mongoose");
async function dbConnect() {
  DBURL = process.env.DB_URL;
  DBNAME = process.env.DB_NAME;
  try {
    await mongoose.connect(DBURL + DBNAME);
    console.log("Database Connected");
  } catch (error) {
    console.log("Connection failed" + error);
  }
}
module.exports = dbConnect;
