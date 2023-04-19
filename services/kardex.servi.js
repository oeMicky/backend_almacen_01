import mongoose from 'mongoose';
import mKardex from '../models/kardex.model.js';
import { empresaActiva } from './serviciosGlobales.servi.js';

export const insertarKardex = async (query) => {
  console.log(`***********servi***************************`);
  console.log(`//-->//--> insertarKardex <--//<--//`);
  console.log(`************************************`);
  //const kardex = new mongoose
  try {
    console.log('Llego a INSERT kardexxxxxx');
    const newKardex = await mKardex.insertMany(query);
    return newKardex;
  } catch (error) {
    throw Error('Error while Paginating Kardex');
  }
};

export const updateKardex = async (
  idKardex,
  idEmpresa,
  idAlmacen,
  idMercaderia,
  lote,
  fechaVencimiento,
  activo,
  usuarioModifica
) => {
  console.log(`***********servi*************************`);
  console.log(`//-->//--> updateKardex <--//<--//`);
  console.log(`**********************************`);
  console.log(`//-->//--> ${idKardex}: ${idEmpresa}: ${idMercaderia}:  ${lote}`);
  try {
    const Kardex = await mKardex.updateOne(
      { _id: idKardex },
      {
        idEmpresa: idEmpresa,
        idAlmacen: idAlmacen,
        idMercaderia: idMercaderia,
        lote: lote,
        fechaVencimiento: fechaVencimiento,
        activo: activo,
        usuarioModifica: usuarioModifica,
      }
    );
    return Kardex;
  } catch (error) {
    throw Error('Error while Paginating Kardex: ' + error);
  }
};

export const insertMovimientoIN = async (idKardex) => {
  console.log(`***********servi*******************************`);
  console.log(`//-->//--> insertMovimientoIN <--//<--//`);
  console.log(`****************************************`);
  try {
    console.log('Holis!!!!!!!!!!!!!!!');
    console.log('Llego a INSERT MovimientoIN');
    console.log(idKardex);
    console.log('mIK');
    const newKardex = await mKardex.findById(idKardex.idKardex);
    // console.log(newKardex);
    // console.log(tabla);
    newKardex.movimientos.push({
      FISMA: idKardex.FISMA,
      fechaHoraMovimiento: idKardex.fechaHoraMovimiento,
      IS: true,
      tabla: idKardex.tabla,
      clave: idKardex.clave,
      cantidadIngresada: idKardex.cantidadIngresada,
      cantidadSalida: 0,
      cantidadSaldo: idKardex.suma,
      costoUnitario: idKardex.costoUnitario,
      costoUnitarioMovil: idKardex.CUM,
      costoIngreso: idKardex.CI,
      costoSalida: 0,
      costoSaldo: idKardex.CS,
      usuarioCrea: idKardex.usuario,
      creado: new Date(),
    });
    console.log('Pasó PUSH');
    const updated = await newKardex.save();
    return updated;
    // return newKardex;
  } catch (error) {
    throw Error('Error while Paginating Mercaderia IN');
  }
};

