import NavbarSA from "./components/navbar";

function MainSuperAdmin() {
  // Recupera el username de localStorage
  const username = localStorage.getItem("username");
  return (
    <>
      <NavbarSA Username={username} />
      <h2 style={{ textAlign: "center", fontSize: "2em", fontWeight: "bold" }} >
      ¡Bienvenido, {username} (Super Admin)
      </h2>
    </>
  );
}

export default MainSuperAdmin;
