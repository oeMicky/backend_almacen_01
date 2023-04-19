import express from 'express';
import {
  inUpTipoComprobantePago,
  listarTiposComprobantesPagos,
  inBlockTipoComprobantePago,
} from '../../controllers/parameters/tipoComprobantePago.control.js';

const router = express.Router();

router.post('/inUpTipoComprobantePago', inUpTipoComprobantePago);
router.post('/listarTiposComprobantesPagos', listarTiposComprobantesPagos);
router.post('/inBlockTipoComprobantePago', inBlockTipoComprobantePago);

export default router;
