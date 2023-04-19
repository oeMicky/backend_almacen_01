import express from 'express';
import {
  enBloque,
  inUpMercaderia,
  deMercaderia,
  deEquivalenciaMercaderia,
  listarMercaderias,
  buscarMercaderiasPorCodigo,
  buscarMercaderiasPorDescripcion,
  buscarMercaderiasPorDescripcionEquivalencia,
  obtenerMercaderia,
  inUpMercaderia_2,
  enACTUALIZACION_NOMBRE_CAMPO,
} from '../controllers/mercaderia.control.js';
import { inUpEquivalencia } from '../controllers/equivalencia.control.js';

const router = express.Router();

router.post('/inUpMercaderia', inUpMercaderia);
router.post('/deMercaderia', deMercaderia);
router.post('/deEquivalenciaMercaderia', deEquivalenciaMercaderia);
router.post('/listarMercaderias', listarMercaderias);
router.post('/buscarMercaderiasPorCodigo', buscarMercaderiasPorCodigo);
router.post('/buscarMercaderiasPorDescripcion', buscarMercaderiasPorDescripcion);
router.post(
  '/buscarMercaderiasPorDescripcionEquivalencia',
  buscarMercaderiasPorDescripcionEquivalencia
);
router.post('/obtenerMercaderia', obtenerMercaderia);
router.post('/inM', inUpMercaderia_2);
router.post('/inE', inUpEquivalencia);
router.post('/enB', enBloque);
router.post('/upRename', enACTUALIZACION_NOMBRE_CAMPO);
// router.post('/inMovimientoIN', inMovimientoIN);
// router.post('/inMovimientoOUT', inMovimientoOUT);

// router.post(
//   '/inUp/:idMercaderia/:codigo/:descripcion/:tipoMercaderia/:marca/:unidadCompra/:presentacion/:descripcionEq/:tipoEq/:factor/:unidadEq',
//   inUpMercaderia
// );
// router.post(
//   '/inUp//:codigo/:descripcion/:tipoMercaderia/:marca/:unidadCompra/:presentacion/:descripcionEq/:tipoEq/:factor/:unidadEq',
//   inUpMercaderia
// );
// router.post(
//   '/inUp/:idMercaderia/:idEquivalencia/:descripcionEq/:tipoEq/:factor/:unidadEq',
//   inUpEquivalencia
// );
// router.post('/inUp/:idMercaderia//:descripcionEq/:tipoEq/:factor/:unidadEq', inUpEquivalencia);

export default router;
