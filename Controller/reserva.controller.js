import db from '../db.js'

// Obtener todas las reservas
export const getReservas = (req, res) => {
  db.query("SELECT * FROM reserva", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
}

// Obtener reserva por ID
export const getReservaById = (req, res) => {
  const { id } = req.params

  db.query("SELECT * FROM reserva WHERE id_reserva = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    if (rows.length === 0) return res.status(404).json({ message: "Reserva no encontrada" })

    res.json(rows[0])
  })
}

// Crear nueva reserva
export const createReserva = (req, res) => {
  const { fecha_inicio, fecha_fin, total, fecha_reserva, estado, id_habitacion, id_usuario } = req.body

  if (!fecha_inicio || !fecha_fin || total === undefined || !fecha_reserva || !estado || !id_habitacion) {
    return res.status(400).json({ error: "Faltan datos obligatorios" })
  }

  const nueva = { fecha_inicio, fecha_fin, total, fecha_reserva, estado, id_habitacion, id_usuario }

  db.query("INSERT INTO reserva SET ?", nueva, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    res.status(201).json({
      message: "Reserva creada",
      id_insertado: result.insertId
    })
  })
}

// Actualizar reserva (soporta actualización parcial)
export const updateReserva = (req, res) => {
  const { id } = req.params
  const { fecha_inicio, fecha_fin, total, fecha_reserva, estado, id_habitacion, id_usuario } = req.body

  const fields = []
  const values = []

  if (fecha_inicio !== undefined) { fields.push("fecha_inicio = ?"); values.push(fecha_inicio) }
  if (fecha_fin !== undefined) { fields.push("fecha_fin = ?"); values.push(fecha_fin) }
  if (total !== undefined) { fields.push("total = ?"); values.push(total) }
  if (fecha_reserva !== undefined) { fields.push("fecha_reserva = ?"); values.push(fecha_reserva) }
  if (estado !== undefined) { fields.push("estado = ?"); values.push(estado) }
  if (id_habitacion !== undefined) { fields.push("id_habitacion = ?"); values.push(id_habitacion) }
  if (id_usuario !== undefined) { fields.push("id_usuario = ?"); values.push(id_usuario) }

  if (fields.length === 0) return res.status(400).json({ error: "No se proporcionaron campos para actualizar" })

  values.push(id)
  const sql = `UPDATE reserva SET ${fields.join(", ")} WHERE id_reserva = ?`

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Reserva no encontrada" })

    res.json({ message: "Reserva actualizada" })
  })
}

// Eliminar reserva
export const deleteReserva = (req, res) => {
  const { id } = req.params

  db.query("DELETE FROM reserva WHERE id_reserva = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Reserva no encontrada" })

    res.json({ message: "Reserva eliminada" })
  })
}
