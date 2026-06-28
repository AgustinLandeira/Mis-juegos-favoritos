// export let listaJuegos = [
//             {
//                 id:1,
//                 titulo:"THE LAST OF US",srcImagen:"img/The_last_of_us.jpg",
//                 descripcion:"Es un juego de aventura y supervivencia con una historia muy profunda y emotiva. ",
//                 genero:"Accion, Aventura, Supervivencia y Drama.",precio:60000},
                
//             {   id:2,
//                 titulo:"GTA V",srcImagen:"img/Gta.jpg", 
//                 genero:"Accion, Aventura y Mundo abierto.",precio:80000,
//                 descripcion:"Es un juego de mundo abierto donde podés explorar una ciudad enorme, realizar misiones y hacer prácticamente lo que quieras.",
//             },

//             {
//                 id:3,
//                 titulo:"Rocket League",srcImagen:"img/Rocket_league.jpg",
//                 descripcion:"Es un juego que combina fútbol con autos, donde tenés que hacer goles manejando autos. Es rápido, divertido y requiere mucha habilidad y reflejos.",
//                 genero:"Deportes",precio:10000
//             },

//             {
//                 id:4,
//                 titulo:"Call of duty",srcImagen:"img/Cod.jpg",
//                 descripcion:"Es un juego de disparos en primera persona con modos de campaña y multijugador. Tiene mucha acción, armas variadas y mapas dinámicos.",
//                 genero:"Accion y Shooter",precio:40000
//             }
// ]

export let listaPacks = [

    {
        id:1,
        nombre:"Resident Evil",
        descripcion: "Aprovecha de este pack impresionante que te va a permitir jugar algunos juegos increibles que tiene esta maravillosa saga de Resident Evil a tan solo: ",
        precio: 30000,
        imagenes: [
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/co1taw.webp","Residen Evil 0"],
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/cobtwh.webp","Residen Evil 7: Biohazard"],
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/coab9q.webp","Resident Evil 8: Village"],
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/cobgod.webp","Resident Evil 6"],

        ]

    },
    {
        id:2,
        nombre:"Uncharted",
        descripcion: "Aprovecha de este pack para jugar la aventura completa de Nathan Drake a tan solo: ",
        precio: 40000,
        imagenes: [
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/co1tp7.webp","Uncharted 1"],
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnb.webp","Uncharted 2"],
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/co1tp8.webp","Uncharted 3"],
            ["https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.webp","Uncharted 4"],

        ]

    },
]

export let listaComentarios = [

    {
        id:1,
        mensaje: "“Jugue al the last of us y la verdad una maravilla, gracias por recomendarlo”",
        foto:"img/foto-de-perfil.png",
        usuario:"Nacho Benitez"

    },{
        id:2,
        mensaje: "“Que bueno Mario Bross”",
        foto:"img/foto-de-perfil.png",
        usuario:"Santi Fernandez"

    },{
        id:3,
        mensaje: "“Muy buenas recomendaciones !”",
        foto:"img/foto-de-perfil.png",
        usuario:"Valen miño"

    },{
        id:4,
        mensaje: "“El pack de Resident Evil es una locura”",
        foto:"img/foto-de-perfil.png",
        usuario:"Thiago romero"

    },
]

export let juegosDelMomento = [

    {
        id:1,
        nombre:"Resident Evil Requiem",
        fraseDestacada:"“El miedo evoluciona una vez más...”",
        descripcion:`Resident Evil Requiem te sumerge en una nueva experiencia de terror psicológico donde cada paso puede ser el último. 
                    Enfrentate a escenarios oscuros, criaturas impredecibles y una historia intensa cargada de misterio, supervivencia y adrenalina.
                    Con gráficos de última generación, una ambientación escalofriante y mecánicas renovadas, 
                    esta entrega promete llevar la legendaria saga de horror a un nivel más extremo.`,
        genero:"Terror | Supervivencia | Acción | Aventura",
        plataforma:"PC | PlayStation 5 | Xbox Series X/S",
        precio:95000,
        foto:"https://images.igdb.com/igdb/image/upload/t_cover_big/cobmj0.webp",
        video:"video/ResidentEvil.mp4"
    }

]
