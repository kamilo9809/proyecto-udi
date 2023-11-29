import { useState, useEffect } from 'react';
import axios from 'axios';

const ListUsers = () => {
  const [data, setData] = useState([]);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/loginadmin');
      console.log('Data from backend:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };

  useEffect(() => {
    // Llamamos a la función fetchDataFromBackend al montar el componente
    fetchDataFromBackend();
  }, []);

  return (
    <div>
    <h1>Usuarios activos</h1>
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          Nombre de Usuario: {item.nombre_de_usuario}, Rol: {item.rol}
        </li>
      ))}
    </ul>
  </div>
);
};

export default ListUsers;
