/* jslint esversion: 8 */
const { Router } = require("express");
const mainController = require("../controllers/mainController");

const router = Router();

router.get("/", mainController.landingPage_get);

router.post("/", mainController.landingPage_post);

router.get("/ourClinic", mainController.ourClinic_get);

router.get("/ourDoctors", mainController.ourDoctors_get);

router.get("/invisalign", mainController.invisalign_get);

router.get("/flash", mainController.flash_get);

router.get("/technology", mainController.technology_get);

router.get("/implants", mainController.implants_get);

router.get("/treatments", mainController.treatments_get);

router.get("/blog", mainController.blog_get);

router.get("/blog/:blog_id", mainController.blogPost_get);

module.exports = router;

