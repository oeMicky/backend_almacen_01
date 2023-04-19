import mongoose from 'mongoose';
import mKardex from '../models/kardex.model.js';
import {
  insertarKardex,
  updateKardex,
  insertMovimientoIN,
  updateMovimientoIN,
  insertMovimientoOUT,
  updateMovimientoOUT,
  stock_,
} from '../services/kardex.servi.js';

let CANTIDAD_SALDO = parseFloat(0);
let COSTO_UNITARIO_MOVIL = parseFloat(0);
let COSTO_SALDO = parseFloat(0);

// router.post('/', async (req, res) => {
//   const { nombre, tamanio } = req.body;
//   const televisor = new mTelevisor({ nombre, tamanio });
//   await televisor.save();
//   console.log('llego al post.');
//   res.json({ status: 'Televisor grabado.' });
// });

export const inUpKardex = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpKardex <--//<--//`);
  console.log(`*****************************************`);

  const idKardex = req.body.idKardex;
  const idEmpresa = req.body.idEmpresa;
  const idAlmacen = req.body.idAlmacen;
  const idMercaderia = req.body.idMercaderia;
  const lote = req.body.lote;
  const fechaVencimiento = new Date(req.body.fechaVencimiento);
  const activo = req.body.activo;

  const FISMA = new Date(req.body.FISMA);
  const fechaHoraMovimiento = new Date(req.body.fechaHoraMovimiento);
  const cantidadEntrada = parseFloat(req.body.cantidadEntrada);
  const cu = parseFloat(req.body.cu);

  const tabla = req.body.tabla;
  const clave = req.body.clave;

  const usuarioCrea = req.body.usuario;

  console.log('Entro!!!');
  console.log(idKardex);
  console.log(usuarioCrea);
  //let existe = true;
  // if (idKardex != null) {
  //   console.log('NO Nulo');
  //   if (mongoose.Types.ObjectId.isValid(idKardex)) {
  const existe = await mKardex.exists({
    _id: mongoose.Types.ObjectId(idKardex),
  });
  //}
  // } else {
  //   console.log('EL idKardex es Nulo');
  // }
  console.log('Salio de Entro!!!');
  console.log(existe);
  try {
    if (!existe) {
      // NO EXISTE EL KARDEX
      // insertar el KARDEX y el primer movimiento en INGRESO
      if (idEmpresa != null && idAlmacen != null && idMercaderia != null) {
        console.log('Entro de E A M!!!');
        const elIN = await insertarKardex({
          idEmpresa: idEmpresa,
          idAlmacen: idAlmacen,
          idMercaderia: idMercaderia,
          lote: lote,
          fechaVencimiento: fechaVencimiento,
          activo: true,
          movimientos: [
            {
              FISMA: FISMA,
              fechaHoraMovimiento: fechaHoraMovimiento,
              IS: true,
              tabla: 'registroIngresos',
              clave: clave,
              cantidadIngresada: cantidadEntrada,
              cantidadSalida: 0,
              cantidadSaldo: cantidadEntrada,
              costoUnitario: cu,
              costoUnitarioMovil: cu,
              costoIngreso: cantidadEntrada * cu,
              costoSalida: 0,
              costoSaldo: cantidadEntrada * cu,
              usuarioCrea: usuarioCrea,
              creado: new Date(),
            },
          ],
          usuarioCrea: usuarioCrea,
        });
        console.log('El nuevo objeto PRIMIGENIO mKardex:-->.>.> ');
        console.log(elIN);
        return res.status(200).json({
          status: 200,
          data: elIN,
          message: 'Succesfully Insert mKardex Retrieved',
        });
      } else {
        console.log('Existe parametros nulos/vacios');
        console.log(idEmpresa);
        console.log(idAlmacen);
        console.log(idMercaderia);
      }
    } else {
      //EDITAR

      const elUP = await updateKardex(
        idKardex,
        idEmpresa,
        idAlmacen,
        idMercaderia,
        lote,
        fechaVencimiento,
        activo,
        usuario
      );
      // console.log('El nuevo objeto mKardex->Movimiento:-->.>.> ');
      // console.log(elIN);
      return res.status(200).json({
        status: 200,
        data: elUP,
        message: 'Succesfully UPDATE mKardex Retrieved',
      });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky' });
  }
  res.end();
};

