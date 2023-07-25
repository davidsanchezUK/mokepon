// Objects & Variables
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const botonMascotaJugador = document.getElementById('boton-mascota')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionAtaqueJugador = document.getElementById('ataquesDelJugador')
const sectionAtaqueEnemigo = document.getElementById('ataquesDelEnemigo')
const sectionResultado = document.getElementById('resultado')
const botonReiniciar = document.getElementById('reiniciar')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorPersonajes = document.getElementById('personajes')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let opcionDeMokepones;
let opcionDeAtaques;
let spanMascotaJugador;
let spanMascotaEnemigo;
let inputleoHerido;
let inputchocolata;
let inputbalto;
let mascotaJugador;
let mascotaEnemigo;
let imagenjugador;
let imagenEnemigo;
let arrayRandom;
let identificadorArray;
let ataquesMascotaJugador= [];
let ataquesMascotaEnemigo = [];
let turno = 0;
let ataqueJugador = []
let ataqueEnemigo = []
let tipoAtaqueJugador;
let tipoAtaqueEnemigo;
let indexAtaqueEnemigo;
let indexAtaqueJugador;
let marcador;
let vidasJugador;
let vidasEnemigo;
let botones = []
let botonFuego; 
let botonAgua;
let botonTierra;
let lienzo = mapa.getContext("2d")
let intervalo;
let mapaBackground = new Image()
mapaBackground = './Assets/mokemap.png'

// Banco de personajes

class Mokepon {
    constructor(id, nombre, tipo, foto, vida){
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.foto = foto
        this.vida = vida
        this.ataque = []
        this.x = 20
        this.y = 30
        this.width = 80
        this.height = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let leoHerido = new Mokepon ('id_L','Leo Herido','Agua 🌊', './Assets/leoHerido.png', 3)
let chocolata = new Mokepon ('id_C', 'Chocolata','Fuego 🔥', './Assets/chocolata.png', 3)
let balto = new Mokepon ('id_B', 'Balto','Tierra 🪴', './Assets/balto.png', 3)

leoHerido.ataque.push(
    {nombre: '🌊', id: 'boton-agua',},
    {nombre: '🌊', id: 'boton-agua',},
    {nombre: '🌊', id: 'boton-agua',},
    {nombre: '🌊', id: 'boton-agua',},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '🪴', id: 'boton-tierra',}
)

chocolata.ataque.push(
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🌊', id: 'boton-agua',},
    {nombre: '🌊', id: 'boton-agua',},
    {nombre: '🪴', id: 'boton-tierra',},
    {nombre: '🪴', id: 'boton-tierra',}
)

balto.ataque.push(
    {nombre: '🪴', id: 'boton-tierra',},
    {nombre: '🪴', id: 'boton-tierra',},
    {nombre: '🪴', id: 'boton-tierra',},
    {nombre: '🪴', id: 'boton-tierra',},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🔥', id: 'boton-fuego',},
    {nombre: '🌊', id: 'boton-agua',},
    {nombre: '🌊', id: 'boton-agua',}
)

mokepones.push(leoHerido, chocolata, balto)

// Comienza algoritmo

window.addEventListener('load', iniciarJuego)

function aleatorio (min, max) {
    let arr = []
    for (let i = min; i < max+1; i++) {
        arr.push(i) 
    }

    let result = []

    for (let i = 0; i < max+1; i++) {
        const random = Math.floor(Math.random() * (max - i));
        result.push(arr[random]);
        arr[random] = arr[max - i];
    }
    return result;
}

function iniciarJuego() {
    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.id}>
            <label class="tarjeta-mokepon" for=${Mokepon.id}>
                <p>${Mokepon.nombre}<br>(${Mokepon.tipo})</p>  
                <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
            </label>
                `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputleoHerido = document.getElementById('id_L');
        inputchocolata = document.getElementById('id_C');
        inputbalto = document.getElementById('id_B');  
    })

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    botonReiniciar.style.display = 'none'  
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador) 
    botonReiniciar.addEventListener('click',reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none' 
    iniciarMapa()


    // sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputleoHerido.checked) {
        spanMascotaJugador = leoHerido.nombre
        imagenjugador = leoHerido.foto
        mascotaJugador = leoHerido.id
        vidasJugador = leoHerido.vida
        identificadorArray = 0
    } else if (inputchocolata.checked){
        spanMascotaJugador = chocolata.nombre
        imagenjugador = chocolata.foto
        mascotaJugador = chocolata.id
        vidasJugador = chocolata.vida
        identificadorArray = 1
    } else if (inputbalto.checked){
        spanMascotaJugador = balto.nombre
        imagenjugador = balto.foto
        mascotaJugador = balto.id
        vidasJugador = balto.vida
        identificadorArray = 2
    } else {
        alert("Selecciona un personaje")
        reiniciarJuego()
    }
    extraerAtaques(mascotaJugador)
    seleccionMascotaEnemigo() 
    mostrarPersonajes()   
}

function mostrarPersonajes() {
    const mostrarPersonajes = `
    <div>
            <p>${spanMascotaJugador}</p>
            <img class="imagenMascota" src="${imagenjugador}" alt="${spanMascotaJugador}">
        </div>
        <div>
            <p>VS</p>
        </div>
        <div>
            <p>${spanMascotaEnemigo}</p>
            <img class="imagenMascota" src="${imagenEnemigo}" alt="${spanMascotaEnemigo}">
    </div>
            `
    contenedorPersonajes.innerHTML = mostrarPersonajes
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].id){
            ataques = mokepones[i].ataque
        }
    }
    ataquesMascotaJugador = ataques

    ataques.forEach((ataque) => {
        opcionDeAtaques =`
        <button class="boton-ataque BAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `  
        contenedorAtaques.innerHTML += opcionDeAtaques
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones = document.querySelectorAll('.BAtaque')
}

