document.addEventListener('DOMContentLoaded', async()=>{

   // se trae el producto por la siguiente url y se almacena en una variable
   let listado = document.querySelector('#infoCompra')
   let urlProductoCarrito = 'https://japceibal.github.io/emercado-api/user_cart/25801.json'
   let productoCarrito = await getJSONData(urlProductoCarrito)
   let carritoData = productoCarrito.data.articles
   console.log(carritoData[0].id);

   // variables que almacenan los tipos de envio
   let premium = document.querySelector('#premium')
   let express = document.querySelector('#express')
   let standard = document.querySelector('#standard')

   // nombre del usuario y boton para cambiar de cuenta
   let infoUsuario = document.querySelector('#infoUsuario')

   // crea el producto traido desde la url
   function generarProductoComprado(producto){
      return `
            <tr >
                <td class="col-2"><img src="${producto.image}" class="img-fluid"/></td>
                <td class="col-2 text-center"><strong>${producto.name}<strong></td>
                <td class="col-2 text-center"><strong>${producto.currency} </strong><span id="precioProducto">${producto.unitCost}</span></td>
                <td class="col-2"> <input type="number" min="1" class=" form-control" id="inputCantidad" value="${producto.count}"></td>
                <td class="col-2 text-center"><strong>${producto.currency}</strong> <span id="subTotal">${producto.unitCost}</span></td> 
            </tr>
      `     
   }

   // implementa el nombre del usuario y la opcion de cambiar de cuenta
   function crearInfoUsuario(){
      return`
      <p>${localStorage.getItem("usuario")}</p>
      <a onclick='eliminarUsuario()' href="">Cambiar cuenta</a>
      `
   }
   
   // agrega a la pagina el contenido html del producto traido por la url
   function crearHTML(){
      listado.innerHTML += generarProductoComprado(carritoData[0])
      infoUsuario.innerHTML += crearInfoUsuario()
   }
   crearHTML()

   // Variables utilizadas para alterar el valor subtotal del producto en base a la cantidad
   let precioProducto = document.querySelector('#precioProducto')
   let inputCantidad = document.querySelector('#inputCantidad')
   let subTotal = document.querySelector('#subTotal')   

   // altera el valor subtotal del producto en base a la cantidad del mismo
   inputCantidad.addEventListener('input', () => { 
      subTotal.innerHTML = inputCantidad.value*parseInt(precioProducto.textContent)  
   })

   // PRECIO TOTAL DEL PRODUCTO
   let precioTotal = document.querySelector('#costoTotal')
   
   //altera el valor TOTAL del producto en base al tipo de envio
   premium.addEventListener('input', () => { 
      precioTotal.innerHTML = parseInt(subTotal.textContent) + parseInt(precioProducto.textContent)*15/100
   })

   express.addEventListener('input', () => { 
      precioTotal.innerHTML = parseInt(subTotal.textContent) + parseInt(precioProducto.textContent)*7/100
   })

   standard.addEventListener('input', () => { 
      precioTotal.innerHTML = parseInt(subTotal.textContent) + parseInt(precioProducto.textContent)*5/100
   })

})