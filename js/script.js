// popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(
    popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)
);

// alerta 
function mostrarAlerta(mensaje) {
    alert(mensaje);
}

// favoritos
var favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function toggleFav(btn) {
    btn.classList.toggle("liked");

    var nombre = btn.parentElement
        .querySelector(".photocard-nombre")
        .textContent;

    if (btn.classList.contains("liked")) {

        if (favoritos.indexOf(nombre) == -1) {
            favoritos.push(nombre);
        }
        mostrarAlerta('El producto ' + nombre + 'se añadió a favoritos');

    } else {
        var posicion = favoritos.indexOf(nombre);

        if (posicion != -1) {
            favoritos.splice(posicion, 1);
        }
    }

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    actualizarBadge();
    actualizarListaFav();
}

function toggleListaFav(e) {
    e.preventDefault();

    var lista = document.getElementById("favDropdown");

    if (lista.style.display == "none") {
        lista.style.display = "block";

    } else {
        lista.style.display = "none";
    }
}

function actualizarListaFav() {

    var lista = document.getElementById("favLista");
    var vacio = document.getElementById("favVacio");
    lista.innerHTML = "";

    if (favoritos.length == 0) {
        vacio.style.display = "block";
        return;
    }

    vacio.style.display = "none";

    for (var i = 0; i < favoritos.length; i++) {
        var li = document.createElement("li");
        li.innerText = favoritos[i];
        lista.appendChild(li);
    }
}

function actualizarBadge() {
    document.getElementById("favBadge").innerText =
        favoritos.length;
}

// restaurar favoritos cuando se carga
var cards = document.querySelectorAll(".photocard");
for (var i = 0; i < cards.length; i++) {

    var nombre = cards[i]
        .querySelector(".photocard-nombre")
        .textContent;

    if (favoritos.indexOf(nombre) != -1) {

        cards[i]
            .querySelector(".photocard-like")
            .classList.add("liked");
    }
}

actualizarBadge();
actualizarListaFav();

// restaurar modo oscuro guardado 
if (localStorage.getItem("modo") == "oscuro") { document.body.classList.add("modo-oscuro"); }

function cambiarModo() {
    document.body.classList.toggle("modo-oscuro");
    var icono = document.getElementById("iconoModo");
    if (document.body.classList.contains("modo-oscuro")) {
        icono.className = "bi bi-sun-fill";
        localStorage.setItem("modo", "oscuro");
    } else {
        icono.className = "bi bi-moon-fill";
        localStorage.setItem("modo", "claro");
    }
}
//Modal de contactos
function enviarMensaje() {
    var modal = new bootstrap.Modal(document.getElementById("modalContacto"));
    modal.show();
}
