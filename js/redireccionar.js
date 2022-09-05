function redireccionar(){
    if (!localStorage.getItem('usuario')) {
        window.location = 'login.html'
    };
};

redireccionar();