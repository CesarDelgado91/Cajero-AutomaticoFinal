const bienvenido = document.getElementById("bienvenido");
const formConsultar = document.getElementById("formConsultar");
const rSaldo = document.getElementById("rSaldo");
const inputDeposito =document.getElementById("inputDeposito");
const formDeposito = document.getElementById("formDeposito");
const pRespuestaD = document.getElementById("pRespuestaD");
const inputRetiro = document.getElementById("inputRetiro");
const formRetiro  = document.getElementById("formRetiro");
const pRespuestaR = document.getElementById("pRespuestaR");


const btnCerrar = document.getElementById("btnCerrar");


//funcion para validar que no se ingrese numeros negativos o caracteres diferentes a numerico 
function validarNum(a){
    if (a <=0 || isNaN(a)){
      return false;
    }else{
      return true;
    }
}

//funcion para cumplir con la regla de negocio que no se quede la cuenta en menos 10 y que no sobrepase a 990
function validarRegla(a){
    if(a <= 10 || a > 990){
        return false;

    }else{
        return true;
    }
}


//creamos variable  para guardar en localstorage
let userLogin = JSON.parse(localStorage.getItem("login"));


if(localStorage.getItem(userLogin[0].usuario)){
  userLogin = JSON.parse(localStorage.getItem(userLogin[0].usuario));
}

// en bienvenida agrega el nombre completo de el usuario 
bienvenido.textContent = `BIENVENIDO ${userLogin[0].nombre}` 

// evento de consultar
formConsultar.addEventListener("submit", (e) => {
    e.preventDefault();
    pRespuestaD.textContent="";
    pRespuestaR.textContent="";
    rSaldo.textContent = `tu saldo es: $${userLogin[0].saldo}`;
});

// Evento de Deposito
formDeposito.addEventListener("submit", (e) => {
    e.preventDefault();
    const saldo = Number(userLogin[0].saldo);
    const deposito = Number(inputDeposito.value);
    pRespuestaR.textContent="";
    formDeposito.reset();
    if(validarNum(deposito)) {
        const resultado = saldo+deposito;
        if(validarRegla(resultado)){
            userLogin[0].saldo = saldo+deposito;
            pRespuestaD.textContent = `se deposito nuevo saldo $${userLogin[0].saldo}`;

             localStorage.setItem(userLogin[0].usuario,JSON.stringify(userLogin));
        }else{
            pRespuestaD.textContent="no cumple con las reglas de Negocio";
             }
    }else{
        pRespuestaD.textContent="Dato invalido";
         }
    

} );


// Evento de retiro
formRetiro.addEventListener("submit", (e) =>{
    e.preventDefault();
    const saldo = Number(userLogin[0].saldo);
    const retiro = Number(inputRetiro.value);
    pRespuestaD.textContent="";
    formRetiro.reset();
    if(validarNum(retiro)){
        const resultado =saldo-retiro;
         if(validarRegla(resultado)){
            userLogin[0].saldo = saldo-retiro;
            pRespuestaR.textContent = `se retiro y su nuevo saldo $${userLogin[0].saldo}`;
        
            localStorage.setItem(userLogin[0].usuario,JSON.stringify(userLogin)); 
         }else{
            pRespuestaR.textContent="no cumple con las reglas de Negocio";
              }
    }else{
        pRespuestaR.textContent="Dato invalido";
        }
    
});





btnCerrar.addEventListener("click",() => {
    localStorage.removeItem("login");
    pRespuestaD.textContent="";
    pRespuestaR.textContent="";
    rSaldo.textContent="";
    window.open("index.html", "_self");


});

