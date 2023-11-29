import NavbarSA from "./navbar"

const Inicio = () => {
  const username = localStorage.getItem('username')
  return (
    <div>
        <NavbarSA Username={username}/>
        <h2>aca la info de inicio super administrador</h2>
    </div>
  )
}

export default Inicio
