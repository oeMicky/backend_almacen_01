import express from 'express';
import { inUpMotivoIN_OUTAlmacen } from './../../controllers/parameters/motivoIN_OUTAlmacen.control.js';

const router = express.Router();

router.post('/inOut', inUpMotivoIN_OUTAlmacen);
// router.post('/inMovimientoOUT', inMovimientoOUT);

export default router;
