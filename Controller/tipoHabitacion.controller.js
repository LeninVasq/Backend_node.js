import db from '../db.js'

// Obtener todos
export const getTipoHabitaciones = (req, res) => {
  db.query("SELECT * FROM tipo_habitacion", (err, rows) => {
    if (err) return res.status(500).json({ error: err })
    res.json(rows)
  })
}

// Obtener por ID
export const getTipoHabitacionById = (req, res) => {
  const { id } = req.params

  db.query(
    "SELECT * FROM tipo_habitacion WHERE id_tipo_habitacion = ?",
    [id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err })

      if (rows.length === 0) {
        return res.status(404).json({ message: "Tipo de habitación no encontrado" })
      }

      res.json(rows[0])
    }
  )
}

// Crear nuevo
export const createTipoHabitacion = (req, res) => {
  const { nombre_tipo, descripcion, capacidad, precio_base } = req.body

  const nuevo = {
    nombre_tipo,
    descripcion,
    capacidad,
    precio_base
  }

  db.query("INSERT INTO tipo_habitacion SET ?", nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: err })

    res.json({
      message: "Tipo de habitación creado",
      id_insertado: result.insertId
    })
  })
}

// Actualizar
export const updateTipoHabitacion = (req, res) => {
  const { id } = req.params
  const { nombre_tipo, descripcion, capacidad, precio_base } = req.body

  db.query(
    `UPDATE tipo_habitacion 
     SET nombre_tipo = ?, descripcion = ?, capacidad = ?, precio_base = ?
     WHERE id_tipo_habitacion = ?`,
    [nombre_tipo, descripcion, capacidad, precio_base, id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Tipo de habitación actualizado" })
    }
  )
}

// Eliminar
export const deleteTipoHabitacion = (req, res) => {
  const { id } = req.params

  db.query(
    "DELETE FROM tipo_habitacion WHERE id_tipo_habitacion = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Tipo de habitación eliminado" })
    }
  )
}
