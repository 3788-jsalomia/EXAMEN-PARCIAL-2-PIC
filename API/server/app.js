const express = require('express');
const cors = require("cors");
const morgan=require("morgan");

const { default: helmet } = require('helmet');


const usuarioRouters = require("./routes/UsuarioRoutes.js");
const cursoRouters = require("./routes/CursoRoutes.js");
const suscripcionRouters = require("./routes/SuscripcionRoutes.js");


const app=express();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

// Rutas

app.use("/api", usuarioRouters);
app.use("/api", cursoRouters);
app.use("/api", suscripcionRouters);

module.exports=app;