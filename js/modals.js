export function mostrarModal(titulo,texto,icono){

    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        iconColor:"red",
        theme:"dark",
        confirmButtonColor:"red",
        confirmButtonText : "Cerrar"
    });
}