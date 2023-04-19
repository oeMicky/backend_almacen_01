import mRegistroIngresos from '../models/registroIngreso.model.js';
import mRegistroSalidas from '../models/registroSalida.model.js';
import mCompra from '../models/compra.model.js';
import mKardex from '../models/kardex.model.js';
import { empresaActiva } from './serviciosGlobales.servi.js';
import { insertCompraDesdeAlmacen } from './compra.servi.js';
import mongoose from 'mongoose';
import conn from '../server.js';
// import { startSession } from 'mongoose';
import tipoDocumentoIngreso from './../models/global/tipoDocumentoIngreso.model.js';

// //const session = await connection.startSession();
//   const User = mongoose.model('Enatrus', new mongoose.Schema({ name: String }));
//   // const session = await mongoose.startSession();
//   //iniciando
//   const session = await User.startSession();
//   session.startTransaction();
//   try {
//     await User.create([{ name: 'prueba Faby ' }], { session });

//     //finalizando
//     await session.commitTransaction();
//     session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }

const registrarCompra = async (ge, ses) => {
  // console.log('sesI');
  // console.log(ses);
  const aDoc = ge.documentosAdjuntos.map(function (elDocumento) {
    // console.log('--documentosAdjuntos--.');
    // console.log(ge.motivo.toUpperCase());
    // console.log(elDocumento);
    let i = 0;
    if (
      ge.motivo.toUpperCase() === 'COMPRA' &&
      elDocumento.tipoDocumento.toUpperCase() === 'TCP (FACT,BOL,NC,ND,ETC)' &&
      (elDocumento.tcp.toUpperCase() === 'FACTURA' || elDocumento.tcp.toUpperCase() === 'BOLETA')
    ) {
      console.log('--documentosAdjuntos--...COMPRA');
      console.log(i);
      console.log('---');
      i = i + 1;
      (async () => {
        let newCompra = await mCompra.insertMany(
          //insertCompraDesdeAlmacen(
          //await
          [
            {
              idGrupoEmpresarial: ge.idGrupoEmpresarial,
              idEmpresa: ge.idEmpresa,
              idAlmacen: ge.idAlmacen,
              idPersona: elDocumento.idPersona,
              periodoContable: ge.periodoContable,
              tcp: elDocumento.tcp,
              fecha: elDocumento.fecha,
              serie: elDocumento.serie,
              numero: elDocumento.numero,
              usuarioCrea: elDocumento.usuarioCrea,
            },
          ]
        ); //mCompra.insertMany(preto);
        // console.log('newCompra.');
        // console.log(newCompra);
        // if (newCompra == false) {
        //   console.log('Se TRUNCO por duplicidad en la suscripción de la COMPRA.');
        //   return;
        // }
      },
      { session: ses })();
      console.log('--**--');
    }
  });
};

