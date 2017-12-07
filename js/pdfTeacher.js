var alertify = require("alertifyjs");
const ipc = require('electron').ipcRenderer;

function regresar() {
    alertify.error("Regresando.");
    setTimeout(function () {
        location.href = "teacher.html";
    }, 3000);
}

function descargar() {
    document.getElementById("btns").setAttribute("style", "display: none");
    ipc.send('print-to-pdf');
    setTimeout(function () {
        document.getElementById("btns").setAttribute("style", "display: block");
    }, 3000);
}
