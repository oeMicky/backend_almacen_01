import {
  insertMercaderia,
  updateMercaderia,
  upRenameCampo,
  listar_Mercaderias,
  buscar_Mercaderias_Por_Codigo,
  buscar_Mercaderias_Por_Descripcion,
  buscar_Mercaderias_Por_Descripcion_Equivalencia,
  obtener_Mercaderia,
  inUp_Mercaderia,
  de_Mercaderia,
  de_EquivalenciaMercaderia,
} from '../services/mercaderia.servi.js';
import mMercaderia from '../models/mercaderia.model.js';
import mongoose from 'mongoose';
import elJSON from '../json/mercaderia/00000013.js';

export const enBloque = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> enBloque <--//<--//`);
  console.log(`*****************************************`);
  const enBloque = req.body.enBloque;
  try {
    console.log('Llego a INSERTmercaderiaa...' + enBloque);
    const newMercaderia = await mMercaderia.insertMany(elJSON);
    return res.status(200).json({
      status: 200,
      // data: elIN,
      message: 'Succesfully Insert enBloque IN Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky2' });
  }
  res.end();
};

export const enACTUALIZACION_NOMBRE_CAMPO = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> enACTUALIZACION_NOMBRE_CAMPO <--//<--//`);
  console.log(`*****************************************`);
  // const enBloque = req.body.enBloque;
  try {
    console.log('Llego a enACTUALIZACION_NOMBRE_CAMPO...');
    // let Equivalencia = await mMercaderia.updateMany(
    //   {},
    //   {
    //     $rename: { equivalencia: 'equivalencias' },
    //   }
    // );
    let Equivalencia = await mMercaderia.updateMany(
      {},
      { $rename: { equivalencia: 'equivalencias' } },
      { multi: true },
      function (err, blocks) {
        if (err) {
          throw err;
        }
        console.log('done!');
      }
    );
    console.log('Fin enACTUALIZACION_NOMBRE_CAMPO...');
    // const newMercaderia = await mMercaderia.upRenameCampo; //await mMercaderia.insertMany(elJSON);
    return res.status(200).json({
      status: 200,
      // data: elIN,
      message: 'Succesfully enACTUALIZACION_NOMBRE_CAMPO IN Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky2' });
  }
  res.end();
};

export const inUpMercaderia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpMercaderia <--//<--//`);
  //#region PARAMETROS
  const elJson = req.body;
  //#endregion PARAMETROS
  try {
    const inRI = await inUp_Mercaderia({
      elJson,
    });

    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inUpMercaderia Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky66' });
  }
  res.end();
};

export const deMercaderia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> deMercaderia <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const inRI = await de_Mercaderia({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully deMercaderia Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const deEquivalenciaMercaderia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> deEquivalenciaMercaderia <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    // res.set('Access-Control-Allow-Origin', '*');
    const inRI = await de_EquivalenciaMercaderia({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully deEquivalenciaMercaderia Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const listarMercaderias = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarMercaderias <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await listar_Mercaderias({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully listarMercaderias Retrieved',
    });
  } catch (error) {}
};
export const buscarMercaderiasPorCodigo = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> buscarMercaderiasPorCodigo <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await buscar_Mercaderias_Por_Codigo({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully buscarMercaderiasPorCodigo Retrieved',
    });
  } catch (error) {}
};
export const buscarMercaderiasPorDescripcion = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> buscarMercaderiasPorDescripcion KKK<--//<--//`);
  console.log(req.body);
  const elJson = req.body;
  console.log(`//-->//--> elJson KKK<--//<--//`, elJson);
  try {
    const listaMercaderias = await buscar_Mercaderias_Por_Descripcion({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully buscarMercaderiasPorDescripcion Retrieved',
    });
  } catch (error) {}
};
export const buscarMercaderiasPorDescripcionEquivalencia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> buscarMercaderiasPorDescripcionEquivalencia <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await buscar_Mercaderias_Por_Descripcion_Equivalencia({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully buscarMercaderiasPorDescripcionEquivalencia Retrieved',
    });
  } catch (error) {}
};

export const obtenerMercaderia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> obtenerMercaderia <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const obteneMercaderia = await obtener_Mercaderia({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: obteneMercaderia,
      message: 'Succesfully obtenerMercaderia Retrieved',
    });
  } catch (error) {}
};

