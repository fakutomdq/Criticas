let peliculas = [];

function saludarUsuario() {
    let nombreUsuario = document.getElementById("inputNombre").value.trim();
    const saludo = document.getElementById('saludo');
    const contenedorEntrada = document.getElementById('entradaUsuario');
    if (nombreUsuario !== "") {
        saludo.innerText = `Bienvenido ${nombreUsuario} a Cavernageek.`;
        Swal.fire({
            title:`¡Bienvenido ${nombreUsuario}`,
            text: `gracias por elegir Cavernageek`,
            icon: 'success',
            confirmButtonText: 'Continuar'
        });
        contenedorEntrada.style.display = "none";
    }
}
function mostrarPeliculas(lista) {
    const listaPeliculas = document.getElementById("peliculas-lista");
    listaPeliculas.innerHTML = "";

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
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    mostrarPeliculas(peliculas);
    mostrarTop4();

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gracias por puntuar",
        showConfirmButton: false,
        timer: 1500
    });
}

function buscarPeliculas() {
    const texto = document.getElementById("buscador").value.toLowerCase().trim();
    const resultado = peliculas.filter(p => p.nombre.toLowerCase().includes(texto));

    const listaPeliculas = document.getElementById('peliculas-lista');
    if (resultado.length > 0) {
        mostrarPeliculas(resultado);
    } else {
        listaPeliculas.innerHTML = '<p style="text-align:center;">todavía no hay tantas películas, recién empezamos.</p>';
    }
}


function mostrarTop4() {
    let top4 = [];

    for (let i = 0; i < peliculas.length; i++) {
        if (peliculas[i].votos > 0) {
            top4.push(peliculas[i]);
        }
    }

    for (let i = 0; i < top4.length - 1; i++) {
        for (let j = i + 1; j < top4.length; j++) {
            if (top4[j].puntuacion > top4[i].puntuacion) {
                let temp = top4[i];
                top4[i] = top4[j];
                top4[j] = temp;
            }
        }
    }

    if (top4.length > 4) {
        top4 = top4.slice(0, 4);
    }

    const contenedorTop = document.getElementById("top4");
    contenedorTop.innerHTML = "<h3>El Pináculo del Cine</h3>";

    top4.forEach(pelicula => {
        contenedorTop.innerHTML += `
        <div>
            <h5>${pelicula.nombre}</h5>
            <p>Valoración: ${pelicula.puntuacion.toFixed(1)} / 5 - Votos: ${pelicula.votos}</p>
        </div>
        `;
    });
}
function cargarPeliculas() {
    fetch('./data/peliculas.json')
        .then(response => response.json())
        .then(data => {
            if (localStorage.getItem("peliculas")) {
                peliculas = JSON.parse(localStorage.getItem("peliculas"));
            } else {
                peliculas = data;
            }
            mostrarPeliculas(peliculas);
            mostrarTop4();
        })
        .catch(error => {
            console.error("Error al cargar el JSON", error);
            mostrarPeliculas(peliculas);
            mostrarTop4();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    saludarUsuario();
    cargarPeliculas();
});