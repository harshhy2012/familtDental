const { Router } = require("express");
const adminController = require("../controllers/adminController");

const router = Router();

router.get("/admin", adminController.admin_get);

router.post("/admin", adminController.admin_post);

module.exports = router;