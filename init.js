const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

let allChats = [
  {
    from: "pandu",
    to: "athiii",
    message: "Hi",
    createdAt: new Date(),
  },
  {
    from: "rayan",
    to: "athiii",
    message: "hello",
    createdAt: new Date(),
  },
  {
    from: "anas",
    to: "athiii",
    message: "wassup",
    createdAt: new Date(),
  },
];

Chat.insertMany(allChats);

main();