export const insertRegistroIngreso = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inRegistroIngreso <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
  if (empActiva == false) {
    console.log('El empresa y/o grupo empresarial esta inactivo.');
    return;
  }
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //registro de INGRESO
    console.log('--> mRegistroIngresos <---');
    let newRegistroIngresos = await mRegistroIngresos.insertMany(ge, { session: session });
    console.log(newRegistroIngresos[0]._id);
    console.log(newRegistroIngresos);
    //COMPRA
    console.log('--> registrarCompra <---');
    for (let index = 0; index < ge.documentosAdjuntos.length; index++) {
      const element = ge.documentosAdjuntos[index];
      //console.log(index);
      console.log('ge.documentosAdjuntos.length', ge.documentosAdjuntos.length);
      console.log('ge.motivoIngresoAlmacen.toUpperCase()', ge.motivoIngresoAlmacen.toUpperCase());
      console.log('element ', element);
      console.log('element.tipoDocumento.toUpperCase() ', element.tipoDocumento.toUpperCase());
      console.log('element.tcp.toUpperCase()', element.tcp.toUpperCase());
      if (
        ge.motivoIngresoAlmacen.toUpperCase() === 'COMPRA' &&
        element.tipoDocumento.toUpperCase() === 'TCP (FACT,BOL,NC,ND,ETC)' &&
        (element.tcp.toUpperCase() === 'FACTURA' || element.tcp.toUpperCase() === 'BOLETA')
      ) {
        console.log('--> registrarCompra 22 <---');
        let com = await mCompra.insertMany(
          [
            {
              idGrupoEmpresarial: ge.idGrupoEmpresarial,
              idEmpresa: ge.idEmpresa,
              idAlmacen: ge.idAlmacen,
              idPersona: ge.idPersona, // '610b307cf36c6e4ed8a4c8f4',
              periodoContable: ge.periodoContable,
              tcp: element.tcp, // 'FACTURA',
              fecha: element.fecha, //'2021-08-01',
              serie: element.serie.toUpperCase(), //'Faa5',
              numero: element.numero.toUpperCase(), //'00004511',
              usuarioCrea: element.usuarioCrea, //'pttp111-micky',
            },
          ],
          { session: session }
        );
      }
    }
    //KARDEX's
    console.log('--> kardex <---', ge);
    for (let index = 0; index < ge.itemsMercaderias.length; index++) {
      console.log('--> ingreso al FOR* <---');
      const element = ge.itemsMercaderias[index];
      console.log(element);
      console.log(ge.itemsMercaderias.length);
      // console.log(element.idKardex.value);
      console.log(
        `//-->//--> ${element.idMercaderia}: ${ge.idAlmacen}: ${ge.idEmpresa}: ${element.lote}`
      );
      if (element.idKardex == null) {
        console.log('--> KARDEX NO EXISTE <---');
        /***** INS KARDEX PRIMIGENIO *******/
        let kar = await mKardex.insertMany(
          [
            {
              idGrupoEmpresarial: ge.idGrupoEmpresarial,
              idAlmacen: ge.idAlmacen,
              idEmpresa: ge.idEmpresa,
              idMercaderia: element.idMercaderia,
              lote: element.lote,
              fechaVencimiento: null,
              movimientos: {
                FISMA: ge.FISMA,
                fechaHoraMovimiento: new Date(),
                IS: true,
                tabla: 'registroingresosaalmacenes',
                clave: newRegistroIngresos[0]._id,
                cantidadIngresada: element.cantidadIngresada,
                cantidadSalida: 0,
                cantidadSaldo: element.cantidadIngresada,
                costoUnitario: element.costoUnitario,
                costoUnitarioMovil: element.costoUnitario,
                costoIngreso: element.cantidadIngresada * element.costoUnitario,
                costoSalida: 0,
                costoSaldo: element.cantidadIngresada * element.costoUnitario,
                usuarioCrea: element.usuarioCrea,
              },
              usuarioCrea: element.usuarioCrea,
            },
          ],
          { session: session }
        );
        console.log('El nuevo ojeto PRIMIGENIO:-->.>.> ' + kar);
        console.log('-->.>.>:-->.>.>-->.>.>-->.>.>-->.>.> ');
        console.log('-->.>.>:-->.>.>-->.>.>-->.>.>-->.>.> ');
        console.log('-->.>.>:-->.>.>-->.>.>-->.>.>-->.>.> ');
      } else {
        console.log('--> KARDEX  EXISTE <---');
        // const elKARDEX = await mKardex.findById(element.idKardex);
        let elKARDEX = await mKardex.findById(element.idKardex);
        //hallando el ultimo(o "anterior") registro para usarlo como punto de analisis
        /***** HALLANDO SI EXISTE ALGUN MOVIMIENTO EN EL DIA ANTERIOR *******/
        /***** A LA FECHA DEL NUEVO INGRESO *******/
        let ultimoMovimiento = await mKardex.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(element.idKardex),
              activo: true,
            },
          },
          {
            $unwind: {
              path: '$movimientos',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: {
              'movimientos.FISMA': { $lte: new Date(ge.FISMA) },
            },
          },
          {
            $project: {
              _id: 0,
              movimientos: 1,
            },
          },
          {
            $sort: {
              'movimientos.FISMA': -1,
              'movimientos.fechaHoraMovimiento': -1,
            },
          },
          {
            $limit: 1,
          },
        ]);
        /*********************************************************** */
        let CANTIDAD_SALDO = parseFloat(0);
        let COSTO_UNITARIO_MOVIL = parseFloat(0);
        let COSTO_SALDO = parseFloat(0);
        if (ultimoMovimiento.length > 0) {
          console.log(parseFloat(ultimoMovimiento[0].movimientos.cantidadSaldo));
          CANTIDAD_SALDO = parseFloat(ultimoMovimiento[0].movimientos.cantidadSaldo);
          COSTO_UNITARIO_MOVIL = parseFloat(ultimoMovimiento[0].movimientos.costoUnitarioMovil);
          COSTO_SALDO = parseFloat(ultimoMovimiento[0].movimientos.costoSaldo);
          console.log('La cantidad Saldo: ' + CANTIDAD_SALDO);
          console.log('La costoUnitarioMovil: ' + COSTO_UNITARIO_MOVIL);
          console.log('La costoSaldo: ' + COSTO_SALDO);
        } else {
          console.log('No existe movimiento ultimo/anterior para la fecha de salida.');
        }
        /*****  CANTIDAD SALDO + CANTIDAD ENTRADA <> 0  *******/
        let suma = 0;
        suma = CANTIDAD_SALDO + parseFloat(element.cantidadIngresada);
        console.log('suma: ' + suma);
        if (suma != 0) {
          console.log('Es diferente a cero:--> ' + suma);
          //#region 1
          // PersonModel.update({ _id: person._id }, { $push: { friends: friend } }, done);
          // mKardex.updateOne(
          //   { _id: element.idKardex },
          //   {
          //     $push: {
          //       movimientos: {
          //         // $each: [
          //         //   {
          //         FISMA: ge.FISMA,
          //         fechaHoraMovimiento: new Date(),
          //         IS: true,
          //         tabla: 'registroingresosaalmacenes',
          //         clave: newRegistroIngresos[0]._id,
          //         cantidadIngresada: parseFloat(element.cantidadIngresada),
          //         cantidadSalida: 0,
          //         cantidadSaldo: suma,
          //         costoUnitario: parseFloat(element.costoUnitario),
          //         costoUnitarioMovil:
          //           (parseFloat(element.cantidadIngresada) * parseFloat(element.costoUnitario) +
          //             COSTO_SALDO) /
          //           suma,
          //         costoIngreso:
          //           parseFloat(element.cantidadIngresada) * parseFloat(element.costoUnitario),
          //         costoSalida: 0,
          //         costoSaldo:
          //           parseFloat(element.cantidadIngresada) * parseFloat(element.costoUnitario) +
          //           COSTO_SALDO,
          //         usuarioCrea: element.usuarioCrea,
          //         //   },
          //         // ],
          //         // $slice: 2,
          //       },
          //     },
          //   },
          //   { session: session }
          // );
          //#endregion 1
          let elNuevoMov = await elKARDEX.movimientos.push({
            FISMA: new Date(ge.FISMA),
            fechaHoraMovimiento: new Date(),
            IS: true,
            tabla: 'registroingresosaalmacenes',
            clave: newRegistroIngresos[0]._id,
            cantidadIngresada: parseFloat(element.cantidadIngresada),
            cantidadSalida: 0,
            cantidadSaldo: suma,
            costoUnitario: parseFloat(element.costoUnitario),
            costoUnitarioMovil:
              (parseFloat(element.cantidadIngresada) * parseFloat(element.costoUnitario) +
                COSTO_SALDO) /
              suma,
            costoIngreso: parseFloat(element.cantidadIngresada) * parseFloat(element.costoUnitario),
            costoSalida: 0,
            costoSaldo:
              parseFloat(element.cantidadIngresada) * parseFloat(element.costoUnitario) +
              COSTO_SALDO,
            usuarioCrea: element.usuarioCrea,
          }); //{ session: session }
          console.log('Pasó PUSH');
          let updated = await elKARDEX.save({ session: session }); //
          console.log('FIN DE  updated');
          // console.log(':-->.>.>antes del ACTUALIZADOR INGRESO:-->.>.> ');
          // await actualizarValoresPosterioresAl_IS(
          //   mongoose.Types.ObjectId(element.idKardex),
          //   ge.FISMA,
          //   element.usuarioCrea
          // );
        } else {
          // //ESTO ES POCO PROBABLE QUE OCURRA
          // //ESTO ES POCO PROBABLE QUE OCURRA
          // //ESTO ES POCO PROBABLE QUE OCURRA
          // //ESTO ES POCO PROBABLE QUE OCURRA
          // /*****  CANTIDAD SALDO + CANTIDAD ENTRADA = 0  *******/
          // console.log('Es igual a cero 000:-->> ' + suma);
          // elKARDEX.movimientos.push(
          //   {
          //     FISMA: ge.FISMA,
          //     fechaHoraMovimiento: new Date(),
          //     IS: true,
          //     tabla: 'registroingresosaalmacenes',
          //     clave: newRegistroIngresos[0]._id,
          //     cantidadIngresada: parseFloat(element.cantidadIngresada),
          //     cantidadSalida: 0,
          //     cantidadSaldo: suma,
          //     costoUnitario: parseFloat(element.costoUnitario),
          //     costoUnitarioMovil: COSTO_UNITARIO_MOVIL,
          //     costoIngreso:
          //       parseFloat(element.cantidadIngresada) * parseFloat(element.costoUnitario),
          //     costoSalida: 0,
          //     costoSaldo: 0,
          //     usuarioCrea: element.usuarioCrea,
          //   },
          //   { session: session }
          // );
          // console.log('Pasó PUSH');
          // const updated = await elKARDEX.save({ session: session });
          // console.log(':-->.>.>antes del ACTUALIZADOR:-->.>.> ');
          // // await actualizarValoresPosterioresAl_IS(
          // //   mongoose.Types.ObjectId(element.idKardex),
          // //   ge.FISMA,
          // //   element.usuarioCrea
          // // );
        }
      }
    }
    //finalizando
    console.log(2);
    await session.commitTransaction();

    //#region PRUEBA DE EJECUCION DE actualizarValoresPosterioresAl_IS
    //ACTUALIZACIONES
    session.startTransaction();
    console.log(':-->.>.>antes del ACTUALIZADOR INGRESO:-->.>.> ');
    for (let index = 0; index < ge.itemsMercaderias.length; index++) {
      console.log('--> ingreso al FOR DE ACTUALIZACION*** <---');
      const element = ge.itemsMercaderias[index];
      await actualizarValoresPosterioresAl_IS(
        mongoose.Types.ObjectId(element.idKardex),
        ge.FISMA,
        element.usuarioCrea
      );
    }
    await session.commitTransaction();
    //#endregion PRUEBA DE EJECUCION DE actualizarValoresPosterioresAl_IS

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return true;
  } catch (error) {
    console.log(666);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inRegistroIngreso ::| ' + error);
  }
};