export const insertMovimientoOUT = async (idKardex) => {
  console.log(`***********servi********************************`);
  console.log(`//-->//--> insertMovimientoOUT <--//<--//`);
  console.log(`*****************************************`);
  try {
    console.log('Llego a INSERT MovimientoOUT');
    const newKardex = await mKardex.findById(idKardex.idKardex);
    console.log(newKardex);
    newKardex.movimientos.push({
      FISMA: idKardex.FISMA,
      fechaHoraMovimiento: idKardex.fechaHoraMovimiento,
      IS: false,
      tabla: idKardex.tabla,
      clave: idKardex.clave,
      cantidadIngresada: 0,
      cantidadSalida: idKardex.cantidadSacada,
      cantidadSaldo: idKardex.cuantoQueda,
      costoUnitario: idKardex.cosUNImovi,
      costoUnitarioMovil: idKardex.cosUNImovi,
      costoIngreso: 0,
      costoSalida: idKardex.cosSALI,
      costoSaldo: idKardex.cosSALDO,
      usuarioCrea: idKardex.usuario,
      creado: new Date(),
    });
    const updated = await newKardex.save();
    return updated;
  } catch (error) {
    throw Error('Error while Paginating Movimiento OUT');
  }
};
//--> actualizarValoresPosterioresAl_IS
export const updateMovimientoIN = async (idKardex, idMov, canSALDO, cosSALDO, CUM, usuario) => {
  console.log(`***********servi*******************************`);
  console.log(`//-->//--> updateMovimientoIN <--//<--//`);
  console.log(`****************************************`);
  console.log(`//-->//--> ${idKardex}: ${idMov}: ${canSALDO}`);
  try {
    const Kardex = await mKardex.updateOne(
      { _id: idKardex, 'movimientos._id': idMov },
      {
        'movimientos.$.cantidadSaldo': canSALDO,
        // 'movimientos.$.costoUnitario': costoUnitario,
        'movimientos.$.costoUnitarioMovil': CUM,
        // 'movimientos.$.costoIngreso': costoIngreso,
        // 'movimientos.$.costoSalida': 0,
        'movimientos.$.costoSaldo': cosSALDO,
        'movimientos.$.usuarioModifica': usuario,
        'movimientos.$.modificado': new Date(),
      }
    );
    return Kardex;
  } catch (error) {
    throw Error('Error while Paginating Movimiento IN: ' + error);
  }
};
//--> actualizarValoresPosterioresAl_IS
export const updateMovimientoOUT = async (
  idKardex,
  idMovimiento,
  cantidadSaldo,
  costoSalida,
  costoSaldo,
  costoUnitarioMovil,
  usuarioModifica
) => {
  console.log(`***********servi********************************`);
  console.log(`//-->//--> updateMovimientoOUT <--//<--//`);
  console.log(`*****************************************`);
  console.log(`//-->//--> ${idKardex}: ${idMovimiento}: ${cantidadSaldo}`);
  try {
    const Kardex = await mKardex.updateOne(
      { _id: idKardex, 'movimientos._id': idMovimiento },
      {
        'movimientos.$.cantidadSaldo': cantidadSaldo, //
        'movimientos.$.costoUnitario': costoUnitarioMovil, //
        'movimientos.$.costoUnitarioMovil': costoUnitarioMovil, //
        'movimientos.$.costoSalida': costoSalida, //
        'movimientos.$.costoSaldo': costoSaldo, //
        'movimientos.$.usuarioModifica': usuarioModifica,
        'movimientos.$.modificado': new Date(),
      }
    );
    return Kardex;
  } catch (error) {
    throw Error('Error while Paginating Movimiento OUT: ' + error);
  }
};

export const stock_ = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> stock_ <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //#region empActiva empresa ACTIVA???
  console.log('idGrupoEmpresarial', ge.idGrupoEmpresarial);
  console.log('idEmpresa', ge.idEmpresa);
  console.log('idKardex', ge.idKardex);
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa???? ' + empActiva);
  if (empActiva[0] == false) {
    console.log('---->>>El grupo empresarial no existe.<<<----');
    return empActiva;
  }
  if (empActiva[1] == false) {
    console.log('---->>>El grupo empresarial esta inactivo.<<<----');
    return empActiva;
  }
  if (empActiva[2] == false) {
    console.log('---->>>El empresa no existe.<<<----');
    return empActiva;
  }
  if (empActiva[3] == false) {
    console.log('---->>>El empresa esta inactiva.<<<----');
    return empActiva;
  }
  //#endregion
  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('J');
    let newKardex = await mKardex.aggregate([
      // { $match: { _id: ObjectId('5c6d63f2734e98fc0a434aeb') } },
      // {
      //   $unwind: '$L',
      // },
      // { $match: { 'L.N': { $gt: 3 } } },
      // { $group: { _id: '$_id', subDocument: { $push: '$L.N' } } },

      {
        $match: {
          $and: [{ lote: { $regex: `.*aa.*`, $options: 'i' } }],
        },
      },
      // {
      //   $match: { $and: [{ _id: mongoose.Types.ObjectId(ge.idKardex) }, { lote: 'DSDFF-NDNE' }] },
      // },
      {
        $unwind: '$movimientos',
        // $unwind: {
        //   path: '$movimientos',
        //   preserveNullAndEmptyArrays: true,
        // },
      },
      // {
      //   $match: {
      //     'movimientos.fechaHoraMovimiento': { $lt: fechaHoraMovimiento },
      //     'movimientos.FISMA': { $lte: FISMA },
      //   },
      // },

      {
        $sort: {
          'movimientos.FISMA': -1,
          'movimientos.fechaHoraMovimiento': -1,
        },
      },
      {
        $group: {
          _id: '$_id',
          lote: { $first: '$lote' },
          movimientos: { $first: '$movimientos' },
          // activo: { $first: '$activo' },
        },
      },
      {
        $project: {
          _id: 1,
          // movimientos: 1,
          lote: 1,
          'movimientos.cantidadSaldo': 1,
        },
      },
      // {
      //   $limit: 1,
      // },
    ]);
    console.log('K');
    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    // return true;
    return newKardex;
  } catch (error) {
    console.log(666);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating stock ::| ' + error);
  }
};
