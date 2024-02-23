import express from "express";
import {
    listarLocales,
    listarLocal,
    crearLocal,
    editarLocal,
} from "../controller/localesController.js";
import checkAuth from "../middleware/checkAuth.js";

const localesRouter = express.Router();

localesRouter.get("/", checkAuth, listarLocales);
localesRouter.get("/local/:id", listarLocal);
localesRouter.post("/local/nuevo", checkAuth, crearLocal);
localesRouter.put("/local/editar", checkAuth, editarLocal);

export default localesRouter;
