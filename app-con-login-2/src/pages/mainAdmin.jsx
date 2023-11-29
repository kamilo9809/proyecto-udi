import NavbarAdmin from "./components/navbarAdmin";

function MainSuperAdmin() {
  // Recupera el username de localStorage
  const username = localStorage.getItem("username");
  return (
    <>
      <NavbarAdmin Username={username} />
      <h2 style={{ textAlign: "center", fontSize: "2em", fontWeight: "bold" }} >
        ¡Bienvenido, {username} (Admin)!
      </h2>
    </>
  );
}

export default MainSuperAdmin;
