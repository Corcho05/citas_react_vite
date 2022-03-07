import {useState, useEffect} from 'react';
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(()=>{
    const obtenerLS = ()=>{
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS);
    }
    obtenerLS();
  },[])
  //Utilizamos el local storage para almacenar como si fuera una base de datos.
  useEffect(() => {
  
   localStorage.setItem('pacientes',JSON.stringify(pacientes))
  }, [pacientes])
  
  const eliminarPaciente = (id)=>{
    //console.log(`Eliminando el paciente con ${id}`)
    const pacientesActualizado = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizado)
  }
  return (
  <div className="container mx-auto mt-20">
    <Header />
    <div className="mt-12 md:flex">
      <Formulario 
      pacientes={pacientes}
        paciente={paciente}
        setPaciente={setPaciente}
        setPacientes={setPacientes}
      />
      <ListadoPacientes 
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    </div>
  </div>
  )
}

export default App
