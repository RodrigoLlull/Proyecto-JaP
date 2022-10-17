// funcion que setea el id del producto en el local storage
function productoRelaID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}
document.addEventListener('DOMContentLoaded', async () => {
  // solicitud que trae la informacion del producto deseado
  let productID = (localStorage.getItem('productID'));
  let URLProductInfo = `${PRODUCT_INFO_URL}${productID}${EXT_TYPE}`;
  let productoInfo = await getJSONData(URLProductInfo);
  let productoData = productoInfo.data
  let listado = document.querySelector('#listado')
  let productosRelacionados = document.querySelector('#productosRelacionados')

  console.log(productoData.id);
  console.log(productoData);

  // solicitud que trae los comentarios
  let URLProductComent = `${PRODUCT_INFO_COMMENTS_URL}${productID}${EXT_TYPE}`
  let productComent = await getJSONData(URLProductComent);
  let comentData = productComent.data
  let comentarios = document.querySelector('#comentarios')

  // variables utilizadas para crear un comentario nuevo
  let btnEnviar = document.querySelector('#btnEnviar')
  let tuComentario = document.querySelector('#tuComentario')
  let tuPuntuacion = document.querySelector('#tuPuntuacion')
  let añadirComentario = document.querySelector('#añadirComentario')

  // variable perteneciente al boton de comprar producto
  let comprar = document.querySelector('#comprar')

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

  //revisar la clase active de el div que tiene las imagenes
  function iterarIMG() {
    return `
    <div class=" carousel-item active">
      <img src="${productoData.images[0]}" class=" img-fluid shadow w-100 "alt="...">
    </div>
    <div class="carousel-item ">
      <img src="${productoData.images[1]}" class=" img-fluid shadow w-100 "alt="...">
    </div>
    <div class="carousel-item ">
      <img src="${productoData.images[2]}" class=" img-fluid shadow w-100 "alt="...">
    </div>
    <div class="carousel-item ">
      <img src="${productoData.images[3]}" class=" img-fluid shadow w-100 "alt="...">
    </div>
    `
  }

  // funcion que itera los productos del arreglo "productos relacionados" y crea el contenido HTML con su informacion
  function iterarProductosRela() {
    arrPR = ''
    for (const producto of productoData.relatedProducts) {
      arrPR += `
        <div onclick="productoRelaID(${producto.id})" class='col-6 rounded cursor-active'>
          <img src="${producto.image}" class='img-fluid shadow' alt="">
          <p class='mt-2 mb-2'><strong >${producto.name}</strong></p>
        </div>
      `
    }
    return arrPR
  }

  // funcion que crea el contenido HTML, con la respectiva informacion del producto
  function crearHTML(producto) {
    return `
      <div class="list-group-item col-6 mx-auto rounded shadow bg-dark bg-gradient text-light">
        <div class="row">
          <h3 class="mt-3 mb-4 text-primary">${producto.name}</h3>
          <hr>
          <div>
            <p><strong>Precio -</strong> ${producto.currency} ${producto.cost}</p>
          </div>
          <div>
            <p><strong>Descripcion -</strong> ${producto.description}</p>
          </div>
          <div>
            <p><strong>Categoría -</strong> ${producto.category}</p>
          </div>
          <div>
            <p><strong>Cantidad de vendidos - </strong> ${producto.soldCount}</p>
          </div>
            <hr>
          </div>

      </div>
      <div class="list-group-item col-5 mx-auto rounded shadow bg-dark bg-gradient py-4">
        <div class='row'>
          
          <div id="carouselExampleFade" class="carousel carousel-inner slide carousel-fade" data-bs-ride="carousel">
          
              ${iterarIMG()}
          
            <button class="bg-Light carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="bg-Light carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
            
          </div>
        </div>
      </div>
     `
  };

  //Crea la seccion de comentarios con sus respectivas calificaciones
  function comentariosHTML(comentario) {
    let mostrarComentarios = ``
    if (comentData == '') {
      mostrarComentarios = ''
    } else {
      for (const comentario of comentData) {
        mostrarComentarios += `
               <div class="p-2 rounded border border-secondary text-light">
               <p class="mb-0 mt-2">
                  <strong class="text-warning">${comentario.user}</strong> - <strong class="text-info">${comentario.dateTime}</strong> - ${crearEstrellas(comentario.score)}
                </p>
                <p class="my-1">${comentario.description}</p>
               </div>
        `
      }
    }
    return mostrarComentarios
  }

  // Evento el cual al clickear el boton enviar crea un nuevo comentario
  btnEnviar.addEventListener('click', () => {

    let fechaYHora = new Date()
    let fechaYHoraActual = `${fechaYHora.getFullYear()}-${fechaYHora.getMonth() + 1}-${fechaYHora.getDate()} ${fechaYHora.toLocaleTimeString()}`

    if (tuComentario.value != '') {
      let comentarioNuevo =
        `<div class="p-2 rounded border border-secondary text-light">
          <p class="mb-0 mt-2">
            <strong class="text-warning">${localStorage.getItem('usuario')}</strong> - <strong class="text-info"> ${fechaYHoraActual}</strong> - ${crearEstrellas(tuPuntuacion.value)}
          </p>
          <p class="my-1">${tuComentario.value}</p>
          </div>
          `
      añadirComentario.innerHTML += comentarioNuevo
    }
  })

  // evento para comprar un producto
  let arrayCarrito = [];

  comprar.addEventListener('click', ()=>{
    let jsonCarrito = JSON.parse(localStorage.getItem('comprarProductoID'))
    if(comprarProductoID != null && comprarProductoID != "" && comprarProductoID != false && comprarProductoID != undefined){
      jsonCarrito = JSON.parse(localStorage.getItem('comprarProductoID')) 
    console.log(jsonCarrito);
    arrayCarrito.push(productoData.id)}
    

    if (comprarProductoID.value != productoData.id) {
      localStorage.setItem("comprarProductoID", productoData.id);
    }
   

  })

  // Funcion que implementa el codigo HTML en la pagina
  function insertarHTML() {
    listado.innerHTML += crearHTML(productoData)
    comentarios.innerHTML += comentariosHTML(comentData)
    productosRelacionados.innerHTML = iterarProductosRela()
  }
  insertarHTML()
})