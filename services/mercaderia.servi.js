import mongoose from 'mongoose';
import { empresaActiva } from './serviciosGlobales.servi.js';
import mMercaderia from '../models/mercaderia.model.js';

export const inUp_Mercaderia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUp_Mercaderia <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  // console.log('ge', ge);
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
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
  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    let updated;
    console.log('idMercaderia', ge.idMercaderia);
    if (ge.idMercaderia == null || ge.idMercaderia == '') {
      console.log('--------insert--------', ge);
      // console.log(ge);
      updated = await mMercaderia.insertMany(
        [
          {
            idGrupoEmpresarial: ge.idGrupoEmpresarial,
            idEmpresa: ge.idEmpresa,
            activo: ge.activo,
            codigo: ge.codigo.toUpperCase(),
            descripcion: ge.descripcion.toUpperCase(),
            idLineaTipo: ge.idLineaTipoMercaderia,
            lineaTipo: ge.lineaTipoMercaderia,
            idUnidad: ge.idUnidad,
            unidad: ge.unidad,
            idMarca: ge.idMarca,
            marca: ge.marca,
            stockMinimo: ge.stockMinimo,
            equivalencias: ge.equivalencias,
            usuarioCrea: ge.usuario,
          },
        ],
        { session: session }
      );
      console.log('end IN');
    } else {
      console.log('--------update--------', ge);
      updated = await mMercaderia.updateOne(
        { _id: ge.idMercaderia },
        {
          idGrupoEmpresarial: ge.idGrupoEmpresarial,
          idEmpresa: ge.idEmpresa,
          activo: ge.activo,
          codigo: ge.codigo.toUpperCase(),
          descripcion: ge.descripcion.toUpperCase(),
          idLineaTipo: ge.idLineaTipoMercaderia,
          lineaTipo: ge.lineaTipoMercaderia,
          // idUnidad: ge.idUnidad,
          // unidad: ge.unidad,
          // idMarca: ge.idMarca,
          // marca: ge.marca,
          // stockMinimo: ge.stockMinimo,
          equivalencias: ge.equivalencias,
          // equivalencias: [ge.Equivalencias],
          usuarioModifica: ge.usuario,
        },
        { session: session }
      );
      console.log('end UP');
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    if (ge.idMercaderia) {
      updated = await mMercaderia.findById(ge.idMercaderia);
    }
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return updated;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUp_Mercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const de_Mercaderia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> de_Mercaderia <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
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
  ////////////////////
  //, 'unidades._id': ge.idUnidad
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    console.log('ge.idMercaderia: ', ge.idMercaderia);
    let newMercaderia = await mMercaderia.deleteOne({ _id: ge.idMercaderia }, { session: session });

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return newMercaderia;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating de_Mercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const de_EquivalenciaMercaderia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> de_EquivalenciaMercaderia <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
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
  ////////////////////
  //, 'unidades._id': ge.idUnidad
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    // console.log(ge.idLineaTipoM
    let newMercaderia = await mMercaderia.findById(ge.idMercaderia);
    // console.log(newLineaTipoMercaderia);
    newMercaderia.equivalencias.id({ _id: ge.idEquivalencia }, { session: session }).remove();
    //newLineaTipoMercaderia.save;
    newMercaderia.save(function (err) {
      if (err) return handleError(err);
      console.log('the sub-doc was removed');
    });
    // newLineaTipoMercaderia.unidad.remove();

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return true;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating de_EquivalenciaMercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const listar_Mercaderias = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> listar_Mercaderia <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  console.log(ge.idGrupoEmpresarial);
  console.log(ge.idEmpresa);
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
  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    // if (ge.idLineaTipoMercaderia == null) {
    console.log('J');
    // console.log(ge);
    let newMercaderia = await mMercaderia.find(
      // [
      {
        idGrupoEmpresarial: ge.idGrupoEmpresarial,
        idEmpresa: ge.idEmpresa,
      }
      // ],
      // { session: session }
    );
    console.log('K');
    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    // return true;
    return newMercaderia;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating listar_Mercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

function esVacio(valor) {
  return valor != '';
}

export const buscar_Mercaderias_Por_Codigo = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> buscar_Mercaderias_Por_Codigo MMM M<--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  console.log(`*****ge*****`, ge);
  //#region empActiva empresa ACTIVA???
  console.log(ge.idGrupoEmpresarial);
  console.log(ge.idEmpresa);
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

  //#region FRAGMENTACION DE CADENA a buscar
  let cadena = ge.cadenaABuscar.trim();
  console.log(cadena);
  const myArray = cadena.split(' ');
  console.log('myArray_Codigo', myArray);
  const arraySinVacios = myArray.filter(esVacio);
  console.log('myArray2_Codigo', arraySinVacios);
  //#endregion

  //#region FRAGMENTACION DE LOTE
  // let cadenaLOTE = ge.loteABuscar.trim();
  // console.log(cadenaLOTE);
  // const myArrayLOTE = cadenaLOTE.split(' ');
  // console.log('myArrayLOTE_Codigo', myArrayLOTE);
  // const arrayLOTESinVacios = myArrayLOTE.filter(esVacio);
  // console.log('arrayLOTESinVacios_Codigo', arrayLOTESinVacios);
  //#endregion FRAGMENTACION DE LOTE
  const laLongitud = arraySinVacios.length;
  console.log('longitud_Codigo', laLongitud);
  let day = '';
  // --------->>>>>>>>>>>  buscar_Mercaderias_Por_Codigo;
  switch (laLongitud) {
    case 1:
      console.log('longitud confirmada _Codigo:', 1);
      // console.log(' ge.loteABuscar:', ge.loteABuscar);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J ge.idAlmacen', ge.idAlmacen);
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [{ codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } }],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId(ge.idAlmacen)],
                        },
                        {
                          $eq: ['$activo', true],
                        },
                      ],
                    },
                  },
                },
                // {
                //   $match: {
                //     $and: [
                //       { lote: { $regex: `.*${arrayLOTESinVacios[0]}.*`, $options: 'i' } },
                //       // { lote: { $regex: `.*${arrayLOTESinVacios[1]}.*`, $options: 'i' } },
                //     ],
                //   },
                // },

                {
                  $unwind: '$movimientos',
                  // $unwind: {
                  //   path: '$movimientos',
                  //   preserveNullAndEmptyArrays: true,
                  // },
                },
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
                    fechaVencimiento: { $first: '$fechaVencimiento' },
                    // sumaCantidadSaldo: {
                    //   $sum: { $first: '$movimientos.cantidadSaldo' },
                    // },
                    movimientos: { $first: '$movimientos' },
                    // cuantos: { $sum: 1 },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    lote: 1,
                    fechaVencimiento: 1,
                    // movimientos: 1,
                    // 'movimientos.FISMA': 1,
                    // 'movimientos.fechaHoraMovimiento': 1,
                    'movimientos.cantidadSaldo': 1,
                    // sumaCantidadSaldo: { $sum: '$movimientos.cantidadSaldo' },
                  },
                },
                // {
                //   $limit: 1,
                // },
              ],
              as: 'kardex',
            },
          },
          {
            $project: {
              _id: 1,
              codigo: 1,
              descripcion: 1,
              idUnidad: 1,
              unidad: 1,
              idLineaTipo: 1,
              lineaTipo: 1,
              idMarca: 1,
              marca: 1,
              equivalencias: 1,
              conFechaVencimientoLote: 1,
              kardex: 1,
              totalCantidadSaldo: { $sum: '$kardex.movimientos.cantidadSaldo' },
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 2:
      console.log('longitud confirmada:', 2);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId(ge.idAlmacen)],
                        },
                      ],
                    },
                  },
                },
                { $match: { lote: { $regex: `.*${arrayLOTESinVacios[0]}.*`, $options: 'i' } } },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 3:
      console.log('longitud confirmada:', 3);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 4:
      console.log('longitud confirmada:', 4);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 5:
      console.log('longitud confirmada:', 5);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 6:
      console.log('longitud confirmada:', 6);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[5]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 7:
      console.log('longitud confirmada:', 7);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[5]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[6]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 8:
      console.log('longitud confirmada:', 8);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { codigo: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[5]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[6]}.*`, $options: 'i' } },
                { codigo: { $regex: `.*${arraySinVacios[7]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    default:
      return;
    // day = '<999>';
    // break;
  }
  console.log('day', day);
};
export const buscar_Mercaderias_Por_Descripcion = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> buscar_Mercaderias_Por_Descripcion XXX<--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //#region empActiva empresa ACTIVA???
  console.log('ge.idGrupoEmpresarial', ge.idGrupoEmpresarial);
  console.log('ge.idEmpresa', ge.idEmpresa);
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
  //#region FRAGMENTACION DE CADENA
  let cadena = ge.cadenaABuscar.trim();
  console.log(cadena);
  const myArray = cadena.split(' ');
  console.log('myArray', myArray);
  const arraySinVacios = myArray.filter(esVacio);
  console.log('myArray2', arraySinVacios);
  //#endregion FRAGMENTACION DE CADENA
  const laLongitud = arraySinVacios.length;
  console.log('longitud', laLongitud);
  let day = '';
  //-------------->>>>>> buscar_Mercaderias_Por_Descripcion;
  switch (laLongitud) {
    case 1:
      console.log('longitud confirmada:', 1);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [{ descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } }],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId(ge.idAlmacen)],
                        },
                        {
                          $eq: ['$activo', true],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
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
                    fechaVencimiento: { $first: '$fechaVencimiento' },
                    // sumaCantidadSaldo: {
                    //   $sum: { $first: '$movimientos.cantidadSaldo' },
                    // },
                    movimientos: { $first: '$movimientos' },
                    // cuantos: { $sum: 1 },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    lote: 1,
                    fechaVencimiento: 1,
                    // movimientos: 1,
                    // 'movimientos.FISMA': 1,
                    // 'movimientos.fechaHoraMovimiento': 1,
                    'movimientos.cantidadSaldo': 1,
                    // sumaCantidadSaldo: { $sum: '$movimientos.cantidadSaldo' },
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
          {
            $project: {
              _id: 1,
              codigo: 1,
              descripcion: 1,
              idUnidad: 1,
              unidad: 1,
              idLineaTipo: 1,
              lineaTipo: 1,
              idMarca: 1,
              marca: 1,
              equivalencias: 1,
              conFechaVencimientoLote: 1,
              kardex: 1,
              totalCantidadSaldo: { $sum: '$kardex.movimientos.cantidadSaldo' },
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 2:
      console.log('longitud confirmada:', 2);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 3:
      console.log('longitud confirmada:', 3);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 4:
      console.log('longitud confirmada:', 4);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 5:
      console.log('longitud confirmada:', 5);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 6:
      console.log('longitud confirmada:', 6);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[5]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 7:
      console.log('longitud confirmada:', 7);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[5]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[6]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    case 8:
      console.log('longitud confirmada:', 8);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                { descripcion: { $regex: `.*${arraySinVacios[0]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[1]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[2]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[3]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[4]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[5]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[6]}.*`, $options: 'i' } },
                { descripcion: { $regex: `.*${arraySinVacios[7]}.*`, $options: 'i' } },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
      }
      break;
    default:
      return;
    // day = '<999>';
    // break;
  }
};
export const buscar_Mercaderias_Por_Descripcion_Equivalencia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> buscar_Mercaderias_Por_Descripcion_Equivalencia <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //#region empActiva empresa ACTIVA???
  console.log(ge.idGrupoEmpresarial);
  console.log(ge.idEmpresa);
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
  //#region FRAGMENTACION DE CADENA
  let cadena = ge.cadenaABuscar.trim();
  console.log(cadena);
  const myArray = cadena.split(' ');
  console.log('myArray', myArray);
  const arraySinVacios = myArray.filter(esVacio);
  console.log('myArray2', arraySinVacios);
  //#endregion FRAGMENTACION DE CADENA
  const laLongitud = arraySinVacios.length;
  console.log('longitud', laLongitud);
  let day = '';
  switch (laLongitud) {
    case 1:
      console.log('longitud confirmada:', 1);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    case 2:
      console.log('longitud confirmada:', 2);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[1]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    case 3:
      console.log('longitud confirmada:', 3);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[1]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[2]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    case 4:
      console.log('longitud confirmada:', 4);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[1]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[2]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[3]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    case 5:
      console.log('longitud confirmada:', 5);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[1]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[2]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[3]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[4]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    case 6:
      console.log('longitud confirmada:', 6);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[1]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[2]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[3]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[4]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[5]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    case 7:
      console.log('longitud confirmada:', 7);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[1]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[2]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[3]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[4]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[5]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[6]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    case 8:
      console.log('longitud confirmada:', 8);
      try {
        console.log(1);
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('J');
        let newMercaderia = await mMercaderia.aggregate([
          {
            $match: {
              $and: [
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[0]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[1]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[2]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[3]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[4]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[5]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[6]}.*`,
                    $options: 'i',
                  },
                },
                {
                  'equivalencias.descripcionEquivalencia': {
                    $regex: `.*${arraySinVacios[7]}.*`,
                    $options: 'i',
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: 'kardexs',
              let: { idMerca: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$idMercaderia', '$$idMerca'],
                        },
                        {
                          $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
                        },
                      ],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$movimientos',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $sort: {
                    'movimientos.FISMA': -1,
                    'movimientos.fechaHoraMovimiento': -1,
                  },
                },
                {
                  $project: {
                    _id: 0,
                    // movimientos: 1,
                    'movimientos.cantidadSaldo': 1,
                  },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'kardex',
            },
          },
        ]);
        console.log('K');
        //finalizando
        console.log(2);
        await session.commitTransaction();
        session.endSession();
        console.log('-->Session ACABADO con  commitTransaction <---');
        console.log(3);
        // return true;
        return newMercaderia;
      } catch (error) {
        console.log(666);
        await session.abortTransaction();
        session.endSession();
        throw Error(
          'Error while Paginating buscar_Mercaderias_Por_Descripcion_Equivalencia ::| ' + error
        );
      }
      break;
    default:
      return;
    // day = '<999>';
    // break;
  }
};

export const obtener_Mercaderia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> obtener_Mercaderia <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
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
  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    let newMercaderia = await mMercaderia.find({
      _id: ge.idMercaderia,
    });
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    return newMercaderia;
    // return [];
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating obtener_Mercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
  }
};

export const insertMercaderia = async (query) => {
  try {
    console.log(`***********servi***************************`);
    console.log(`//-->//--> insertMercaderia <--//<--//`);
    console.log(`************************************`);
    console.log('Llego a INSERTmercaderiaa');
    const newMercaderia = await mMercaderia.insertMany(query);
    return newMercaderia;
  } catch (error) {
    throw Error('Error while Paginating Mercaderia');
  }
};

export let updateMercaderia = async (
  idMercaderia,
  codigo,
  descripcion,
  tipoMercaderia,
  marca,
  unidadCompra,
  presentacion
) => {
  console.log(`***********servi***************************`);
  console.log(`//-->//--> updateMercaderia <--//<--//`);
  console.log(`************************************`);

  console.log(`//-->//--> ${idMercaderia}: ${codigo}: ${descripcion}:  ${tipoMercaderia}`);
  try {
    let Mercaderia = await mMercaderia.updateOne(
      { _id: idMercaderia },
      {
        codigo: codigo,
        descripcion: descripcion,
        tipoMercaderia: tipoMercaderia,
        marca: marca,
        unidadCompra: unidadCompra,
        presentacion: presentacion,
      }
    );
    return Mercaderia;
  } catch (error) {
    throw Error('Error while Paginating Mercaderia: ' + error);
  }
};

export let insertEquivalencia = async (
  idMercaderia,
  descripcionEqui,
  tipoEq,
  factor,
  unidadEq,
  laEquivalencia
) => {
  console.log(`***********servi***************************`);
  console.log(`//-->//--> insertEquivalencia <--//<--//`);
  console.log(`************************************`);
  try {
    console.log('Llego a INSERTequivalencia');
    let newMercaderia = await mMercaderia.findById(idMercaderia);
    newMercaderia.equivalencia.push({
      descripcionEqui: descripcionEqui,
      tipoEq: tipoEq,
      factor: factor,
      unidadEq: unidadEq,
      laEquivalencia: laEquivalencia,
    });
    const updated = await newMercaderia.save();
    return updated;
  } catch (error) {
    throw Error('Error while Paginating Mercaderia');
  }
};

export let updateEquivalencia = async (
  idMercaderia,
  idEquivalencia,
  descripcionEqui,
  red,
  factor,
  unidadEq,
  ex
) => {
  console.log(`***********servi***************************`);
  console.log(`//-->//--> updateEquivalencia <--//<--//`);
  console.log(`************************************`);
  console.log(`//-->//--> ${idMercaderia}: ${idEquivalencia}: ${descripcionEqui}:  ${factor}`);
  try {
    let Equivalencia = await mMercaderia.updateOne(
      { _id: idMercaderia, 'equivalencia._id': idEquivalencia },
      {
        'equivalencia.$.descripcionEqui': descripcionEqui,
        'equivalencia.$.tipoEq': red,
        'equivalencia.$.factor': factor,
        'equivalencia.$.unidadEq': unidadEq,
        'equivalencia.$.laEquivalencia': ex,
      }
    );
    return Equivalencia;
  } catch (error) {
    throw Error('Error while Paginating Equivalencia: ' + error);
  }
};

export let upRenameCampo = async () => {
  console.log(`***********servi***************************`);
  console.log(`//-->//--> upRenameCampo <--//<--//`);
  console.log(`************************************`);
  // console.log(`//-->//--> ${idMercaderia}: ${idEquivalencia}: ${descripcionEq}:  ${factor}`);
  try {
    let Equivalencia = await mMercaderia.updateMany(
      {},
      {
        $rename: { equivalencia: 'equivalencias' },
      }
    );
    return Equivalencia;
  } catch (error) {
    throw Error('Error while Paginating Equivalencia: ' + error);
  }
};

// console.log('0', myArray2[0].trim());
// console.log('1', myArray2[1].trim());
// console.log('2', myArray2[2].trim());
// console.log('3', myArray[3].trim());
// console.log(myArray[4]);

// if (myArray[1] != '' && typeof myArray[1] != 'undefined') {
//   elMatch = elMatch.concat(
//     '{ codigo: { $regex: ',
//     '.*',
//     myArray[1],
//     '.*',
//     ', $options: ',
//     'i',
//     ' },'
//   );
//   // elMatch='{ codigo: { $regex: '.*myArray[0].*', $options: 'i' } },'
// }
// if (myArray[2] != '' && typeof myArray[2] != 'undefined') {
//   elMatch = elMatch.concat(
//     '{ codigo: { $regex: ',
//     '.*',
//     myArray[2],
//     '.*',
//     ', $options: ',
//     'i',
//     ' },'
//   );
//   // elMatch='{ codigo: { $regex: '.*myArray[0].*', $options: 'i' } },'
// }
// if (myArray[3] != '' && typeof myArray[3] != 'undefined') {
//   elMatch = elMatch.concat(
//     '{ codigo: { $regex: ',
//     '.*',
//     myArray[3],
//     '.*',
//     ', $options: ',
//     'i',
//     ' },'
//   );
//   // elMatch='{ codigo: { $regex: '.*myArray[0].*', $options: 'i' } },'
// }
// console.log('elMatch', elMatch);
// console.log('elMatch2');

// try {
//   console.log(1);
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   console.log('J');
//   let newMercaderia = await mMercaderia.aggregate([
//     {
//       // $search: {
//       //   index: 'mercaderiaIndex',
//       //   text: {
//       //     query: 'AMELGA',
//       //     path: {
//       //       wildcard: '*',
//       //     },
//       //   },
//       // },

//       // $lookup: {
//       //   from: 'kardexs',
//       //   let: { idMer: '$_id', cod: '$codigo' },
//       //   pipeline: [
//       //     {
//       //       $match: {
//       //         $expr: {
//       //           $and: [
//       //             { $eq: ['$idMercaderia', '$$idMer'] },
//       //             // { codigo: '010101-0005' },
//       //             // { $$cod: { $regex: '.*010101-0005.*', $options: 'i' } },
//       //             // { _id: mongoose.Types.ObjectId('60ee14f01044af359011f858') },
//       //           ],
//       //         },
//       //       },
//       //     },
//       //     // { $project: { codigo: 1 } },
//       //   ],
//       //   as: 'karCLM',
//       // },

//       // $match: { codigo: { $regex: '.*ra.*', $options: 'i' } },

//       $match: {
//         $and: [
//           // { _id: mongoose.Types.ObjectId(ge.idMercaderia) },
//           // { idEmpresa: mongoose.Types.ObjectId(ge.idEmpresa) },
//           // { idGrupoEmpresarial: mongoose.Types.ObjectId(ge.idGrupoEmpresarial) },
//           // { codigo: { $regex: '.*ar.*', $options: 'i' } },
//           // { codigo: { $regex: '.*010101-0005.*', $options: 'i' } },
//           // { codigo: { $regex: '.*e.*', $options: 'i' } },
//           { codigo: { $regex: `.*${myArray[0]}.*`, $options: 'i' } },

//           // elMatch,
//         ],
//       },

//       // $match: { codigo: 'APERIO' },
//       // $match: { descripcion: 'PERIO' },
//       // $lookup: {
//       //   from: 'kardexs',
//       //   localField: '_id',
//       //   foreignField: 'idMercaderia',
//       //   as: 'kardexCLOS',
//       //   // from: 'kardexs',
//       //   // let: { idMerca: '$_id' },
//       //   // pipeline: [{ $match: { $eq: ['$idMercaderia', '$$idMerca'] } }],
//       //   // as: 'kardex',
//       // },
//       // idGrupoEmpresarial: ge.idGrupoEmpresarial,
//       // idEmpresa: ge.idEmpresa,
//     },
//     {
//       $lookup: {
//         // from: 'kardexs',
//         // localField: '_id',
//         // foreignField: 'idMercaderia',
//         // as: 'kardex',
//         from: 'kardexs',
//         let: { idMerca: '$_id' },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   {
//                     $eq: ['$idMercaderia', '$$idMerca'],
//                   },
//                   {
//                     $eq: ['$idAlmacen', mongoose.Types.ObjectId('608321ef5d922737c40831b1')],
//                   },
//                 ],
//               },
//             },
//             // $match: { idAlmacen: mongoose.Types.ObjectId('608321ef5d922737c40831b1') },
//           },
//           {
//             $unwind: {
//               path: '$movimientos',
//               preserveNullAndEmptyArrays: true,
//             },
//           },
//           {
//             $sort: {
//               'movimientos.FISMA': -1,
//               'movimientos.fechaHoraMovimiento': -1,
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               // movimientos: 1,
//               'movimientos.cantidadSaldo': 1,
//             },
//           },
//           {
//             $limit: 1,
//           },
//         ],
//         as: 'kardex',
//       },
//     },
//   ]);
//   console.log('K');
//   //finalizando
//   console.log(2);
//   await session.commitTransaction();

//   session.endSession();
//   console.log('-->Session ACABADO con  commitTransaction <---');
//   console.log(3);
//   // return true;
//   return newMercaderia;
// } catch (error) {
//   console.log(666);
//   await session.abortTransaction();
//   session.endSession();
//   throw Error('Error while Paginating buscar_Mercaderias_Por_Codigo ::| ' + error);
// }
