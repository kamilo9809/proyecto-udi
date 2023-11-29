import NavbarStudent from "./navbarStudent"

const Inicio = () => {
  const username = localStorage.getItem('username')
  return (
    <div>
        <NavbarStudent Username={username}/>
        <h2>aca la info de inicio estudiante</h2>
    </div>
  )
}

export default Inicio
