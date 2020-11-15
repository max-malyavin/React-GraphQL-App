const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "Fullname is required",
      unique: true,
    },
    password: String,
    email: {
      type: String,
      require: "Почта обязательная",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
