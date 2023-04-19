import mongoose from 'mongoose';
import mCompra from '../models/compra.model.js';
// import {
//   insertarKardex,
//   updateKardex,
//   insertMovimientoIN,
//   updateMovimientoIN,
//   insertMovimientoOUT,
//   updateMovimientoOUT,
// } from '../services/persona.servi.js';

export const inCompraDesdeAlmacen = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inCompraDesdeAlmacen <--//<--//`);
  console.log(`*****************************************`);

  try {
    const newGrupoEmpresarial = await mGrupoEmpresarial.insertMany(req.body);
    return res.status(200).json({
      status: 200,
      data: newGrupoEmpresarial,
      message: 'Succesfully Insert inCompraDesdeAlmacen Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' inCompraDesdeAlmacen' });
  }
  res.end();
};
