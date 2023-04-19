import express from 'express';
import { cargarTipoCambio, buscarRUC, buscarDNI } from '../controllers/apisExternas.control.js';

const router = express.Router();

router.get('/TipoCambio/:cargarTipoCambio', cargarTipoCambio);
router.get('/RUC/:buscarRUC', buscarRUC);
router.get('/DNI/:buscarDNI', buscarDNI);

export default router;
