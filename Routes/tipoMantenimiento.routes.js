import express from 'express'
import {
  getTipoMantenimientos,
  getTipoMantenimientoById,
  createTipoMantenimiento,
  updateTipoMantenimiento,
  deleteTipoMantenimiento
} from '../Controller/tipoMantenimiento.controller.js'

const router = express.Router()

router.get('/', getTipoMantenimientos) // Obtener todos
router.get('/:id', getTipoMantenimientoById) // Obtener por ID
router.post('/', createTipoMantenimiento) // Crear nuevo
router.put('/:id', updateTipoMantenimiento) // Actualizar
router.delete('/:id', deleteTipoMantenimiento) // Eliminar

export default router
