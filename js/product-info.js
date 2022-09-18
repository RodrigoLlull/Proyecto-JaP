document.addEventListener('DOMContentLoaded', async () => {
  // solicitud que trae la informacion del producto deseado
  let productID = (localStorage.getItem('productID'));
  let URLProductInfo = `${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`;
  let productoInfo = await getJSONData(URLProductInfo);
  let productoData = productoInfo.data
  let listado = document.querySelector('#listado')

  // solicitud que trae los comentarios
  let URLProductComent = `${PRODUCT_INFO_COMMENTS_URL}${productID}${EXT_TYPE}`
  let productComent = await getJSONData(URLProductComent);
  let comentData = productComent.data
  let comentarios = document.querySelector('#comentarios')

  //Crea las estrellas con respecto a la puntuacion de cada comentario
  function crearEstrellas(score) {
    let estrellaVacia = `<span class="fa fa-star"></span>`;
    let estrellaCompleta = `<span class="fa fa-star checked"></span>`;
    let result = 5 - score
    let span = ""

    if (score > 0) {
      span += (estrellaCompleta).repeat(score)
    };
    if (score < 5) {
      span += (estrellaVacia).repeat(result)
    };
    return span
  };


  // Funcion que itera el array que contiene las imagenes y crea contenido HTML de forma dinamica en base a cada iterasion
  function iterarIMG() {
    arrIMG = ''
    for (const imagen of productoData.images) {
      arrIMG += `
            <div class='mt-2'>
                <img src='${imagen}' alt='' class='img-thumbnail col-11'>
            </div>
          `
    }
    return arrIMG
  }


  // funcion que crea el contenido HTML, con la respectiva informacion del producto
  function crearHTML(producto) {
    return `
      <div class="container">
        <h3 class="mt-5 mb-4">${producto.name}</h3>
        <hr>
        <div>
          <strong>Precio</strong>
          <p>${producto.currency} ${producto.cost}</p>
        </div>
        <div>
          <strong>Descripcion</strong>
          <p>${producto.description}</p>
        </div>
        <div>
          <strong>Categoría</strong>
          <p>${producto.category}</p>
        </div>
        <div>
          <strong>Cantidad de vendidos</strong>
          <p>${producto.soldCount}</p>
        </div>
        <div>
          <strong>Imagenes ilustrativas</strong>
          <div class='d-flex col'>
            ${iterarIMG()}
          </div>
        </div>
      </div>
     `
  };

  //Crea la seccion de comentarios con sus respectivas calificaciones
  function crearComentarios(comentario) {
    let mostrarComentarios = ''
    for (const comentario of comentData) {
      mostrarComentarios += `
             <div class="container rounded border border-secondary">
             <p class="mb-0 mt-2">
                <b>${comentario.user}</b> - ${comentario.dateTime} - ${crearEstrellas(comentario.score)}
              </p>
              <p class="mb-1">${comentario.description}</p>
             </div>
            `
    }
    return mostrarComentarios
  }

  // Funcion que implementa el codigo HTML en la pagina
  function insertarHTML() {
    listado.innerHTML += crearHTML(productoData)
    comentarios.innerHTML += crearComentarios(comentData)
  }

  insertarHTML()

})