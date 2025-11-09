import db from '../db.js'

// Obtener todos los turnos
export const getTurnos = (req, res) => {
  db.query("SELECT * FROM turno", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
}

// Obtener turno por ID
export const getTurnoById = (req, res) => {
  const { id } = req.params

  db.query("SELECT * FROM turno WHERE id_turno = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    if (rows.length === 0) return res.status(404).json({ message: "Turno no encontrado" })

    res.json(rows[0])
  })
}

// Crear nuevo turno
export const createTurno = (req, res) => {
  const { hora_inicio, hora_fin, dia_semanas, tipo_turno } = req.body

  if (!hora_inicio || !hora_fin || !dia_semanas || !tipo_turno) {
    return res.status(400).json({ error: "Faltan datos obligatorios: hora_inicio, hora_fin, dia_semanas, tipo_turno" })
  }

  const nuevo = { hora_inicio, hora_fin, dia_semanas, tipo_turno }

  db.query("INSERT INTO turno SET ?", nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    res.status(201).json({
      message: "Turno creado",
      id_insertado: result.insertId
    })
  })
}

// Actualizar turno (soporta actualización parcial)
export const updateTurno = (req, res) => {
  const { id } = req.params
  const { hora_inicio, hora_fin, dia_semanas, tipo_turno } = req.body

  const fields = []
  const values = []

  if (hora_inicio !== undefined) { fields.push("hora_inicio = ?"); values.push(hora_inicio) }
  if (hora_fin !== undefined) { fields.push("hora_fin = ?"); values.push(hora_fin) }
  if (dia_semanas !== undefined) { fields.push("dia_semanas = ?"); values.push(dia_semanas) }
  if (tipo_turno !== undefined) { fields.push("tipo_turno = ?"); values.push(tipo_turno) }

  if (fields.length === 0) return res.status(400).json({ error: "No se proporcionaron campos para actualizar" })

  values.push(id)
  const sql = `UPDATE turno SET ${fields.join(", ")} WHERE id_turno = ?`

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Turno no encontrado" })

    res.json({ message: "Turno actualizado" })
  })
}

// Eliminar turno
export const deleteTurno = (req, res) => {
  const { id } = req.params

  db.query("DELETE FROM turno WHERE id_turno = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Turno no encontrado" })

    res.json({ message: "Turno eliminado" })
  })
}
