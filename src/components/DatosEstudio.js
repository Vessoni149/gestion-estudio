import React, { useEffect, useState , useRef } from "react";
import Chart from "chart.js/auto";
import { LineController } from "chart.js";
export function DatosEstudio({db}){
  const [promedioDiarioEstudio, setPromedioDiarioEstudio] = useState(0);
  const [promedioSemanal, setPromedioSemanal] = useState(0)
  const [horasTeoricas,setHorasTeoricas] = useState(0);
  const [horasPracticas,setHorasPracticas] = useState(0);
  const [horasTotales, setHorasTotales] = useState(0);
  const [horasPorMateria, setHorasPorMateria] = useState({});
  



  useEffect(() =>{
    let totalHoras = 0;
    let horasMateria = {};
          
    db.forEach((el) => {
      totalHoras += parseInt(el.horasDedicadas) ;
      if (el.materia in horasMateria) {
        horasMateria[el.materia] += parseInt(el.horasDedicadas);
      } else {
        horasMateria[el.materia] = parseInt(el.horasDedicadas);
        }  
      });

    setHorasTotales(totalHoras);
    setHorasPorMateria(horasMateria);
 }, [db])
  

useEffect(() => {
  if (db) {
    const uniqueDates = {};
    let totalHoras = 0;

    db.forEach((el) => {
      const fechaISO = new Date(el.fecha).toISOString();
      const [year, month, day] = fechaISO.substr(0,10).split('-');
      const fecha = `${year}/${month}/${day}`;
      uniqueDates[fecha] = true;
      totalHoras += parseInt(el.horasDedicadas);
    });
    const cantidadDiasEstudio = Object.keys(uniqueDates).length;
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
    const parteEnteraPromedioSemanal =  Math.floor(promedioSemanal);
    const parteDecimalPromedioSemanal = promedioSemanal - parteEnteraPromedioSemanal;
    const minutosPromedioSemanal = Math.floor(parteDecimalPromedioSemanal * 60);

    const parteEnteraPromedioDiario =  Math.floor(promedioDiarioEstudio);
    const parteDecimalPromedioDiario = promedioDiarioEstudio - parteEnteraPromedioDiario;
    const minutosPromedioDiario = Math.floor(parteDecimalPromedioDiario * 60);



//-------------------------------



  const [horasEstudiadasPorDia, setHorasEstudiadasPorDia] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    if (db) {
      const horasPorDia = {};

      db.forEach((el) => {
        const fechaISO = new Date(el.fecha).toISOString();
        const [year, month, day] = fechaISO.substr(0, 10).split("-");
        const fecha = `${month}/${day}`;

        if (horasPorDia[fecha]) {
          horasPorDia[fecha] += parseInt(el.horasDedicadas);
        } else {
          horasPorDia[fecha] = parseInt(el.horasDedicadas);
        }
      });

      setHorasEstudiadasPorDia(horasPorDia);
    }
  }, [db]);

  useEffect(() => {
  if (Object.keys(horasEstudiadasPorDia).length > 0) {
    const labels = Object.keys(horasEstudiadasPorDia).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });
    const data = labels.map((label) => horasEstudiadasPorDia[label]);

    Chart.register(LineController);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("chart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Horas Estudiadas por Día",
            data: data,
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}, [horasEstudiadasPorDia]);




  return(
    <>
      {promedioDiarioEstudio > 0 && (
	    <div style={{margin:"auto", width:"60%", border:"2px solid grey", backgroundColor:"rgb(57, 62, 70)",display:"flex",flexDirection:"column", justifyContent:"center", alignContent:"center"}}>
        {/* esta variable calcula el promedio de estudio de los 7 dias de la semana */}
        <h3>Promedio diario segun el total de dias cargados:</h3>
        <p>{parteEnteraPromedioDiario}hs. {minutosPromedioDiario}min.</p>
        <div  style={{width:"80%",height:"30%", margin:"auto", marginTop: "10px"}}>
          <canvas id="chart" width="100%" ></canvas>
        </div>
	    </div>
	    )}

        <div style={{width:"40%", backgroundColor:"rgb(34, 40, 49)",borderRadius:"10px", margin:"auto", marginTop:"3rem", marginBottom:"3rem", height:"110%"}}>
          <h2 style={{textShadow:"3px 3px 3px #000",paddingTop:"1rem"}}>Total de horas estudiadas:</h2>
          <p style={{
            display:"inline-block",
            color:"#fff", 
            padding:"5px",
            textShadow:"3px 3px 3px #000",
            paddingBottom:"1rem",
            fontSize:"3rem",
            borderTop:"10px solid #000",
            borderBottom:"10px solid #000",
            borderRight:"10px solid #fff",
            borderLeft:"10px solid #fff",
            }}>{horasTotales}hs.</p>
        </div>

      <h3 style={{marginTop:"50px"}}>Horas de estudio por materia:</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: "auto",
        gap: "20px",
        }}>
        {Object.entries(horasPorMateria).map(([materia, horas], index) => (
          <div
            key={materia}
            style={{
              border: "1px solid grey",
              backgroundColor:"rgb(34, 40, 49)"
            }}
            >
            <h3>{materia}</h3>
            <p>{horas} hs.</p>
          </div>
        ))}
      </div>

    

    



      <div style={{margin:"auto", width:"50%"}}>

        <div style={{ widht:"35%", border:"2px solid grey",backgroundColor:"rgb(57, 62, 70)", marginTop:"2rem"}}> 
          <h3>Promedio semanal de estudio (excluyendo sábados y domingos):</h3>
          {Number.isFinite(parteDecimalPromedioSemanal) & Number.isFinite( minutosPromedioSemanal) &&
          <p>{parteEnteraPromedioSemanal}hs. {minutosPromedioSemanal}min.</p>}
          
        </div>

        <div style={{ widht:"35%", border:"2px solid grey",backgroundColor:"rgb(57, 62, 70)", marginTop:"2rem"}}> 
          <h3>Horas dedicadas a Teoría</h3>
          <p>{horasTeoricas}hs.</p>
        </div>

        <div style={{ widht:"35%", border:"2px solid grey",backgroundColor:"rgb(57, 62, 70)", marginTop:"2rem"}}> 
          <h3>Horas dedicadas a Práctica</h3>
          <p>{horasPracticas}hs.</p>
        </div>

      </div>

        
         
          
        
      
    
</>
  )
}


