const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  name: { type: String, required: true },
  pername: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tel: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("Users", UsersSchema);
