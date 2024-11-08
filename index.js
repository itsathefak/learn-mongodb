const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://athefak:123qwe@cluster0.qkqxgq2.mongodb.net/whatsapp?retryWrites=true&w=majority"
    );
    console.log("Connection successful to the database");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
}

main();
app.get("/", (req, res) => {
  res.send("The root is working");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
