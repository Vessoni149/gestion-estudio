
function GestionTiempo({ form, handleChange }) {
  // Crear una instancia de la clase Date con la fecha seleccionada
  const fechaObj = new Date(form.fecha);

  // Obtener el día de la semana en formato texto
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const diaSemanaTexto = diasSemana[fechaObj.getUTCDay()];

  // Obtener la fecha en formato xx/xx/xx
  const dia = fechaObj.getUTCDate().toString().padStart(2, "0");
  const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const anio = fechaObj.getUTCFullYear().toString().slice(-2);
  const fechaTexto = `${dia}/${mes}/${anio}`;

  // Mostrar el resultado en la consola
  console.log(`Fecha seleccionada: ${diaSemanaTexto} ${fechaTexto}`);

  return (
    <div>
      <label htmlFor="fecha">Fecha:</label>
      <input
        type="date"
        name="fecha"
        placeholder="Fecha"
        onChange={handleChange}
        value={form.fecha}
      />
    </div>
  );
}

export default GestionTiempo;
