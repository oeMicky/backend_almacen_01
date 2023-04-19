import {
  inUpMotivoIngresoAlmacen,
  inUpMotivoSalidaAlmacen,
} from '../../services/paramaters/motivoIN_OUTAlmacen.servi.js';

export const inUpMotivoIN_OUTAlmacen = async (req, res) => {
  console.log(`***********control***********************`);
  console.log(`//-->//--> inUpMotivoIN_OUTAlmacen <--//<--//`);
  console.log(`*****************************************`);
  //const session = await connection.startSession;
  //#region PARAMETROS
  const elJson = req.body;
  const IN_OUT = req.body.in_out;
  //#endregion PARAMETROS
  try {
    // const usuarioCrea = elJson.usuarioCrea;
    // console.log(elJson);
    if (IN_OUT == 1) {
      //INGRESO
      const inRI = await inUpMotivoIngresoAlmacen({
        elJson,
      });
    } else {
      //EGRESO - SALIDAS
      const inRI = await inUpMotivoSalidaAlmacen({
        elJson,
      });
    }

    return res.status(200).json({
      status: 200,
      data: inRI,
      message: 'Succesfully Insert inUpMotivoIN_OUTAlmacen Retrieved',
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message + ' Micky1' });
  }
  res.end();
};
