import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyectou',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


{/**inicio con url login */}
app.get('/api/loginadmin', (req, res) => {
  connection.query('SELECT * FROM usuario_admin', (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});


app.post('/api/loginadmin', (req, res) => {
  const { username, password } = req.body;

  // Realiza la verificación de credenciales en la base de datos
  // consulta
  const query = 'SELECT id, nombre_de_usuario, rol FROM usuario_admin WHERE nombre_de_usuario = ? AND contrasenas = ?';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        const user = results[0];
        // Usuario autenticado correctamente
        res.json({
          success: true,
          message: 'Inicio de sesión exitoso',
          username: user.nombre_de_usuario,
          rol: user.rol,
          id: user.id,
        });
      } else {
        // Credenciales incorrectas
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    }
  });
});


{/**fin con url login */}

{/**inicio funcion url para crear usuario*/}
app.get('/api/createuser', (req,res)=>{
  connection.query('SELECT * FROM usuario_admin',(error, results)=>{
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).send('Internal Server Error');
    }else{
      res.json(results)
    }
  })
})

app.post('/api/createuser', (req, res) => {
  const { nombre_de_usuario, contrasenas, rol } = req.body;

  const query = 'INSERT INTO usuario_admin (nombre_de_usuario, contrasenas, rol) VALUES (?, ?, ?)';

  connection.query(query, [nombre_de_usuario, contrasenas, rol], (error) => {
    if (error) {
      console.error('Error al insertar en MySQL:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Usuario insertado con éxito');
      res.status(200).json({ message: 'Usuario insertado con éxito' });
    }
  });
});
{/**fin funcion url para crear usuario*/}


{/**inicio crear formulario */}

//agregar pregunta a la base de datos
app.get('/api/preguntas', (req, res) => {
  connection.query('SELECT * FROM preguntas', (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error); 
      res.status(500).send('Internal Server Error');     
    } else {
      res.json(results);
    }
  });
});

app.post('/api/preguntas', (req, res) => {
  const { Texto_Pregunta, tipo_pregunta, id_usuario } = req.body;
  const query = 'INSERT INTO preguntas (Texto_Pregunta, tipo_pregunta, id_usuario) VALUES (?, ?, ?)';
  connection.query(query, [Texto_Pregunta, tipo_pregunta, id_usuario], (error, results) => {
    if (error) {
      console.error('Error al insertar en MySQL:', error);
      res.status(500).send('Internal Server Error');
    } else {
      const id_pregunta = results.insertId; // Obtén el ID de la pregunta insertada
      console.log('Pregunta insertada con éxito. ID:', id_pregunta);
      res.json({ id_pregunta, message: 'Pregunta insertada con éxito' });
    }
  });
});



{/**fin crear formulacion */}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//a partir de esta linea se va a trabajar con los controladores que nos van a servir como componentes para poder ser reutilizables
{/**------------------------------------------------------------------------------------------------------- */}


//este es el llamado a para verificar las respuestas en el puerto
app.get("/api/respuestasabi", (req,res)=>{
  connection.query("SELECT * FROM respuestas_abiertas", (error, results)=>{
    if(error){
      console.error('Error al insertar en MySQL:', error);
      res.status(500).send('Internal Server Error');
    }else{
      res.json(results);
    }
  })
})

app.post("/api/respuestasabi", (req, res) => {
  const { texto_respuesta, id_pregunta } = req.body;
  const query =
    "INSERT INTO respuestas_abiertas (texto_respuesta, id_pregunta) VALUES (?, ?);";

  connection.query(query, [texto_respuesta, id_pregunta], (error) => {
    if (error) {
      console.log("error al insertar en MySQL: ", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("respuesta insertada");
      res.json({ message: "Respuesta insertada" });
    }
  });
});






//llamado para las preguntas especificas por cada persona
app.post("/api/preguntas/usuario", (req, res) => {
  const { id_usuario } = req.body;
  connection.query(
    "SELECT Texto_pregunta, tipo_pregunta,id_pregunta FROM proyectou.preguntas WHERE id_usuario = ?;",
    [id_usuario],
    (error, results) => {
      if (error) {
        console.error("Error al consultar en MySQL:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: "No se encontraron preguntas para el usuario proporcionado" });
        } else {
          res.json(results);
        }
      }
    }
  );
});

// Ruta para manejar la solicitud POST de respuestas cerradas
app.post("/api/respuestascer", (req, res) => {
  const { id_pregunta, texto_opcion } = req.body;

  // Asumiendo que tienes una tabla llamada respuestas_cerradas con columnas id_pregunta y texto_opcion
  const query =
    "INSERT INTO respuestas_cerradas (id_pregunta, texto_opcion) VALUES (?, ?);";

  // Insertar cada opción de respuesta en la base de datos
  texto_opcion.forEach(async (opcion) => {
    try {
      await connection.query(query, [id_pregunta, opcion]);
    } catch (error) {
      console.error("Error al insertar opción de respuesta:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  res.status(200).send("Respuestas cerradas insertadas con éxito");
});
app.get("/api/preguntacer/:id_pregunta", (req, res) => {
  const { id_pregunta } = req.params;

  // Modifica la consulta SQL para filtrar por id_pregunta
  connection.query("SELECT * FROM respuestas_cerradas WHERE id_pregunta = ?", [id_pregunta], (error, opciones) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(opciones);
    }
  });
});

