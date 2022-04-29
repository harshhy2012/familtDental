/* jslint esversion: 8 */
const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.get("/backdoor", authController.adminLandingPage_get);

router.post("/backdoor", authController.adminLandingPage_post);

router.get("/addBlog", authController.addBlog_get);

router.post("/addBlog", authController.addBlog_post);

router.get("/addAlbum", authController.addAlbum_get);

router.post("/addAlbum", authController.addAlbum_post);

router.get("/logout", authController.logout_get);

module.exports = router;
