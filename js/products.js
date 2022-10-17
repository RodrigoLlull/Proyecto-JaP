// funcion que setea el id del producto en el local storage
function productID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

document.addEventListener('DOMContentLoaded', async () => {
  // al cargar la pagina, trae el JSON el cual luego sera iterado
  let catID = (localStorage.getItem('catID'));
  let URLGenerada = `${PRODUCTS_URL}${catID}${EXT_TYPE}`;
  let productos = await getJSONData(URLGenerada);
  productos = productos.data;
  let productosArr = productos.products;
  const listado = document.querySelector('#lista-productos');
  let catName = productos.catName;
  let descripcion = document.querySelector('#descripcion');

  console.log(productosArr);

  // Variables utilizadas para filtrar
  const ordenPrecioAsc = "0-9";
  const ordenPrecioDesc = "9-0";
  const ordenVentasDesc = "Vendidos";
  let criterioActual = undefined;
  let array = [];
  
  let tiempoReal = document.querySelector('#tiempoReal');
  

  let filtrar = document.querySelector('#btnFiltro');
  let limpiar = document.querySelector('#limpiar')
  let btnPrecioDesc = document.querySelector('#sortDesc');
  let btnPrecioAsc = document.querySelector('#sortAsc');
  let btnCountDesc = document.querySelector('#sortByCount');

  let inputPrecioMin = document.querySelector('#precioMin');
  let inputPrecioMax = document.querySelector('#precioMax');
  let minCount = undefined;
  let maxCount = undefined;

  // Funcion para crear de forma dinamica elementos html, con la informacion de cada producto
  function crearHTML(producto) {
    return `
    <div onclick="productID(${producto.id})" class="shadow rounded list-group-item list-group-item-action cursor-active mb-2">
      <div class="row">
           <div class="col-3">
            <img class="img-fluid" src="${producto.image}" alt="${producto.description}">
           </div>
          <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h3>
            <small class="text-muted">${producto.soldCount} Vendidos</small>
          </div>
            <p class="mb-1">${producto.description}</p>
          </div>
          </div>
      </div>
    </div>
 `
  };

  // Funcion para insertar contenido HTML, es decir los productos de la categoria seleccionada
  function insertarHTML() {
    for (const producto of productosArr) {
      listado.innerHTML += crearHTML(producto);
    };
    descripcion.innerHTML = `Verás aquí todos los productos de la categoría ${catName}`
  };
  insertarHTML();

  // Ordena los productos segun un criterio
  function ordenarProductos(criterio, array) {
    let resultado = [];
    // criterio de orden
    if (criterio === ordenPrecioAsc) {
      resultado = array.sort(function (a, b) {
        if (a.cost < b.cost) { return -1; }
        if (a.ncost > b.cost) { return 1; }
        return 0;
      });
    } else if (criterio === ordenPrecioDesc) {
      resultado = array.sort(function (a, b) {
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0;
      });
    } else if (criterio === ordenVentasDesc) {
      resultado = array.sort(function (a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

        if (aCount > bCount) { return -1; }
        if (aCount < bCount) { return 1; }
        return 0;
      });
    };

    return resultado;
  };

  // muestra los productos, funcion utilizada luego de filtrar los mismos
  function mostrarListaProductos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
      let producto = array[i];

      if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {

        htmlContentToAppend += crearHTML(producto)
      };

      listado.innerHTML = htmlContentToAppend;
    };
  };

  // ordena y muetra los productos ya filtrados
  function ordenarYMostrarListaProductos(criterioOrden, categoriesArray) {
    criterioActual = criterioOrden;

    if (categoriesArray != undefined) {
      array = categoriesArray;
    }

    array = ordenarProductos(criterioActual, array);

    mostrarListaProductos();
  };

  // Eventos

  filtrar.addEventListener("click", function () {
    minCount = inputPrecioMin.value;
    maxCount = inputPrecioMax.value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
      minCount = parseInt(minCount);
    }
    else {
      minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
      maxCount = parseInt(maxCount);
    }
    else {
      maxCount = undefined;
    }

    ordenarYMostrarListaProductos(ordenPrecioAsc, productosArr)
  });

  // Evento que realiza una busqueda en tiempo real
  tiempoReal.addEventListener('input', () =>{
    let productosFiltrados = [];
    listado.innerHTML = ''
    for (const producto of productosArr) {
      if (producto.name.toLowerCase().includes(tiempoReal.value.toLowerCase()) || producto.description.toLowerCase().includes(tiempoReal.value.toLowerCase())) {
        productosFiltrados.push(producto)
        listado.innerHTML += crearHTML(producto)
      }
    }
  })

  limpiar.addEventListener("click", function () {
    inputPrecioMin.value = "";
    inputPrecioMax.value = "";

    minCount = undefined;
    maxCount = undefined;
    mostrarListaProductos();
  });

  btnPrecioAsc.addEventListener('click', () => {
    ordenarYMostrarListaProductos(ordenPrecioAsc, productosArr)
  });

  btnPrecioDesc.addEventListener('click', () => {
    ordenarYMostrarListaProductos(ordenPrecioDesc, productosArr)
  });

  btnCountDesc.addEventListener('click', () => {
    ordenarYMostrarListaProductos(ordenVentasDesc, productosArr)
  });
});