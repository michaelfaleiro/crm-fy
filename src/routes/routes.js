const routes = require("express").Router();
const pageController = require("../controllers/Pages");
const crmController = require("../controllers/Crm");
const cotacaoController = require("../controllers/Cotacao");

routes.get("/", crmController.getAllCrm);
routes.post("/createCrm", crmController.createCrm);
routes.get("/editCrm/:id", crmController.getByCrmId); //abre pra editar e incluir serviço
routes.delete("/delete/:id", crmController.deleteCrm);
routes.get("/getById/:id/:method", crmController.getBy);

routes.post("/crm/:id/cotacao", cotacaoController.createCotacao); //inclui o produto na crm
routes.get("/crm/:id/cotacao", cotacaoController.deleteCotacao); //apagar cotacao do produto

module.exports = routes;
