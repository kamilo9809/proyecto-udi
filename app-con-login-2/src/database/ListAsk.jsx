import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import OpenResponse from "./OpenResponse";
import CloseResponse from "./CloseResponse";

const ListAsk = ({ id_usuario }) => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    answerAsk();
  }, [id_usuario]); 

  const answerAsk = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/preguntas/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario }),
      });

      if (!response.ok) {
        throw new Error(`Error al obtener preguntas. Estado de respuesta: ${response.status}`);
      }

      const responseJSON = await response.json();
      setPreguntas(responseJSON);

    } catch (error) {
      console.error("Error al obtener preguntas:", error.message);
    }
  };

  return (
    <div>
      <h2>Preguntas del usuario {id_usuario}</h2>
      {preguntas.map((pregunta) => (
        <div key={pregunta.id_usuario}>
          <ul>
            <li>{pregunta.Texto_pregunta}</li>
            {pregunta.tipo_pregunta === "abierta" ? (
              <OpenResponse id_pregunta={pregunta.id_pregunta} />
            ) : (
                <CloseResponse id_pregunta={pregunta.id_pregunta} />
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

ListAsk.propTypes = {
  id_usuario: PropTypes.string,
};

export default ListAsk;
