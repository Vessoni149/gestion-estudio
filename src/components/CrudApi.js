import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import {CrudForm} from "./Formulario/CrudForm";
import {CrudTable} from "./CrudTable";
import {Loader} from "./Loader";
import {Message} from "./Message";
import { DatosEstudio } from "./DatosEstudio";
import {Modal} from "./Modal/Modal"


export const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [horasTotales, setHorasTotales] = useState(0);
  const [horasPorMateria, setHorasPorMateria] = useState({});
  const [openModal, setOpenModal] = useState(false);
  let api = helpHttp();
  let url = "http://localhost:5000/estudios";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          setDb(res);
          setError(null);
          let totalHoras = 0;
          let horasMateria = {};
          
          res.forEach((el) => {
            totalHoras += parseInt(el.horasDedicadas) ;
            if (el.materia in horasMateria) {
              horasMateria[el.materia] += parseInt(el.horasDedicadas);
            } else {
              horasMateria[el.materia] = parseInt(el.horasDedicadas);
            }
          });
          console.log(res.length);
          setHorasTotales(totalHoras);
          setHorasPorMateria(horasMateria);

        } else {
          setDb(null);
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);



  const createData = (data) => {
    data.id = Date.now(); //esto retorna el segundo actual en el que se ejecuta
    //console.log(data);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    //console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        //Por cada elemento, si el id de "el" es igual a lo que recibe como dato en id, entonces en esa posicion reemplaza la data que se le pasa, sino el elemento se conserva =.
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };
  console.log(db)
  return (
    <div>
      <h2>CRUD API</h2>
      <article className="grid-1-2">

<button onClick={()=>setOpenModal(true)}>Cargar info</button>
{/* no es lo mismo poner openModal que !!openModal: El primero preguntaria si existe, el segundo y existe y es true */}
        {!!openModal && (
          <Modal>
            
            <CrudForm
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
              db={db}
              setOpenModal={setOpenModal}
        />
        </Modal>
        )}

        
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        
        
        <hr></hr>
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}

<div>
      {db ?
        <>
          <h3>Resumen de Horas de Estudio</h3>
          <DatosEstudio db={db} horasTotales={horasTotales} horasPorMateria={horasPorMateria} />
        </>
        :
        null
      }
    </div>

      </article>
    </div>
  );
};
