import { Usuario } from "../models/index.js";
import generarJWT from "../helpers/generarJWT.js";
import { Op } from "sequelize";

const listarUsuarios = async (req, res) => {
    res.send("Hemos llegado");
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    //compraobar si el usuario existe
    const usuario = await Usuario.findOne({
        where: {
            [Op.and]: [{ estado: true }, { email }],
        },
    });

    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    //comprobar clave
    //tomamos la variable usuario que fue declarada de la consulta Usuario
    if (await usuario.verificarPassword(password)) {
        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email,
            id_Rol: usuario.id_Rol,
            token: generarJWT(usuario.id),
        });
    } else {
        const error = new Error("Tu clave es Incorrecta");
        return res.status(403).json({ msg: error.message });
    }
};

const registrar = async (req, res) => {
    const { nombre, email, password, id_Rol } = req.body;

    try {
        const existeUsuario = await Usuario.findOne({ where: { email } });
        if (existeUsuario) {
            const error = new Error("El usuario ya esta registrado");
            return res.status(400).json({ msg: error.message });
        }
        const usuario = await Usuario.create({
            nombre,
            email,
            password,
            id_Rol,
        });

        res.json({
            msg: "Usuario Creado Correctamente",
        });
    } catch (error) {
        return res
            .status(403)
            .json({ msg: "Hubo un problema al crear el Usuario" });
    }
};

const perfil = async (req, res) => {
    //nuestro usuario autenticado se esta almacenado en nuesto req.usuario de checkAuth.js por lo tanto extraemos el usuario del servidor a traves de req
    const { usuario } = req;

    res.json({ usuario });
};

export { listarUsuarios, autenticar, registrar, perfil };
