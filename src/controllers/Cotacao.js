const Crm = require("../models/crmModel");
const Cotacao = require("../models/cotacaoModel");

const createCotacao = async (req, res) => {
  const { produto, preco } = req.body;
  const cotacao = new Cotacao({
    produto,
    preco,
    crm: req.params.id,
  });
  try {
    await cotacao.save();
    const crm = await Crm.findById(req.params.id);
    crm.cotacoes.push(cotacao);
    await crm.save();
    res.redirect(`/editCrm/${req.params.id}`);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const deleteCotacao = async (req, res) => {
  try {
    const cotacao = await Cotacao.findByIdAndDelete(req.params.id);
    const crm = await Crm.findById(cotacao.crm);
    const cotacaoToRemove = crm.cotacoes.indexOf(cotacao._id);
    crm.cotacoes.splice(cotacaoToRemove, 1);
    crm.save();
    res.redirect(`/editCrm/${crm._id}`);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createCotacao,
  deleteCotacao,
};
