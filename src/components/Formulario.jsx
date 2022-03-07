import { useEffect, useState } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false)

    useEffect(() => {
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
        }
    }, [paciente])
    

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }
    const handleSubmit = e =>{
        e.preventDefault();
        //Validación 
        if( [nombre, propietario,  email , fecha, sintomas].includes('') ){
              //alert('Debe de completar todos los campos!! ');
              setError(true);
            return
        }

        setError(false);
        //Creamos el objeto de paciente
        const objPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
           
        }
        //COMPRUEBO SI ESTOY EDITANDO O AGREGANDO UN PACIENTE
        if(paciente.id){
            //estoy editando
            objPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ?
                objPaciente : pacienteState )

           setPacientes(pacientesActualizados);
           setPaciente({})
        }else{
            //estoy agregando
            objPaciente.id = generarId();
            setPacientes([
                ...pacientes,
                objPaciente
           ]);
        }
        
      
        //Reiniciar el formulario 
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }
  return (
      
    <div className="md:w-1/2 lg:w-2/5">
    
        <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes </h2>
        
        <p className="text-xl mt-5 mb-10 text-center">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold"> Administralos</span>
        </p>
        <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            > 
            { error && 
               <Error ><p>Todos los campos son obligatorios</p></Error>
            }
            <div className="mb-5">
              
                <label className="block text-gray-700 uppercase font-bold" htmlFor="nombre">Nombre Mascota</label>
                <input
                id="nombre"
                    type='text'
                    placeholder="Nombre Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="propietarios">Nombre Propietario</label>
                <input
                id="propietarios"
                    type='text'
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={(e)=> setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
                <input
                id="email"
                    type='email'
                    placeholder="Email contacto propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="fIngreso">Fecha Ingreso</label>
                <input
                id="fIngreso"
                    type='date'
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={(e)=> setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
                <textarea 
                    id='sintomas'
                    placeholder="Describe los síntomas "
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={(e)=> setSintomas(e.target.value)}
                />
            </div>
            <input 
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                value={paciente.id ? 'Editar paciente':'Agregar Paciente'}
            />
        </form>
    </div>
  )
}

export default Formulario

