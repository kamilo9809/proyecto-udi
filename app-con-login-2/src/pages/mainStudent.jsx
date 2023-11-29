import NavbarStudent from "./components/navbarStudent";

function MainStudent() {
  const username = localStorage.getItem("username");
  return (
    <div>
      <NavbarStudent Username={username} />
      <h2 style={{ textAlign: "center", fontSize: "2em", fontWeight: "bold" }}>
      ¡Bienvenido, {username} (estudiante)
      </h2>
    </div>
  );
}

export default MainStudent;
