
export function CrudTableRow({ el, setDataToEdit, deleteData, setOpenModal, color}) {
  const { fecha, showDate, ...rest } = el;

  const timeZoneOffset = new Date().getTimezoneOffset();
  const date = new Date(fecha);
  date.setTime(date.getTime() + timeZoneOffset * 60 * 1000);
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaCell = <td style={{ width: '15%',borderLeft:"2px solid #000" }}>{date.toLocaleDateString('es-ES', options)}</td>;

  

  const isMonday = date.getDay() === 1;


  const handleFechaChange = () => {
    deleteData(el.id);
  };
;





  return (
    <div style={{ display:"flex", justifyContent: "center", width:"100%"}}>
    
      {isMonday && <tr><hr /></tr>}
      <tr style={{backgroundColor: color ,width:"80%", borderRight:"2px solid #000", boxShadow:"20px 20px 30px 3px #000, 20px 20px 30px -3px #000, -20px 20px 30px 3px #000", color:"#c0c0c0"}}>
        {fechaCell}
        <td style={{paddingLeft:"2%",width:"15%",maxWidth:"40px",maxHeight: '100px',overflow: 'auto', wordWrap: 'break-word',whiteSpace: 'pre-wrap'}}>{rest.materia}</td>
        <td style={{width:"5%",maxWidth:"30px",maxHeight: '50px',overflow: 'auto', wordWrap: 'break-word',whiteSpace: 'pre-wrap'}}>{rest.horasDedicadas}</td>

        <td style={{textAlign:"center",width:"15%",maxWidth: '50px', maxHeight: '100px',overflow: 'auto', wordWrap: 'break-word',whiteSpace: 'pre-wrap'}}>{rest.rangoHorario}</td>

        <td style={{width:"10%", textAlign:"center"}}>{rest.teoricoPractico}</td>
        <td style={{
          width: '30%',
          maxHeight: '100px',
          overflow: 'auto',
          wordWrap: 'break-word',
          maxWidth: '150px',
          whiteSpace: 'pre-wrap',
        }}>{rest.observaciones}</td>


        <td style={{width:"10%"}}>
          <button 
          style={{
            width:"95%", 
            borderRadius:"10px", backgroundColor:"#9a9a9a69",
            color:"#c0c0c0"}}
          onClick={() => {
            setDataToEdit(el); 
            setOpenModal(true)}
            }>
            Editar
            </button>

          <button 
          style={{
            width:"95%", 
            borderRadius:"10px",
            marginTop:"10px", 
            backgroundColor:"#000", 
            color:"#c0c0c0"}} 
          onClick={handleFechaChange}>
            Eliminar
            </button>
        </td>
      </tr>
    </div>
  );
}


