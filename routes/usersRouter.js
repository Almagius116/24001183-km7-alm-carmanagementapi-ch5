const router = require("express").Router();

const { usersController } = require("../controllers");

router.post("", usersController.createUser);
router.get("", usersController.getAllUser);
router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
