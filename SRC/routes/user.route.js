const userController = require('../controllers/User.controller')

var router = require("express").Router();

router.post("/", userController.create);

router.post("/login", userController.login);

router.get("/", userController.list);

router.get("/:id", userController.get_detail);

module.exports = { alias: "/api/user", router };
