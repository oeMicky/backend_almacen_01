import mongoose from 'mongoose';
import mGrupoEmpresarial from '../models/grupoEmpresarial.model.js';

// import {
import {
  insertAlmacen,
  updateAlmacen,
  updateAlmacen2,
} from './../services/grupoEmpresarial.servi.js';

export const inUpGrupoEmpresarial = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpGrupoEmpresarial <--//<--//`);
  console.log(`*****************************************`);

  try {
    const newGrupoEmpresarial = await mGrupoEmpresarial.insertMany(req.body);
    return res.status(200).json({
      status: 200,
      data: newGrupoEmpresarial,
      message: 'Succesfully Insert inUpGrupoEmpresarial Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky2' });
  }
  res.end();
};

export const inUpAlmacen = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpAlmacen <--//<--//`);
  console.log(`*****************************************`);
  //idGrupoEmpresarial, idEmpresa, nombre, direccion
  const idGrupoEmpresarial = req.body.idGrupoEmpresarial;
  const idEmpresa = req.body.idEmpresa;
  const idAlmacen = req.body.idAlmacen;
  const nombre = req.body.nombre;
  const direccion = req.body.direccion;
  const telefono = req.body.telefono;
  // console.log(`******* ${idGrupoEmpresarial}: ${idEmpresa}: ${nombre}: ***********`);
  const existe = await mGrupoEmpresarial.exists({
    _id: idGrupoEmpresarial,
    'empresas._id': idEmpresa,
    'empresas.almacenes._id': idAlmacen,
  });
  console.log('EXISTE:  ' + existe);
  if (!existe) {
    console.log('NO EXISTE:  ');
    try {
      const elIN = await insertAlmacen(idGrupoEmpresarial, idEmpresa, nombre, direccion, telefono);
      return res.status(200).json({
        status: 200,
        data: elIN,
        message: 'Succesfully insertAlmacen Retrieved',
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message + ' Micky2' });
    }
  } else {
    console.log('SI EXISTE:  ');
    try {
      let elIN = await updateAlmacen(
        idGrupoEmpresarial,
        idEmpresa,
        idAlmacen,
        nombre,
        direccion,
        telefono
      );
      return res.status(200).json({
        status: 200,
        data: elIN,
        message: 'Succesfully updateAlmacen Retrieved',
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message + ' Micky23' });
    }
  }
  res.end();
};
