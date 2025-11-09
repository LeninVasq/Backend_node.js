import db from '../db.js'

// Obtener todos los turnos
export const getTurnos = (req, res) => {
  db.query(
    "SELECT * FROM turno",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err })
      res.json(rows)
    }
  )
}

// Obtener turno por ID
export const getTurnoById = (req, res) => {
  const { id } = req.params

  db.query(
    "SELECT * FROM turno WHERE id_turno = ?",
    [id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err })

      if (rows.length === 0) {
        return res.status(404).json({ message: "Turno no encontrado" })
      }

      res.json(rows[0])
    }
  )
}

// Crear nuevo turno
export const createTurno = (req, res) => {
  const { hora_inicio, hora_fin, dia_semanas, tipo_turno } = req.body

  const nuevo = {
    hora_inicio,
    hora_fin,
    dia_semanas,
    tipo_turno
  }

  db.query("INSERT INTO turno SET ?", nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: err })

    res.json({
      message: "Turno creado",
      id_insertado: result.insertId
    })
  })
}

// Actualizar turno
export const updateTurno = (req, res) => {
  const { id } = req.params
  const { hora_inicio, hora_fin, dia_semanas, tipo_turno } = req.body

  db.query(
    `UPDATE turno 
     SET hora_inicio = ?, hora_fin = ?, dia_semanas = ?, tipo_turno = ?
     WHERE id_turno = ?`,
    [hora_inicio, hora_fin, dia_semanas, tipo_turno, id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Turno actualizado" })
    }
  )
}

// Eliminar turno
export const deleteTurno = (req, res) => {
  const { id } = req.params

  db.query(
    "DELETE FROM turno WHERE id_turno = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Turno eliminado" })
    }
  )
}
