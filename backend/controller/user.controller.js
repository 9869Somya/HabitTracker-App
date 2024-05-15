const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    let user = req.body;

    let { name, email, password } = user;
    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "Password must be at least 4 characters long" });
    }

    let extUser = await UserModel.findOne({ email: email });
    if (extUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await UserModel.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email" });
    }
    let isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        { user: { id: user._id, name: user.name, email: user.email } },
        process.env.JWT_SECRET
      );
      res.status(200).json({ message: "Login Successfully", token });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  addUser,
  loginUser,
};
