const router = require("express").Router();

const authenticate = require("../middlewares/authenticate");
const { usersController } = require("../controllers");

router.post("/register", usersController.memberRegister);
router.post(
  "/admin-register",
  authenticate.superAdmin,
  usersController.adminRegister
);
router.post("/login", usersController.login);
router.get("/info", authenticate.all, usersController.userInfo);
// router.get("", usersController.getAllUser);
// router.get("/:id", usersController.getUserById);
// router.patch("/:id", usersController.updateUser);
// router.delete("/:id", usersController.deleteUser);

module.exports = router;
