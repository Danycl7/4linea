
    
var jugador_Rojo = "R";
var jugador_Azul = "VA";
var currJugador = jugador_Rojo;
    
var juegoTerminado = false;
var tablero;        
var currColumnas;
var filas = 6;
var columnas = 7;
    
    
window.onload = function() {
    setJuego();
    currColumnas = []
}  

function setJuego() { 
    tablero = [];
    currColumnas = [5,5,5,5,5,5,5]
    for (let f = 0; f < filas; f++) {
        let fila  = [];
        for (let c = 0; c < columnas; c++) {
            fila.push(' ');

            let hueco = document.createElement("div")
            hueco.id =  f.toString() + "-" + c.toString();
            hueco.classList.add("hueco");   
            hueco.addEventListener("click", setPieza);
            document.getElementById("tablero").append(hueco);
        }
        tablero.push(fila)
    }
}


function setPieza() {
    if (juegoTerminado) {
        return;
        }
    let coordenadas = this.id.split("-"); //"0-0" -> ["@", ""]
    let f = parseInt(coordenadas[0]);
    let c = parseInt(coordenadas[1]);
        
    f = currColumnas[c];
    if (f < 0) {
        return;
    }    
    
    tablero[f][c] = currJugador;
    let hueco = this
    if (currJugador == jugador_Rojo) {
        hueco.classList.add("pieza-rojo");
        currJugador = jugador_Azul;
    }
    else { 
        hueco.classList.add("pieza-azulvioleta");
        currJugador = jugador_Rojo;
        
    }
    f -= 1; //updating the row height for the column
    currColumnas[c] =f; //update the ar

    checarGanador();
}

function checarGanador() {
    //horizontally
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas - 3; c++) {
            if (tablero[f][c] != ' ') {
                if (tablero[f][c] == tablero[f][c+1] && tablero[f][c+1] == tablero[f][c+2] && tablero[f][c+2] == tablero[f][c+3]) {
                    setGanador(f, c);
                    return;
                }
            }
        }
    }
    
    
    //vertically
    for (let c = 0; c < columnas; c++) {
        for (let f = 0; f < filas-3; f++) {
            if (tablero[f][c] != ' ') {
                if (tablero[f][c] == tablero[f+1][c] && tablero[f+1][c] == tablero[f+2][c] && tablero[f+2][c] == tablero[f+3][c]) {
                    setGanador(f, c);
                    return;
                }
            }
        }
    }


    for (let f= 0; f < filas-3; f++){
        for (let c = 0; c<columnas- 3; c++) {
            if (tablero[f][c] != ' ') {
                if (tablero[f][c] == tablero[f+1][c+1] && tablero[f+1][c+1] == tablero[f+2][c+2] && tablero[f+2][c+2] == tablero[f+3][c+3]) {
                    setGanador(f, c);
                    return;
                }
            }
        }
    }
    //diagonally
    for (let f =3; f < filas; f++) {
        for (let c = 0; c < columnas -3; c++){
            if (tablero[f][c] != ' ') {
                if (tablero[f][c] == tablero[f-1][c+1] && tablero[f-1][c+1] == tablero[f-2][c+2] && tablero[f-2][c+2] == tablero[f-3][c+3]) {
                    setGanador(f, c);
                    return;
                }
            }
        }
    }
}


function setGanador(f, c) {
    let ganador = document.getElementById("Ganador");
    if (tablero[f][c] == jugador_Rojo) {
        ganador.innerText = "Rojo Wins";
    } else {
        ganador.innerText = "Violeta Azul Wins";
    }
    juegoTerminado = true
}