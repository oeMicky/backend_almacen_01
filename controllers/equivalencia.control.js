// import mNivel1 from '../models/nivel1.model.js';
import { updateEquivalencia, insertEquivalencia } from '../services/mercaderia.servi.js';
import mMercaderia from '../models/mercaderia.model.js';
import mongoose from 'mongoose';

export const inUpEquivalencia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpEquivalencia <--//<--//`);
  console.log(`*****************************************`);
  const idMercaderia = req.body.idMercaderia;
  const idEquivalencia = req.body.idEquivalencia;
  const descripcionEq = req.body.descripcionEq;
  const elTipoEq = req.body.tipoEq;
  const factor = parseFloat(req.body.factor);
  const unidadEq = req.body.unidadEq;
  console.log(idMercaderia);
  console.log(idEquivalencia);
  const existe = await mMercaderia.exists({
    _id: mongoose.Types.ObjectId(idMercaderia),
    'equivalencia._id': mongoose.Types.ObjectId(idEquivalencia),
  });
  console.log(existe);
  let tipoEq;
  if (elTipoEq.toUpperCase() === 'FALSE' || elTipoEq.toUpperCase() === '0') {
    tipoEq = new Boolean(false);
  } else {
    tipoEq = new Boolean(true);
  }
  tipoEq = tipoEq.valueOf();
  //console.log('Llego a inNivel1-->.>.> ');
  try {
    //console.log('Evaluara 123-->.>.> ');
    let laEquivalencia;
    if (!tipoEq) {
      laEquivalencia = parseFloat(1 / factor);
      console.log('la falseeeeeeeeee... ');
    } else {
      laEquivalencia = factor;
      console.log('la trueeeeeeeeeee... ');
    }
    if (!existe) {
      //INSERTAR EQUIVALENCIA
      if (descripcionEq != null && tipoEq != null && factor != null && unidadEq != null) {
        console.log('INSERTAR EQUIVALENCIA -->.>.> ');
        let elIN = await insertEquivalencia(
          idMercaderia,
          descripcionEq,
          tipoEq,
          factor,
          unidadEq,
          laEquivalencia
        );
        console.log('El nuevo objeto PRIMIGENIO Equivalencia:-->.>.> ');
        console.log(elIN);
        return res.status(200).json({
          status: 200,
          data: elIN,
          message: 'Succesfully Insert Equivalencia Retrieved',
        });
      } else {
        console.log('Existe parametros nulos/vacios');
      }
    } else {
      //ACTUALIZAR EQUIVALENCIA
      if (descripcionEq != null && tipoEq != null && factor != null && unidadEq != null) {
        console.log('ACTUALIZAR EQUIVALENCIA -->.>.> ');
        const elUp = await updateEquivalencia(
          idMercaderia,
          idEquivalencia,
          descripcionEq,
          tipoEq,
          factor,
          unidadEq,
          laEquivalencia
        );
        console.log('La actualización de objeto Equivalencia:-->.>.> ');
        console.log(elUp);
        return res.status(200).json({
          status: 200,
          data: elUp,
          message: 'Succesfully UP Equivalencia Retrieved',
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