export const inUpMercaderia_2 = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpMercaderia <--//<--//`);
  console.log(`*****************************************`);
  console.log('............................ ');
  console.log(req.body.tipoEq);
  console.log('............................ ');
  const idMercaderia = req.body.idMercaderia;
  const codigo = req.body.codigo;
  const descripcion = req.body.descripcion;
  const tipoMercaderia = req.body.tipoMercaderia;
  const marca = req.body.marca;
  const unidadCompra = req.body.unidadCompra;
  const presentacion = req.body.presentacion;
  const descripcionEq = req.body.descripcionEq;
  let tipoEq = req.body.tipoEq;
  const factor = parseFloat(req.body.factor);
  const unidadEq = req.body.unidadEq;
  const usuario = req.body.usuario;
  let red;
  if (tipoEq.toUpperCase() === 'FALSE' || tipoEq.toUpperCase() === '0') {
    red = new Boolean(false);
  } else {
    red = new Boolean(true);
  }
  //   console.log('Llego a inNivel1-->.>.> ');
  try {
    //***** EXISTE LA MERCADERIA ??? *******/
    console.log('el tipoEq ' + tipoEq);
    console.log('el red ' + red);
    console.log(idMercaderia);
    const existe = await mMercaderia.exists({
      _id: mongoose.Types.ObjectId(idMercaderia),
    });
    console.log(existe);
    console.log('EVALUA EXISTE.. .. ..');
    if (!existe) {
      //INSERTAR
      console.log('INSERTAR.. .. ..');
      const usuarioCrea = usuario;
      const elOUT = await insertarMercaderia(
        codigo,
        descripcion,
        tipoMercaderia,
        marca,
        unidadCompra,
        presentacion,
        descripcionEq,
        red.valueOf(),
        factor,
        unidadEq,
        usuarioCrea
      );
      console.log('//--// NIVEL 1 //--//');
      return res.status(200).json({
        status: 200,
        data: elOUT,
        message: 'Succesfully Mercadería Retrieved',
      });
    } else {
      //EDITAR
      if (idMercaderia != null && codigo != null && descripcion != null) {
        let Ed = await updateMercaderia(
          idMercaderia,
          codigo,
          descripcion,
          tipoMercaderia,
          marca,
          unidadCompra,
          presentacion
        );
        return res.status(200).json({
          status: 200,
          data: Ed,
          message: 'Succesfully Mercadería Retrieved',
        });
      }
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky8' });
  }
  res.end();
};

const insertarMercaderia = async (
  codigo,
  descripcion,
  tipoMercaderia,
  marca,
  unidadCompra,
  presentacion,
  descripcionEq,
  red,
  factor,
  unidadEq,
  usuarioCrea
) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> insertarMercaderia <--//<--//`);
  console.log(`*****************************************`);
  console.log(
    //
    `//-->//-->${usuarioCrea}: ${codigo}: ${descripcion}: ${tipoMercaderia}:  ${marca}:  ${red}`
  );
  try {
    // console.log('Evaluara 123-->.>.> ');
    let ex;
    var red;
    // if (tipoEq.toUpperCase() === 'FALSE' || tipoEq.toUpperCase() === '0') {
    if (!red) {
      ex = parseFloat(1 / factor);
      console.log('la falseeeeeeeeee: ');
      // red = new Boolean(false);
    } else {
      ex = factor;
      console.log('la trueeeeeeeeeee: ');
      // red = new Boolean(true);
    }
    console.log(red);
    // console.log(tipoEq);
    console.log('la ex : ' + ex);
    if (codigo != null && descripcion != null) {
      console.log('ingreso a insertar');
      let elIN = await insertMercaderia({
        codigo: codigo,
        descripcion: descripcion,
        tipoMercaderia: tipoMercaderia,
        marca: marca,
        unidadCompra: unidadCompra,
        presentacion: presentacion,
        usuarioCrea: usuarioCrea,
        equivalencia: [
          {
            descripcionEq: descripcionEq,
            tipoEq: red,
            factor: factor,
            unidadEq: unidadEq,
            laEquivalencia: ex,
          },
        ],
      });
      console.log('El nuevo objeto PRIMIGENIO Mercaderia:-->.>.> ');
      console.log(elIN);
      console.log('//--// NIVEL 2 //--//');
      return elIN;
      // return res.status(200).json({
      //   status: 200,
      //   data: elIN,
      //   message: 'Succesfully Mercaderia Retrieved',
      // });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky8' });
  }
};