const actualizarValoresPosterioresAl_IS = async (idKardex, FISMA, usuario) => {
  console.log(`***********control*************************************`);
  console.log(`//-->//--> actualizarValoresPosterioresAl_IS <--//<--//`);
  console.log(`*******************************************************`);
  console.log(`//-->//--> ${idKardex}: ${FISMA}: ${usuario}`);
  //hallando el ultimo(o "anterior") registro para usarlo como punto de analisis
  /***** HALLANDO SI EXISTE ALGUN MOVIMIENTO EN EL DIA ANTERIOR *******/
  /***** A LA FECHA DEL NUEVO INGRESO *******/
  const ultimoMovimiento = await mKardex.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(idKardex),
        activo: true,
      },
    },
    {
      $unwind: {
        path: '$movimientos',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        'movimientos.FISMA': { $lt: new Date(FISMA) },
      },
    },
    {
      $project: {
        _id: 0,
        movimientos: 1,
      },
    },
    {
      $sort: {
        'movimientos.FISMA': -1,
        'movimientos.fechaHoraMovimiento': -1,
      },
    },
    {
      $limit: 1,
    },
  ]);
  console.log('ultimoMovimiento');
  console.log(ultimoMovimiento);
  /** ANALISIS */
  let ultimaCantidadSaldo = parseFloat(0);
  let ultimoCostoSaldo = parseFloat(0);
  let ultimoCostoUnitarioMovil = parseFloat(0);
  if (ultimoMovimiento.length > 0) {
    console.log('//-->//--> EXISTE ultimoMovimiento');
    /***** SI EXISTE  *******/
    ultimaCantidadSaldo = parseFloat(ultimoMovimiento[0].movimientos.cantidadSaldo);
    ultimoCostoSaldo = parseFloat(ultimoMovimiento[0].movimientos.costoSaldo);
    ultimoCostoUnitarioMovil = parseFloat(ultimoMovimiento[0].movimientos.costoUnitarioMovil);
    const arrayAnalisis = await mKardex.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(idKardex),
          activo: true,
        },
      },
      {
        $unwind: {
          path: '$movimientos',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'movimientos.FISMA': { $gte: new Date(FISMA) },
        },
      },
      {
        $project: {
          _id: 0,
          movimientos: 1,
        },
      },
      {
        $sort: {
          'movimientos.FISMA': 1,
          'movimientos.fechaHoraMovimiento': 1,
        },
      },
    ]);
    console.log(arrayAnalisis);
    arrayAnalisis.forEach((value) => {
      let costito = 0;
      if (value.movimientos.IS == false) {
        /***** SALIDA  *******/
        console.log('paso value.IS == false');
        if (ultimaCantidadSaldo - parseFloat(value.movimientos.cantidadSalida) < 0) {
          console.log('STOCK NEGATIVO minus');
          return;
        }
        costito = parseFloat(value.movimientos.cantidadSalida) * ultimoCostoUnitarioMovil;
        let COSTO_SALDO = ultimoCostoSaldo - costito;
        if (COSTO_SALDO < 0.0000000001) {
          COSTO_SALDO = 0;
        }
        let canSALDO = ultimaCantidadSaldo - parseFloat(value.movimientos.cantidadSalida);
        const idMov = value.movimientos._id;
        console.log(`8`);
        const elUp = updateMovimientoOUT(
          idKardex,
          idMov, //idMovimiento
          canSALDO, //cantidadSaldo
          costito, //costoSalida
          COSTO_SALDO, //costoSaldo
          ultimoCostoUnitarioMovil, //costoUnitarioMovil
          usuario
        );
        ultimaCantidadSaldo = ultimaCantidadSaldo - parseFloat(value.movimientos.cantidadSalida);
        ultimoCostoSaldo = COSTO_SALDO; //ultimoCostoSaldo - costito;
      } else {
        /***** INGRESO  *******/
        console.log('paso value.IS == TRUE');
        if (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada) < 0) {
          console.log('STOCK NEGATIVO plus');
          return;
        }
        costito =
          parseFloat(value.movimientos.cantidadIngresada) *
          parseFloat(value.movimientos.costoUnitario);
        if (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada) != 0) {
          console.log('paso != 0');
          //
          let canSALDO = parseFloat(0);
          let cosSALDO = parseFloat(0);
          let CUM = parseFloat(0);
          canSALDO = ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada);
          cosSALDO = ultimoCostoSaldo + costito;
          CUM =
            (ultimoCostoSaldo + costito) /
            (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada));
          const elUp = updateMovimientoIN(
            idKardex,
            value.movimientos._id, //idMovimiento
            canSALDO, // cantidadSaldo,
            cosSALDO, // costoSaldo,
            CUM, // costoUnitarioMovil;
            usuario
          );
          ultimaCantidadSaldo =
            ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada);
          ultimoCostoSaldo = ultimoCostoSaldo + costito;
          ultimoCostoUnitarioMovil = ultimoCostoSaldo / ultimaCantidadSaldo;
        }
        if (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada) == 0) {
          console.log('paso == 0');
          const elUp = updateMovimientoIN(
            idKardex,
            value.movimientos._id, //idMovimiento
            0, // cantidadSaldo,
            0, // costoSaldo,
            parseFloat(value.costoUnitarioMovil), // costoUnitarioMovil;
            usuario
          );
          ultimaCantidadSaldo = 0;
          ultimoCostoSaldo = 0;
          ultimoCostoUnitarioMovil = ultimoCostoSaldo / ultimaCantidadSaldo;
        }
      }
    });
  } else {
    console.log('//-->//--> NO EXISTE ultimoMovimiento/anterior a la fecha FISMA');
    /** ANALISIS */
    /***** NO EXISTE  *******/
    /** ENTONCES, hallando el primero movimiento del dia */
    // const primeroDelDia = await mKardex.aggregate([
    //   {
    //     $match: {
    //       _id: mongoose.Types.ObjectId(idKardex),
    //       activo: true,
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$movimientos',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $match: {
    //       'movimientos.FISMA': { $eq: new Date(FISMA) },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       movimientos: 1,
    //     },
    //   },
    //   {
    //     $sort: {
    //       'movimientos.FISMA': 1.0,
    //       'movimientos.fechaHoraMovimiento': 1.0,
    //     },
    //   },
    //   {
    //     $limit: 1,
    //   },
    // ]);
    // console.log('primeroDelDia longitud');
    // console.log(primeroDelDia.length);
    //
    let arrayAnalisis = await mKardex.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(idKardex),
          activo: true,
        },
      },
      {
        $unwind: {
          path: '$movimientos',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'movimientos.FISMA': { $gte: new Date(FISMA) },
        },
      },
      {
        $project: {
          _id: 0,
          movimientos: 1,
        },
      },
      {
        $sort: {
          'movimientos.FISMA': 1.0,
          'movimientos.fechaHoraMovimiento': 1.0,
        },
      },
    ]);
    console.log('arrayAnalisis longitud');
    console.log(arrayAnalisis.length);
    console.log(arrayAnalisis);
    // console.log(arrayAnalisis);
    let primero = 0;
    let ultimaCantidadSaldo = parseFloat(0);
    let ultimoCostoUnitarioMovil = parseFloat(0);
    let ultimoCostoSaldo = parseFloat(0);
    if (arrayAnalisis.length > 1) {
      console.log('ingreso al ARRAY DE ACTUALIZACION/ANALISIS en ingreso');
      let i = 1;
      arrayAnalisis.forEach((value) => {
        console.log(`//-->//--> ciclo ****: ` + i);
        i = i + 1;
        let costito = 0;
        if (primero == 0) {
          ultimaCantidadSaldo = parseFloat(value.movimientos.cantidadSaldo);
          ultimoCostoUnitarioMovil = parseFloat(value.movimientos.costoUnitarioMovil);
          ultimoCostoSaldo = parseFloat(value.movimientos.costoSaldo);
          console.log(`//-->//--> EN EL PRIMERO`);
          console.log(
            `//-->//--> ${ultimaCantidadSaldo}: ${ultimoCostoUnitarioMovil}: ${ultimoCostoSaldo}`
          );
          primero = 1;
        } else {
          if (value.movimientos.IS == false) {
            /***** SALIDA  *******/
            console.log('paso value.movimientos.IS == false -- EGRESO');
            console.log(`//-->//--> MOV: ` + value.movimientos._id);
            console.log(`//-->//--> ${ultimaCantidadSaldo}: ${value.movimientos.cantidadSalida}`);
            if (ultimaCantidadSaldo - parseFloat(value.movimientos.cantidadSalida) < 0) {
              console.log('STOCK NEGATIVO minus');
              return;
            }
            costito = parseFloat(value.movimientos.cantidadSalida) * ultimoCostoUnitarioMovil;
            //
            let canSALDO = parseFloat(0);
            let cosSALDO = 0;
            canSALDO = ultimaCantidadSaldo - parseFloat(value.movimientos.cantidadSalida);
            cosSALDO = ultimoCostoSaldo - costito;
            let elUp = updateMovimientoOUT(
              idKardex,
              value.movimientos._id, // idMovimiento,
              canSALDO, // cantidadSaldo,
              costito, // costoSalida,
              cosSALDO, // costoSaldo,
              ultimoCostoUnitarioMovil, // costoUnitarioMovil;
              usuario
            );
            ultimaCantidadSaldo =
              ultimaCantidadSaldo - parseFloat(value.movimientos.cantidadSalida);
            ultimoCostoSaldo = ultimoCostoSaldo - costito;
          } else {
            /***** INGRESO  *******/
            console.log('paso value.movimientos.IS == TRUE -- INGRESO');
            console.log(`//-->//--> MOV: ` + value.movimientos._id);
            console.log(
              `//-->//--> ${ultimaCantidadSaldo}: ${value.movimientos.cantidadIngresada}`
            );
            if (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada) < 0) {
              console.log('STOCK NEGATIVO plus');
              return;
            }
            costito =
              parseFloat(value.movimientos.cantidadIngresada) *
              parseFloat(value.movimientos.costoUnitario);
            if (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada) != 0) {
              console.log('paso != 0');
              let canSALDO = parseFloat(0);
              let cosSALDO = parseFloat(0);
              let CUM = parseFloat(0);
              canSALDO = ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada);
              cosSALDO = ultimoCostoSaldo + costito;
              CUM =
                (ultimoCostoSaldo + costito) /
                (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada));
              let idMov = value.movimientos._id;
              console.log(
                `//**>//**> ${idKardex}: ${idMov}: ${canSALDO} ${cosSALDO}: ${CUM}: ${usuario}`
              );
              let elUp = updateMovimientoIN(
                idKardex,
                idMov,
                canSALDO, //cantidadSaldo
                cosSALDO, //costoSaldo
                CUM, //costoUnitarioMovil
                usuario
              );
              ultimaCantidadSaldo =
                ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada);
              ultimoCostoSaldo = ultimoCostoSaldo + costito;
              ultimoCostoUnitarioMovil = ultimoCostoSaldo / ultimaCantidadSaldo;
            }
            if (ultimaCantidadSaldo + parseFloat(value.movimientos.cantidadIngresada) == 0) {
              console.log('paso == 0');
              let elUp = updateMovimientoIN(
                idKardex,
                value.movimientos._id,
                0,
                0,
                parseFloat(value.movimientos.costoUnitarioMovil),
                usuario
              );
              ultimaCantidadSaldo = 0;
              ultimoCostoSaldo = 0;
              ultimoCostoUnitarioMovil = ultimoCostoSaldo / ultimaCantidadSaldo;
            }
          }
        }
      });
    }
  }
};
//--> actualizarValoresPosterioresAl_IS
const updateMovimientoIN = async (idKardex, idMov, canSALDO, cosSALDO, CUM, usuario) => {
  console.log(`***********servi*******************************`);
  console.log(`//-->//--> updateMovimientoIN <--//<--//`);
  console.log(`****************************************`);
  console.log(`//-->//--> ${idKardex}: ${idMov}: ${canSALDO}: ${cosSALDO}: ${CUM}`);
  try {
    let Kardex = await mKardex.updateOne(
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
const updateMovimientoOUT = async (
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
    let Kardex = await mKardex.updateOne(
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

export const insertRegistroIngreso0 = async (preto) => {
  function NotImplementedError(message = '') {
    this.name = 'NotImplementedError';
    this.message = message;
  }
  NotImplementedError.prototype = Error.prototype;
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inRegistroIngreso <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  const errorCompra = '';
  try {
    console.log('Llego a INSERT ');
    console.log(0);
    //console.log(preto);
    const ge = preto.elJson;
    console.log('ff: ' + ge.documentosAnexos[0].idPersona);
    //empresa ACTIVA???
    const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
    console.log('esta empActiva esta activa? ' + empActiva);
    if (empActiva == false) {
      console.log('El empresa y/o grupo empresarial esta inactivo.');
      return;
    }
    //registroIngresoOK();
    console.log('llego al insertMany ');
    console.log('llego al insertMany IiI');
    try {
      console.log(1);
      // let session = await conn.startSession();
      const session = await mongoose.startSession();
      // console.log('session');
      // console.log(session);
      // session.withTransaction;
      session.startTransaction();

      //registro de INGRESO
      console.log('--> mRegistroIngresos <---');
      let newRegistroIngresos = await mRegistroIngresos.insertMany(ge, { session: session }); //.session(session); //, { session }
      //
      console.log('--> registrarCompra <---');
      // let com = await registrarCompra(ge, session); //.session(session); //, { session }
      for (let index = 0; index < ge.documentosAnexos.length; index++) {
        const element = ge.documentosAnexos[index];
        //console.log(index);
        if (
          ge.motivo.toUpperCase() === 'COMPRA' &&
          element.tipoDocumento.toUpperCase() === 'TCP' &&
          (element.tcp.toUpperCase() === 'FACTURA' || element.tcp.toUpperCase() === 'BOLETA')
        ) {
          //insertar compra
          //let com = await registrarCompraNew(ge, element, session);
          let com = await mCompra.insertMany(
            [
              {
                idGrupoEmpresarial: ge.idGrupoEmpresarial,
                idEmpresa: ge.idEmpresa,
                idAlmacen: ge.idAlmacen,
                idPersona: element.idPersona, // '610b307cf36c6e4ed8a4c8f4',
                periodoContable: ge.periodoContable,
                tcp: element.tcp, // 'FACTURA',
                fecha: element.fecha, //'2021-08-01',
                serie: element.serie, //'Faa5',
                numero: element.numero, //'00004511',
                usuarioCrea: element.usuarioCrea, //'pttp111-micky',
              },
            ],
            { session: session }
          );
        }
      }
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
      console.error('--> abortTransaction <--- ' + error);
      console.log(43);
      await session.abortTransaction();
      console.log(44);
      session.endSession();
      console.log(45);
      //errorCompra = error;
      //throw Error(errorCompra);
      throw { name: 'NotImplementedError', message: '123456' };
      console.log(5);
      return true;
    }

    // existe ya inscrito en el registro de compras el documento de COMPRA ???
    //documentosOK();

    // //itemsOK();
  } catch (error) {
    console.log(66);
    throw Error('Error while Paginating inRegistroIngreso ::| ' + errorCompra);
  }
};

function registrarCompraNew(ge, element, ses) {
  let newCompra = mCompra.insertMany(
    [
      {
        idGrupoEmpresarial: ge.idGrupoEmpresarial,
        idEmpresa: ge.idEmpresa,
        idAlmacen: ge.idAlmacen,
        idPersona: element.idPersona,
        periodoContable: ge.periodoContable,
        tcp: element.tcp,
        fecha: element.fecha,
        serie: element.serie,
        numero: element.numero,
        usuarioCrea: element.usuarioCrea,
      },
    ],
    { session: ses }
  );
}

export const deleteRegistroIngreso = async (idRegistroIngreso) => {
  console.log(`***********servi***************************`);
  console.log(`//-->//--> deRegistroIngreso <--//<--//`);
  console.log(`************************************`);
  try {
    console.log('Llego a DELETE ');
    const newRegistroIngresos = await mRegistroIngresos.deleteOne(idRegistroIngreso);
    return newRegistroIngresos;
  } catch (error) {
    throw Error('Error while Paginating deRegistroIngresos');
  }
};
// let i = 0;
// let aDoc = ge.documentosAnexos.map(async (elDocumento) => {
//   console.log(i);
//   i = i + 1;
//   if (
//     ge.motivo.toUpperCase() === 'COMPRA' &&
//     elDocumento.tipo.toUpperCase() === 'TCP' &&
//     (elDocumento.tcp.toUpperCase() === 'FACTURA' ||
//       elDocumento.tcp.toUpperCase() === 'BOLETA')
//   ) {
//     console.log('--documentosAnexos--...COMPRA');
//     let com = await mCompra.insertMany(
//       [
//         {
//           idGrupoEmpresarial: ge.idGrupoEmpresarial,
//           idEmpresa: ge.idEmpresa,
//           idAlmacen: ge.idAlmacen,
//           idPersona: '610b307cf36c6e4ed8a4c8f4',
//           periodoContable: ge.periodoContable,
//           tcp: 'FACTURA',
//           fecha: '2021-08-01',
//           serie: 'Faa5',
//           numero: '00004511',
//           usuarioCrea: 'pttp111-micky',
//         },
//       ],
//       { session: session }
//     );
//   }
//   console.log('--**--**--');
// });
// console.log('--**aDoc**--');
// console.log(aDoc);

// (async () => {
//   //let newCompra =
//   //console.log('--await -- documentosAnexos--...COMPRA');
//   await mCompra.insertMany(
//     //insertCompraDesdeAlmacen(
//     //await
//     [
//       {
//         // idGrupoEmpresarial: ge.idGrupoEmpresarial,
//         idEmpresa: ge.idEmpresa,
//         // idAlmacen: ge.idAlmacen,
//         idPersona: '610b307cf36c6e4ed8a4c8f3',
//         periodoContable: '2200', //ge.periodoContable,
//         tcp: 'FACTURA',
//         // fecha: '2021-08-01',
//         serie: 'F005',
//         numero: '00004511',
//         usuarioCrea: 'pttp111-micky',
//         // idGrupoEmpresarial: ge.idGrupoEmpresarial,
//         // idEmpresa: ge.idEmpresa,
//         // idAlmacen: ge.idAlmacen,
//         // idPersona: elDocumento.idPersona,
//         // periodoContable: ge.periodoContable,
//         // tcp: elDocumento.tcp,
//         // fecha: elDocumento.fecha,
//         // serie: elDocumento.serie,
//         // numero: elDocumento.numero,
//         // usuarioCrea: elDocumento.usuarioCrea,
//       },
//     ]
//   );
// }
// { session: session })();
