import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";

const checkAuth = async (req, res, next) => {
    //next se usa porque enviar al siguiente middlewere
    console.log("desde checkAuth.js");
    //colocamos header.authorization porque es en los headers donde se envia el JWT
    console.log(req.headers.authorization);
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);

            req.usuario = await Usuario.findOne({
                attributes: ["id", "nombre", "email", "id_Rol"],
                where: decoded.id,
            });
            console.log(req.usuario);
            return next();
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error con la sesion" });
        }
    }

    if (!token) {
        const error = new Error("Token no valido");
        return res.status(401).json({ msg: error.message });
    }
    next();
};

export default checkAuth;
