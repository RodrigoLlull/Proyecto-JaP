// Variables
let formulario = document.querySelector('#formulario')
let imagenPerfil = document.querySelector('#imagenPerfil')
let nombre = document.querySelector('#nombre')
let segundoNombre = document.querySelector('#segundoNombre')
let apellido = document.querySelector('#apellido')
let segundoApellido = document.querySelector('#segundoApellido')
let email = document.querySelector('#email')
let agregarImagenPerfil = document.querySelector('#agregarImagenPerfil')
let telefonoContacto = document.querySelector('#telefonoContacto')
let guardarCambios = document.querySelector('#guardarCambios')


// Funciones
function setearNombreYApellido() {
    if (nombre.value !== ''){
        localStorage.setItem('nombreUsuario', nombre.value)
    }
    if (apellido.value !== ''){
        localStorage.setItem('apellidoUsuario', apellido.value)
    }
}

function validarFormulario(e) {
    if (nombre.value == '') {  
        e.preventDefault()  
        e.stopPropagation();
        nombre.classList.add('is-invalid')
        console.log(agregarImagenPerfil.flies);
    }

    if (apellido.value == '') {
        e.preventDefault()  
        e.stopPropagation();
        apellido.classList.add('is-invalid')
    }
    if (email.value == '') {
        e.preventDefault()  
        e.stopPropagation();
        email.classList.add('is-invalid')
    }
}

function cargarDatos() {
    if (localStorage.getItem('usuario')) {
        let usuario = localStorage.getItem('usuario')
        email.value = usuario
    } 
    if (localStorage.getItem('nombreUsuario')) {
        let nombreUsuario = localStorage.getItem('nombreUsuario')
        nombre.value = nombreUsuario
        
    }
    if (localStorage.getItem('apellidoUsuario')) {
        let apellidoUsuario = localStorage.getItem('apellidoUsuario')
        apellido.value = apellidoUsuario 
    } 
    if (localStorage.getItem('imagenPerfil')) {
        let imagenPerfilLS = localStorage.getItem('imagenPerfil')
        imagenPerfil
        imagenPerfil.setAttribute('src', imagenPerfilLS)
    }
}


document.addEventListener('DOMContentLoaded', () => { 
    cargarDatos()

    
})


formulario.addEventListener('submit', (e) => {
    setearNombreYApellido()
    validarFormulario(e)
})

agregarImagenPerfil.addEventListener('change', () => {
    const lector = new FileReader();
    lector.addEventListener('load', ()=>{
        localStorage.setItem('imagenPerfil', lector.result)
    })
    lector.readAsDataURL(agregarImagenPerfil.files[0]);
    
})

