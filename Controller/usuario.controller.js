import db from '../db.js'

// Obtener todos los usuarios
export const getUsuarios = (req, res) => {
  db.query(
    "SELECT * FROM Usuario",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err })
      res.json(rows)
    }
  )
}

// Obtener usuario por ID
export const getUsuarioById = (req, res) => {
  const { id } = req.params

  db.query(
    "SELECT * FROM Usuario WHERE Id_usuario = ?",
    [id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err })

      if (rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" })
      }

      res.json(rows[0])
    }
  )
}

// Crear nuevo usuario
export const createUsuario = (req, res) => {
  const { Nombre, correo, Telefono, Documento, contrasena, Id_tipousuario, Estado } = req.body

  const nuevo = {
    Nombre,
    correo,
    Telefono,
    Documento,
    contrasena,
    Id_tipousuario,
    Estado
  }

  db.query("INSERT INTO Usuario SET ?", nuevo, (err, result) => {
    if (err) return res.status(500).json({ error: err })

    res.json({
      message: "Usuario creado",
      id_insertado: result.insertId
    })
  })
}

// Actualizar usuario
export const updateUsuario = (req, res) => {
  const { id } = req.params
  const { Nombre, correo, Telefono, Documento, contrasena, Id_tipousuario, Estado } = req.body

  db.query(
    `UPDATE Usuario 
     SET Nombre = ?, correo = ?, Telefono = ?, Documento = ?, contrasena = ?, Id_tipousuario = ?, Estado = ?
     WHERE Id_usuario = ?`,
    [Nombre, correo, Telefono, Documento, contrasena, Id_tipousuario, Estado, id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Usuario actualizado" })
    }
  )
}

// Eliminar usuario
export const deleteUsuario = (req, res) => {
  const { id } = req.params

  db.query(
    "DELETE FROM Usuario WHERE Id_usuario = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err })

      res.json({ message: "Usuario eliminado" })
    }
  )
}
