const mongoose = require("mongoose");

const chatSchema = new mongoose.schema({
  from: {
    type: string,
    required: true,
  },
  to: {
    type: string,
    required: true,
  },
  message: {
    type: string,
    maxLength: 50,
  },
  createAt: {
    type: Date,
    required: true,
  },
});

const Chat = mongoose.model("chat", chatSchema);

modules.export = Chat;
