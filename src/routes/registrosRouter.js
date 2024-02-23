import express from "express";
import {
    listarRegistros,
    registrarValores,
} from "../controller/registrosController.js";
//para exportar Excel
import { reporteExcel } from "../controller/registrosExcelController.js";
import checkAuth from "../middleware/checkAuth.js";

const registrosRouter = express.Router();

registrosRouter.post("/calculos", checkAuth, registrarValores);
registrosRouter.get("/:id", listarRegistros);
//para exportar Excel
registrosRouter.post("/excel", checkAuth, reporteExcel);

export default registrosRouter;
