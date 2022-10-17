const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function eliminarUsuario(){
  window.localStorage.removeItem('usuario');
}

//Funcion que crea el cotenido HTML con los datos del usuario
function usuarioBarraNavegacion(usuario) {
  return `
  <div class="dropdown">
  <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">${usuario}
  </a>

  <ul class="dropdown-menu bg-dark bg-gradient" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item text-light" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item text-light" href="my-profile.html">Mi perfil</a></li>
    <li onclick='eliminarUsuario()'><a onclick='eliminarUsuario()' class="dropdown-item text-light" href="">Cerrar sesión</a></li>
  </ul>
  </div>
  `
};

// Al cargar el DOM, insertamos el cotenido html 
document.addEventListener("DOMContentLoaded", () => {

  let usuario = document.getElementById("usuario");
  let usuarioIngresado = localStorage.getItem("usuario");
  
  usuario.innerHTML += usuarioBarraNavegacion(usuarioIngresado);

});