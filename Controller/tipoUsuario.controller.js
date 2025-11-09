import db from '../db.js'

// Obtener todos
export const getTipoUsuarios = (req, res) => {
  db.query("SELECT * FROM tipo_usuario", (err, rows) => {
    if (err) return res.status(500).json({ error: err })
    res.json(rows)
  })
}

// Obtener por ID
export const getTipoUsuarioById = (req, res) => {
  const { id } = req.params

  db.query(
    "SELECT * FROM tipo_usuario WHERE Id_tipo_usuario = ?",
    [id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err })

      if (rows.length === 0) {
        return res.status(404).json({ message: "Tipo de usuario no encontrado" })
      }

      res.json(rows[0])
    }
  )
}

// Crear un nuevo registro
export const createTipoUsuario = (req, res) => {
  const { Nombre_rol, Descripcion, estado } = req.body

  const nuevo = {
    Nombre_rol,
    Descripcion,
    estado
  }

  db.query("INSERT INTO tipo_usuario SET ?", nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: err })

    res.json({
      message: "Tipo de usuario creado",
      id_insertado: result.insertId
    })
  })
}

// Actualizar
export const updateTipoUsuario = (req, res) => {
  const { id } = req.params
  const { Nombre_rol, Descripcion, estado } = req.body

  db.query(
    "UPDATE tipo_usuario SET Nombre_rol = ?, Descripcion = ?, estado = ? WHERE Id_tipo_usuario = ?",
    [Nombre_rol, Descripcion, estado, id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Tipo de usuario actualizado" })
    }
  )
}

// Eliminar
export const deleteTipoUsuario = (req, res) => {
  const { id } = req.params

  db.query(
    "DELETE FROM tipo_usuario WHERE Id_tipo_usuario = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Tipo de usuario eliminado" })
    }
  )
}
