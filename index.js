import express from 'express'
import { API_BASE_URL,SERVER_PORT } from './config/config.js'

//importacion de rutas
import tipoUsuarioRoutes from './Routes/tipoUsuario.routes.js'
import usuario from './Routes/usuario.routes.js'
import turno from './Routes/turno.routes.js'
import tipoHabitacion from './Routes/tipoHabitacion.routes.js'
import tipoServicio from './Routes/tipoServicio.routes.js'
import tipoMantenimiento from './Routes/tipoMantenimiento.routes.js'
import servicio from './Routes/servicio.routes.js'
import habitacion from './Routes/habitacion.routes.js'
import reserva from './Routes/reserva.routes.js'
import roles_personales from './Routes/rolesPersonales.routes.js'
import personal from './Routes/personal.routes.js'

const app = express()

app.use(express.json())

//rutas
app.use('/api/personal', personal)
app.use('/api/roles_personales', roles_personales)
app.use('/api/reserva', reserva)
app.use('/api/habitacion', habitacion)
app.use('/api/tipo_usuario', tipoUsuarioRoutes)
app.use('/api/usuario', usuario)
app.use('/api/turno', turno)
app.use('/api/tipoHabitacion', tipoHabitacion)
app.use('/api/tipoServicio', tipoServicio)
app.use('/api/tipoMantenimiento', tipoMantenimiento)
app.use('/api/servicio', servicio)

app.listen(SERVER_PORT, () => {
  console.log(`Servidor corriendo en ${API_BASE_URL}`)
});