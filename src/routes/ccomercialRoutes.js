import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { listarCcomerciales } from "../controller/ccomercialController.js";

const ccomercialRouter = express.Router();

ccomercialRouter.get("/", listarCcomerciales);

export default ccomercialRouter;
