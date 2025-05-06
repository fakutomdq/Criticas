
let peliculas = [
    { nombre: "Deadpool y Wolverine", imagen: "img/wolberine.jpg", puntuacion: 0, votos: 0 },
    { nombre: "Pokémon Legends", imagen: "img/pokemonlegendsza.webp", puntuacion: 0, votos: 0 },
    { nombre: "Hulk", imagen: "img/hulk.webp", puntuacion: 0, votos: 0 },
    { nombre: "Candyman", imagen: "img/candyman-lidera-taquilla-de-cine-free-guy-paw-patrol-la-pelicula-947224-1.webp", puntuacion: 0, votos: 0 },
    { nombre: "Kraven", imagen: "img/kraven.webp", puntuacion: 0, votos: 0 },
    { nombre: "Viernes13", imagen: "img/viernes13.webp", puntuacion: 0, votos: 0 },
    { nombre: "Spiderman", imagen: "img/spiderman.jpg", puntuacion: 0, votos: 0 },
    { nombre: "Liga de la justicia", imagen: "img/justiceleague.webp", puntuacion: 0, votos: 0 },
];


function saludarUsuario() {
    let nombreUsuario = prompt("¿Cuál es tu nombre?");
    const saludo = document.getElementById('saludo');

    if (nombreUsuario && nombreUsuario.trim() !== "") {
        alert(`¡Hola, ${nombreUsuario}! Bienvenido a Cavernageek.`);
        if (saludo) saludo.innerText = `¡Hola, ${nombreUsuario}! Bienvenido a Cavernageek.`;
    } else {
        alert("¡Hola, visitante! Bienvenido a Cavernageek.");
        if (saludo) saludo.innerText = `¡Hola, visitante! Bienvenido a Cavernageek.`;
    }
}


function mostrarPeliculas(lista) {
    const listaPeliculas = document.getElementById('peliculas-lista');
    listaPeliculas.innerHTML = ''; 

    lista.forEach((pelicula, index) => {
        const card = document.createElement('div');
        card.classList.add('col-md-3', 'my-3');

        card.innerHTML = `
            <div class="card h-100 shadow">
                <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.nombre}</h5>
                    <p class="card-text">
                        Valoración: ${pelicula.votos > 0 ? pelicula.puntuacion.toFixed(1) : "Sin votos"} / 5<br>
                        Total de votos: ${pelicula.votos}
                    </p>
                    <div class="d-flex justify-content-around">
                        <button class="btn btn-sm btn-outline-primary" onclick="valorarPelicula(${index}, 1)">1</button>
                        <button class="btn btn-sm btn-outline-primary" onclick="valorarPelicula(${index}, 2)">2</button>
                        <button class="btn btn-sm btn-outline-primary" onclick="valorarPelicula(${index}, 3)">3</button>
                        <button class="btn btn-sm btn-outline-primary" onclick="valorarPelicula(${index}, 4)">4</button>
                        <button class="btn btn-sm btn-outline-primary" onclick="valorarPelicula(${index}, 5)">5</button>
                    </div>
                </div>
            </div>
        `;
        listaPeliculas.appendChild(card);
    });
}

function valorarPelicula(index, valor) {
    if (valor < 1 || valor > 5) return;

    let pelicula = peliculas[index];
    pelicula.puntuacion = (pelicula.puntuacion * pelicula.votos + valor) / (pelicula.votos + 1);
    pelicula.votos++;

    mostrarPeliculas(peliculas); 
}

function buscarPeliculas() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const resultado = peliculas.filter(p => p.nombre.toLowerCase().includes(texto));

    if (resultado.length > 0) {
        mostrarPeliculas(resultado);
    } else {
        alert("No se encontraron películas con ese nombre.");
    }
}

saludarUsuario();
mostrarPeliculas(peliculas);