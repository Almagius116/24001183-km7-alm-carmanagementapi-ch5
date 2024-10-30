const router = require("express").Router();

const authenticate = require("../middlewares/authenticate");
const { carsController } = require("../controllers");

router.post("", authenticate.admin, carsController.createCar);
router.get("", authenticate.all, carsController.getAllCar);
router.get("/:id", authenticate.all, carsController.getCarById);
router.patch("/:id", authenticate.admin, carsController.updateCar);
router.delete("/:id", authenticate.admin, carsController.deleteCar);

module.exports = router;