function seleccionMascotaEnemigo(){
    let random = []
    random = aleatorio(0, mokepones.length)

    let mascotaAleatoria = random[turno]

    if (mascotaAleatoria === identificadorArray) {
        mascotaAleatoria = mascotaAleatoria++
        seleccionMascotaEnemigo()
    } else {
        mascotaEnemigo = mokepones[mascotaAleatoria].id
        vidasEnemigo = mokepones[mascotaAleatoria].vida
        ataquesMascotaEnemigo = mokepones[mascotaAleatoria].ataque
        spanMascotaEnemigo = mokepones[mascotaAleatoria].nombre
        imagenEnemigo = mokepones[mascotaAleatoria].foto

        secuenciaAtaque()
    }
}

function secuenciaAtaque() {
    spanVidasJugador.innerHTML = ` <h2>${vidasJugador}  Vidas</h2>`
    spanVidasEnemigo.innerHTML = ` <h2>${vidasEnemigo}  Vidas</h2>`

    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == '🌊') {
                ataqueJugador.push('Agua 🌊')
                boton.style.background = '#40513B'
                boton.disabled = true
                tipoAtaqueJugador = 1
            } else if (e.target.textContent == '🔥') {
                ataqueJugador.push('Fuego 🔥')
                boton.style.background = '#40513B'
                boton.disabled = true
                tipoAtaqueJugador = 2
            } else {
                ataqueJugador.push('Tierra 🪴')
                boton.style.background = '#40513B'
                boton.disabled = true
                tipoAtaqueJugador = 3
            }
            aleatoridadAtaqueEnemigo()
        })
    });
    arrayRandom = aleatorio(0, ataquesMascotaEnemigo.length-1)
}

function aleatoridadAtaqueEnemigo(){
        let indexAtaqueEnemigo = arrayRandom[turno]
        let identificadorAtaque = ataquesMascotaEnemigo[indexAtaqueEnemigo]
                
        if (identificadorAtaque.nombre === '🌊') {
            ataqueEnemigo.push('Agua 🌊')
            tipoAtaqueEnemigo = 1
        }else if (identificadorAtaque.nombre === '🔥') {
            ataqueEnemigo.push('Fuego 🔥')
            tipoAtaqueEnemigo = 2
        }else {
            ataqueEnemigo.push('Tierra 🪴')
            tipoAtaqueEnemigo = 3
        }
    batalla()
}

