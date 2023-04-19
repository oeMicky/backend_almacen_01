import mongoose from 'mongoose';

// import { connect } from '../database.js';
import { insertRegistroSalida } from '../services/registroSalida.servi.js';

export const inRegistroSalida = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inRegistroSalida <--//<--//`);
  console.log(`*****************************************`);
  //const session = await connection.startSession;
  //#region PARAMETROS
  const elJson = req.body;
  //   const idGrupoEmpresarial = req.body.idGrupoEmpresarial;
  //   const idEmpresa = req.body.idEmpresa;
  //   const idAlmacen = req.body.idAlmacen;
  //   const motivo = req.body.motivo;
  //   const FISMA = new Date(req.body.FISMA);
  //   const periodoContable = req.body.periodoContable;
  //   //   const tipo = parseInt(req.body.tipo);
  //   const documentosAnexos = req.body.documentosAnexos;
  //   // const tipo = req.body.tipo;  // const tcp = req.body.tcp;
  //   // const serie = req.body.serie;  // const numero = req.body.numero;
  //   // const lote = req.body.lote;  //
  //   //   for (var i = 0; i < req.body.length; i++) {}
  //   const items = req.body.items;
  //   // const cantidadIngresada = parseFloat(req.body.cantidadIngresada);
  //   // const costoUnitario = parseFloat(req.body.costoUnitario);
  //   const usuario = req.body.usuario;
  //#endregion PARAMETROS
  try {
    // const usuarioCrea = usuario;
    // console.log(elJson);
    const inRI = await insertRegistroSalida({
      elJson,
      // idGrupoEmpresarial,
      // idEmpresa,
      // idAlmacen,
      // motivo,
      // FISMA,
      // periodoContable,
      // documentosAnexos,
      // items,
      // usuarioCrea,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully Insert inRegistroSalida Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky2' });
  }
  res.end();
};
