const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexfile = require('./knexfile');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  database: 'bdusuarios',
  password: 'Amonsalve97',
  port: 5432,
});

const db = knex(knexfile.development);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para verificar el token de autenticación en los endpoints protegidos
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secretsecret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Ejecuta las migraciones para crear las tablas en la base de datos
async function runMigrations() {
  // Agrega aquí más llamadas a funciones para crear otras tablas si es necesario
}

runMigrations()
  .then(() => {
    // Endpoint para devolver la lista completa de usuarios (protegido con autenticación)
    app.get('/usuarios', (req, res) => {
      pool.query('SELECT * FROM usuarios', (err, result) => {
        if (err) {
          console.error('Error al obtener los usuarios:', err);
          res.status(500).json({ error: 'Error al obtener los usuarios' });
        } else {
          const usuarios = result.rows.map((row) => ({
            id: row.id,
            nombre: row.nombre,
            correoElectronico: row.correoelectronico,
            imagen: row.imagen,
            direccion: row.direccion,
            numeroTelefono: row.numerotelefono,
            password: row.password,
          }));
          res.json(usuarios);
        }
      });
    });

    // Endpoint para crear un nuevo usuario (protegido con autenticación)
    app.post('/usuarios',  (req, res) => {
      const {
        nombre,
        correoElectronico,
        imagen,
        direccion,
        numeroTelefono,
        password,
      } = req.body;

      // Insertar el nuevo usuario en la base de datos
      pool.query(
        'INSERT INTO usuarios (nombre, correoelectronico, imagen, direccion, numerotelefono, password) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          nombre,
          correoElectronico,
          imagen,
          direccion,
          numeroTelefono,
          password,
        ],
        (err, result) => {
          if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
          } else {
            res.json({ message: 'Usuario creado correctamente' });
          }
        }
      );
    });

    // Endpoint para obtener los detalles de un usuario específico (protegido con autenticación)
    app.get('/usuarios/:id', authenticateToken, (req, res) => {
      const userId = req.params.id;

      // Obtener los detalles del usuario desde la base de datos
      pool.query('SELECT * FROM usuarios WHERE id = $1', [userId], (err, result) => {
        if (err) {
          console.error('Error al obtener los detalles del usuario:', err);
          res.status(500).json({ error: 'Error al obtener los detalles del usuario' });
        } else {
          const user = result.rows[0];
          if (user) {
            const usuario = {
              id: user.id,
              nombre: user.nombre,
              correoElectronico: user.correoelectronico,
              imagen: user.imagen,
              direccion: user.direccion,
              numeroTelefono: user.numerotelefono,
              password: user.password,
            };
            res.json(usuario);
          } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
          }
        }
      });
    });

    // Endpoint para actualizar los detalles de un usuario específico (protegido con autenticación)
    app.put('/usuarios/:id', authenticateToken, (req, res) => {
      const userId = req.params.id;
      const {
        nombre,
        correoElectronico,
        imagen,
        direccion,
        numeroTelefono,
        password,
      } = req.body;

      // Actualizar los detalles del usuario en la base de datos
      pool.query(
        'UPDATE usuarios SET nombre = $1, correoelectronico = $2, imagen = $3, direccion = $4, numerotelefono = $5, password = $6 WHERE id = $7',
        [
          nombre,
          correoElectronico,
          imagen,
          direccion,
          numeroTelefono,
          password,
          userId,
        ],
        (err, result) => {
          if (err) {
            console.error('Error al actualizar los detalles del usuario:', err);
            res.status(500).json({ error: 'Error al actualizar los detalles del usuario' });
          } else {
            res.json({ message: 'Detalles del usuario actualizados correctamente' });
          }
        }
      );
    });

    // Endpoint para eliminar un usuario específico (protegido con autenticación)
    app.delete('/usuarios/:id', authenticateToken, (req, res) => {
      const userId = req.params.id;

      // Eliminar el usuario de la base de datos
      pool.query('DELETE FROM usuarios WHERE id = $1', [userId], (err, result) => {
        if (err) {
          console.error('Error al eliminar el usuario:', err);
          res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
          res.json({ message: 'Usuario eliminado correctamente' });
        }
      });
    });

    // Endpoint para autenticar un usuario y generar un token de acceso
    app.post('/login', (req, res) => {
      const { correoElectronico, password } = req.body;

      // Verificar el correo electrónico y la contraseña en la base de datos
      pool.query('SELECT * FROM usuarios WHERE correoelectronico = $1', [correoElectronico], (err, result) => {
        if (err) {
          console.error('Error al buscar el usuario:', err);
          res.status(500).json({ error: 'Error al buscar el usuario' });
        } else {
          const user = result.rows[0];
          if (user && user.password === password) {
            // Generar un token de autenticación
            const token = jwt.sign({ userId: user.id }, 'secretsecret');
            res.json({ token });
          } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
          }
        }
      });
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor iniciado en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al ejecutar las migraciones:', error);
  });