function batalla (){
    if (vidasJugador > 0 && vidasEnemigo > 0) {
        // console.log(ataqueJugador[turno], ataqueEnemigo[turno])
        var juego = tipoAtaqueEnemigo - tipoAtaqueJugador;
    
        if (juego == 0) {
            marcador = "EMPATE"
        } else if (juego == -1 || juego == 2) {
            marcador = "GANA"
            vidasEnemigo--
        } else {
            marcador = "PIERDE" 
            vidasJugador--
        }
        crearMensaje(marcador)
    }    
    turno ++
    revisarVidas()
}

function crearMensaje (mensaje){
    // let nuevoAtaqueDelJugador = document.createElement('p')
    // let nuevoAtaqueDelEnemigo = document.createElement('p')

    // nuevoAtaqueDelJugador.innerHTML = ataqueJugador[turno]
    // nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo[turno]
    
    // sectionAtaqueJugador.appendChild(nuevoAtaqueDelJugador)
    // sectionAtaqueEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    sectionAtaqueJugador.innerHTML = ataqueJugador [turno]
    sectionAtaqueEnemigo.innerHTML = ataqueEnemigo [turno]
    sectionResultado.innerHTML = mensaje
}

function revisarVidas(){
    spanVidasJugador.innerHTML = ` <h2>${vidasJugador}  Vidas</h2>`
    spanVidasEnemigo.innerHTML = ` <h2>${vidasEnemigo}  Vidas</h2>`

    if (vidasEnemigo == 0){
        crearMensajeFinal ("FIN DEL JUEGO - GANASTE 🎉.")
        sectionAtaqueJugador.innerHTML = ""
        sectionAtaqueEnemigo.innerHTML = ""
    } else if (vidasJugador == 0){
        crearMensajeFinal ("FIN DEL JUEGO - PIERDES 🥵.")
        sectionAtaqueJugador.innerHTML = ""
        sectionAtaqueEnemigo.innerHTML = ""
    } else if (vidasEnemigo+vidasJugador > 0 & ataquesMascotaJugador.length == turno) {
        crearMensajeFinal ("Es un Empate 🥶, REVANCHA?")
        sectionAtaqueJugador.innerHTML = ""
        sectionAtaqueEnemigo.innerHTML = ""
    }

}

function crearMensajeFinal (resultadoFinal){    
    sectionResultado.innerHTML = resultadoFinal    
    botonFuego.disabled = true    
    botonAgua.disabled = true    
    botonTierra.disabled = true    
    botonReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function pintarCanvas(){
    leoHerido.x = leoHerido.x + leoHerido.velocidadX
    leoHerido.y = leoHerido.y + leoHerido.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        leoHerido.mapaFoto,
        leoHerido.x,
        leoHerido.y,
        leoHerido.width,
        leoHerido.height
        )
}

function moverR(){
    leoHerido.velocidadX = 5
}

function moverL(){
    leoHerido.velocidadX = -5
}

function moverU(){
    leoHerido.velocidadY = -5
}

function moverD(){
    leoHerido.velocidadY = 5
}

function detenerMovimiento(){
    leoHerido.velocidadX = 0
    leoHerido.velocidadY = 0
}

function keyDownPressed (event){
        switch (event.key) {
            case 'ArrowUp':
                moverU()
                break;
            case 'ArrowDown':
                moverD()
                break;
            case 'ArrowLeft':
                moverL()
                break;
            case 'ArrowRight':
                moverR()
                break;
            default:
                break;
        }

}

function iniciarMapa() {
    mapa.width = 320
    mapa.height = 240

    sectionVerMapa.style.display = 'flex'
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown',keyDownPressed)
    window.addEventListener('keyup', detenerMovimiento)
}