
export function CrudTableRow({ el, setDataToEdit, deleteData }) {
  const { fecha, showDate, ...rest } = el;

  const fechaCell = showDate ? <td>{fecha}</td> : <td></td>;

  const handleFechaChange = () => {
    deleteData(el.id);
  };
  
  return (
    <>
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
      fecha === new Date(fecha).getDay()
      </tr>
    </>
  );
}