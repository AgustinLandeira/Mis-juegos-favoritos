export function mostrarExitoModal(titulo,texto,icono){

    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        iconColor:"#d33",
        theme:"dark",
        confirmButtonColor:"red",
        confirmButtonText : "Cerrar"
    });
}

export function mostrarPreguntaModal(titulo,texto){

    return Swal.fire({
        title:titulo,
        icon:"warning",
        iconColor:"#d33",
        text:texto,
        showCancelButton:true,
        confirmButtonColor:"green",
        cancelButtonColor: "#d33",
        cancelButtonText:"Cancelar",
        confirmButtonText:"Vaciar todo",
        theme:"dark",

    })
}
