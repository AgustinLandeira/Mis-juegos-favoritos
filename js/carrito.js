import { mostrarExitoModal,mostrarPreguntaModal } from "./modals.js"

export function iniciarCarrito(listaJuegos,listaPacks,juegosDelMomento){

    /*Se encarga de darle toda la funcionalidad al carrito
    params:
        listaJuegos:
        listaPacks:
        juegoDelMomento:

    */

    function crearTarjetaJuego(juego){

        /*Crear una card que va a contener el juego agregado al carrito
        Params:
            juego: va a ser el juego a guardar en la card junto con sus caracteristicas
        
        */

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

    function crearSeccionResultado(){

        /*Crea una seccion en donde nos muestra el precio total y cantidad de los juegos elegidos, juntos con dos botones para confirmar o cancelar la compra  */

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

        /*Se encarga de agregar una clase a un elemento
        params:
            elemento: va a ser el elemento html al que queremos agregarle una clase
            nombreClase:Va a ser la clase a agregar
        */

        elemento.className = nombreClase
    }

    function agregarTextoAlElemento(elemento,texto){

        /*Se encarga de agregar texto a un elemento
        params:
            elemento: va a ser el elemento html al que queremos agregarle texto
            texto:Va a ser el contenido a agregar
        */

        elemento.textContent = texto
    }

    function agregarContenidoAlPadre(elementoPadre,elementoHijo){

        /*Se encarga de agregar contenido a un elemento padre
        params:
            elementoHijo: va a ser el elemento al que queremos agregarle al padre
            elementoPadre:Va a ser el elemento padre al que le queremos agregar el hijo
        */


        elementoPadre.appendChild(elementoHijo)

    }

    function mostrarMensaje(mensaje){

        /*devuelve un mensaje como subtitulo del elemento h3 del html.
        params:
            mensaje:El mensaje que va a ser el subtitulo
        return:
            retorna el string como si fuese un elemento html 
        
        */

        return `
            <h3>${mensaje}</h3>
        `
    }

    function buscarElemento(valor,lista,campo){

        /*se encarga de encontrar el elemento que queremos de la lista
        params:
            valor:Es el valor que nos va ayudar a encontrar el elemento que queremos.
            lista: la lista de diccionarios que representa una entidad.
            campo: usamos el el parametro campo como clave de un diccionario para filtrar la busqueda.
        */

        return lista.find(juego =>juego[campo] == valor)

    }

    function agregarJuego(juego){

        /*se encarga de agregar el juego al carrito, si ya existe el juego, le sumamos la cantidad junto con su precio
        params:
            juego: Es el juego a agregar en el carrito
        
        */

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
        mostrarExitoModal("Se agrego al carrito!",`${juego.nombre} esta en tu carrito.`,"success")
    }

    function eliminarJuegoCarrito(id){

        /*Esta funcion se encarga de  eliminar un juego del carrito
        params:
            id: El id nos ayuda a identificar dicho juego, para posteriormente borrarlo del carrito
        */
        
        const juegoAEliminar = buscarElemento(id,carrito,"id") 
        const indice = carrito.findIndex(juego => juego.id == id)
        
        carrito.splice(indice,1)

        restarContadorJuegos(juegoAEliminar.cantidad)


        actualizarCarrito()
        limpiarCarrito()

        actualizarLocalStorage("carrito",carrito)
        actualizarLocalStorage("cantidadJuegos",cantidadJuegos)

        if(carrito.length > 0){

            listarCarrito(false)

        }else{
            seccionProductos.innerHTML += mostrarMensaje("No hay productos en tu carrito")
        }

    }

    function sumarContadorJuegos(){
        /*Aumenta el contador cantidadJuegos, dicho contador lo mostramos en el dom */

        cantidadJuegos += 1
        actualizarCarrito()
    }

    function restarContadorJuegos(cantidad){
        /*Resta el contador cantidadJuegos, dicho contador lo mostramos en el dom */

        cantidadJuegos -= cantidad
        actualizarCarrito()
    }

    function sumarCantidad(juegoRepetido){

        /*Se encarga de aumentar el contador y precio del juego que ya esta agregado en el carrito.
        params:
            juegoRepetido:es el juego a aumentarle su cantidad y precio ya que el usuario quiere llevarse mas de una unidad.
        */

        for(let juego of carrito){

            if (juego.nombre === juegoRepetido.nombre){

                juego.precio += juegoRepetido.precio
                juego.cantidad += 1
            }
        }
    }

    function actualizarCarrito(){

        /*Actualiza el contador de juegos que esta en el carrito que esta visible en el DOM */

        carritoCompras.textContent = "🛒 Ver carrito "+cantidadJuegos
    }

    function limpiarCarrito(){

        /*
            Se encarga de limpiar todo el contenido HTMl que esta dentro del contenedor de productos que representa los juegos elegidos

        */

        seccionProductos.innerHTML = ""

        const contenedroResultado = document.querySelector(".contenedor-Resultado")

        if(contenedroResultado != null)contenedroResultado.remove()
    }

    function actualizarLocalStorage(key,value){

        /*Agrega/actualiza datos en pares clave y valor
        params:
            key:la clave que usamos para acceder el dato.
            value:el valor que va a tener dicha clave.
        */
        localStorage.setItem(key,JSON.stringify(value))
    }


    function borrarItemLocalStorage(key){

        /*borra datos de la api del navegador
        params:
            key: usamos la clave para borrar dicho data de la api del navegador
        */
        localStorage.removeItem(key)
    }

    function listarCarrito(primeraVez){
        /*Se encarga de listar los juegos en la seccion de productos en el carrito
        params:
            primeraVez: Es un valor bool en donde dependiendo su valor, abrimos la seccion del carrito o no
        */
        if(primeraVez)MostrarCarrito()

        for(let juego of carrito){

            let tarjeta = crearTarjetaJuego(juego)

            seccionProductos.innerHTML += tarjeta
        }
        crearSeccionResultado()

        console.log(carrito)
    }

    function MostrarCarrito(){

        /*
            Se encarga de quitar la clase .Oculto para mostrar la seccion del carrito
        */

        contenedorCarrito.classList.remove("Oculto")
        const botonCarrito = document.querySelector(".Btncarrito")

        botonCarrito.addEventListener("click",function(){
            
            ocultarCarrito(contenedorCarrito)
        })
    }

    function ocultarCarrito(){

        /*
            Se encarga de ocultar la seccion del carrito 
        
        */
        limpiarCarrito()
        contenedorCarrito.classList.add("Oculto")
        
    }

    

    function calcularPrecioTotal(){

        /*Acumula el precio total de todos los juegos del carrito
        return:
            devuelve el valor total
        */

        let total = 0

        for(let juego of carrito){

            total += juego.precio

        }

        return total
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || []

    let ultimo_id = 0
    
    let cantidadJuegos = parseInt(localStorage.getItem("cantidadJuegos")) || 0 

    // Recuperamos los nodos del dom
    const contenedor_juegos = document.querySelector(".Juegos-recomendados__contenedor")
    const carritoCompras = document.getElementById("boton-carrito")
    const contenedorPacks = document.querySelector(".juegos-recomendados__promo")
    const botonJuegoDestacado = document.querySelector(".Juego-Destacado__boton")

    const contenedorCarrito = document.getElementById("Carrito")
    const seccionProductos = document.getElementById("productosCarrito")

    if(cantidadJuegos > 0)actualizarCarrito() //-> Si desde la api del navegador tiene datos persistente, actualizamos el carrito

    contenedor_juegos.addEventListener("click",function (event){//->Este funcion se ejecuta si hacemos click en los botones de los juegos listados

        if(event.target.tagName === "BUTTON"){
            
            const juego = buscarElemento(event.target.dataset.id,listaJuegos,"id")
            agregarJuego({id:carrito.length + 1,nombre:juego.titulo,precio:juego.precio,foto:juego.srcImagen})

        }
        
    })

    seccionProductos.addEventListener("click",function(event){ //->Se ejecuta cuando hacemos click en el boton quitar
            
        if(event.target.className == "btnEliminar"){
            console.log(event.target.dataset.id)
            eliminarJuegoCarrito(event.target.dataset.id)

        }
    })

    contenedorPacks.addEventListener("click",function(event){ // Se ejecuta si compramos algunos de los pack mostrados

        if(event.target.tagName === "BUTTON"){

            const pack = buscarElemento(event.target.dataset.nombre,listaPacks,"nombre")
            agregarJuego({nombre:"Pack: "+pack.nombre,precio:pack.precio,foto:pack.imagenes[0][0]})
        }
    })

    carritoCompras.addEventListener("click",function(){ // Se ejecuta cuando apretamos el boton VerCarrito

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

        // -> Se ejecuta si hacemos click en los botones "comprar" o "vaciar carrito"
        if(event.target.className == "contenedor-Resultado__boton--comprar contenedor-Resultado__boton"){
            mostrarExitoModal("¡Gracias por su compra!",`Total a pagar: $${calcularPrecioTotal()}`,"success")
        }else if(event.target.className == "contenedor-Resultado__boton--vaciar contenedor-Resultado__boton"){
            mostrarPreguntaModal("¿ Estas seguro de vaciar el carrito ?","Si confirmas, tu carrito va a estar vacio.").then((result)=>{


                if(result.isConfirmed){
                    mostrarExitoModal("Vaciaste tu carrito!","Borraste todos tus juegos del carrito.","success")
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
    })

}
