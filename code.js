
//creacion de variables para el loggin de los usurios
const inputUser = document.getElementById("inputUser");
const inputPass = document.getElementById("inputPass");
const formLogin = document.getElementById("formLogin");
const validador = document.getElementById("validador");

// evento para validar el usuario y la contraseña 
formLogin.addEventListener('submit', (e) => {
     e.preventDefault();
     const usuario = inputUser.value;
     const contraseña = inputPass.value;
// se crea variable para validar el valor con nuestra db a traves de un filter 
     const filtro = cuentas.filter(val => val.usuario == usuario).filter(val => val.contraseña == contraseña);
 // si lo que capturo en la constante filtro esta en localstorage se manda a la pagina de banco     
     if(filtro.length) {
        localStorage.setItem("login", JSON.stringify(filtro));
        window.open("banco.html","_self");
// si no cuinciden los datos ingresados en el formlogin manda mensaje de error 
     }else {
        formLogin.reset();
        validador.textContent = "datos incorrectos";
     }
});

