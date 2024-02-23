import { Local, Registro, Usuario } from "../models/index.js";

const registrarValores = async (req, res) => {
    console.log(req.body);
    const {
        local: id,
        mesNumero,
        anioNumero,
        total,
        totalSinImpuestos,
    } = req.body;
    const { id: id_Usuario } = req.usuario;

    try {
        // return res.status(200).json(registro);
        // obteniendo local para hacer calculos
        const local = await Local.findByPk(id);
        if (!local) {
            return res.status(400).json({
                message: "No se encontro el local",
            });
        }
        // return res.status(200).json(local);
        const registros = await Registro.findAll({
            attributes: ["mes", "anio"],
            include: [
                {
                    model: Local,
                    attributes: ["ruc"],
                },
            ],
            where: { id_Local: id },
            order: [
                ["anio", "DESC"],
                ["mes", "ASC"],
            ],
        });
        // return res.status(200).json(registros);

        const existeRegistro = (mes, anio) => {
            for (const registro of registros) {
                if (registro.mes === mes && registro.anio === anio) {
                    return true; // Si se encuentra un registro, retorna true
                }
            }
            return false; // Si no se encuentra ningún registro, retorna false
        };
        console.log(registros);
        if (registros) {
            if (existeRegistro(mesNumero, anioNumero)) {
                return res.status(400).json({
                    message: "Ya existe un registro para este mes y año",
                });
            }
        }

        const { metrosCuadrados, valorMetros2, comision } = local;

        //transformacion de datos

        const metrosCuadradosNumerico = parseFloat(metrosCuadrados);
        const valorMetros2Numerico = parseFloat(valorMetros2);
        const comisionNumerica = parseFloat(comision);
        console.log(valorMetros2Numerico);


        console.log(totalSinImpuestos,'SIN IMPUESTOS');
        console.log(metrosCuadradosNumerico, 'METROS CUADRADOS');
        console.log(valorMetros2Numerico, 'VALOR METROS');
        console.log(comisionNumerica, 'COMISION');
        //calculo de sobreventas
        const resultado = (totalSinImpuestos / 100) * comisionNumerica;
        console.log(resultado);
        const sobreventas = resultado.toFixed(2);
        const sobreventasNumerico = parseFloat(sobreventas);
        //calculo de valor mvmc minimo
        const vmcminimo = parseFloat(
            (metrosCuadradosNumerico * valorMetros2Numerico).toFixed(2)
        );

        //calculos  diferencia a facturar
        let diferenciaAfacturar = 0;
        if (sobreventasNumerico > vmcminimo) {
            diferenciaAfacturar = sobreventasNumerico - vmcminimo;
        }
        //vALOR M2
        let valorM2numerico = parseFloat(
            (sobreventasNumerico / metrosCuadradosNumerico).toFixed(2)
        );

        console.log(valorM2numerico);

        const registro = await Registro.create({
            total,
            totalSinImpuestos,
            mes: mesNumero,
            anio: anioNumero,
            vmcMinimo: vmcminimo,
            sobreventas: sobreventasNumerico,
            diferenciaFacturar: diferenciaAfacturar,
            valorM2: valorM2numerico,
            metrosCuadradosRegistro: metrosCuadradosNumerico,
            valorMetros2Registro: valorMetros2Numerico,
            comisionRegistro: comisionNumerica,
            id_Local: id,
            id_Usuario,
        });
        return res.status(200).json({ msg: "Registro Realizado Exitosamente" });
    } catch (error) {
        return res.status(400).json({
            message: `Ha ocurrido un error ${error}`,
        });
    }
};

const listarRegistros = async (req, res) => {
    const { id } = req.params;
    try {
        const registros = await Registro.findAll({
            include: [
                {
                    model: Local,
                },
            ],
            where: { id_Local: id },
            order: [
                ["anio", "DESC"], // Primera condición: ordenar por 'anio' de manera descendente
                ["mes", "ASC"], // Segunda condición: ordenar por 'mes' de manera ascendente
                // Puedes agregar más condiciones según tus necesidades
            ],
        });
        if (!registros) {
            return res.status(400).json({
                message: "No se encontraron registros",
            });
        }
        // return res.status(200).json(registros);
        // Organizar los registros por año
        const registrosPorAnio = registros.reduce((result, registro) => {
            const { anio } = registro.dataValues;

            const anioExistente = result.find((r) => r.anio === anio);

            if (anioExistente) {
                anioExistente.registros.push(registro);
            } else {
                result.push({
                    anio: anio,
                    registros: [registro],
                });
            }

            return result;
        }, []);

        // return registrosPorAnio;
        return res.status(200).json(registrosPorAnio);
    } catch (error) {
        return res.status(400).json({
            message: "Ha ocurrido un error",
        });
    }
};

export { listarRegistros, registrarValores };
