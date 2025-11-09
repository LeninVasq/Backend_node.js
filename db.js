import mysql from 'mysql2'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto_node'
})

db.connect(err => {
  if (err) {
    console.error("Error de conexión a MySQL:", err)
    return
  }
  console.log("Conexión a MySQL exitosa")
})

export default db
