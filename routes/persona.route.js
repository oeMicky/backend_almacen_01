import express from 'express';
import { inUpPersona, enBloque } from '../controllers/persona.control.js';

const router = express.Router();

router.post('/inUpPersona', inUpPersona);
router.post('/enB', enBloque);
// router.post('/inMovimientoIN', inMovimientoIN);
// router.post('/inMovimientoOUT', inMovimientoOUT);

export default router;
