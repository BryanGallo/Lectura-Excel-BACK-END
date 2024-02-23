import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Local = db.define("locales", {
    ruc: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
        require: false,
    },
    metrosCuadrados: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    valorMetros2: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    comision: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});
export default Local;
