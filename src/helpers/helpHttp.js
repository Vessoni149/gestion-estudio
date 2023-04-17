//video 36 del curso: generamos una funcion que trae todos los metodos de peticiones http para automatizar las mismas. Como este codigo esta hecho con js puro, se puede usar en caulquier framework.

export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
     //Para especificar que la data va a estar en formato json:
    const defaultHeader = {
      accept: "application/json",
    };
    //Hay que tener cuidado con poner cabeceras por default ya que puede que no funcione con otras apis, cada api tieen su documentación y acepta determinado formato de header.


    //esto es apra que cuando no se detercte una respuesta del servidor, no se quede cargando sino que recia una respuesta. El objeto el navegador AbortController sirve para abortar la peticion.
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    //si el usuario especifico cabeceras, se va a crear un ojeto que mezcle las options que tenga el dafault header más las que el usuario traiga en su propo parametro de hedaers. Si no especifico, será defaultHeader.
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    //indepenteintemenete del vervo http no se puede enviar el body como falso, asique lo validamos y si es falso lo borramos.
    //En el caso de la peticion get, no usaremos body, pero como aca creamos uno para todas las peticiones, si ese body es falso o vacío, lo eliminamos para que no nos marque error.
    if (!options.body) delete options.body;

    // console.log(options);

    //si en 3 seg. no se recibe respuesta del server, se aborta  la peticion.
    setTimeout(() => controller.abort(), 5000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    //valores y props del mismo nombre
    get,
    post,
    put,
    del,
  };
};

