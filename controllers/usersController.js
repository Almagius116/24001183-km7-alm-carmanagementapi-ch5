const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { where } = require("sequelize");

async function memberRegister(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "member";
    const newUser = await Users.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      status: "Success",
      message: "Success member register",
      isSuccess: true,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function adminRegister(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "admin";
    const newUser = await Users.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      status: "Success",
      message: "Success admin register",
      isSuccess: true,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not registered",
        isSuccess: false,
        data: null,
      });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );
      res.status(200).json({
        status: "Success",
        message: "Login success",
        isSuccess: true,
        data: {
          username: user.username,
          role: user.role,
          token,
          expiresIn: process.env.JWT_EXPIRED,
        },
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Wrong password",
        isSuccess: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      data: null,
    });
  }
}

async function getAllUser(req, res) {
  try {
    const users = await Users.findAll();
    res.status(200).json({
      status: "Success",
      message: "Success get users data",
      isSuccess: true,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await Users.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Success get users data",
      isSuccess: true,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function updateUser(req, res) {
  const id = req.params.id;
  const { username, password, role } = req.body;
  try {
    await Users.update(
      { username, password, role },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Success update user data",
      isSuccess: true,
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    await Users.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success delete user data",
      isSuccess: true,
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = {
  memberRegister,
  login,
  adminRegister,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
