// Importa las funciones necesarias para la autenticacion con Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries

document.addEventListener('DOMContentLoaded', () =>{
    const correo = document.querySelector('#correo');
    const contraseña = document.querySelector('#contraseña');
    const iniciarSesion = document.querySelector('#iniciarSesion');
    
    function guardarDatos(){
        localStorage.setItem('usuario', correo.value);
    };

    iniciarSesion.addEventListener('click', (e) => {
        e.preventDefault();    
        if (correo.value == '' || contraseña.value == '') {
            correo.classList.add("error")
            contraseña.classList.add("error")
            alert('Ambos campos son obligatorios')         
        }else{
              guardarDatos();
              window.location = "index.html"
        };
    });
});




/*
// Configuracion de la web con Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNsqOCxfBmCOry7i8JGr3yY1XVHGYWhBQ",
  authDomain: "auth-31fc3.firebaseapp.com",
  projectId: "auth-31fc3",
  storageBucket: "auth-31fc3.appspot.com",
  messagingSenderId: "327349259118",
  appId: "1:327349259118:web:4176779c41d706345b0f7f"
};

// Inicia Firebase
const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);

document.addEventListener('click', () =>{
  signInWithRedirect(auth, provider);
  
  getRedirectResult(auth)
  .then((result) => {
  // Genera un token para poder acceder a tu cuenta de google. Esto nos permite acceder a las APIs de Google.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  
  // Informacion del usuario registrado.
  const user = result.user;
  }).catch((error) => {
  // Control de errores.
  const errorCode = error.code;
  const errorMessage = error.message;
  // correo de la cuenta del usuario utilizado.
  const email = error.customData.email;
  // tipo de AuthCredential utilizado.
  const credential = GoogleAuthProvider.credentialFromError(error);
  });
}) */