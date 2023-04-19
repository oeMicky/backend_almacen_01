import express from 'express';
import { inUpGrupoEmpresarial, inUpAlmacen } from '../controllers/grupoEmpresarial.control.js';

const router = express.Router();

router.post('/inUpGrupoEmpresarial', inUpGrupoEmpresarial);
router.post('/inUpAlmacen', inUpAlmacen);
// router.post('/inMovimientoOUT', inMovimientoOUT);

export default router;
