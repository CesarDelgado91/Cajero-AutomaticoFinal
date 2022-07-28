
//se declaran variables con 
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


//guardamos en localstorage y se pone como variable let por la modificacion en el arreglo
let userLogin = JSON.parse(localStorage.getItem("login"));

// si se realizo un movimiento en saldo se guarda en localstorage y al abrir de nuevo la cuenta se queda guardado el ultimo dato
if(localStorage.getItem(userLogin[0].usuario)){
  userLogin = JSON.parse(localStorage.getItem(userLogin[0].usuario));
}

// en bienvenida agrega el nombre completo de el usuario 
bienvenido.textContent = `BIENVENIDO(A) ${userLogin[0].nombre}` 

// evento de consultar
formConsultar.addEventListener("submit", (e) => {
    e.preventDefault();
    pRespuestaD.textContent="";
    pRespuestaR.textContent="";
    rSaldo.textContent = `Tu Saldo es: $${userLogin[0].saldo}`;
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
            pRespuestaD.textContent = `Se realizo un deposito su nuevo saldo es $${userLogin[0].saldo}`;

             localStorage.setItem(userLogin[0].usuario,JSON.stringify(userLogin));
        }else{
            pRespuestaD.textContent="No cumple con las reglas de Negocio ingrese otra cantidad que no supere los 990";
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
            pRespuestaR.textContent = `Se retiro y su nuevo saldo $${userLogin[0].saldo}`;
        
            localStorage.setItem(userLogin[0].usuario,JSON.stringify(userLogin)); 
         }else{
            pRespuestaR.textContent="No cumple con las reglas de Negocio su cuenta no puede quedar en menos de $10";
              }
    }else{
        pRespuestaR.textContent="Dato invalido";
        }
    
});




// evento para cerrar seccion de usuario
btnCerrar.addEventListener("click",() => {
    localStorage.removeItem("login");
    pRespuestaD.textContent="";
    pRespuestaR.textContent="";
    rSaldo.textContent="";
    window.open("index.html", "_self");


});

