import express from "express";
import db from "./config/db.js";
import usuariosRouter from "./routes/usuarioRouter.js";
import localesRouter from "./routes/localesRouter.js";
import registrosRouter from "./routes/registrosRouter.js";
import ccomercialRouter from "./routes/ccomercialRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();
//para poder enviar respuestas tipo json
app.use(express.json());

//conexion BDD
try {
    db.authenticate();
    db.sync();
    console.log(`Conexion exitosa a la BDD`);
} catch (error) {
    console.log("error en la base");
}

app.use(
    cors({
        origin: "*",
    })
);

//Routing
//Routing para usuarios
app.use("/usuarios", usuariosRouter);
//Routing para locales
app.use("/locales", localesRouter);
//Routing para registros
app.use("/registros", registrosRouter);
//Routing Ccomercial
app.use("/ccomerciales", ccomercialRouter);

const port = process.env.BD_PORT || 5000;

app.listen(port, () => {
    console.log(`Servidor operativo en el puerto ${port}`);
});
