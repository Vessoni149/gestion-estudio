import React, { useEffect, useState } from "react";
import moment from 'moment';
export function DatosEstudio({db, horasTotales, horasPorMateria}){
  const [promedioDiarioEstudio, setPromedioDiarioEstudio] = useState(0);
  const [promedioSemanal, setPromedioSemanal] = useState(0)
  const [horasTeoricas,setHorasTeoricas] = useState(0);
  const [horasPracticas,setHorasPracticas] = useState(0);

useEffect(() => {
  if (db) {
    const uniqueDates = {};
    let totalHoras = 0;

    db.forEach((el) => {
      const fechaISO = new Date(el.fecha).toISOString();
      const [year, month, day] = fechaISO.substr(0,10).split('-');
      const fecha = `${year}/${month}/${day}`;
      console.log(fecha)
      uniqueDates[fecha] = true;
      totalHoras += parseInt(el.horasDedicadas);
    });
console.log(uniqueDates)
    const cantidadDiasEstudio = Object.keys(uniqueDates).length;
    console.log(cantidadDiasEstudio)
    const promedio = totalHoras / cantidadDiasEstudio;
    setPromedioDiarioEstudio(promedio);
  }
},[db])

useEffect(() => {
  if (db) {
    const uniqueDates = {};
    let totalHoras = 0;

    db.forEach((el) => {
      const fechaISO = new Date(el.fecha).toISOString();
      const [year, month, day] = fechaISO.substr(0,10).split('-');
      const fecha = `${year}/${month}/${day}`;
      const diaSemana = new Date(fecha).getDay();
      if (diaSemana !== 0 && diaSemana !== 6) { // excluye sábado (0) y domingo (6)
        uniqueDates[fecha] = true;
        totalHoras += parseInt(el.horasDedicadas);
      }
    });

    const cantidadDiasEstudio = Object.keys(uniqueDates).length;
    const promedio = totalHoras / cantidadDiasEstudio;
    setPromedioSemanal(promedio);
  }
}, [db]);









  useEffect(() => {
    if (db) {
      let horasTeoricasTotales = 0;
      let horasPracticasTotales = 0;
  
      db.forEach((el) => {
        if (el.teoricoPractico === "teorico") {
          horasTeoricasTotales += parseInt(el.horasDedicadas);
        }
        if (el.teoricoPractico === "practico") {
          horasPracticasTotales += parseInt(el.horasDedicadas);
        }
      });
  
      setHorasTeoricas(horasTeoricasTotales);
      setHorasPracticas(horasPracticasTotales);
    }
  }, [db]);

 
  
    


//-------------------------------



console.log("cantidad de horas practicas: " +  horasPracticas)
console.log("cantidad de horas teoricas: " + horasTeoricas)

  return(
    <>
     <h3>Datos Generales de estudio:</h3>
      <h3>Horas totales:</h3>
      <p>{horasTotales}</p>
      <hr />
      <h3>Horas por materia:</h3>
      {Object.entries(horasPorMateria).map(([materia, horas]) => (
        <div key={materia}>
          <h3>{materia}</h3>
          <p>{horas}</p>
        </div>
      ))}
	 {promedioDiarioEstudio > 0 && (
	<div>
    {/* esta variable calcula el promedio de estudio de los 7 dias de la semana */}
    <h3>Promedio diario de estudio:</h3>
    <p>{promedioDiarioEstudio}</p>
    <h3>Promedio semanal de estudio:</h3>
    <p>{promedioSemanal}</p>
	</div>
	)}

    
</>
  )
}


