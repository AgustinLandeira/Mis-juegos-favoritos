import {listaJuegos,listaPacks,juegosDelMomento} from "./listas.js"

function iniciarCarrito(listaJuegos,listaPacks,juegosDelMomento){

    function crearTarjetaJuego(juego){

        return `<div class="tarjetaJuego"> 

                <h3 class="carrito-titulo">${juego.nombre}</h3>

                <p class="carrito-precio">Precio: $${juego.precio}</p>

                <img class="juegos-carrito__imagen" src="${juego.foto}"img>
            
                <button class="btnEliminar" data-id="${juego.id}">Quitar</button>
            </div>
        
        `

    }

    function buscarElemento(valor,lista,campo){

        return lista.find(juego =>juego[campo] == valor)

    }

    function agregarJuego(juego){
        ultimo_id = ultimo_id + 1
        juego.id = ultimo_id
        carrito.push(juego)
        actualizarCarrito()
    }

    function actualizarCarrito(){

        carritoCompras.textContent = "🛒 Ver carrito "+carrito.length
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
        console.log("Eliminar", id);
        const indice = carrito.findIndex(juego => juego.id == id)
        
        carrito.splice(indice,1)
        actualizarCarrito()
        limpiarCarrito()
        listarCarrito(false)
        // console.log("Lista despues de eliminar uno: ")
        // for(let juego of carrito){
        //     console.log(juego)
        // }

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

        const cantidadStrong = document.createElement("strong")
        const precioStrong = document.createElement("strong")

        agregarClaseAlElemento(contenedorResultado,"contenedor-Resultado")
        agregarClaseAlElemento(titulo,"contenedor-Resultado__titulo")
        agregarClaseAlElemento(parrafoCantidad,"contenedor-Resultado__parrafo")
        agregarClaseAlElemento(parrafoPrecioTotal,"contenedor-Resultado__parrafo")
        agregarClaseAlElemento(botonComprar,"contenedor-Resultado__boton")

        agregarTextoAlElemento(titulo,"Resumen de la compra")
        agregarTextoAlElemento(cantidadStrong,"Cantidad de productos: ")
        agregarTextoAlElemento(parrafoCantidad,carrito.length)

        agregarTextoAlElemento(precioStrong,"Precio total: ")
        agregarTextoAlElemento(parrafoPrecioTotal,`$${calcularPrecioTotal()}`)
        agregarTextoAlElemento(botonComprar,"Confirmar compra")

        // agregarContenidoAlPadre(parrafoCantidad,cantidadStrong)
        // agregarContenidoAlPadre(parrafoPrecioTotal,precioStrong)

        parrafoCantidad.innerHTML = `
        
            <strong class='contenedor-Resultado__campo'>Cantidad de juegos:</strong> ${parrafoCantidad.textContent}
        
        `
        parrafoPrecioTotal.innerHTML = `
        
            <strong class='contenedor-Resultado__campo'>Precio: </strong> ${parrafoPrecioTotal.textContent}
        `
        
        agregarContenidoAlPadre(contenedorResultado,titulo)
        agregarContenidoAlPadre(contenedorResultado,parrafoCantidad)
        agregarContenidoAlPadre(contenedorResultado,parrafoPrecioTotal)
        agregarContenidoAlPadre(contenedorResultado,botonComprar)
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

    let carrito = []
    let ultimo_id = 0

    const contenedor_juegos = document.querySelector(".Juegos-recomendados__contenedor")
    const carritoCompras = document.getElementById("boton-carrito")
    const contenedorPacks = document.querySelector(".juegos-recomendados__promo")
    const botonJuegoDestacado = document.querySelector(".Juego-Destacado__boton")

    const contenedorCarrito = document.getElementById("Carrito")
    const seccionProductos = document.getElementById("productosCarrito")

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
            console.log("No hay productos para mostrar")
        }   
        
    })

    botonJuegoDestacado.addEventListener("click",function(){

        agregarJuego({nombre:juegosDelMomento[0].nombre,precio:juegosDelMomento[0].precio,foto:juegosDelMomento[0].foto})
    })

}



iniciarCarrito(listaJuegos,listaPacks,juegosDelMomento)