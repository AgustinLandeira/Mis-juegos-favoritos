function validarInputVacio(inputForm,errorInput,mensaje){

    /*Valida que el input del fomulario pasado por parametro no este vacio
    params:
        inputForm:Es el input del fomulario
        errorInput: EL error que se va a mostrar abajo de dicho input
        mensaje: El mensaje de error de porque el input es invalido
    return:
        Devuelve un boolean, dice si hay error o no
     */

    let hayError = false

    if(inputForm.value.trim() === ""){
        hayError = true
        mostrarError(errorInput,inputForm,mensaje)
    }else{sacarError(errorInput)}

    return hayError
}

function validarMaximo(inputForm,errorInput,maximo,mensaje){

    /*Valida que el input del fomulario no pase el maximo de caracteres
    params:
        inputForm: Es el input del fomulario
        errorInput: EL error que se va a mostrar abajo de dicho input
        mensaje: El mensaje de error de porque el input es invalido
    return:
        Devuelve un boolean, dice si hay error o no
     */

    let hayError = false

    if(inputForm.value.length > maximo){
        hayError = true
        mostrarError(errorInput,inputForm,mensaje)
    }else{sacarError(errorInput)}

    return hayError
}

function validarMinimoCaracteres(inputForm,errorInput,minimo,mensaje){

    /*Valida que el input del fomulario cumpla con el minimo de caracteres requeridos
    params:
        inputForm:Es el input del fomulario
        errorInput: EL error que se va a mostrar abajo de dicho input
        mensaje: El mensaje de error de porque el input es invalido
    return:
        Devuelve un boolean, dice si hay error o no
     */

    let hayError = false

    if(inputForm.value.length < minimo){
        hayError = true
        mostrarError(errorInput,inputForm,mensaje)
    }else{sacarError(errorInput)}

    return hayError
}

function mostrarError(inputErrorFormulario,inputForm,mensaje){

    /*Hace que el error sea visible abajo de dicho input
    Params:
        inputForm:El input que es invalido
        inputErrorFormulario:el contenedor en se muestra el error
        mensaje: El mensaje de error para que el usuario sepa porque es invalido el input
    
    */

    inputErrorFormulario.textContent = mensaje
    inputErrorFormulario.style.display = "block"

    inputForm.classList.add(".Formulario__entrada--error")
}

function sacarError(inputError){

    /*Saca el mensaje de error que esta abajo de dicho input */
    inputError.style.display = "none"
    inputError.classList.remove(".Formulario__entrada--error")
}


function iniciarValidaciones(){

    const btnResetear = document.querySelector(".Formulario__boton--resetear")

    /*Inicia con el proceso de validaciones, si esta todo ok, envia el formulario al servidor. De lo contrario, muestra los errores */
    const formulario = document.getElementById("contacto")

    //input nombre
    const nombre = document.querySelector("#nombre")
    const errorNombre = document.querySelector("#error-nombre")


    //input mail
    const mail = document.querySelector("#mail")
    const errorMail = document.querySelector("#error-mail")

    //input mensaje
    const mensaje = document.querySelector("#mensaje")
    const errorMensaje = document.querySelector("#error-mensaje")

    formulario.addEventListener("submit",function(event){

        event.preventDefault() //evito que el formulario se envie inmediatamente

        if(validarInputVacio(nombre,errorNombre,"El nombre es requerido") || 
            validarMinimoCaracteres(nombre,errorNombre,2,"El nombre tiene que contener 2 caracteres minimamente")||
            validarInputVacio(mail,errorMail,"El mail es requerido") || 
            validarMinimoCaracteres(mail,errorMail,10,"El mail tiene que contener 10 caracteres minimamente") || 
            validarMaximo(nombre,errorNombre,20,"tiene que ser menos de 20 caracteres") || 
            validarInputVacio(mensaje,errorMensaje,"El mensaje es requerido") ||
            validarMaximo(mensaje,errorMensaje,100,"Tiene que tener menos de 40 caracteres")){
            
            return ;

        }
        
        formulario.submit()
    })

    btnResetear.addEventListener("click",function(){
        sacarError(errorMensaje)
        sacarError(errorNombre)
        sacarError(errorMail)
    })

}


iniciarValidaciones()