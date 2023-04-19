import {
  listar_Ingresos_Mercaderias,
  listar_Motivos_Ingresos_Almacen,
  cargar_Tipo_Cambio,
} from '../services/ingresosMercaderias.servi.js';

export const listarIngresosMercaderias = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarIngresosMercaderias <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await listar_Ingresos_Mercaderias({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully listarIngresosMercaderias Retrieved',
    });
  } catch (error) {}
};

export const listarMotivosIngresosAlmacen = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarMotivosIngresosAlmacen <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaMercaderias = await listar_Motivos_Ingresos_Almacen({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaMercaderias,
      message: 'Succesfully listarMotivosIngresosAlmacen Retrieved',
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
