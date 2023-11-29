import { useState } from "react";
import axios from "axios";
import ListAsk from "../../database/ListAsk";
import NavbarSA from "./navbar";

const PreguntaForm = () => {
  const [pregunta, setPregunta] = useState("");
  const [tipoPregunta, setTipoPregunta] = useState("abierta");
  const [texto_opcion, setTexto_opcion] = useState(["", "", "", ""]);

  const username = localStorage.getItem("username");
  const id_usuario = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Solicitud post para la pregunta
      const response = await axios.post(
        "http://localhost:3001/api/preguntas",
        {
          Texto_Pregunta: pregunta,
          tipo_pregunta: tipoPregunta,
          id_usuario: id_usuario,
        }
      );

      // Verificamos si la solicitud fue exitosa (preguntas abiertas)
      if (response.status === 200) {
        console.log("Pregunta enviada con éxito");

        // Si es una pregunta cerrada, enviamos las opciones de respuesta
        if (tipoPregunta === "cerrada") {
          const id_pregunta = response.data.id_pregunta;
          console.log(id_pregunta);

          const dataAsk = {
            id_pregunta: id_pregunta,
            texto_opcion: texto_opcion,
          };

          // Solicitud post para las respuestas cerradas
          const responseAsk = await axios.post(
            "http://localhost:3001/api/respuestascer",
            dataAsk
          );

          // Verificamos si la solicitud fue exitosa (respuestas cerradas)
          if (responseAsk.status === 200) {
            console.log("Respuestas cerradas enviadas con éxito");
          } else {
            console.error("Error al enviar las respuestas cerradas");
          }
        }
      } else {
        console.error("Error al enviar la pregunta");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }

    // Limpiamos el estado de la pregunta después de enviarla
    setPregunta("");
  };

  

  return (
    <div>
      <NavbarSA Username={username} />
      <div className="flex items-center justify-center flex-grow ">
        <div className="w-1/2 text-center">
          <h2 className="text-3xl font-bold mb-4 ">Crear una pregunta</h2>
          <form className="mb-8" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pregunta"
              >
                Pregunta:
              </label>
              <input
                type="text"
                id="pregunta"
                className="w-full px-3 py-2 border rounded bg-blue-800 text-white"
                placeholder="Escribe tu pregunta aquí..."
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tipo de pregunta:
              </label>
              <select
                value={tipoPregunta}
                onChange={(e) => {
                  setTipoPregunta(e.target.value);
                  // Reinicia las opciones de respuesta cuando se cambia el tipo de pregunta
                  setTexto_opcion(["", "", "", ""]);
                }}
                className="w-full px-3 py-2 border rounded bg-blue-800 text-white"
              >
                <option value="abierta">Abierta</option>
                <option value="cerrada">Cerrada</option>
              </select>
            </div>
            {tipoPregunta === "cerrada" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Opciones de respuesta:
                </label>
                {texto_opcion.map((opcion, index) => (
                  <input
                    key={index}
                    type="text"
                    value={opcion}
                    placeholder={`Opción ${index + 1}`}
                    onChange={(e) => {
                      const nuevasOpciones = [...texto_opcion];
                      nuevasOpciones[index] = e.target.value;
                      setTexto_opcion(nuevasOpciones);
                    }}
                    className="w-full px-3 py-2 border rounded bg-blue-800 text-white mb-2"
                  />
                ))}
              </div>
            )}
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              type="submit"
            >
              Crear Pregunta
            </button>
          </form>
        </div>
      </div>

      <div className="w-full bg-slate-400">
        <h2>formulario anotaciones</h2>
        <ListAsk id_usuario={id_usuario} />
      </div>
    </div>
  );
};

export default PreguntaForm;
