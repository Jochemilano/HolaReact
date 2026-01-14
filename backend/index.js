const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express(); // primero declaramos app
const PORT = 3001; // puerto diferente al de React

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "helloreact" // tu base de datos
});

db.connect(err => {
  if (err) {
    console.error("Error BD:", err);
    return;
  }
  console.log("Conectado a MySQL ✅");
});

// Ruta raíz para probar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Ruta de prueba para traer datos
// Reemplaza "usuarios" con el nombre de tu tabla real
app.get("/notas", (req, res) => {
  db.query("SELECT * FROM notas", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});