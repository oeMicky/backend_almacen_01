import express from 'express';
import {
  inUpLineaTipoMercaderia,
  inUpLineaTipoMercaderiaUnidad,
  inUpLineaTipoMercaderiaMarca,
  inUpLineaTipoMercaderiaUnidadEquivalencia,
  listarLineaTipoMercaderia,
  listarLineaTipoMercaderiaParametros,
  deLineaTipoMercaderia,
  deLineaTipoMercaderiaUnidad,
  deLineaTipoMercaderiaMarca,
  deLineaTipoMercaderiaUnidadEquivalencia,
} from './../../controllers/parameters/lineaTipoMercaderia.control.js';

const router = express.Router();

router.post('/inUpLineaTipoMercaderia', inUpLineaTipoMercaderia);
router.post('/inUpUnidad', inUpLineaTipoMercaderiaUnidad);
router.post('/inUpMarca', inUpLineaTipoMercaderiaMarca);
router.post('/inUpUnidadEquivalencia', inUpLineaTipoMercaderiaUnidadEquivalencia);
router.post('/listar', listarLineaTipoMercaderia);
router.post('/listarParametros', listarLineaTipoMercaderiaParametros);
router.post('/deLineaTipoMercaderia', deLineaTipoMercaderia);
router.post('/deLineaTipoMercaderiaUnidad', deLineaTipoMercaderiaUnidad);
router.post('/deLineaTipoMercaderiaMarca', deLineaTipoMercaderiaMarca);
router.post('/deLineaTipoMercaderiaUnidadEquivalencia', deLineaTipoMercaderiaUnidadEquivalencia);

export default router;
