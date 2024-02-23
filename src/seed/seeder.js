import { exit } from "node:process";
import { Usuario, Local, Registro, Rol, Ccomercial } from "../models/index.js";
import db from "../config/db.js";
import usuarios from "./usuarios.js";
import locales from "./locales.js";
import registros from "./registros.js";
import roles from "./roles.js";
import ccomerciales from "./ccomerciales.js";

const importarDatos = async () => {
    try {
        //Autenticar en la bdd
        await db.authenticate();

        //generar columnas
        await db.sync();

        //Insertamos los datos,BulkCreate inserta todos los datos del arreglo
        await Rol.bulkCreate(roles);
        await Usuario.bulkCreate(usuarios);
        await Ccomercial.bulkCreate(ccomerciales);
        await Local.bulkCreate(locales);
        await Registro.bulkCreate(registros);

        // await Registro.bulkCreate(registros);

        //cuando el query no depende del otro podemos usar promise.all
        // await Promise.all([
        //     Rol.bulkCreate(roles),
        //     Local.bulkCreate(locales)
        // ])
        console.log("Datos Importados correctamente");

        exit(0);
    } catch (error) {
        console.log();
        exit(1);
    }
};

const eliminarDatos = async () => {
    try {
        //Autenticar en la bdd
        await db.authenticate();

        //generar columnas
        await db.sync();

        //para eliminar y volver a crear todos los modelos que se encuentren importados en este archivo
        await db.sync({ force: true });
        console.log("Datos Eliminados correctamente");
    } catch (error) {
        console.log(error);
        exit(1);
    }
};

//process.argv manera de manar argumentos desde lenguaje de consola propio de node
if (process.argv[2] === "-i") {
    //llamamo  a la funcion superior
    importarDatos();
}

if (process.argv[2] === "-d") {
    //llamamo  a la funcion superior
    eliminarDatos();
}
