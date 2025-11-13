const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// REGISTER
const adminRegister = async (req, res) => {
  try {
    const existingUser = await adminModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).send({
        message: "User Already Exists",
        success: false,
      });
    }
    console.log('Registering user:', req.body);
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new adminModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send({
      message: "Registered Successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
    });
  }
};

// LOGIN
const adminLogin = async (req, res) => {
  try {
    const user = await adminModel
      .findOne({ email: req.body.email })
      .select("+password");   // Fix here!

    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Error: ${error.message}`,
    });
  }
};


module.exports = { adminLogin, adminRegister };
