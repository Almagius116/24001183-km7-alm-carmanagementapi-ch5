const { Cars } = require("../models");

async function createCar(req, res) {
  const { name, brand, year, availability, price } = req.body;
  const createdBy = req.user.id;
  try {
    const newCar = await Cars.create({
      name,
      brand,
      year,
      availability,
      price,
      createdBy,
    });
    res.status(201).json({
      status: "Success",
      message: "Success add car data",
      isSuccess: true,
      data: {
        newCar,
      },
    });
  } catch (err) {
    console.log(err);
    if (err.errors[0].type === "notNull Violation") {
      res.status(400).json({
        status: "Failed",
        message: `Car ${err.errors[0].path} must be filled`,
        isSuccess: false,
        data: null,
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: err.message,
        isSuccess: false,
        data: null,
      });
    }
  }
}

async function getAllCar(req, res) {
  try {
    const cars = await Cars.findAll();
    res.status(200).json({
      status: "Success",
      message: "Success get cars data",
      isSuccess: true,
      data: {
        cars,
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

async function getCarById(req, res) {
  const id = req.params.id;
  try {
    const car = await Cars.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Success get cars data",
      isSuccess: true,
      data: {
        car,
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

async function updateCar(req, res) {
  const id = req.params.id;
  const { name, brand, year, availability, price } = req.body;
  const updatedBy = req.user.id;
  try {
    await Cars.update(
      { name, brand, year, availability, price, updatedBy },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Success update car data",
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

async function deleteCar(req, res) {
  const id = req.params.id;
  const deletedBy = req.user.id;
  const isDeleted = true;
  const availability = false;
  try {
    await Cars.update(
      { deletedBy, isDeleted, availability },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Success delete car data",
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
  createCar,
  getAllCar,
  getCarById,
  updateCar,
  deleteCar,
};
