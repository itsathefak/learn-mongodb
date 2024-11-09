const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // for setting up CSS

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

/* Index Route */

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/chats/new", async (req, res) => {
  res.render("new.ejs");
});

app.get("/", (req, res) => {
  res.send("The root is working");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
