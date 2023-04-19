import mRegistroSalidas from '../models/registroSalida.model.js';
import mKardex from '../models/kardex.model.js';
import { empresaActiva } from './serviciosGlobales.servi.js';
import mongoose from 'mongoose';

export const insertRegistroSalida = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inRegistroSalida <--//<--//`);
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
    //registro de SALIDA
    console.log('--> mRegistroSalidas <---');
    let newRegistroSalidas = await mRegistroSalidas.insertMany(ge, { session: session });
    console.log(newRegistroSalidas[0]._id);
    console.log(newRegistroSalidas);
    //#region DOC
    //VENTA
    /*console.log('--> registrarVenta <---');
    for (let index = 0; index < ge.documentosAnexos.length; index++) {
      const element = ge.documentosAnexos[index];
      //console.log(index);
      console.log(ge.documentosAnexos.length);
      if (
        ge.motivo.toUpperCase() === 'COMPRA' &&
        element.tipo.toUpperCase() === 'TCP' &&
        (element.tcp.toUpperCase() === 'FACTURA' || element.tcp.toUpperCase() === 'BOLETA')
      ) {
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
              serie: element.serie.toUpperCase, //'Faa5',
              numero: element.numero.toUpperCase, //'00004511',
              usuarioCrea: element.usuarioCrea, //'pttp111-micky',
            },
          ],
          { session: session }
        );
      }
    }*/
    //#endregion DOC
    //KARDEX
    console.log('--> kardex <---');
    for (let index = 0; index < ge.items.length; index++) {
      const element = ge.items[index];
      console.log(ge.items.length);
      //***** EXISTE EL KARDEX DE LA MERCADERIA *******/
      console.log(
        `//-->//--> ${element.idMercaderia}: ${ge.idAlmacen}: ${ge.idEmpresa}:  ${element.lote}`
      );
      const elKARDEX = await mKardex.findById(element.idKardex);
      if (elKARDEX.activo === false) {
        console.log('-----------------EL KARDEX NO ESTA ACTIVO-----------------');
      }
      console.log(
        `//-->//--> ${element.idMercaderia}: ${ge.idAlmacen}: ${ge.idEmpresa}:  ${element.lote}:  ${ge.FISMA}`
      );
      // console.log('EXISTE:  ' + existe);
      // if (!existe) {
      if (elKARDEX.length < 1) {
        console.log('NO EXISTE KARDEX PRIMIGENIO');
        /***** NO EXISTE KARDEX PRIMIGENIO *******/
        // try {
        //   console.log('No existe kardex para este producto.');
        //   return res.status(200).json({
        //     status: 200,
        //     message: 'No existe kardex para este producto.',
        //   });
        // } catch (error) {
        //   return res.status(400).json({ status: 400, message: error.message + ' Micky' });
        // }
      } else {
        console.log('SI EXISTE *');
        /***** HALLANDO EL ULTIMO/ANTERIOR REGISTRO DEL KARDEX *******/
        // const ultimoKardex = await mKardex.aggregate([
        //   {
        //     // $match: { idMercaderia: mongoose.Types.ObjectId(element.idMercaderia) },
        //     // $match: { 'movimientos.FISMA': { $lte: new Date(ge.FISMA) } }, //'2021-07-15'
        //     $match: {
        //       idMercaderia: mongoose.Types.ObjectId(element.idMercaderia),
        //       idAlmacen: mongoose.Types.ObjectId(ge.idAlmacen),
        //       idEmpresa: mongoose.Types.ObjectId(ge.idEmpresa),
        //       lote: element.lote,
        //       'movimientos.FISMA': {
        //         $lte: new Date(ge.FISMA), //'2021-10-25', //ge.FISMA, //new Date('Thu, 01 Apr 2021 05:00:00 GMT'),
        //       },
        //     },
        //   },
        //   {
        //     $project: {
        //       'movimientos.FISMA': 1.0,
        //       'movimientos.fechaHoraMovimiento': 1.0,
        //       'movimientos.cantidadSaldo': 1.0,
        //       'movimientos.costoUnitarioMovil': 1.0,
        //       'movimientos.costoSaldo': 1.0,
        //     },
        //   },
        //   {
        //     $sort: {
        //       'movimientos.FISMA': -1.0,
        //       'movimientos.fechaHoraMovimiento': -1.0,
        //     },
        //   },
        //   {
        //     $limit: 1,
        //   },
        // ]);
        //hallando el ultimo(o "anterior") registro para usarlo como punto de analisis
        /***** HALLANDO SI EXISTE ALGUN MOVIMIENTO EN EL DIA ANTERIOR *******/
        /***** A LA FECHA DEL NUEVO INGRESO *******/
        const ultimoMovimiento = await mKardex.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(element.idKardex),
              // idMercaderia: mongoose.Types.ObjectId(element.idMercaderia),
              // idAlmacen: mongoose.Types.ObjectId(ge.idAlmacen),
              // idEmpresa: mongoose.Types.ObjectId(ge.idEmpresa),
              // lote: element.lote,
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
        console.log('El ULTIMO/ANTERIOR MOVIMIENTO:-->.>.> ' + ultimoMovimiento);
        console.log(ultimoMovimiento);
        console.log(ultimoMovimiento.length);
        if (ultimoMovimiento.length > 0) {
          // console.log(ultimoKardex[0].movimientos.cantidadSaldo);
          console.log('La cantidad Saldo: ' + ultimoMovimiento[0].movimientos.cantidadSaldo);
          console.log(
            'La cantidad costoUnitarioMovil: ' + ultimoMovimiento[0].movimientos.costoUnitarioMovil
          );
          console.log('La cantidad costoSaldo: ' + ultimoMovimiento[0].movimientos.costoSaldo);
        } else {
          console.log('No existe movimiento ultimo/anterior a la fecha FISMA.');
          // return res.status(200).json({
          //   status: 200,
          //   message: 'No existe movimiento ultimo/anterior para la fecha de salida.',
          // });
        }
        /*****  suma de ingresos y salidas posteriores al punto de analisis, y su respectivo analisis  *******/
        /*****  ESTE ANALISIS SE HACE PARA CONSISTENCIAR EL STOCK Y QUE ESTÉ NUNCA SEA CERO (0)        *******/
        const posterioresUltimoKardex = await mKardex.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(element.idKardex),
              'movimientos.FISMA': {
                $gt: new Date(ge.FISMA), //new Date('Thu, 01 Apr 2021 05:00:00 GMT'),
              },
            },
          },
          {
            $project: {
              _id: -1,
              'movimientos.IS': 1.0,
              'movimientos.cantidadIngresada': 1.0,
              'movimientos.cantidadSalida': 1.0,
              'movimientos.FISMA': 1.0,
            },
          },
          {
            $sort: {
              'movimientos.FISMA': 1.0,
            },
          },
        ]);
        console.log(
          'la longitud del array: ' + posterioresUltimoKardex.length //[0].cantidadIngresada
        );
        //si la longitud de array es mayor a 0 culminar con el analisis
        let suma_salidas = 0;
        let suma_ingresos = 0;
        let primero = 0;
        if (posterioresUltimoKardex.length > 0) {
          posterioresUltimoKardex.forEach((value) => {
            if (primero == 0) {
              primero = 1;
            } else {
              if (value.IS == true) {
                //ingreso
                suma_ingresos = parseFloat(suma_ingresos) + parseFloat(value.cantidadIngresada);
                console.log('es verdad');
              } else {
                //egreso
                suma_salidas = parseFloat(suma_salidas) + parseFloat(value.cantidadSalida);
              }
              //console.log(value);
            }
          });
          console.log('suma ingresos: ' + suma_ingresos);
          console.log('suma salidas: ' + suma_salidas);
          suma_ingresos =
            parseFloat(suma_ingresos) + parseFloat(ultimoKardex[0].movimientos.cantidadSaldo);
          suma_salidas = parseFloat(suma_salidas) + parseFloat(cantidadSalida);
          console.log('suma ingresos 2: ' + suma_ingresos);
          console.log('suma salidas 2: ' + suma_salidas);
          //ademas, calculo de la Cantidad Saldo del nuevo registro a insertarse, claro si se confirmas su insercion
          let nuevo_saldo_cantidad = 0;
          nuevo_saldo_cantidad =
            parseFloat(ultimoKardex[0].movimientos.cantidadSaldo) - parseFloat(cantidadSalida);
          console.log('nuevo_saldo_cantidad: ' + nuevo_saldo_cantidad);
          //evaluar si la Suma de ingresos es mayor, igual o menor la Suma de Salidas o egresos
          if (suma_ingresos < suma_salidas) {
            console.log('-->.-->.STOCK MENOR A CERO.<--.<--');
            //EXIT
          }
          //
          if (suma_ingresos >= suma_salidas && nuevo_saldo_cantidad >= 0) {
            if (value.cantidadSalida > 0) {
              let kar = await mKardex.insertMany(
                [
                  {
                    idGrupoEmpresarial: ge.idGrupoEmpresarial,
                    idAlmacen: ge.idAlmacen,
                    idEmpresa: ge.idEmpresa,
                    idMercaderia: element.idMercaderia,
                    lote: element.lote,
                    fechaVencimiento: null, //fechaVencimiento,
                    movimientos: {
                      FISMA: ge.FISMA,
                      fechaHoraMovimiento: new Date(),
                      IS: false,
                      tabla: 'RegistroSalidasDelAlmacen',
                      clave: newRegistroSalidas._id,
                      cantidadIngresada: 0,
                      cantidadSalida: element.cantidadSalida,
                      cantidadSaldo: nuevo_saldo_cantidad,
                      costoUnitario: parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil),
                      costoUnitarioMovil: parseFloat(
                        ultimoKardex[0].movimientos.costoUnitarioMovil
                      ),
                      costoIngreso: 0,
                      costoSalida:
                        parseFloat(element.cantidadSalida) *
                        parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil),
                      costoSaldo:
                        parseFloat(ultimoKardex[0].movimientos.costoSaldo) -
                        parseFloat(element.cantidadSalida) *
                          parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil),
                    },

                    usuarioCrea: element.usuarioCrea,
                  },
                ],
                { session: session }
              );
              // console.log(':-->.>.>antes del ACTUALIZADOR:-->.>.> ');
              // await actualizarValoresPosterioresAl_IS(
              //   element.idMercaderia,
              //   ge.idEmpresa,
              //   ge.idAlmacen,
              //   element.lote,
              //   ge.FISMA
              // );
            }
            //insertando el nuevo registro de salida -> PROCESO ESPECIAL(DESCUENTO) DE SALIDA DE MERCADERIA
            if (value.cantidadSalida === 0) {
            }
          }
        }
        console.log('a Sumas FINALES');
        //Sumas FINALES
        suma_salidas = suma_salidas + parseFloat(element.cantidadSacada);
        suma_ingresos = suma_ingresos + parseFloat(ultimoMovimiento[0].movimientos.cantidadSaldo);
        console.log(suma_salidas);
        console.log(suma_ingresos);
        //ademas, calculo de la Cantidad Saldo del nuevo registro a insertarse, claro si se confirmas su insercion
        let NUEVA_CANTIDAD_SALDO = 0;
        NUEVA_CANTIDAD_SALDO =
          parseFloat(ultimoMovimiento[0].movimientos.cantidadSaldo) -
          parseFloat(element.cantidadSacada);
        console.log(NUEVA_CANTIDAD_SALDO);
        //EVALUAR si la suma de ingresos es MENOR a la suma de egresos
        if (suma_ingresos < suma_salidas) {
          // MESAGE='STOCK MENOR A CERO';
          // exception excp_stock_negativo;
          console.log('STOCK MENOR A CERO');
          console.log(
            `//-->//--> ${element.idKardex}: ${element.idMercaderia}: ${ge.idAlmacen}: ${element.lote}`
          );
          await session.abortTransaction();
          return;
        }
        // --PARA EL CASO DESCUENTO:
        // if ((ultimo_costo_saldo-monto_afectado)<0) then begin
        //   MESAGE='COSTO SALDO MENOR A CERO';
        //   exception excp_stock_negativo;
        // end
        if (suma_ingresos >= suma_salidas && NUEVA_CANTIDAD_SALDO >= 0) {
          //--hallando el item MAXIMO
          //INSERTAR MOVIMIENTO
          if (element.cantidadSacada > 0) {
            console.log('ingreso a la INSERCION');
            //hayando el kardex
            let elK = await mKardex.findById(element.idKardex);
            console.log(elK);
            let COSTO_SALDO =
              parseFloat(ultimoMovimiento[0].movimientos.costoSaldo) -
              parseFloat(element.cantidadSacada) *
                parseFloat(ultimoMovimiento[0].movimientos.costoUnitarioMovil);
            if (COSTO_SALDO < 0.0000000001) {
              COSTO_SALDO = 0;
            }
            console.log('empieza el PUSH');
            let elmov = await elK.movimientos.push({
              FISMA: new Date(ge.FISMA),
              fechaHoraMovimiento: new Date(),
              IS: false,
              tabla: 'registrosalidasdealmacenes',
              clave: mongoose.Types.ObjectId(newRegistroSalidas[0]._id),
              cantidadIngresada: 0,
              cantidadSalida: parseFloat(element.cantidadSacada),
              cantidadSaldo: NUEVA_CANTIDAD_SALDO,
              costoUnitario: parseFloat(ultimoMovimiento[0].movimientos.costoUnitarioMovil),
              costoUnitarioMovil: parseFloat(ultimoMovimiento[0].movimientos.costoUnitarioMovil),
              costoIngreso: 0,
              costoSalida:
                parseFloat(element.cantidadSacada) *
                parseFloat(ultimoMovimiento[0].movimientos.costoUnitarioMovil),
              costoSaldo: COSTO_SALDO,
              usuarioCrea: element.usuarioCrea,
            });
            const updated = await elK.save({ session: session });
            // console.log(':-->.>.>antes del ACTUALIZADOR SALIDA:-->.>.> ');
            // await actualizarValoresPosterioresAl_IS(
            //   elK._id,
            //   new Date(ge.FISMA),
            //   element.usuarioCrea
            // );
            console.log('llego al final de la INSERCION');
          }
        }
      }
      //
    }
    //finalizando
    console.log(2);
    await session.commitTransaction();
    //#region PRUEBA DE EJECUCION DE actualizarValoresPosterioresAl_IS
    //ACTUALIZACIONES
    session.startTransaction();
    console.log(':-->.>.>antes del ACTUALIZADOR INGRESO:-->.>.> ');
    for (let index = 0; index < ge.items.length; index++) {
      console.log('--> ingreso al FOR DE ACTUALIZACION*** <---');
      const element = ge.items[index];
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
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    throw Error('Error while Paginating inRegistroSalida ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    await session.abortTransaction();
    console.log(44);
    session.endSession();
    console.log(45);
    //errorCompra = error;
    //throw Error(errorCompra);
    //throw { name: 'NotImplementedError', message: '123456' };
    console.log(5);
    // return true;
    console.log(6);

    console.log(7);
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
        'movimientos.FISMA': { $lt: FISMA },
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
          'movimientos.FISMA': { $gte: FISMA },
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
    console.log('//-->//--> NO EXISTE ultimoMovimiento/anterior');
    /** ANALISIS */
    /***** NO EXISTE  *******/
    /** ENTONCES, hallando el primero movimiento del dia */
    const primeroDelDia = await mKardex.aggregate([
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
          'movimientos.FISMA': { $eq: FISMA },
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
      {
        $limit: 1,
      },
    ]);
    console.log('primeroDelDia longitud');
    console.log(primeroDelDia.length);
    //
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
          'movimientos.FISMA': { $gte: FISMA },
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
    if (arrayAnalisis.length > 1) {
      console.log('ingreso al ARRAY DE ACTUALIZACION/ANALISIS en salida');
      let ultimaCantidadSaldo = parseFloat(0);
      let ultimoCostoUnitarioMovil = parseFloat(0);
      let ultimoCostoSaldo = parseFloat(0);
      ultimaCantidadSaldo = parseFloat(primeroDelDia[0].movimientos.cantidadSaldo);
      ultimoCostoUnitarioMovil = parseFloat(primeroDelDia[0].movimientos.costoUnitarioMovil);
      ultimoCostoSaldo = parseFloat(primeroDelDia[0].movimientos.costoSaldo);
      arrayAnalisis.forEach((value) => {
        let costito = 0;
        if (primero == 0) {
          primero = 1;
        } else {
          if (value.IS == false) {
            /***** SALIDA  *******/
            console.log('paso value.IS == false -- EGRESO');
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
            const elUp = updateMovimientoOUT(
              idKardex,
              value._id, // idMovimiento,
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
            console.log('paso value.IS == TRUE -- INGRESO');
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
              const elUp = updateMovimientoIN(
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
              const elUp = updateMovimientoIN(
                idKardex,
                value.movimientos._id,
                0,
                0,
                parseFloat(value.costoUnitarioMovil),
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
