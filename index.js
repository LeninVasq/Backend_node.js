import express from 'express'
import tipoUsuarioRoutes from './Routes/tipoUsuario.routes.js'

const app = express()

app.use(express.json())

//rutas
app.use('/api/tipo_usuario', tipoUsuarioRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
