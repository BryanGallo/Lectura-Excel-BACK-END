import ExcelJS from "exceljs";
import { Readable } from "stream";
import { Registro, Local } from "../models/index.js";

const reporteExcel = async (req, res) => {
    const { id, anio } = req.body;

    console.log(id, anio);

    try {
        const registros = await Registro.findAll({
            include: [
                {
                    model: Local,
                },
            ],
            where: {
                id_Local: id,
                anio: anio, // Filtrar por año
            },
            order: [
                ["mes", "ASC"], // Ordenar por 'mes' de manera ascendente
            ],
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reporte");

        // Encabezados
        worksheet.addRow([
            "MES",
            "VENTAS",
            "VMC MINIMO",
            "COMISION",
            "SOBREVENTAS",
            "DIFERENCIA A FACTURAR",
            "VALOR M2",
        ]);

        // Datos
        registros.forEach((registro) => {
            const {
                mes,
                totalSinImpuestos,
                vmcMinimo,
                comisionRegistro,
                sobreventas,
                diferenciaFacturar,
                valorM2,
            } = registro.dataValues;
            worksheet.addRow([
                mes,
                totalSinImpuestos,
                vmcMinimo,
                comisionRegistro,
                sobreventas,
                diferenciaFacturar,
                valorM2,
            ]);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=archivo.xlsx"
        );

        const buffer = await workbook.xlsx.writeBuffer();
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        stream.pipe(res);
    } catch (error) {
        console.log(error);
    }
};

export { reporteExcel };
