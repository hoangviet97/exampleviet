const express = require("express");
const authController = require("../../controllers/user.controller");
const projectController = require("../../controllers/project.controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/add", auth, projectController.create);
router.get("/", auth, projectController.getAll);
router.post("/single", auth, projectController.getOne);

module.exports = router;
