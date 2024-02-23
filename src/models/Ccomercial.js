import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Ccomercial = db.define("ccomerciales", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

export default Ccomercial;
