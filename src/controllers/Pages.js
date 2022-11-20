const Home = async (req, res) => {
  try {
    return res.render("index");
  } catch (err) {
    return res.status(500).send(`Erro ${err}`);
  }
};

module.exports = {
  Home,
};
