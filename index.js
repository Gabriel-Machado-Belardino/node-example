require("dotenv/config");
const conn = require("./db/conn");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const https = require("https");
const pathSsl = require("path");
const fs = require("fs");

const { routesController, routes } = require("./SRC/routes");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(
  bodyParser.json({ parameterLimit: 100000, limit: "50mb", extended: true })
);
app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
  })
);

routesController(app);

app.use(function (req, res, next) {
  res
    .status(404)
    .send(
      "<div style='text-align:center'> <h1>Endereço inválido ou não permitido ⚠</h1></div>"
    );
});


app.listen(process.env.SV_PORT, () => {
    console.log(`Server is running on port ${process.env.SV_PORT}.`);
})

// Salvar as alterações em tabela
conn.sync();
