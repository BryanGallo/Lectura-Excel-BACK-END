import express from "express";
import {
    listarUsuarios,
    autenticar,
    perfil,
    registrar,
} from "../controller/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const usuariosRouter = express.Router();

usuariosRouter.get("/", listarUsuarios);
usuariosRouter.post("/", registrar);
usuariosRouter.post("/login", autenticar);

// **********AREA PRIVADA CUANDO ESTA LOGEADO
// checkAuth es nuestro middelwere con el cual vamos a validar que este logeado que el usaurio sea valido
usuariosRouter.get("/perfil", checkAuth, perfil);

export default usuariosRouter;
