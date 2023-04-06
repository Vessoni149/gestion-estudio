import React, {  useRef } from "react";
import {CrudTableRow} from "./CrudTableRow";
export const CrudTable = ({ data, setDataToEdit, deleteData }) => {
  const prevDateRef = useRef(null);
  const tableData = data.map((el) => {
    const showDate = prevDateRef.current !== el.fecha;
    prevDateRef.current = el.fecha;
    return { ...el, showDate };
  });

  return (
    <div>
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Materia</th>
            <th>Horas diarias</th>
            <th>Rango horario</th>
            <th>teórico/práctico</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((el) => (
            <CrudTableRow
              key={el.id}
              el={el}
              setDataToEdit={setDataToEdit}
              deleteData={deleteData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};


