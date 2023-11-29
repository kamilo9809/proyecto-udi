import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCapsLockOnUsername, setIsCapsLockOnUsername] = useState(false);
  const [isCapsLockOnPassword, setIsCapsLockOnPassword] = useState(false);

  const handleKeyDownUsername = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOnUsername(true);
    } else {
      setIsCapsLockOnUsername(false);
    }
  };

  const handleKeyDownPassword = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOnPassword(true);
    } else {
      setIsCapsLockOnPassword(false);
    }
  };

  const handleLoginClick = async () => {
    if (username === "" || password === "") {
      alert("Por favor, rellene ambos campos.");
    } else {
      try {
        const responseadmin = await axios.post(
          "http://localhost:3001/api/loginadmin",
          {
            username: username,
            password: password,
          }
        );
        if (responseadmin.data.success) {
          
          //se envia al localstorage username e id de esa formar omitimos tener que pasar por una dependencia de 
          //autenticacion con passport js y complicamos el codigo
          localStorage.setItem('username', JSON.stringify(username,));
          localStorage.setItem("id", JSON.stringify(responseadmin.data.id));
  
          if (responseadmin.data.rol === "superadmin") {
            window.location.href = "/main";
          } else if (responseadmin.data.rol === "admin") {
            window.location.href = "/mainAdmin";
          } else {
            window.location.href = "/mainStudent";
          }
        } else {
          alert(responseadmin.data.message);
        }
      } catch (error) {
        console.error("Error durante la autenticación:", error);
        alert(
          "quien eres y porque estas intentando ingresar estoy llamando al 911 ya tengo localizada tu ip desgraciado"
        );
      }
    }
  };

  return (
    <div className="bg">
      <div className="container">
        <div className="image-container">
          <img
            className="styled-image"
            src="udi---universitaria-de-investigaci-n-y-desarrollo-001886_large.jpg"
            alt="Descripción de la imagen"
          />
        </div>
        <div className="form-container">
          <h1 className="welcome-text">¡Bienvenido!</h1>
          <div className="input-container">
            <label htmlFor="">USUARIO</label>
            <input
              className="styled-input"
              type="text"
              name="name"
              id="name"
              placeholder="usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDownUsername}
            />
            {isCapsLockOnUsername && (
              <p>La tecla de mayúsculas está activada.</p>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="">CONTRASEÑA</label>
            <input
              className="styled-input"
              type="password"
              name="pass"
              id="pass"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDownPassword}
            />
            {isCapsLockOnPassword && (
              <p>La tecla de mayúsculas está activada.</p>
            )}
          </div>
          <button className="styled-button" onClick={handleLoginClick}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
