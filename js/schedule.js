function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "index.html";
    }, 3000);
}