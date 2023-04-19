import mongoose from 'mongoose';
import mPersona from '../models/persona.model.js';
import { insertMercaderia, updateMercaderia } from '../services/mercaderia.servi.js';
// import elJSON from '../json/persona/JSON-PersonaJuridica/08-2021/00000013.js';
import elJSON from '../json/persona/JSON-PersonaNatural/08-2021/00000032.js';

export const enBloque = async (req, res) => {
  console.log(`***********control ***********************`);
  console.log(`//-->//--> enBloque <--//<--//`);
  console.log(`*****************************************`);
  const enBloque = req.body.enBloque;
  try {
    console.log('Llego a INSERTpersona...' + enBloque);
    const newMercaderia = await mPersona.insertMany(elJSON);
    return res.status(200).json({
      status: 200,
      // data: elIN,
      message: 'Succesfully Insert enBloque IN Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky3' });
  }
  res.end();
};

export const inUpPersona = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpPersona <--//<--//`);
  console.log(`*****************************************`);

  try {
    const newPersona = await mPersona.insertMany(req.body);
    return res.status(200).json({
      status: 200,
      data: newPersona,
      message: 'Succesfully Insert inUpPersona Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky2' });
  }
  res.end();
};
