import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Registro = db.define("registros", {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    totalSinImpuestos: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },
    vmcMinimo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        require: false,
    },
    sobreventas: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        require: false,
    },
    diferenciaFacturar: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        require: false,
    },
    valorM2: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        require: false,
    },
    // Valores del registro del local ya que los valores pueden cambiar
    metrosCuadradosRegistro: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: false,
    },
    valorMetros2Registro: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: false,
    },
    comisionRegistro: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});
export default Registro;
