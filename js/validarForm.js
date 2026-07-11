function validar(condicion,input,error, mensaje){

    /*Valida si los campos del formulario tienen errores de validacion.
    PARAMS:
        condicion: La validacion que tiene el campo del formulario.
        input: El campo del formulario.
        error: EL contenedor que va a mostrar el error abajo de dicho campo.
        mensaje: El mensaje de error que se le mostrara al usuario.
    RETURN:
        Devuelve un boolean, dice si hubo un error o no.

    */

    if(condicion){

        mostrarError(error,input,mensaje)
        return true
    }

    sacarError(error,input)
    return false
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

    inputForm.classList.add("Formulario__entrada--error")
}

function sacarError(inputError,inputForm){

    /*Saca el mensaje de error que esta abajo de dicho input */
    inputError.style.display = "none"
    inputForm.classList.remove("Formulario__entrada--error")
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

        if(validar(nombre.value.trim() === "",nombre,errorNombre,"El nombre es requerido") ||
            validar(nombre.value.length > 20,nombre,errorNombre,"tiene que ser menos de 20 caracteres") ||
            validar(nombre.value.length < 2,nombre,errorNombre,"El nombre tiene que contener 2 caracteres minimamente")||
            validar(mail.value.trim() === "",mail,errorMail,"El mail es requerido") || 
            validar(mail.value.length < 10,mail,errorMail,"El mail tiene que contener 10 caracteres minimamente") ||  
            validar(mensaje.value.trim() === "",mensaje,errorMensaje,"El mensaje es requerido") ||
            validar(mensaje.value.length > 100,mensaje,errorMensaje,"Tiene que tener menos de 100 caracteres")){
            
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