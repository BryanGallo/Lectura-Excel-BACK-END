import { Local, Ccomercial } from "../models/index.js";
import { Op } from "sequelize";

const listarLocales = async (req, res) => {
    const { id_Rol } = req.usuario;
    let centrocomercial;
    if (id_Rol === 2) {
        centrocomercial = 1;
    }
    if (id_Rol === 3) {
        centrocomercial = 2;
    }
    try {
        const locales = await Local.findAll({
            include: [
                {
                    model: Ccomercial,
                    as: "centrocomercial",
                    attributes: ["nombre"],
                    where: id_Rol !== 1 ? { id: centrocomercial } : undefined,
                },
            ],
        });
        if (!locales) {
            return res.status(400).json({
                message: "No se encontraron locales",
            });
        }
        return res.status(200).json(locales);
    } catch (error) {
        return res.status(400).json({
            message: "Ha ocurrido un error",
        });
    }
};

const listarLocal = async (req, res) => {
    const { id } = req.params;
    try {
        const local = await Local.findOne({
            include: [
                {
                    model: Ccomercial,
                    as: "centrocomercial",
                    attributes: ["nombre"],
                },
            ],
            where: { id },
        });
        if (!local) {
            return res.status(400).json({
                message: "No se encontro el local",
            });
        }
        return res.status(200).json(local);
    } catch (error) {
        return res.status(400).json({
            message: "Ha ocurrido un error",
        });
    }
};

const crearLocal = async (req, res) => {
    // res.status(200).send("holiss");
    const {
        nombre,
        ruc,
        descripcion,
        metrosCuadrados,
        valorMetros2,
        comision,
        id_Ccomercial,
    } = req.body;
    console.log(req.usuario);
    const { id } = req.usuario;
    try {
        const existeLocal = await Local.findOne({
            where: { ruc },
        });

        if (existeLocal) {
            const error = new Error("El local ya esta registrado");
            return res.status(400).json({ msg: error.message });
        }

        const local = await Local.create({
            nombre,
            ruc,
            descripcion,
            metrosCuadrados,
            valorMetros2,
            comision,
            id_Usuario: id,
            id_Ccomercial,
        });
        res.json({
            msg: "Local Creado Correctamente",
        });
    } catch (error) {
        res.json({
            msg: `Hay error en la creacion del local ${error}`,
        });
    }
};

const editarLocal = async (req, res) => {
    const {
        id,
        nombre,
        ruc,
        descripcion,
        metrosCuadrados,
        valorMetros2,
        comision,
        id_Usuario,
        id_Ccomercial,
    } = req.body;
    console.log(req.body);

    try {
        const existeLocal = await Local.findOne({
            where: {
                [Op.and]: [
                    { id: { [Op.ne]: id } }, // No igual al ID especificado
                    { ruc }, // Igual al correo especificado
                ],
            },
        });
        if (existeLocal) {
            const error = new Error("El ruc ya esta registrado");
            return res.status(400).json({ msg: error.message });
        }

        const local = await Local.findOne({
            where: { id },
        });

        if (!local) {
            const error = new Error("El local no existe");
            return res.status(400).json({ msg: error.message });
        }

        local.nombre = nombre ?? local.nombre;
        local.ruc = ruc ?? local.ruc;
        local.descripcion = descripcion ?? local.descripcion;
        local.metrosCuadrados = metrosCuadrados ?? local.metrosCuadrados;
        local.valorMetros2 = valorMetros2 ?? local.valorMetros2;
        local.comision = comision ?? local.comision;
        local.id_Usuario = id_Usuario ?? local.id_Usuario;
        local.id_Ccomercial = id_Ccomercial ?? local.id_Ccomercial;

        const localActualizado = await local.save();
        return res.status(200).json({
            msg: "Local Actualizado Correctamente",
            localActualizado,
        });
    } catch (error) {
        console.log(error);
    }
};

export { listarLocales, listarLocal, crearLocal, editarLocal };
