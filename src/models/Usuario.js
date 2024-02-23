import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcryptjs";

const Usuario = db.define(
    "usuarios",
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            require: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            require: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            require: true,
            trim: true,
        },
        token: DataTypes.STRING,
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        hooks: {
            beforeCreate: async (usuario) => {
                usuario.password = await bcrypt.hash(usuario.password, 10);
            },
        },
    }
);

//Metodos personalizados
Usuario.prototype.verificarPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default Usuario;
