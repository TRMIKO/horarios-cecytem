var alertify = require("alertifyjs");
const ipc = require('electron').ipcRenderer;

function regresar() {
    alertify.error("Regresando.");
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'CECYTEM',
        password: '100%CECYTEM',
        database: 'CECYTEM',
        port: 3306
    });

    var queryPDF = connection.query("UPDATE TBL_PDF SET INT_VALOR=NULL WHERE VCH_NOMBRE='PROFESOR'");
    
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
