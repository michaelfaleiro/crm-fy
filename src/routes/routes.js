const routes = require("express").Router();
const pageController = require("../controllers/Pages");

routes.get("/", pageController.Home);

module.exports = routes;
