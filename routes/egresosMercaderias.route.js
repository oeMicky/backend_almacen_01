import express from 'express';
import {
  listarEgresosMercaderias,
  listarMotivosEgresosAlmacen,
  cargarTipoCambio,
} from '../controllers/egresosMercaderias.control.js';

const router = express.Router();

router.post('/listarEgresosMercaderias', listarEgresosMercaderias);
router.post('/listarMotivosEgresosAlmacen', listarMotivosEgresosAlmacen);
router.get('/:cargarTipoCambio', cargarTipoCambio);

export default router;
