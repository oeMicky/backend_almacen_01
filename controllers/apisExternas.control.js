import { cargar_Tipo_Cambio, buscar_RUC, buscar_DNI } from '../services/apisExternas.servi.js';

export const cargarTipoCambio = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> cargarTipoCambio <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.params;
  console.log('elJson', elJson);
  try {
    // const listaMercaderias = await fetch(
    //   'https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=2021-06-23'
    // );
    const listaMercaderias = await cargar_Tipo_Cambio({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully cargarTipoCambio Retrieved',
    });
  } catch (error) {}
};

export const buscarRUC = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> buscarRUC <--//<--//`);
  const elJson = req.params;
  console.log('elJson', elJson);
  try {
    const listaMercaderias = await buscar_RUC({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully buscarRUC Retrieved',
    });
  } catch (error) {}
};

export const buscarDNI = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> buscarDNI <--//<--//`);
  const elJson = req.params;
  console.log('elJson', elJson);
  try {
    const listaMercaderias = await buscar_DNI({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully buscarDNI Retrieved',
    });
  } catch (error) {}
};
