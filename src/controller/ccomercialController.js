import { Ccomercial } from "../models/index.js";

const listarCcomerciales = async (req, res) => {
    const ccomerciales = await Ccomercial.findAll();
    if (!ccomerciales) {
        const error = new Error("Hubo un error al obtener los departamentos");
        return res.status(404).json({ msg: error.message });
    }
    res.status(200).json({ ccomerciales });
};

export { listarCcomerciales };
