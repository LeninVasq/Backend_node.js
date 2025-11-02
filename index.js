import express from 'express';

const app = express();

app.get('/',(req, res) =>{

    res.send("Funciona la peticion 3000")
})

app.listen(3000,()=>{
    console.log("el servidor se ejecuta en el puerto 3000")
});