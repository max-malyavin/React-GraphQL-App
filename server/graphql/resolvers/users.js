const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "Такого юзера нет!";
        throw new UserInputError("Такого юзера нет!", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong crendetials!";
        throw new UserInputError("Wrong crendetials!", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Имя уже занято!", {
          errors: {
            username: "Это имя занято.",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
