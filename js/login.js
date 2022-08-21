document.addEventListener('DOMContentLoaded', () =>{
    const correo = document.querySelector('#correo');
    const contraseña = document.querySelector('#contraseña');
    const iniciarSesion = document.querySelector('#iniciarSesion');

    iniciarSesion.addEventListener('click', (e) => {
        e.preventDefault();    
        if (correo.value == '' || contraseña.value == '') {
                correo.classList.add("error")
                contraseña.classList.add("error")
                alert('Ambos campos son obligatorios')         
        }else{
                window.location = "portada.html";
        }
    })
})