export const inMovimientoIN = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inMovimientoIN <--//<--//`);
  console.log(`*****************************************`);
  //insert movimiento TRUE - INGRESO
  const idKardex = req.body.idKardex;
  const FISMA = new Date(req.body.FISMA);
  const fechaHoraMovimiento = new Date();
  const tabla = req.body.tabla;
  const clave = parseInt(req.body.clave);
  const cantidadIngresada = parseFloat(req.body.cantidadIngresada);
  const costoUnitario = parseFloat(req.body.costoUnitario);
  const usuario = req.body.usuario;
  //existe el KArdex Y esta ACTIVO
  const existe = await mKardex.exists({
    _id: mongoose.Types.ObjectId(idKardex),
    activo: true,
  });
  console.log(existe);
  console.log(idKardex);
  // const existe = await mKardex.exists({
  //   _id: mongoose.Types.ObjectId(idKardex),
  // });
  // if(!existe){
  //   exit
  // }
  //insertar
  try {
    console.log('No existe el movimiento IN');
    //INSERTAR MOVIMIENTO
    /***** HALLANDO EL ULTIMO/ANTERIOR REGISTRO DEL KARDEX *******/
    const ultimoKardex = await mKardex.aggregate([
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
          'movimientos.fechaHoraMovimiento': { $lt: fechaHoraMovimiento },
          'movimientos.FISMA': { $lte: FISMA },
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
    console.log('El ULTIMO/ANTERIOR KARDEX:-->.>.> ' + ultimoKardex);
    console.log(ultimoKardex.length);
    //console.log(ultimoKardex);
    // console.log(ultimoKardex[0].movimientos);
    //new Date('Thu, 01 Apr 2021 05:00:00 GMT'),
    /***** - *******/
    //inicializando
    if (ultimoKardex.length > 0) {
      CANTIDAD_SALDO = parseFloat(ultimoKardex[0].movimientos.cantidadSaldo);
      COSTO_UNITARIO_MOVIL = parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
      COSTO_SALDO = parseFloat(ultimoKardex[0].movimientos.costoSaldo);
      console.log('La cantidad Saldo: ' + CANTIDAD_SALDO);
      console.log('La cantidad costoUnitarioMovil: ' + COSTO_UNITARIO_MOVIL);
      console.log('La cantidad costoSaldo: ' + COSTO_SALDO);
    } else {
      console.log('No existe movimiento ultimo/anterior para la fecha de salida.');
    }
    //
    /*****  CANTIDAD SALDO + CANTIDAD ENTRADA <> 0  *******/
    let suma = 0;
    suma = CANTIDAD_SALDO + parseFloat(cantidadIngresada);
    let CUM = 0;
    if (suma != 0) {
      CUM = (cantidadIngresada * costoUnitario + COSTO_SALDO) / suma;
    } else {
      CUM = COSTO_UNITARIO_MOVIL;
    }
    let CI = 0;
    CI = cantidadIngresada * costoUnitario;
    let CS = 0;
    CS = CI + COSTO_SALDO;
    console.log('<------------------->');
    console.log('La cantidad suma: ' + suma);
    console.log('La cantidad CUM: ' + CUM);
    console.log('La cantidad CI: ' + CI);
    console.log('La cantidad CS: ' + CS);
    // let K = idKardex; //mongoose.Types.ObjectId(idKardex);
    // console.log(K);
    try {
      const elIN = await insertMovimientoIN({
        idKardex,
        FISMA,
        fechaHoraMovimiento,
        tabla,
        clave,
        cantidadIngresada,
        suma,
        costoUnitario,
        CUM,
        CI,
        CS,
        usuario,
      });
      console.log('El nuevo objeto Movimiento IN:-->.>.> ');
      console.log(':-->.>.>antes del ACTUALIZADOR:-->.>.> ');
      await actualizarValoresPosterioresAl_IS(idKardex, FISMA, usuario);
      console.log('El nuevo ojeto:-->.>.> ' + elIN);
      return res.status(200).json({
        status: 200,
        data: elIN,
        message: 'Succesfully Insert Movimiento IN Retrieved',
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message + ' Micky2' });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};
export const inMovimientoOUT = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inMovimientoOUT <--//<--//`);
  console.log(`*****************************************`);
  //insert movimiento FALSE - SALIDA
  const idKardex = req.body.idKardex;
  const FISMA = new Date(req.body.FISMA);
  const fechaHoraMovimiento = new Date();
  const tabla = req.body.tabla;
  const clave = parseInt(req.body.clave);
  const cantidadSacada = parseFloat(req.body.cantidadSacada);
  const usuario = req.body.usuario;
  //***** EXISTE EL KARDEX DE LA MERCADERIA *******/
  const existe = await mKardex.exists({
    _id: mongoose.Types.ObjectId(idKardex),
    activo: true,
  });
  console.log('EXISTE?  ' + existe);
  if (!existe) {
    console.log('NO EXISTE EL KARDEX Y/O ESTA INACTIVO');
    /***** NO EXISTE KARDEX o esta INACTIVO *******/
    try {
      console.log('No existe kardex para este producto, o esta inactivo.');
      return res.status(200).json({
        status: 200,
        message: 'No existe kardex para este producto, o esta inactivo.',
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message + ' Micky' });
    }
  } else {
    console.log('SI EXISTE EL KARDEX');
    /************************************************************** */
    /***** HALLANDO EL ULTIMO/ANTERIOR REGISTRO DE MOVIENTOS *******/
    /************************************************************** */
    const ultimoKardex = await mKardex.aggregate([
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
          'movimientos.FISMA': { $lte: FISMA },
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
    console.log('El ULTIMO/ANTERIOR KARDEX:-->.>.> ' + ultimoKardex);
    console.log(ultimoKardex.length);
    // console.log(ultimoKardex[0]);
    if (ultimoKardex.length > 0) {
      console.log('La cantidad Saldo: ' + ultimoKardex[0].movimientos.cantidadSaldo);
      console.log(
        'La cantidad costoUnitarioMovil: ' + ultimoKardex[0].movimientos.costoUnitarioMovil
      );
      console.log('La cantidad costoSaldo: ' + ultimoKardex[0].movimientos.costoSaldo);
    } else {
      console.log('No existe movimiento ultimo/anterior para la fecha de salida.');
      return res.status(200).json({
        status: 200,
        message: 'No existe movimiento ultimo/anterior para la fecha de salida.',
      });
    }
    /***************************************************************************************** */
    /*****  suma de ingresos y salidas posteriores al punto de analisis, y su respectivo analisis  *******/
    /*****  ESTE ANALISIS SE HACE PARA CONSISTENCIAR EL STOCK Y QUE ESTÉ NUNCA SEA CERO (0)        *******/
    const posterioresUltimoKardex = await mKardex.aggregate([
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
          'movimientos.FISMA': { $gt: FISMA },
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
    console.log(
      'la longitud del array POSTERIORES: ' + posterioresUltimoKardex.length //[0].cantidadIngresada
    );
    console.log(
      posterioresUltimoKardex //[0].cantidadIngresada
    );
    //si la longitud de array es mayor a 0 culminar con el analisis
    let suma_salidas = 0;
    let suma_ingresos = 0;
    let primero = 0;
    if (posterioresUltimoKardex.length > 0) {
      //ANALIZANDO
      posterioresUltimoKardex.forEach((value) => {
        if (primero == 0) {
          primero = 1;
        } else {
          if (value.IS == true) {
            //ingreso
            suma_ingresos =
              parseFloat(suma_ingresos) + parseFloat(value.movimientos.cantidadIngresada);
            console.log('es verdad');
          } else {
            //egreso
            suma_salidas = parseFloat(suma_salidas) + parseFloat(value.movimientos.cantidadSalida);
          }
          //console.log(value);
        }
      });
      console.log('suma ingresos: ' + suma_ingresos);
      console.log('suma salidas: ' + suma_salidas);
      suma_ingresos =
        parseFloat(suma_ingresos) + parseFloat(ultimoKardex[0].movimientos.cantidadSaldo);
      suma_salidas = parseFloat(suma_salidas) + parseFloat(cantidadSacada);
      console.log('suma ingresos 2: ' + suma_ingresos);
      console.log('suma salidas 2: ' + suma_salidas);
      //ademas, calculo de la Cantidad Saldo del nuevo registro a insertarse, claro si se confirmas su insercion
      let cuantoQueda = 0;
      cuantoQueda =
        parseFloat(ultimoKardex[0].movimientos.cantidadSaldo) - parseFloat(cantidadSacada);
      console.log('nuevo_saldo_cantidad: ' + cuantoQueda);
      //evaluar si la Suma de ingresos es mayor, igual o menor la Suma de Salidas o egresos
      if (suma_ingresos < suma_salidas) {
        console.log('-->.-->.STOCK MENOR A CERO.<--.<--');
        /***** STOCK MENOR A CERO *******/
        try {
          console.log('Stock menor a cero (0).');
          return res.status(200).json({
            status: 200,
            message: 'Stock menor a cero (0).',
          });
        } catch (error) {
          return res.status(400).json({ status: 400, message: error.message + ' Micky' });
        }
      }
      //-- -- -- INSERCION DE EGRESO
      if (suma_ingresos >= suma_salidas && cuantoQueda >= 0) {
        console.log('-->.-->. INGRESOS > SALIDAS y NUEVO CANTIADA SALDO >= 0 .<--.<--');
        let cosUNImovi = 0;
        cosUNImovi = parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
        let cosSALI = 0;
        cosSALI = cantidadSacada * parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
        let cosSALDO = 0;
        cosSALDO =
          parseFloat(ultimoKardex[0].movimientos.costoSaldo) -
          cantidadSacada * parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
        try {
          const elOUT = await insertMovimientoOUT({
            idKardex,
            FISMA,
            fechaHoraMovimiento,
            tabla,
            clave,
            cantidadSacada, //cantidadSalida
            cuantoQueda, //cantidadSaldo
            cosUNImovi, //  costoUnitario y costoUnitarioMovil
            cosSALI,
            cosSALDO,
            usuario,
          });
          console.log(':-->.>.>antes del ACTUALIZADOR:-->.>.> ');
          await actualizarValoresPosterioresAl_IS(idKardex, FISMA, usuario);
          console.log('El nuevo ojeto:-->.>.> ' + elOUT);
          return res.status(200).json({
            status: 200,
            data: elOUT,
            message: 'Succesfully Kardexs Retrieved',
          });
        } catch (error) {
          return res.status(400).json({ status: 400, message: error.message + ' Micky' });
        }
      } else {
        console.log('Stock Negativo...');
        return res.status(200).json({
          status: 200,
          message: 'Stock Negativo...',
        });
      }
      //
    } else {
      console.log('no existe ningun registro posterior');
      //comprobar si el stock actual menos la cantida a sacar es mayor o igual a 0
      //de lo contrario no se debe realizar la sustracción del articulo
      let cuantoQueda = 0;
      cuantoQueda =
        parseFloat(ultimoKardex[0].movimientos.cantidadSaldo) - parseFloat(cantidadSacada);
      let cosUNImovi = 0;
      cosUNImovi = parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
      let cosSALI = 0;
      cosSALI = cantidadSacada * parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
      let cosSALDO = 0;
      cosSALDO =
        parseFloat(ultimoKardex[0].movimientos.costoSaldo) -
        cantidadSacada * parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
      if (cosSALDO < 0.0000000001) {
        cosSALDO = 0;
      }
      if (cuantoQueda >= 0) {
        //insertar
        try {
          const elOUT = await insertMovimientoOUT({
            idKardex,
            FISMA,
            fechaHoraMovimiento,
            tabla,
            clave,
            cantidadSacada, //cantidadSalida
            cuantoQueda, //cantidadSaldo
            cosUNImovi, //  costoUnitario y costoUnitarioMovil
            cosSALI,
            cosSALDO,
            usuario,
          });
          console.log(':-->.>.>antes del ACTUALIZADOR:-->.>.> ');
          await actualizarValoresPosterioresAl_IS(idKardex, FISMA, usuario);
          console.log('El nuevo ojeto:-->.>.> ' + elOUT);
          return res.status(200).json({
            status: 200,
            data: elOUT,
            message: 'Succesfully Kardexs Retrieved',
          });
        } catch (error) {
          return res.status(400).json({ status: 400, message: error.message + ' Micky' });
        }
      } else {
        console.log('EL STOCK SE HARA CERO (0), VERIFIQUE LA CANTIDAD A EXTRAER DEL ALMACEN');
        /***** EL STOCK SE HARA CERO (0) *******/
        try {
          console.log('EL STOCK SE HARA CERO (0).');
          return res.status(200).json({
            status: 200,
            message: 'EL STOCK SE HARA CERO (0), VERIFIQUE LA CANTIDAD A EXTRAER DEL ALMACEN',
          });
        } catch (error) {
          return res.status(400).json({ status: 400, message: error.message + ' Micky' });
        }
      }
    }
  }
  res.end();
};

export const upMovimiento = async (req, res) => {
  const idKardex = req.params.idKardex;
  const existe = await mKardex.exists({
    _id: mongoose.Types.ObjectId(idKardex),
    activo: true,
  });
  console.log(existe);
};

export const upMovimientoIN = async (req, res) => {};
export const upMovimientoOUT = async (req, res) => {};

// export const upMovimiento = async (req, res) => {};

export const inUpMovimientoIN = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpMovimientoIN <--//<--//`);
  console.log(`*****************************************`);
  //#region VARIABLES
  const idKardex = req.params.idKardex;
  const idMovimiento = req.params.idMovimiento;
  const FISMA = new Date(req.params.FISMA);
  const fechaHoraMovimiento = new Date();
  const tabla = req.params.tabla;
  const clave = parseInt(req.params.clave);
  const cantidadIngresada = parseFloat(req.params.cantidadIngresada);
  const costoUnitario = parseFloat(req.params.costoUnitario);
  const usuario = req.params.usuario;
  //#endregion VARIABLES

  //const usuarioModifica = req.params.usuarioModifica;
  const existe = await mKardex.exists({
    _id: mongoose.Types.ObjectId(idKardex),
    'movimientos._id': mongoose.Types.ObjectId(idMovimiento),
  });
  //IN-UP
  try {
    if (!existe) {
      console.log('No existe el movimiento IN');
      //INSERTAR MOVIMIENTO
      /***** HALLANDO EL ULTIMO/ANTERIOR REGISTRO DEL KARDEX *******/
      const ultimoKardex = await mKardex.aggregate([
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
            'movimientos.fechaHoraMovimiento': { $lt: fechaHoraMovimiento },
            'movimientos.FISMA': { $lte: FISMA },
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
      console.log('El ULTIMO/ANTERIOR KARDEX:-->.>.> ' + ultimoKardex);
      console.log(ultimoKardex.length);
      //console.log(ultimoKardex);
      // console.log(ultimoKardex[0].movimientos);
      //new Date('Thu, 01 Apr 2021 05:00:00 GMT'),
      /***** - *******/
      //inicializando
      if (ultimoKardex.length > 0) {
        CANTIDAD_SALDO = parseFloat(ultimoKardex[0].movimientos.cantidadSaldo);
        COSTO_UNITARIO_MOVIL = parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
        COSTO_SALDO = parseFloat(ultimoKardex[0].movimientos.costoSaldo);
        console.log('La cantidad Saldo: ' + CANTIDAD_SALDO);
        console.log('La cantidad costoUnitarioMovil: ' + COSTO_UNITARIO_MOVIL);
        console.log('La cantidad costoSaldo: ' + COSTO_SALDO);
      } else {
        console.log('No existe movimiento ultimo/anterior para la fecha de salida.');
      }
      //
      /*****  CANTIDAD SALDO + CANTIDAD ENTRADA <> 0  *******/
      let suma = 0;
      suma = CANTIDAD_SALDO + parseFloat(cantidadIngresada);
      if (suma != 0) {
        console.log('Es diferente a cero:--> ' + suma);
        let CUM = 0;
        CUM = (cantidadIngresada * costoUnitario + COSTO_SALDO) / suma;
        let CI = 0;
        CI = cantidadIngresada * cu;
        let CS = 0;
        CS = CI + COSTO_SALDO;
        try {
          const elIN = await insertMovimientoIN({
            idKardex,
            FISMA,
            fechaHoraMovimiento,
            tabla,
            clave,
            cantidadIngresada,
            suma,
            costoUnitario,
            CUM,
            CI,
            CS,
            usuario,
          });
          console.log(':-->.>.>antes del ACTUALIZADOR:-->.>.> ');
          await actualizarValoresPosterioresAl_IS(idKardex, FISMA, usuario);
          console.log('El nuevo ojeto:-->.>.> ' + elIN);
          return res.status(200).json({
            status: 200,
            data: elIN,
            message: 'Succesfully Insert Movimiento IN Retrieved',
          });
        } catch (error) {
          return res.status(400).json({ status: 400, message: error.message + ' Micky' });
        }
      } else {
        /*****  CANTIDAD SALDO + CANTIDAD ENTRADA = 0  *******/
        console.log('Es igual a cero 000:-->> ' + suma);
        try {
          const elIN = await insertKardex({
            FISMA: FISMA,
            fechaHoraMovimiento: new Date(),
            almacen: almacen,
            empresa: empresa,
            mercaderia: mercaderia,
            lote: lote,
            fechaVencimiento: fechaVencimiento,
            IS: true,
            tabla: 'registroIngreso',
            clave: clave,
            cantidadIngresada: cantidadEntrada,
            cantidadSalida: 0,
            cantidadSaldo: suma,
            costoUnitario: cu,
            costoUnitarioMovil: COSTO_UNITARIO_MOVIL,
            costoIngreso: cantidadEntrada * cu,
            costoSalida: 0,
            costoSaldo: 0,
          });

          console.log('El nuevo ojeto:-->.>.> ' + elIN);
          return res.status(200).json({
            status: 200,
            data: elIN,
            message: 'Succesfully Kardexs Retrieved',
          });
        } catch (error) {
          return res.status(400).json({ status: 400, message: error.message + ' Micky' });
        }
      }
      ////////////////////////
      // if (FISMA != null && tabla != null && clave != null && cantidadIngresada != null) {
      //   console.log('INSERTAR MOVIMIENTO IN -->.>.> ');
      //   console.log(tabla);
      //   const elIN = await insertMovimientoIN(
      //     idKardex,
      //     FISMA,
      //     tabla,
      //     clave,
      //     cantidadIngresada,
      //     costoUnitario,
      //     usuarioCrea
      //   );
      //   console.log('El nuevo objeto Movimiento IN:-->.>.> ');
      //   console.log(elIN);
      //   return res.status(200).json({
      //     status: 200,
      //     data: elIN,
      //     message: 'Succesfully Insert Movimiento IN Retrieved',
      //   });
      // } else {
      //   console.log('Existe parametros nulos/vacios');
      // }
    } else {
      console.log('Existe el movimiento IN');
      //ACTUALIZAR MOVIMIENTO
      // if (FISMA != null && tabla != null && clave != null && cantidadIngresada != null) {
      //   console.log('ACTUALIZAR MOVIMIENTO IN -->.>.> ');
      //   const elUp = await updateMovimientoIN(
      //     idKardex,
      //     idMovimiento,
      //     FISMA,
      //     tabla,
      //     clave,
      //     cantidadIngresada,
      //     costoUnitario,
      //     usuarioModifica
      //   );
      //   console.log('La actualización de objeto Movimiento IN :-->.>.> ');
      //   console.log(elUp);
      //   return res.status(200).json({
      //     status: 200,
      //     data: elUp,
      //     message: 'Succesfully UP Movimiento IN Retrieved',
      //   });
      // } else {
      //   console.log('Existe parametros nulos/vacios');
      // }
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky' });
  }
  res.end();
};

export const inUpMovimientoOUT = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpMovimientoOUT <--//<--//`);
  console.log(`*****************************************`);
  //#region VARIABLES
  const idKardex = req.params.idKardex;
  const idMovimiento = req.params.idMovimiento;
  const FISMA = req.params.FISMA;
  const tabla = req.params.tabla;
  const clave = req.params.clave;
  const cantidadSalida = req.params.cantidadSalida;
  const usuarioCrea = req.params.usuarioCrea;
  const usuarioModifica = req.params.usuarioModifica;
  //#endregion VARIABLES

  //existe
  const existe = await mKardex.exists({
    _id: mongoose.Types.ObjectId(idKardex),
    'movimientos._id': mongoose.Types.ObjectId(idMovimiento),
  });
  //IN-UP
  try {
    if (!existe) {
      //INSERTAR MOVIMIENTO
      if (FISMA != null && tabla != null && clave != null && cantidadIngresada != null) {
        console.log('INSERTAR MOVIMIENTO OUT -->.>.> ');
        const elIN = await insertMovimientoOUT(
          idKardex,
          idMovimiento,
          FISMA,
          tabla,
          clave,
          cantidadSalida,
          costoUnitario,
          usuarioCrea
        );
        console.log('El nuevo objeto Movimiento OUT:-->.>.> ');
        console.log(elIN);
        return res.status(200).json({
          status: 200,
          data: elIN,
          message: 'Succesfully Insert Movimiento OUT Retrieved',
        });
      } else {
        console.log('Existe parametros nulos/vacios');
      }
    } else {
      //ACTUALIZAR MOVIMIENTO
      if (FISMA != null && tabla != null && clave != null && cantidadIngresada != null) {
        console.log('ACTUALIZAR MOVIMIENTO OUT -->.>.> ');
        // const elUp = await updateMovimientoOUT(
        //   idKardex,
        //   idMovimiento,
        //   FISMA,
        //   tabla,
        //   clave,
        //   cantidadSalida,
        //   costoUnitario,
        //   usuarioModifica
        // );
        console.log('La actualización de objeto Movimiento OUT:-->.>.> ');
        console.log(elUp);
        return res.status(200).json({
          status: 200,
          data: elUp,
          message: 'Succesfully UP Movimiento OUT Retrieved',
        });
      } else {
        console.log('Existe parametros nulos/vacios');
      }
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky' });
  }
  res.end();
};

const actualizarValoresPosterioresAl_IS = async (idKardex, FISMA, usuario) => {
  console.log(`***********control*************************************`);
  console.log(`//-->//--> actualizarValoresPosterioresAl_IS <--//<--//`);
  console.log(`*******************************************************`);
  console.log(`//-->//--> ${idKardex}: ${FISMA}: ${usuario}`);
  //hallando el ultimo(o "anterior") registro para usarlo como punto de analisis
  /***** HALLANDO SI EXISTE ALGUN MOVIMIENTO EN EL DIA ANTERIOR *******/
  /***** A LA FECHA DEL NUEVO INGRESO *******/
  const ultimoKardex = await mKardex.aggregate([
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
  console.log('ultimoKardex');
  console.log(ultimoKardex);
  /** ANALISIS */
  let ultimaCantidadSaldo = parseFloat(0);
  let ultimoCostoSaldo = parseFloat(0);
  let ultimoCostoUnitarioMovil = parseFloat(0);
  if (ultimoKardex.length > 0) {
    console.log('//-->//--> EXISTE ultimoKardex');
    /***** SI EXISTE  *******/
    ultimaCantidadSaldo = parseFloat(ultimoKardex[0].movimientos.cantidadSaldo);
    ultimoCostoSaldo = parseFloat(ultimoKardex[0].movimientos.costoSaldo);
    ultimoCostoUnitarioMovil = parseFloat(ultimoKardex[0].movimientos.costoUnitarioMovil);
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
    console.log('//-->//--> NO EXISTE ultimoKardex/anterior');
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
    // console.log(arrayAnalisis);
    let primero = 0;
    if (arrayAnalisis.length > 1) {
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

export const stock = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> stock <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await stock_({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully stock Retrieved',
    });
  } catch (error) {}
};
