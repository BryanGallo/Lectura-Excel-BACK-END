import Usuario from "./Usuario.js";
import Local from "./Local.js";
import Registro from "./Registro.js";
import Rol from "./Rol.js";
import Ccomercial from "./Ccomercial.js";
//Relacion entre Rol y Usuario
Rol.hasMany(Usuario, {
    foreignKey: { name: "id_Rol" },
    as: "roles",
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});
Usuario.belongsTo(Rol, {
    foreignKey: { name: "id_Rol" },
    as: "roles",
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});

//Relacion Usuario - Local
Usuario.hasMany(Local, {
    foreignKey: { name: "id_Usuario" },
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});
Local.belongsTo(Usuario, {
    foreignKey: { name: "id_Usuario" },
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});

//Relacion Usuario - Local
Local.hasMany(Registro, {
    foreignKey: { name: "id_Local" },
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});
Registro.belongsTo(Local, {
    foreignKey: { name: "id_Local" },
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});

//Relacion Usuario - Registro
Usuario.hasMany(Registro, {
    foreignKey: { name: "id_Usuario" },
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});
Registro.belongsTo(Usuario, {
    foreignKey: { name: "id_Usuario" },
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});

Ccomercial.hasMany(Local, {
    foreignKey: { name: "id_Ccomercial" },
    as: "centrocomercial",
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});

Local.belongsTo(Ccomercial, {
    foreignKey: { name: "id_Ccomercial" },
    as: "centrocomercial",
    onDelete: "SET NULL",
    onUpdate: "SET NULL ",
});

export { Usuario, Local, Registro, Rol, Ccomercial };
