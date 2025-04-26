const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

//Static signup function
userSchema.statics.signup = async (email, password) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw Error("Email already exits!");
  }

  const salt = await bcrypt.genSalt(10); //provides 10string to password
  const hash = await bcrypt.hash(password, salt); //hashing the password and merging it with salt

  const user = await User.create({ email, password: hash });
  return user;
};

//Static Login Function
userSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw Error("incorrect Email!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password!");
  }
  return user;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
