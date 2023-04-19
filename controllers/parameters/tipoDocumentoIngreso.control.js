import {
  inUp_TipoDocumentoIngreso,
  listar_TiposDocumentosIngresos,
} from '../../services/paramaters/tipoDocumentoIngreso.servi.js';

export const inUpTipoDocumentoIngreso = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpTipoDocumentoIngreso <--//<--//`);
  const elJson = req.body;
  try {
    const inRI = await inUp_TipoDocumentoIngreso({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully inUpTipoDocumentoIngreso Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};

export const listarTiposDocumentosIngresos = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> listarTiposDocumentosIngresos <--//<--//`);
  const elJson = req.body;
  try {
    const inRI = await listar_TiposDocumentosIngresos({
      elJson,
    });
    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully listarTiposDocumentosIngresos Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};
