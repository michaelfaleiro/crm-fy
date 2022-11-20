const Crm = require("../models/crmModel");
const Cotacao = require("../models/cotacaoModel");

let message = "";
let type = "";

const getAllCrm = async (req, res) => {
  try {
    const crmList = await Crm.find();
    if (crmList == null) {
      return res.render("index", { dados: null });
    } else {
      return res.status(200).render("index", {
        crmList,
        action: "/createCrm?_method=post",
        editar: "",
        message,
        type,
        cotacao: null,
      });
    }
  } catch (err) {
    return res.send({ error: err.message });
  }
};

const createCrm = async (req, res) => {
  const crm = req.body;
  if (!crm.name) {
    message = "Preencher dados";
    return res.redirect("/");
  }
  try {
    await Crm.create(crm);
    message = "Criado com sucesso";
    type = "success";
    return res.redirect("/");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getBy = async (req, res) => {
  const crmList = await Crm.find();
  try {
    if (req.params.method == "update") {
      const crm = await Crm.findOne({ _id: req.params.id });
      res.render("index", {
        action: "/createCrm",
        crm,
        crmList,
        editar: null,
        message,
        type,
        cotacao: null,
      });
    } else {
      const crmDelete = await Crm.findOneAndDelete({ _id: req.params.id });
      return res.redirect("/");
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const deleteCrm = async (req, res) => {
  try {
    const crmDelete = await Crm.findByIdAndRemove(req.params.id);
    return res.redirect("/");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getByCrmId = async (req, res) => {
  const crmList = await Crm.find();
  const cotacaoList = await Cotacao.find();
  try {
    const crm = await Crm.findOne({ _id: req.params.id });
    const cotacaolist = await Cotacao.find({ crm: req.params.id });
    res.render("index", {
      crm,
      crmList,
      action: null,
      editar: true,
      cotacoes: true,
      cotacaolist,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllCrm,
  createCrm,
  getByCrmId,
  deleteCrm,
  getBy,
};
