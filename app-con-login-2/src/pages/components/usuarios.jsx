import NavbarSA from "./navbar"
import ListUsers from "../../database/listUsers"
import CreateUsers from "../../database/CreateUsers"
const Usuarios = () => {
  const username = localStorage.getItem('username')

  return (
    <div>
        <NavbarSA Username={username} />
        <h2>aca va la va la info de usuario para informar al superadmin</h2>
        <CreateUsers/>
        <ListUsers/>
    </div>
  )
}

export default Usuarios
