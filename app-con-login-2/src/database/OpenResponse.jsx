import { PropTypes } from "prop-types";
import { useState } from "react";

const OpenResponse = ({ id_pregunta }) => {
  const [texto_respuesta, settexto_respuesta] = useState("");

  const handleChange = (event) => {
    settexto_respuesta  (event.target.value);
  };

  const openres = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/respuestasabi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto_respuesta: texto_respuesta,
          id_pregunta: id_pregunta,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar la respuesta. Estado de respuesta: ${response.status}`);
      }

      console.log('Respuesta enviada correctamente');
    } catch (error) {
      console.error('Error:', error.message);
    }

    settexto_respuesta(" ")
  };

  return (
    <div>
      <input type="text" value={texto_respuesta} onChange={handleChange} />
      <button className="bg-teal-600" onClick={openres}>
        enviar
      </button>
    </div>
  );
};

OpenResponse.propTypes = {
  id_pregunta: PropTypes.string,
};

export default OpenResponse;
