import express from 'express';
import {
  inUpKardex,
  inMovimientoIN,
  inMovimientoOUT,
  upMovimiento,
  stock,
} from '../controllers/kardex.control.js';

const router = express.Router();

router.post('/', inUpKardex);
router.post('/inMovimientoIN', inMovimientoIN);
router.post('/inMovimientoOUT', inMovimientoOUT);
router.post('/stock', stock);

export default router;
