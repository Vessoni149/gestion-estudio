import React from 'react'
import { useState,useEffect } from 'react'
import GestionTiempo from '../Fecha';
import './form.css';
const initialForm ={
  fecha: "null",
  materia: "",
  horasDedicadas: "",
  rangoHorario: "",
  teoricoPractico: "",
  observaciones: "",
  id:null
}
export function CrudForm({createData, updateData, dataToEdit, setDataToEdit, setOpenModal}) {

  const [form, setForm] = useState(initialForm);

useEffect(() => {
  if(dataToEdit){
    setForm(dataToEdit);
  }else{
    setForm(initialForm);
  }
}, [dataToEdit]);

// const handleOptionChange = (e) => {
  
//   setOption(e.target.value);
//   setForm({
//     ...form,
//     teoricoPractico: e.target.value
//   });
// };

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    })
    
    //Los corchetes en la línea [e.target.name]: e.target.value son una sintaxis llamada "propiedad calculada" en JavaScript. Esta sintaxis permite que la propiedad de un objeto se calcule dinámicamente en tiempo de ejecución, en lugar de tener que ser especificada de forma estática en el código.
    // En este caso, la propiedad calculada es el nombre de la propiedad que se actualizará en el objeto form. En lugar de tener un nombre de propiedad fijo, se utiliza el valor de la propiedad name del elemento de entrada (input) que ha desencadenado el evento. Esto significa que la propiedad que se actualizará en el objeto form tendrá el mismo nombre que el valor de la propiedad name del input.
    // Por ejemplo, si el input tiene un atributo name de "username", la propiedad que se actualizará en el objeto form será "username": e.target.value. Si el input tiene un atributo name de "email", la propiedad actualizada será "email": e.target.value.
    // En resumen, los corchetes en esta línea permiten que la propiedad del objeto form que se actualizará se calcule dinámicamente en tiempo de ejecución, en función del valor de la propiedad name del input que ha desencadenado el evento.
    
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!form.fecha || !form.materia || !form.horasDedicadas || !form.rangoHorario || !form.teoricoPractico){
      alert("Datos incompletos");
      return;
    }
    if(form.id === null){
      createData(form)
    }else{
      updateData(form)
    }
    setForm(initialForm);
  setDataToEdit(null);
  }
  
  const handleReset = (e)=>{
    setForm(initialForm);
    setDataToEdit(null);
  }

  return (  
    <div className='modal-form'>
      <button onClick={()=>setOpenModal(false)}>X</button>
      <h3>{dataToEdit? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>

      <GestionTiempo form={form} handleChange={handleChange}></GestionTiempo>
        

        <input type="text" 
        name="materia" 
        placeholder='Materia' 
        onChange={handleChange} 
        value={form.materia}></input>

        <input type="number" 
        name="horasDedicadas" 
        placeholder='Horas dedicadas' 
        onChange={handleChange} 
        value={form.horasDedicadas}></input>

        <input type="text" 
        name="rangoHorario" 
        placeholder='Rango de horarios' 
        onChange={handleChange} 
        value={form.rangoHorario}></input>

<label htmlFor="opciones">Elige una opción:</label>
<select name="teoricoPractico" id="opciones" onChange={handleChange} value={form.teoricoPractico || ""}>
  <option value="">--------</option>
  <option value="teorico">Teorico</option>
  <option value="practico">Practico</option>
</select>

        <input type="text" 
        name="observaciones" 
        placeholder='Observaciones' 
        onChange={handleChange} 
        value={form.observaciones}></input>

        <input type='submit' 
        value="Enviar"></input>

        <input type='reset' 
        value="Limpiar" 
        onClick={handleReset}></input>
      </form>
    </div>
  )
}
