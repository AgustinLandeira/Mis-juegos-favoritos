import {listaJuegos,listaPacks,juegosDelMomento} from "./listas.js"
import { mostrarModal } from "./modals.js"

function iniciarCarrito(listaJuegos,listaPacks,juegosDelMomento){

    function crearTarjetaJuego(juego){

        return `
            <div class="tarjetaJuego">

                <div class='tarjeta-juego__seccion-img'>

                    <h3 class="carrito-titulo">${juego.nombre}</h3>
                    <img class="juegos-carrito__imagen" src="${juego.foto}"img>
                
                </div>
                <p class="carrito-precio">Precio: $${juego.precio}</p>
                <p class="carrito-cantidad">Cantidad: ${juego.cantidad}</p>
                <button class="btnEliminar" data-id="${juego.id}">Quitar</button>
            </div>
        
        `

    }

    function mostrarMensaje(mensaje){

        return `
            <h3>${mensaje}</h3>
        `
    }

    function buscarElemento(valor,lista,campo){

        return lista.find(juego =>juego[campo] == valor)

    }

    function agregarJuego(juego){

        let juegoYaAgregado = buscarElemento(juego.nombre,carrito,"nombre")

        if(juegoYaAgregado){

            sumarCantidad(juegoYaAgregado)
            sumarContadorJuegos()

        }else{
            ultimo_id = ultimo_id + 1
            juego.id = ultimo_id

            juego.cantidad = 1

            carrito.push(juego)
            sumarContadorJuegos()
            actualizarCarrito()
        }

        actualizarLocalStorage("carrito",carrito)
        actualizarLocalStorage("cantidadJuegos",cantidadJuegos)
    }

    function sumarCantidad(juegoRepetido){

        for(let juego of carrito){

            if (juego.nombre === juegoRepetido.nombre){

                juego.precio += juegoRepetido.precio
                juego.cantidad += 1
            }
        }
    }

    function actualizarCarrito(){

        carritoCompras.textContent = "🛒 Ver carrito "+cantidadJuegos
    }

    function actualizarLocalStorage(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }


    function borrarItemLocalStorage(key){

        localStorage.removeItem(key)
    }

    function sumarContadorJuegos(){

        cantidadJuegos += 1
        actualizarCarrito()
    }

    function restarContadorJuegos(cantidad){

        cantidadJuegos -= cantidad
        actualizarCarrito()
    }

    function listarCarrito(primeraVez){

        if(primeraVez)MostrarCarrito()

        for(let juego of carrito){

            // let producto = "El juego es: "+juego.nombre + " y su precio: "+juego.precio
            // console.log(producto)

            let tarjeta = crearTarjetaJuego(juego)

            seccionProductos.innerHTML += tarjeta
        }
        crearSeccionResultado()

        console.log(carrito)
    }

    function MostrarCarrito(){

        contenedorCarrito.classList.remove("Oculto")
        const botonCarrito = document.querySelector(".Btncarrito")

        botonCarrito.addEventListener("click",function(){
            
            ocultarCarrito(contenedorCarrito)
        })
    }

    function eliminarJuegoCarrito(id){
        
        const juegoAEliminar = buscarElemento(id,carrito,"id") 
        const indice = carrito.findIndex(juego => juego.id == id)
        
        carrito.splice(indice,1)

        restarContadorJuegos(juegoAEliminar.cantidad)


        actualizarCarrito()
        limpiarCarrito()

        if(carrito.length > 0){

            listarCarrito(false)

            actualizarLocalStorage("carrito",carrito)
            actualizarLocalStorage("cantidadJuegos",cantidadJuegos)
        }else{
            seccionProductos.innerHTML += mostrarMensaje("No hay productos en tu carrito")
        }

    }

    function ocultarCarrito(){
        limpiarCarrito()
        contenedorCarrito.classList.add("Oculto")
        
    }

    function limpiarCarrito(){

        seccionProductos.innerHTML = ""

        const contenedroResultado = document.querySelector(".contenedor-Resultado")

        if(contenedroResultado != null)contenedroResultado.remove()
        
        
    }

    function crearSeccionResultado(){

        const contenedorResultado = document.createElement("div")
        const titulo = document.createElement("h2")
        const parrafoCantidad = document.createElement("p")
        const parrafoPrecioTotal = document.createElement("p")
        const botonComprar = document.createElement("button")
        const btnVaciarCarrito = document.createElement("button")

        const divContenedorBotones = document.createElement("div")

        const cantidadStrong = document.createElement("strong")
        const precioStrong = document.createElement("strong")

        agregarClaseAlElemento(contenedorResultado,"contenedor-Resultado")
        agregarClaseAlElemento(titulo,"contenedor-Resultado__titulo")
        agregarClaseAlElemento(parrafoCantidad,"contenedor-Resultado__parrafo")
        agregarClaseAlElemento(parrafoPrecioTotal,"contenedor-Resultado__parrafo")
        agregarClaseAlElemento(botonComprar,"contenedor-Resultado__boton--comprar")
        agregarClaseAlElemento(btnVaciarCarrito,"contenedor-Resultado__boton--vaciar")//contenedor-Resultado__boton
        agregarClaseAlElemento(divContenedorBotones,"contenedor-Resultado__div-botones")

        botonComprar.classList.add("contenedor-Resultado__boton")
        btnVaciarCarrito.classList.add("contenedor-Resultado__boton")

        agregarTextoAlElemento(titulo,"Resumen de la compra")
        agregarTextoAlElemento(cantidadStrong,"Cantidad de productos: ")
        agregarTextoAlElemento(parrafoCantidad,cantidadJuegos)

        agregarTextoAlElemento(precioStrong,"Precio total: ")
        agregarTextoAlElemento(parrafoPrecioTotal,`$${calcularPrecioTotal()}`)
        agregarTextoAlElemento(botonComprar,"Confirmar compra")
        agregarTextoAlElemento(btnVaciarCarrito,"Vaciar Carrito")


        parrafoCantidad.innerHTML = `
        
            <strong class='contenedor-Resultado__campo'>Cantidad de juegos:</strong> ${parrafoCantidad.textContent}
        
        `
        parrafoPrecioTotal.innerHTML = `
        
            <strong class='contenedor-Resultado__campo'>Precio: </strong> ${parrafoPrecioTotal.textContent}
        `
        
        agregarContenidoAlPadre(contenedorResultado,titulo)
        agregarContenidoAlPadre(contenedorResultado,parrafoCantidad)
        agregarContenidoAlPadre(contenedorResultado,parrafoPrecioTotal)
        agregarContenidoAlPadre(divContenedorBotones,botonComprar)
        agregarContenidoAlPadre(divContenedorBotones,btnVaciarCarrito)
        agregarContenidoAlPadre(contenedorResultado,divContenedorBotones)
        agregarContenidoAlPadre(contenedorCarrito,contenedorResultado)
        

    }

    function agregarClaseAlElemento(elemento,nombreClase){

        elemento.className = nombreClase
    }

    function agregarTextoAlElemento(elemento,texto){

        elemento.textContent = texto
    }

    function agregarContenidoAlPadre(elementoPadre,elementoHijo){

        elementoPadre.appendChild(elementoHijo)

    }

    function calcularPrecioTotal(){

        let total = 0

        for(let juego of carrito){

            total += juego.precio

        }

        return total
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || []

    let ultimo_id = 0
    
    let cantidadJuegos = parseInt(localStorage.getItem("cantidadJuegos")) || 0 

    const contenedor_juegos = document.querySelector(".Juegos-recomendados__contenedor")
    const carritoCompras = document.getElementById("boton-carrito")
    const contenedorPacks = document.querySelector(".juegos-recomendados__promo")
    const botonJuegoDestacado = document.querySelector(".Juego-Destacado__boton")

    const contenedorCarrito = document.getElementById("Carrito")
    const seccionProductos = document.getElementById("productosCarrito")

    if(cantidadJuegos > 0)actualizarCarrito()

    contenedor_juegos.addEventListener("click",function (event){

        if(event.target.tagName === "BUTTON"){
            
            const juego = buscarElemento(event.target.dataset.id,listaJuegos,"id")
            agregarJuego({id:carrito.length + 1,nombre:juego.titulo,precio:juego.precio,foto:juego.srcImagen})

        }
        
    })

    seccionProductos.addEventListener("click",function(event){
            
        if(event.target.className == "btnEliminar"){
            console.log(event.target.dataset.id)
            eliminarJuegoCarrito(event.target.dataset.id)

        }
    })

    contenedorPacks.addEventListener("click",function(event){

        if(event.target.tagName === "BUTTON"){

            const pack = buscarElemento(event.target.dataset.nombre,listaPacks,"nombre")
            agregarJuego({nombre:"Pack: "+pack.nombre,precio:pack.precio,foto:pack.imagenes[0][0]})
        }
    })

    carritoCompras.addEventListener("click",function(){

        if(carrito.length > 0){
            // MostrarCarrito()
            listarCarrito(true)
        }else{
            MostrarCarrito()
            seccionProductos.innerHTML += mostrarMensaje("No hay productos en tu carrito")
        }   
        
    })

    botonJuegoDestacado.addEventListener("click",function(){

        agregarJuego({nombre:juegosDelMomento[0].nombre,precio:juegosDelMomento[0].precio,foto:juegosDelMomento[0].foto})
    })

    contenedorCarrito.addEventListener("click",function(event){
        
        if(event.target.className == "contenedor-Resultado__boton--comprar contenedor-Resultado__boton"){
            mostrarModal("¡Gracias por su compra!",`Total a pagar: $${calcularPrecioTotal()}`,"success")
        }else if(event.target.className == "contenedor-Resultado__boton--vaciar contenedor-Resultado__boton"){

            carrito = []
            cantidadJuegos = 0

            borrarItemLocalStorage("carrito")
            borrarItemLocalStorage("cantidadJuegos")

            limpiarCarrito()
            actualizarCarrito()

            seccionProductos.innerHTML += mostrarMensaje("No hay productos en tu carrito")

        }
    })

}



iniciarCarrito(listaJuegos,listaPacks,juegosDelMomento)
