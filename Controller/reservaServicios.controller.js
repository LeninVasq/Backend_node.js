import db from '../db.js'

// Obtener todos los servicios de reservas
export const getReservaServicios = (req, res) => {
  db.query("SELECT * FROM reserva_servicios", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
}

// Obtener por ID
export const getReservaServicioById = (req, res) => {
  const { id } = req.params
  db.query("SELECT * FROM reserva_servicios WHERE id_reserva_servicio = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    if (rows.length === 0) return res.status(404).json({ message: "Reserva servicio no encontrada" })
    res.json(rows[0])
  })
}

// Crear nuevo registro
export const createReservaServicio = (req, res) => {
  const { id_reserva, id_servicio, cantidad, precio_unitario } = req.body

  if (!id_reserva || !id_servicio || cantidad === undefined || precio_unitario === undefined) {
    return res.status(400).json({ error: "Faltan datos obligatorios" })
  }

  const nuevo = { id_reserva, id_servicio, cantidad, precio_unitario }

  db.query("INSERT INTO reserva_servicios SET ?", nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(201).json({ message: "Reserva servicio creado", id_insertado: result.insertId })
  })
}

// Actualizar registro
export const updateReservaServicio = (req, res) => {
  const { id } = req.params
  const { id_reserva, id_servicio, cantidad, precio_unitario } = req.body

  const fields = []
  const values = []

  if (id_reserva !== undefined) { fields.push("id_reserva = ?"); values.push(id_reserva) }
  if (id_servicio !== undefined) { fields.push("id_servicio = ?"); values.push(id_servicio) }
  if (cantidad !== undefined) { fields.push("cantidad = ?"); values.push(cantidad) }
  if (precio_unitario !== undefined) { fields.push("precio_unitario = ?"); values.push(precio_unitario) }

  if (fields.length === 0) return res.status(400).json({ error: "No hay campos para actualizar" })

  values.push(id)
  const sql = `UPDATE reserva_servicios SET ${fields.join(", ")} WHERE id_reserva_servicio = ?`

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Reserva servicio no encontrada" })
    res.json({ message: "Reserva servicio actualizado" })
  })
}

// Eliminar registro
export const deleteReservaServicio = (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM reserva_servicios WHERE id_reserva_servicio = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Reserva servicio no encontrada" })
    res.json({ message: "Reserva servicio eliminado" })
  })
}
