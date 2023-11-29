import { useState } from 'react';
import axios from 'axios';

const CreateUsers = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenas, setContrasena] = useState('');
  const [rol, setRol] = useState('');

  const handleCrearUsuario = async () => {
    try {
      // Envía los datos a tu backend para agregarlos a la tabla usuario_admin
      const response = await axios.post('http://localhost:3001/api/createuser', {
        nombre_de_usuario: nombreUsuario,
        contrasenas: contrasenas,
        rol: rol,
      });

      // Maneja la respuesta según tus necesidades
      if (response.status === 200) {
        console.log('Usuario creado exitosamente');
        // Puedes reiniciar los estados aquí si es necesario
        setNombreUsuario('');
        setContrasena('');
        setRol('');
      } else {
        console.error('Error al crear el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
      <input
        type="text"
        id="nombreUsuario"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
      />
      <br />
      <label htmlFor="contrasena">Contraseña:</label>
      <input
        type="text"
        id="contrasena"
        value={contrasenas}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <br />
      <label htmlFor="rol">Rol:</label>
      <select
        id="rol"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      >
        <option>seleccione un tipo de rol</option>
        <option value="superadmin">Superadmin</option>
        <option value="admin">Admin</option>
        <option value="estudiante">Estudiante</option>
      </select>
      <br />
      <button onClick={handleCrearUsuario}>Crear Usuario</button>
    </div>
  );
};

export default CreateUsers;
