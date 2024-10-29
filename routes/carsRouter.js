const router = require("express").Router();

const { carsController } = require("../controllers");

router.post("", carsController.createCar);
router.get("", carsController.getAllCar);
router.get("/:id", carsController.getCarById);
router.patch("/:id", carsController.updateCar);
router.delete("/:id", carsController.deleteCar);

module.exports = router;
