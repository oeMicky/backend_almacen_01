import {
  inUp_TipoComprobantePago,
  listar_TiposComprobantesPagos,
  inBlock_TipoComprobantePago,
} from '../../services/paramaters/tipoComprobantePago.servi.js';

export const inUpTipoComprobantePago = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpTipoComprobantePago <--//<--//`);
  const elJson = req.body;
  try {
    const inRI = await inUp_TipoComprobantePago({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inUpTipoComprobantePago Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const listarTiposComprobantesPagos = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarTiposComprobantesPagos <--//<--//`);
  const elJson = req.body;
  try {
    const inRI = await listar_TiposComprobantesPagos({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully listarTiposComprobantesPagos Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const inBlockTipoComprobantePago = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inBlockTipoComprobantePago <--//<--//`);
  const elJson = req.body;
  try {
    const inRI = await inBlock_TipoComprobantePago({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inBlockTipoComprobantePago Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};
