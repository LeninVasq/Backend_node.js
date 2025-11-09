import express from 'express'
import { API_BASE_URL,SERVER_PORT } from './config/config.js'

//importacion de rutas
import tipoUsuarioRoutes from './Routes/tipoUsuario.routes.js'
import usuario from './Routes/usuario.routes.js'
import turno from './Routes/turno.routes.js'
import tipoHabitacion from './Routes/tipoHabitacion.routes.js'

const app = express()

app.use(express.json())

//rutas
app.use('/api/tipo_usuario', tipoUsuarioRoutes)
app.use('/api/usuario', usuario)
app.use('/api/turno', turno)
app.use('/api/tipoHabitacion', tipoHabitacion)

app.listen(SERVER_PORT, () => {
  console.log(`Servidor corriendo en ${API_BASE_URL}`)
});