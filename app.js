const express = require('express');
const mysql = require('mysql');
const app = express();
const puerto = process.env.PUERTO || 3000;

app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comidasdb'
});

// Metodo GET Para traer todos los registros de la base de datos
app.get('/APPI/comidas', (req, res) => {
    conexion.query('SELECT * FROM comidas', (error, filas) => {
        if (error) {
            throw error;
        }
        res.json(filas);
    });
});

// Metodo GET Para traer un registro dependiendo de su ID
app.get('/APPI/comidas/:id', (req, res) => {
    conexion.query('SELECT * FROM comidas WHERE id=?', [req.params.id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            res.json(fila);
        }
    });
});

// Metodo de insercción de nuevos datos POST
app.post('/APPI/comidas', (req, res) => {
    let data = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
    };

    let sql = "INSERT INTO comidas SET ?";

    conexion.query(sql, data, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});


app.listen(puerto, () => {
    console.log("Servidor OK en puerto: " + puerto);
});