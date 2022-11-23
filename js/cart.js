document.addEventListener('DOMContentLoaded', async () => {

   // se trae el producto por la siguiente url y se almacena en una variable
   let listado = document.querySelector('#infoCompra');
   let urlProductoCarrito = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
   let productoCarrito = await getJSONData(urlProductoCarrito);
   let carritoData = productoCarrito.data.articles;
   carritoData = carritoData[0];


   // variables que almacenan los tipos de envio
   let premium = document.querySelector('#premium');
   let express = document.querySelector('#express');
   let standard = document.querySelector('#standard');

   // nombre del usuario y boton para cambiar de cuenta
   let infoUsuario = document.querySelector('#infoUsuario');


   // Variables que capturan inputs de modal
   let tarjetaCredito = document.querySelector('#tarjetaCredito');
   let numeroTarjeta = document.querySelector('#numeroTarjeta');
   let codigoSeg = document.querySelector('#codigoSeg');
   let vencimiento = document.querySelector('#vencimiento');
   let transferenciaBancaria = document.querySelector('#transferenciaBancaria');
   let numeroCuenta = document.querySelector('#numeroCuenta');
   let formaPagoTarjeta = document.querySelector('#formaPagoTarjeta');
   let formaPagoBanco = document.querySelector('#formaPagoBanco');
   let seleccionarFormaPago = document.querySelector('#seleccionarFormaPago')


   // deshabilita o habilita los inputs correctos en base al unput radio seleccionado
   function modal() {
      transferenciaBancaria.addEventListener('click', () => {
         if (transferenciaBancaria.checked) {
            numeroTarjeta.disabled = true
            codigoSeg.disabled = true
            vencimiento.disabled = true
            numeroCuenta.disabled = false
            formaPagoBanco.classList.remove('d-none')
            formaPagoTarjeta.classList.add('d-none')
         };
      });

      tarjetaCredito.addEventListener('click', () => {
         if (tarjetaCredito.checked) {
            numeroTarjeta.disabled = false
            codigoSeg.disabled = false
            vencimiento.disabled = false
            numeroCuenta.disabled = true
            formaPagoTarjeta.classList.remove('d-none')
            formaPagoBanco.classList.add('d-none')
         };
      });
   }
   modal();


   // muestro el valor de UYU en dolares 
   function convertirUYUADolares(currency, cost) {
      let valorDolar = 41

      if (currency === 'UYU') {
         let total = cost / valorDolar
         return Math.trunc(total)

      } else {
         return cost
      };

   };


   // crea el producto traido desde la url y del local storage
   let productoLocalStorage = JSON.parse(localStorage.getItem('productoCarrito'));
   productoLocalStorage = Object.values(productoLocalStorage);
   function generarProductoComprado(productoServidor, infoLocalStorage) {
      let carrito = `
            <tr id ="tr${productoServidor.id}">
                <td class="col-3 col-md-2"><img src="${productoServidor.image}" class="img-fluid"/></td>
                <td class="col-1 col-md-2 text-center"><strong>${productoServidor.name}<strong></td>
                <td class="col-1 col-md-2 text-center"><strong>${productoServidor.currency}</strong><br/><span id="precioProducto${productoServidor.id}">${productoServidor.unitCost}</span></td>
                <td class="col-md-3 "> <input type="number" min="1" class=" form-control" id="inputCantidadURL${productoServidor.id}" value="${productoServidor.count}"></td>
                <td class="col-1 col-md-2 text-center"><strong>${productoServidor.currency}</strong><br><span id="subTotalProducto${productoServidor.id}">${productoServidor.unitCost}</span></td>
                <td class="col-1 col-md-2 "><button class="btn btn-danger" id='btnEliminar${productoServidor.id}'><img src='img/trash.svg'></button></td>
            </tr>
      `;

      for (const producto of infoLocalStorage) {
         carrito += `
            <tr id ="tr${producto.id}">
                <td class="col-3 col-md-2"><img src="${producto.image}" class="img-fluid"/></td>
                <td class="col-1 col-md-2 text-center "><strong>${producto.name}<strong></td>
                <td class="col-1 col-md-2 text-center"><strong>USD</strong><br/><span id="precioProductoLS${producto.id}">${convertirUYUADolares(producto.currency, producto.cost)}</span></td>
                <td class="col-3 col-md-2 "> <input type="number" min="1" class="form-control" id="inputCantidadLS${producto.id}" value="${producto.unitCount}"></td>
                <td class="col-1 col-md-2 text-center "><strong>USD<br></strong><span id="subTotalProductoLS${producto.id}">${convertirUYUADolares(producto.currency, producto.cost)}</span></td>
                <td class="col-1 col-md-2"><button class="btn btn-danger" id='btnEliminar${producto.id}'><img src='img/trash.svg'></button></td>
            </tr>
         `
      };
      return carrito;
   };

   // implementa el nombre del usuario y la opcion de cambiar de cuenta
   function crearInfoUsuario() {
      return `
      <p>${localStorage.getItem("usuario")}</p>
      <a onclick='eliminarUsuario()' href="">Cambiar cuenta</a>
      `
   };

   // agrega a la pagina el contenido html del producto traido por la url y el local storage
   function crearHTML() {
      listado.innerHTML += generarProductoComprado(carritoData, productoLocalStorage);
      infoUsuario.innerHTML += crearInfoUsuario();
   };
   crearHTML();

   // Variables utilizadas para alterar el valor subtotal del producto(url) en base a la cantidad
   let precioProducto = document.querySelector(`#precioProducto${carritoData.id}`);
   let inputCantidadURL = document.querySelector(`#inputCantidadURL${carritoData.id}`);
   let subTotalProducto = document.querySelector(`#subTotalProducto${carritoData.id}`);

   let costoEnvio = document.querySelector('#costoEnvio');
   let subTotalCompra = document.querySelector('#subTotalCompra');


   // suma los subtotales de cada producto del local storage y la url
   function suma() {
      let suma = parseInt(subTotalProducto.textContent)
      
      for (const producto of productoLocalStorage) {

         let subTotalProductoLS = document.querySelector(`#subTotalProductoLS${producto.id}`);

         suma += parseInt(subTotalProductoLS.textContent);
      };
      return suma;
   };

 // altera el valor subtotal del producto(LS) en base a la cantidad del mismo
   function precioSegunCantidadLS() {

      for (const producto of productoLocalStorage) {
         let precioProductoLS = document.querySelector(`#precioProductoLS${producto.id}`);
         let inputCantidadLS = document.querySelector(`#inputCantidadLS${producto.id}`);
         let subTotalProductoLS = document.querySelector(`#subTotalProductoLS${producto.id}`);

         inputCantidadLS.addEventListener('input', () => {

            subTotalProductoLS.innerHTML = inputCantidadLS.value * parseInt(precioProductoLS.textContent);

            subTotalCompra.innerHTML = suma();

            if (premium.checked) {
               costoEnvio.innerHTML = Math.ceil((parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent)) * 15 / 100);
               precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
            };
            if (express.checked) {
               costoEnvio.innerHTML = Math.ceil((parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent)) * 7 / 100);
               precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
            };
            if (standard.checked) {
               costoEnvio.innerHTML = Math.ceil((parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent)) * 5 / 100);
               precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
            };
         });
      };
   };
   precioSegunCantidadLS();

   // altera el valor subtotal del producto(url) en base a la cantidad del mismo
   function precioSegunCantidadServidor() {
      inputCantidadURL.addEventListener('input', () => {
         subTotalProducto.innerHTML = inputCantidadURL.value * parseInt(precioProducto.textContent);
         subTotalCompra.innerHTML = suma();
         if (premium.checked) {
            costoEnvio.innerHTML = Math.ceil((parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent)) * 15 / 100);
            precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
         };
         if (express.checked) {
            costoEnvio.innerHTML = Math.ceil((parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent)) * 7 / 100);
            precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
         };
         if (standard.checked) {
            costoEnvio.innerHTML = Math.ceil(suma() * 5 / 100);
            precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
         };
      });

      subTotalCompra.innerHTML = inputCantidadURL.value * parseInt(suma());
   };
   precioSegunCantidadServidor();

   // variables utilizadas para las validaciones del formulario
   let finalizarCompra = document.querySelector('#finalizarCompra');
   let calle = document.querySelector('#calle');
   let numero = document.querySelector('#numero');
   let esquina = document.querySelector('#esquina');
   let tiposEnvio = document.querySelector('#tiposEnvio');

   let inputs = listado.getElementsByTagName('input');
   
   // evento que valida el formulario
   let validar = true;
   finalizarCompra.addEventListener('submit', (e) => {

      // evalua si los input radio de tipo de envio estan chequeados
      if ((premium.checked || express.checked || standard.checked) == false) {
         e.stopPropagation();
         e.preventDefault();
         premium.classList.add('is-invalid');
         express.classList.add('is-invalid');
         standard.classList.add('is-invalid');
         tiposEnvio.classList.add('text-danger');
         validar = false;
      };

      // evalua si el input calle esta vacio
      if (calle.value == '') {
         e.stopPropagation();
         e.preventDefault();
         calle.classList.add('is-invalid');
         validar = false;
      };

      // evalua si el input numero esta vacio
      if (numero.value == '') {
         e.stopPropagation();
         e.preventDefault();
         numero.classList.add('is-invalid');
         validar = false;
      };

      // evalua si el input esquina esta vacio
      if (esquina.value == '') {
         e.stopPropagation();
         e.preventDefault();
         esquina.classList.add('is-invalid');
         validar = false;
      };

      //itera los input de cantidad de cada producto(url y LS) y evalua que su valor no sea menor que 1
      for (const input of inputs) {
         if (input.value <= 0) {
            e.stopPropagation();
            e.preventDefault();
            input.classList.add('is-invalid');
            validar = false;
         };
         if (input.value >= 1) {
            input.classList.remove('is-invalid');
         };
      };

      //evalua si los input radio de tarjeta de credito y transferencia bancaria estan chuequeados
      if (tarjetaCredito.checked == false && transferenciaBancaria.checked == false) {
         e.stopPropagation();
         e.preventDefault();
         tarjetaCredito.classList.add('is-invalid');
         transferenciaBancaria.classList.add('is-invalid');
         seleccionarFormaPago.classList.add('is-invalid');
         numeroTarjeta.classList.add('is-invalid');
         codigoSeg.classList.add('is-invalid');
         vencimiento.classList.add('is-invalid');
         numeroCuenta.classList.add('is-invalid');
         validar = false;
      };

      //evalua si el input numero de tarjeta esta vacio
      if (tarjetaCredito.checked && numeroTarjeta.value == '') {
         e.stopPropagation();
         e.preventDefault();
         numeroTarjeta.classList.add('is-invalid');
         validar = false;
      };

      //evalua si el input codigo de seguridad esta vacio
      if (tarjetaCredito.checked && codigoSeg.value == '') {
         e.stopPropagation();
         e.preventDefault();
         codigoSeg.classList.add('is-invalid');
         validar = false;
      };

      //evalua si el input vencimiento esta vacio
      if (tarjetaCredito.checked && vencimiento.value == '') {
         e.stopPropagation();
         e.preventDefault();
         vencimiento.classList.add('is-invalid');
         validar = false;
      };

      //evalua si el input numero de cuenta esta vacio
      if (transferenciaBancaria.checked && numeroCuenta.value == '') {
         e.stopPropagation();
         e.preventDefault();
         numeroCuenta.classList.add('is-invalid');
         validar = false;
      };

      //evalua si la compra puede realizarse con exito
      if (validar) {
         let bien = document.querySelector('#alertFormSuccess') ; 
         bien.classList.remove('d-none');
         e.stopPropagation();
         e.preventDefault();
      };
   });

   // PRECIO TOTAL DEL PRODUCTO
   let precioTotal = document.querySelector('#costoTotal');

   //determina el costo de envio en base a su tipo, ademas de el valor total de la compra
   function valorEnvioYTotal() {
      premium.addEventListener('input', () => {
         costoEnvio.innerHTML = parseInt(Math.ceil(subTotalCompra.textContent) * 0.15);
         precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
      });

      express.addEventListener('input', () => {
         costoEnvio.innerHTML = parseInt(Math.ceil(subTotalCompra.textContent) * 0.07);
         precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
      });

      standard.addEventListener('input', () => {
         costoEnvio.innerHTML = parseInt(Math.ceil(subTotalCompra.textContent) * 0.05);
         precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent) + parseInt(costoEnvio.textContent);
      });
   };
   valorEnvioYTotal();

   function eliminarProducto(productoServidor, productoStorage) {
      let btnEliminarServidor = document.querySelector(`#btnEliminar${productoServidor.id}`);
      let trServidor = document.querySelector(`#tr${productoServidor.id}`)
      let subTotalProductoServidor = document.querySelector('#subTotalProducto50924')

      btnEliminarServidor.addEventListener('click', () => {

         trServidor.remove();
         subTotalProductoServidor.textContent = 0

         subTotalCompra.innerHTML = subTotalCompra.textContent - productoServidor.unitCost

         if (premium.checked) {
            costoEnvio.innerHTML = Math.ceil(subTotalCompra.textContent * 15 / 100);
            precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent);
         };
         if (express.checked) {
            costoEnvio.innerHTML = Math.ceil(subTotalCompra.textContent * 7 / 100);
            precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent);
         };
         if (standard.checked) {
            costoEnvio.innerHTML = Math.ceil(subTotalCompra.textContent * 5 / 100);
            precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent);
         };
  
      });

      for (const producto of productoStorage) {
         let btnEliminarStorage = document.querySelector(`#btnEliminar${producto.id}`)
         
         btnEliminarStorage.addEventListener('click', () => {
            let precioProductoLS = document.querySelector(`#precioProductoLS${producto.id}`);
            let carroModificado = JSON.parse(localStorage.getItem('productoCarrito'))
                delete carroModificado[producto.id]
                localStorage.setItem("productoCarrito", JSON.stringify(carroModificado))

                document.querySelector(`#tr${producto.id}`).remove();

                subTotalCompra.innerHTML = subTotalCompra.textContent - precioProductoLS.textContent

               if (premium.checked) {
                  costoEnvio.innerHTML = Math.ceil(subTotalCompra.textContent * 15 / 100);
                  precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent);
               };
               if (express.checked) {
                  costoEnvio.innerHTML = Math.ceil(subTotalCompra.textContent * 7 / 100);
                  precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent);
               };
               if (standard.checked) {
                  costoEnvio.innerHTML = Math.ceil(subTotalCompra.textContent * 5 / 100);
                  precioTotal.innerHTML = parseInt(subTotalCompra.textContent) + parseInt( costoEnvio.textContent);
               };
                
         })
      };
      
   };
   eliminarProducto(carritoData, productoLocalStorage);
});