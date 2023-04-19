import express from 'express';
import {
  listarIngresosMercaderias,
  listarMotivosIngresosAlmacen,
  cargarTipoCambio,
} from '../controllers/ingresosMercaderias.control.js';

const router = express.Router();

router.post('/listarIngresosMercaderias', listarIngresosMercaderias);
router.post('/listarMotivosIngresosAlmacen', listarMotivosIngresosAlmacen);
router.get('/:cargarTipoCambio', cargarTipoCambio);

export default router;
