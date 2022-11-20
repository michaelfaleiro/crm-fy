require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

const routes = require("./routes/routes");
const connectToDb = require("./database/db");
const port = process.env.PORT || 3000;

connectToDb();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(port, () => {
  console.log(`Rodando na Porta ${port}`);
});
