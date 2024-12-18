const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // for setting up CSS
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

// New Route
app.get("/chats/new", async (req, res) => {
  res.render("new.ejs");
});

// Create Route
app.post("/chats", (req, res) => {
  let { from, to, message } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    createdAt: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

// Destroy Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("The root is working");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
