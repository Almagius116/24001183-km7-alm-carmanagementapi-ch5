const { Users } = require("../models");

async function createUser(req, res) {
  const { name, brand, year, availability, price } = req.body;
  try {
    const newUser = await Users.create({
      name,
      brand,
      year,
      availability,
      price,
    });
    res.status(201).json({
      status: "Success",
      message: "Success add user data",
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
  const { name, brand, year, availability, price } = req.body;
  try {
    await Users.update(
      { name, brand, year, availability, price },
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
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
