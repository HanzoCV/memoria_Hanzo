"use strict";

// Inicialización de variables:
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 35;
let timerInicial = timer;
let tiempoRegresivoId = null;

// Apuntando a documento HTML:
const mostrarMovimientos = document.getElementById('movimientos');
const mostrarAciertos = document.getElementById('aciertos');
const mostrarTiempo = document.getElementById('t-restante');

// Generación de números aleatorios:
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
// numeros = numeros.sort(() => { return Math.random()-0.5 });
mezclarArreglo(numeros)
// console.log(numeros);

// Función principal:
function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    // console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1){
        //Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;
        //Deshabilitar primer botón
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        //Deshabilitar segundo botón
        tarjeta2.disabled = true;

        //Incrementar movimentos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            //Reiniciar el contador de tarjetas destapadas:
            tarjetasDestapadas = 0;
            //Aumentar aciertos:
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🎉🎊🎉🎊`;
                mostrarTiempo.innerHTML = `¡Genial! 🥇💎🎇🎆 Te tomó ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🫅🏆`;
            }
        } else {
            //Mostrar momentáneamente valores y volver a ocultar:
            setTimeout(() => {
                tarjeta1.innerHTML = "";
                tarjeta2.innerHTML = "";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}


// Funciones secundarias:
function mezclarArreglo (arreglo) {
	for (let i = arreglo.length - 1; i > 0; i--) {
		let indiceAleatorio = Math.floor(Math.random() * (i + 1));
		let temporal = arreglo[i];
		arreglo[i] = arreglo[indiceAleatorio];
		arreglo[indiceAleatorio] = temporal;
	}
};

function contarTiempo(){
    tiempoRegresivoId = setInterval( () => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            alert('¡sigue participando,jijijiji!');
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}