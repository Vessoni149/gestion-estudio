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
  // const [horasTotales, setHorasTotales] = useState(0);
  // const [horasPorMateria, setHorasPorMateria] = useState({});
  const [openModal, setOpenModal] = useState(false);
  let api = helpHttp();
  let url = "http://localhost:5000/estudios";
  //Para subir el JSON:
//   Sí, es posible subir el archivo JSON y tu proyecto React a internet y hacer que funcionen juntos. Sin embargo, hay algunas cosas que debes tener en cuenta:

// Necesitarás un servidor web para alojar tu archivo JSON y tu proyecto React. Hay muchas opciones disponibles, como servicios de alojamiento de sitios web como Netlify, Vercel o Heroku, o incluso puedes usar tu propio servidor.

// Una vez que hayas subido tu archivo JSON a internet, deberás cambiar la ruta de acceso en tu código React para que apunte a la nueva ubicación del archivo. En lugar de la ruta relativa que usas actualmente, deberás usar la URL completa de tu archivo JSON en la web.

// Es posible que debas ajustar las políticas CORS (Cross-Origin Resource Sharing) en el servidor web que aloja tu archivo JSON para permitir que tu proyecto React acceda a él.

// Si tu archivo JSON contiene información confidencial o sensible, deberás tomar medidas adicionales para protegerlo, como la autenticación y el cifrado de extremo a extremo.

// Una vez que hayas subido el archivo JSON y tu proyecto React a internet y hayas ajustado la ruta de acceso en tu código, deberías ser capaz de acceder a los datos del archivo JSON en tu proyecto React tal como lo haces actualmente con el archivo local.

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          setDb(res);
          setError(null);
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

  
  return (
    <div style={{textAlign: "center"}}>
      <div style={{width:"80%", margin:"auto"}}>
      <h3 style={{fontFamily:"serif", marginBottom:"70px", marginTop:"30px",textShadow:"5px 5px 5px #000"}}>Carga tus sesiones de estudio para brindarte información útil sobre tu productividad.</h3>
      </div>
      <article className="grid-1-2">

<button
style={{backgroundColor:"#2d2d2d", color:"#c0c0c0", borderRadius:"10px", width:"120px", height:"30px"}}
onClick={()=>{setOpenModal(true); setDataToEdit(null)}}>Cargar info</button>
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
        
        
        
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
            setOpenModal={setOpenModal}
          />
        )}

<div>
      {db ?
        <>
        <hr />
          <DatosEstudio db={db} />
        </>
        :
        null
      }
    </div>
      </article>
    </div>
  );
};
