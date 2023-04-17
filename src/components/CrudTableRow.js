export function CrudTableRow({ el, setDataToEdit, deleteData }) {
  const { fecha, showDate, ...rest } = el;
  const timeZoneOffset = new Date().getTimezoneOffset();
  const date = new Date(fecha);
  date.setTime(date.getTime() + timeZoneOffset * 60 * 1000);
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaCell = showDate ? <td>{date.toLocaleDateString('es-ES', options)}</td> : <td></td>;
  const isMonday = date.getDay() === 1;

  const handleFechaChange = () => {
    deleteData(el.id);
  };
  const serverTimezoneOffset = new Date().getTimezoneOffset();
  

  return (
    <>
      {isMonday && <tr><hr/></tr>}
      <tr>
        {fechaCell}
        <td>{rest.materia}</td>
        <td>{rest.horasDedicadas}</td>
        <td>{rest.rangoHorario}</td>
        <td>{rest.teoricoPractico}</td>
        <td>{rest.observaciones}</td>
        <td>
          <button onClick={() => setDataToEdit(el)}>Editar</button>
          <button onClick={handleFechaChange}>Eliminar</button>
        </td>
      </tr>
    </>
  );
}
