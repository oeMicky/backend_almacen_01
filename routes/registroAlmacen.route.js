import express from 'express';
import { inRegistroIngreso } from '../controllers/registroIngreso.control.js';
import { inRegistroSalida } from '../controllers/registroSalida.control.js';

const router = express.Router();

router.post('/inRegistroIngreso', inRegistroIngreso);
// router.post('/inMovimientoOUT', inMovimientoOUT);
router.post('/outRegistroEgreso', inRegistroSalida);

export default router;
