import express from 'express';
import {
  inUpTipoDocumentoIngreso,
  listarTiposDocumentosIngresos,
} from '../../controllers/parameters/tipoDocumentoIngreso.control.js';

const router = express.Router();

router.post('/inUpTipoDocumentoIngreso', inUpTipoDocumentoIngreso);
router.post('/listarTiposDocumentosIngresos', listarTiposDocumentosIngresos);

export default router;
