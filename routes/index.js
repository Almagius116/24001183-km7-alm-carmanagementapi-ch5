const router = require("express").Router();

const Cars = require("./carsRouter");
const Users = require("./usersRouter");

router.use("/cars", Cars);
router.use("/users", Users);

module.exports = router;
