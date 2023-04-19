import {
  listar_Egresos_Mercaderias,
  listar_Motivos_Egresos_Almacen,
  cargar_Tipo_Cambio,
} from '../services/egresosMercaderias.servi.js';

export const listarEgresosMercaderias = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarEgresosMercaderias <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await listar_Egresos_Mercaderias({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully listarEgresosMercaderias Retrieved',
    });
  } catch (error) {}
};

export const listarMotivosEgresosAlmacen = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarMotivosEgresosAlmacen <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await listar_Motivos_Egresos_Almacen({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully listarMotivosEgresosAlmacen Retrieved',
    });
  } catch (error) {}
};

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
