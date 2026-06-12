import {lista_juegos,lista_packs,lista_comentarios} from "./listas.js"

function recorrerLista(lista,crearTarjeta,selectorNombre){

    /*
    Se encarga de recorrer los elementos de una lista para posteriormente agregarlo al elemento padre.
    
    Params:
        Lista: La lista a recorrer
        crearTarjeta: Sera una funcion, cambia segun la tarjeta que queremos crear, para posteriormente agregarlo en el padre.
        selectorNombre: El nombre de la clase o id del elemento padre para poder acceder y asi agregarle los hijos.
    
    */ 

    let contenedorPadre = recuperarElementoPadre(selectorNombre)
    
    let html = ""

    for(const item of lista){

        html += crearTarjeta(item)

    }

    renderizar(contenedorPadre,html)

}

function renderizar(contenedorPadre,html){

    /*
    Se encarga de reenderizar la pagina sin necesidad de recargarla o hacer un refresh

    Params:
        contenedorPadre: Va a ser elemento padre, en el cual le vamos agregar contenido html
        Html: EL contenido que le vamos agregar al padre
    
    */

    contenedorPadre.innerHTML = html
}

function recuperarElementoPadre(selector){


    /*
        Se encarga de recuperar/encontrar el elemento padre que esta en el DOM.

        Params:
            selector: es un selector que puede ser un id, clase etc y la vamos a uar para encontrar el elemento.
        
        return: Devuelve el elemento que encontramos con el querySelector.
    
    */
    return document.querySelector(selector)
}

function crearTarjetaJuego(juego){

    /*
    Se encarga de generar un maquetado en forma de card, en donde va a incluir los datos del juego.

    Params:
        Juego: Va a ser un objeto, nos sirve para hacer el maquetado.
    
    return: Devuelve una card en donde describe el juego.
    
    */

    return`
        <article class="juegos-recomendados__articulo animate__animated animate__backInLeft" >

            <h3 class="juegos-recomendados__h3">${juego.titulo}</h3>

            <img class="juegos-recomendados__imagen"  src=${juego.srcImagen} alt="Imagen no disponible">

            <p class="juegos-recomendados__parrafo"><strong>Descripcion del juego:</strong>${juego.descripcion}</p>
            <p class="juegos-recomendados__parrafo"><strong>Genero:</strong> ${juego.genero}</p>
            <p class="juegos-recomendados__parrafo"><strong>Precio:</strong> $${juego.precio}</p>

            <button class="juegos-recomendados__boton">Comprar</button>
        </article>
    `

}

function crearTarjetaPack(pack){

    /*
    Se encarga de generar un maquetado en forma de card, en donde va a incluir los datos del pack.
    
    Params:
        Pack: Va a ser un objeto, nos sirve para hacer el maquetado.
    
    return: Devuelve una card en donde describe el paquete.
    
    */

    return`
            <div class="juegos-recomendados__pack">

                <h2 class="juegos-recomendados__promo-titulo">🔥 Pack ${pack.nombre}</h2>

                <p class="juegos-recomendados__promo-parrafo" >${pack.descripcion}
                    <span class="juegos-recomendados__promo-precio">$ ${pack.precio}</span></p>

                <div class="juegos-recomendados__contenedor-promo">

                    <img class="juegos-recomendados__promo__imagen" class="" src=${pack.imagenes[0][0]} alt=${pack.imagenes[0][1]}>
                    <img class="juegos-recomendados__promo__imagen" src=${pack.imagenes[1][0]} alt=${pack.imagenes[1][1]}>
                    <img class="juegos-recomendados__promo__imagen" src=${pack.imagenes[2][0]} alt=${pack.imagenes[2][1]}>
                    <img class="juegos-recomendados__promo__imagen" src=${pack.imagenes[3][0]} alt=${pack.imagenes[3][1]}>

                </div>

                <button class="juegos-recomendados__promo__boton">Comprar Pack ${pack.nombre}</button>

            </div>
        `
}

function crearTarjetaComentario(comentario){

    /*
    Se encarga de generar un maquetado en forma de card, en donde va a incluir los datos del pack.
    
    Params:
        Pack: Va a ser un objeto, nos sirve para hacer el maquetado.
    
    return: Devuelve una card en donde describe el paquete.
    
    */

    return`
            <div class="Reseñas-seccion__card">

                    <p class="Reseñas-seccion__comentario">${comentario.mensaje}</p>
                    <div class="Reseñas-seccion__autor">
                        
                        <img class="Reseñas-seccion__foto-perfil" src=${comentario.foto} alt="">
                        <h4 class="Reseñas-seccion__perfil">${comentario.usuario}</h4>
                    </div>

            </div>
        `
}
recorrerLista(lista_juegos,crearTarjetaJuego,".Juegos-recomendados__contenedor")
recorrerLista(lista_packs,crearTarjetaPack,".juegos-recomendados__promo")
recorrerLista(lista_comentarios,crearTarjetaComentario,".Reseñas-seccion__contenedor")