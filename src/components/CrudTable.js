import React, { useState, useRef, useEffect } from "react";
import { CrudTableRow } from "./CrudTableRow";
import Slider from "react-slick";
import Chart from "chart.js/auto";
import { format } from "date-fns";

export const CrudTable = ({ data, setDataToEdit, deleteData, setOpenModal }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const prevDateRef = useRef(null);
  const sliderRef = useRef(null);
  const [horasEstudiadasPorDia, setHorasEstudiadasPorDia] = useState({});
  const chartRef = useRef(null);
  const [monthString,setMonthString] = useState("");
  const tableData = data
    .filter(
      (el) => new Date(el.fecha).getMonth() === currentMonth // Filtrar filas por mes
    )
    .map((el) => {
      const showDate = prevDateRef.current !== el.fecha;
      prevDateRef.current = el.fecha;
      return { ...el, showDate };
    });


  let promedioMensual = 0;
  tableData.map((el)=> {
    promedioMensual += parseInt(el.horasDedicadas)
    return promedioMensual})
  console.log(promedioMensual)



  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 0,
    arrows: false, // quitar los botones "Previous" y "Next"
    swipe:false,

  };

  const handleNextSlide = () => {
    const lastMonthWithData = data
      .map((el) => new Date(el.fecha).getMonth())
      .reduce((acc, curr) => Math.max(acc, curr), -1);
  
    if (
      sliderRef.current &&
      currentMonth < lastMonthWithData &&
      data.some((el) => new Date(el.fecha).getMonth() === currentMonth + 1) &&
      sliderRef.current.state.currentSlide !== sliderRef.current.props.slideCount - 1
    ) {
      sliderRef.current.slickNext();
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  

  const handlePrevSlide = () => {
    const prevMonthHasData = data.some((el) => new Date(el.fecha).getMonth() === currentMonth - 1);
    if (sliderRef.current && prevMonthHasData) {
      setCurrentMonth(prevMonth => prevMonth - 1);
      sliderRef.current.slickPrev();
    }
  };



let previousColor = "rgb(34, 40, 49)";



useEffect(() => {
  const filteredData = data.filter(
    (el) => new Date(el.fecha).getMonth() === currentMonth
  );

  const groupedData = filteredData.reduce((acc, el) => {
    const date = new Date(el.fecha);
    const formattedDate = format(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), "MM/dd");

    if (acc[formattedDate]) {
      acc[formattedDate] += parseInt(el.horasDedicadas);
    } else {
      acc[formattedDate] = parseInt(el.horasDedicadas);
    }

    return acc;
  }, {});

  setHorasEstudiadasPorDia(groupedData);
}, [data, currentMonth]);

  useEffect(() => {
    if (Object.keys(horasEstudiadasPorDia).length > 0) {
      const labels = Object.keys(horasEstudiadasPorDia);
      const data = Object.values(horasEstudiadasPorDia);
      setMonthString(new Date(0, currentMonth).toLocaleString('default', { month: 'long' }));
      if (chartRef.current) {
        chartRef.current.destroy();
      }
  
      const ctx = document.getElementById("chart2").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `Horas Estudiadas por día en ${monthString}`,
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
  
  return (
    <div>
    <h3 style={{marginTop:"40px"}}>Tabla de Datos</h3>
    <div style={{width:"80%" ,display:"flex",justifyContent:"space-between", margin:"auto"}}>
      <button style={{backgroundColor:"#2d2d2d", color:"#c0c0c0", borderRadius:"10px", width:"100px", height:"20px"}} disabled={!data.some((el) => new Date(el.fecha).getMonth() === currentMonth - 1)} onClick={handlePrevSlide}>Mes anterior</button>
      <button style={{backgroundColor:"#2d2d2d", color:"#c0c0c0", borderRadius:"10px", width:"100px", marginLeft:"10px", height:"20px" }} disabled={!data.some((el) => new Date(el.fecha).getMonth() === currentMonth + 1)} onClick={handleNextSlide}>Mes siguiente</button>
    </div>

    
    <div style= {{display:"flex", justifyContent: "center", marginTop:"10px"}}>
      <tr style={{marginTop:"30px", backgroundColor: "#222222",color:"#fff",width:"80%", boxShadow: "0 0 20px 20px #000"}}>
          <th style={{width:"15%"}}>Fecha</th>
          <th style={{width:"15%", paddingLeft:"20px"}}>Materia</th>
          <th style={{width:"5%"}}>Horas</th>
          <th style={{width:"15%",textAlign:"end"}}>Rango horario</th>
          <th style={{width:"10%",textAlign:"center",}}>T / P</th>
          <th style={{width:"30%", textAlign:"center"}}>Observaciones</th>
          <th style={{width:"10%"}}>Acciones</th>
        </tr>
      </div>
      <Slider ref={sliderRef} {...sliderSettings}>
     
      {tableData.map((el, index) => {
  const prevEl = index > 0 ? tableData[index - 1] : null;
  const showDate = el.fecha !== (prevEl ? prevEl.fecha : null);
  const color = showDate ? (previousColor === "rgb(34, 40, 49)" ? "rgb(57, 62, 70)" : "rgb(34, 40, 49)") : previousColor;
  previousColor = color;
  return (
    <CrudTableRow
      key={el.id}
      el={el}
      setDataToEdit={setDataToEdit}
      deleteData={deleteData}
      setOpenModal={setOpenModal}
      color={color}
      showDate={showDate}
    />
  );
})}

</Slider>

{tableData.length > 5 && 
   <div style={{width:"80%" ,display:"flex",justifyContent:"space-between", margin:"auto", marginTop:"50px"}}>
   <button style={{backgroundColor:"#2d2d2d", color:"#c0c0c0", borderRadius:"10px", width:"100px", height:"20px"}} disabled={!data.some((el) => new Date(el.fecha).getMonth() === currentMonth - 1)} onClick={handlePrevSlide}>Mes anterior</button>
   <button style={{backgroundColor:"#2d2d2d", color:"#c0c0c0", borderRadius:"10px", width:"100px", marginLeft:"10px", height:"20px" }} disabled={!data.some((el) => new Date(el.fecha).getMonth() === currentMonth + 1)} onClick={handleNextSlide}>Mes siguiente</button>
 </div>
}
    
      

      <div style={{margin:"auto", width:"60%", border:"2px solid grey", backgroundColor:"rgb(57, 62, 70)",display:"flex",flexDirection:"column", justifyContent:"center", alignContent:"center", marginTop:"3rem"}}>
      <h3>Total de horas estudiadas en {monthString}: </h3>
      <p>{promedioMensual} hs.</p>
      
      <div  style={{width:"80%",height:"30%", margin:"auto", marginTop: "10px"}}>
        <canvas id="chart2"  width="100%"/>
      </div>
      </div>
  </div>
  );
}; 

