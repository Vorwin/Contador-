let Tr = Date.now();
let cronometro = false; 
let acumulado = 0;
let vueltas = [];
 

//intervalo para el cronometro principal
setInterval(() => {

    let tiempo = document.getElementById("crono");

    if(cronometro){
        acumulado += Date.now()-Tr
    }
    Tr = Date.now();
    tiempo.innerHTML = formatear_tiempo(acumulado);
}, 1000/60);



function formatear_tiempo(ms) {
    let MS = ms%1000;
    let S = Math.floor(((ms-MS) / 1000) %60);
    let M = Math.floor((S/60) %60);
    let H = Math.floor((M/60));


    Number.prototype.ceros = function (n) {
        return (this+"").padStart(n,0)
    }
    return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2) + ":" + MS.ceros(3)
}

function iniciar(){
    cronometro = true;
}

function pausar(){
    cronometro = false; 
}

function reiniciar(){

    if (acumulado == 0) {
        cronometro = true; 
    }else{
        acumulado = 0; 
    }
}

function stop(){
    acumulado = 0; 
    cronometro = false; 
}

//funcionalidad de vuelta
function vuelta() {
    if (cronometro) {
        vueltas.push(acumulado);
        acumulado = 0;

        //mostrar la vuelta
        const vueltasDiv = document.getElementById("vueltas");
        const vueltasList = vueltasDiv.querySelector("ol");
        const li = document.createElement("li");
        li.textContent = formatear_tiempo(acumulado);
        vueltasList.appendChild(li);
    }
}

//funcionalidad de borrar vuelta
function borrarVuelta() {
    vueltas = [];
}


//actualizar la lista de vueltas
function actualizarVueltas() {
    const vueltasDiv = document.getElementById("vueltas");
    const vueltasList = vueltasDiv.querySelector("ol");
    vueltasList.innerHTML = "";

    for (const vuelta of vueltas) {
        const li = document.createElement("li");
        li.textContent = formatear_tiempo(vuelta);
        vueltasList.appendChild(li);
    }
}

//actualizar la lista de vueltas cada segundo
setInterval(actualizarVueltas, 1000);