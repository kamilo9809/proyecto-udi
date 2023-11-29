import NavbarAdmin from "./navbarAdmin"

const InicioAdmin = () => {
  const username = localStorage.getItem('username')
  return (
    <div>
        <NavbarAdmin Username={username}/>
        <h2>aca la info de inicio administrador</h2>
    </div>
  )
}

export default InicioAdmin
