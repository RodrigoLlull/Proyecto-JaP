const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

// Funcion para crear de forma dinamica elementos html, con la informacion de cada auto
function insertarHTML(producto){
  return `
<div class="shadow rounded list-group-item list-group-item-action cursor-active mb-2">
  <div class="row">
      <div class="col-3">
        <img class="img-thumbnail" src="${producto.image}" alt="${producto.description}">
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
  `;
}

// al cargar la pagina, trae el JSON, lo itera y lo inserta en el elemento html seleccionado
document.addEventListener('DOMContentLoaded', async function () {
  const listado = document.querySelector('.lista-autos')
  const autos = await getJSONData(URL);
  for (let auto of autos.data.products) {
    listado.innerHTML += insertarHTML(auto)
  }
})

