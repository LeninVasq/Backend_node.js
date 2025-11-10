import db from '../db.js'

// Obtener todos los checkouts
export const getCheckouts = (req, res) => {
  db.query("SELECT * FROM checkout_repository", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
}

// Obtener checkout por ID
export const getCheckoutById = (req, res) => {
  const { id } = req.params
  db.query("SELECT * FROM checkout_repository WHERE id_checkout = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    if (rows.length === 0) return res.status(404).json({ message: "Checkout no encontrado" })
    res.json(rows[0])
  })
}

// Crear checkout
export const createCheckout = (req, res) => {
  const { fecha_hora, observaciones, id_reserva } = req.body
  if (!fecha_hora || !id_reserva) return res.status(400).json({ error: "Faltan datos obligatorios" })

  const nuevo = { fecha_hora, observaciones, id_reserva }
  db.query("INSERT INTO checkout_repository SET ?", nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(201).json({ message: "Checkout creado", id_insertado: result.insertId })
  })
}

// Actualizar checkout
export const updateCheckout = (req, res) => {
  const { id } = req.params
  const { fecha_hora, observaciones, id_reserva } = req.body

  const fields = []
  const values = []

  if (fecha_hora !== undefined) { fields.push("fecha_hora = ?"); values.push(fecha_hora) }
  if (observaciones !== undefined) { fields.push("observaciones = ?"); values.push(observaciones) }
  if (id_reserva !== undefined) { fields.push("id_reserva = ?"); values.push(id_reserva) }

  if (fields.length === 0) return res.status(400).json({ error: "No hay campos para actualizar" })

  values.push(id)
  const sql = `UPDATE checkout_repository SET ${fields.join(", ")} WHERE id_checkout = ?`

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Checkout no encontrado" })
    res.json({ message: "Checkout actualizado" })
  })
}

// Eliminar checkout
export const deleteCheckout = (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM checkout_repository WHERE id_checkout = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.affectedRows === 0) return res.status(404).json({ message: "Checkout no encontrado" })
    res.json({ message: "Checkout eliminado" })
  })
}
