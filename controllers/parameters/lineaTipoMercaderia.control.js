import {
  inUp_LineaTipoMercaderia,
  inUp_LineaTipoMercaderiaUnidad,
  inUp_LineaTipoMercaderiaMarca,
  inUp_LineaTipoMercaderiaUnidadEquivalencia,
  listar_LineaTipoMercaderia,
  listar_LineaTipoMercaderiaParametros,
  de_LineaTipoMercaderia,
  de_LineaTipoMercaderiaUnidad,
  de_LineaTipoMercaderiaMarca,
  de_LineaTipoMercaderiaUnidadEquivalencia,
} from '../../services/paramaters/lineaTipoMercaderia.servi.js';

export const inUpLineaTipoMercaderia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpLineaTipoMercaderia <--//<--//`);
  // console.log(`*****************************************`);
  //const session = await connection.startSession;
  //#region PARAMETROS
  const elJson = req.body;
  // const IN_OUT = req.body.in_out;
  //#endregion PARAMETROS
  try {
    // const usuarioCrea = elJson.usuarioCrea;
    // console.log(elJson);
    // if (IN_OUT == 1) {
    //INGRESO
    const inRI = await inUp_LineaTipoMercaderia({
      elJson,
    });
    // } else {
    //   //EGRESO - SALIDAS
    //   const inRI = await inUpMotivoSalidaAlmacen({
    //     elJson,
    //   });
    // }

    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inUpLineaTipoMercaderia Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const inUpLineaTipoMercaderiaUnidad = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpLineaTipoMercaderiaUnidad <--//<--//`);
  // console.log(`*****************************************`);

  const elJson = req.body;
  try {
    const inRI = await inUp_LineaTipoMercaderiaUnidad({
      elJson,
    });

    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inUpLineaTipoMercaderiaUnidad Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const inUpLineaTipoMercaderiaMarca = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpLineaTipoMercaderiaMarca <--//<--//`);
  // console.log(`*****************************************`);

  const elJson = req.body;
  try {
    const inRI = await inUp_LineaTipoMercaderiaMarca({
      elJson,
    });

    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inUpLineaTipoMercaderiaMarca Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const inUpLineaTipoMercaderiaUnidadEquivalencia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpLineaTipoMercaderiaUnidadEquivalencia <--//<--//`);
  // console.log(`*****************************************`);

  const elJson = req.body;
  try {
    const inRI = await inUp_LineaTipoMercaderiaUnidadEquivalencia({
      elJson,
    });

    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inUpLineaTipoMercaderiaUnidadEquivalencia Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const listarLineaTipoMercaderia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarLineaTipoMercaderia <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaLineaTipoMercaderia = await listar_LineaTipoMercaderia({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaLineaTipoMercaderia,
      message: 'Succesfully listarLineaTipoMercaderia Retrieved',
    });
  } catch (error) {}
};

export const listarLineaTipoMercaderiaParametros = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarLineaTipoMercaderiaParametros <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const listaLineaTipoMercaderia = await listar_LineaTipoMercaderiaParametros({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: listaLineaTipoMercaderia,
      message: 'Succesfully listarLineaTipoMercaderiaParametros Retrieved',
    });
  } catch (error) {}
};

export const deLineaTipoMercaderia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> deLineaTipoMercaderia <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const inRI = await de_LineaTipoMercaderia({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully deLineaTipoMercaderia Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const deLineaTipoMercaderiaUnidad = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> deLineaTipoMercaderiaUnidad <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const inRI = await de_LineaTipoMercaderiaUnidad({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully deLineaTipoMercaderiaUnidad Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const deLineaTipoMercaderiaMarca = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> deLineaTipoMercaderiaMarca <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const inRI = await de_LineaTipoMercaderiaMarca({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully deLineaTipoMercaderiaMarca Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const deLineaTipoMercaderiaUnidadEquivalencia = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> deLineaTipoMercaderiaUnidadEquivalencia <--//<--//`);
  // console.log(`*****************************************`);
  const elJson = req.body;
  try {
    const inRI = await de_LineaTipoMercaderiaUnidadEquivalencia({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully deLineaTipoMercaderiaUnidadEquivalencia Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};
