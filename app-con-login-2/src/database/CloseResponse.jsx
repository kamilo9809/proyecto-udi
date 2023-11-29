import { useState, useEffect } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';

const CloseResponse = ({ id_pregunta }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/preguntacer/${id_pregunta}`);
        setOpciones(response.data);
      } catch (error) {
        console.error('Error al obtener opciones desde la base de datos:', error);
      }
    };
    fetchOpciones();
  }, [id_pregunta]);

  return (
    <div className="flex flex-col">
      {opciones.map((opcion) => (
        <div key={opcion.id_opcion} className="flex">
          <input type="checkbox" name={`opcion-${opcion.id_opcion}`} id={opcion.id_opcion} />
          <label htmlFor={opcion.id_opcion}>{opcion.texto_opcion}</label>
          {/* Puedes acceder a la propiedad id_pregunta de la opción */}
          <div>{console.log(opcion.id_pregunta)}</div>
        </div>
      ))}
    </div>
  );
};

CloseResponse.propTypes = {
  id_pregunta: PropTypes.string,
};

export default CloseResponse;
