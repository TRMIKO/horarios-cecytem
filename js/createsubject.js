var alertify = require("alertifyjs");

function crearMateria() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'CECYTEM',
        password: '100%CECYTEM',
        database: 'CECYTEM',
        port: 3306
    });
    connection.connect(function (error) {
        if (error) {
            throw error;
        } else {
            console.log('Conexion correcta.');
        }
    });

    var materia = document.getElementById("materia").value,
        semestre = document.getElementById("semestre").value,
        horap = document.getElementById("horap").value,
        horat = document.getElementById("horat").value;

    if (materia === "") {
        alertify.error("Falta llenar el campo de MATERIA");
        document.getElementById("materia").setAttribute("class", "input is-danger");
        document.getElementById("errorMateria").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("materia").setAttribute("class", "input is-success");
        document.getElementById("errorMateria").setAttribute("style", "display: none");
    }
    if (semestre === "") {
        alertify.error("Falta llenar el campo de SEMESTRE");
        document.getElementById("semestre").setAttribute("class", "input is-danger");
        document.getElementById("errorSemestre").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("semestre").setAttribute("class", "input is-success");
        document.getElementById("errorSemestre").setAttribute("style", "display: none");
    }
    if (horap === "") {
        alertify.error("Falta llenar el campo de HORAS PRACTICAS");
        document.getElementById("horap").setAttribute("class", "input is-danger");
        document.getElementById("errorPra").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("horap").setAttribute("class", "input is-success");
        document.getElementById("errorPra").setAttribute("style", "display: none");
    }
    if (horat === "") {
        alertify.error("Falta llenar el campo de MATERIA");
        document.getElementById("horat").setAttribute("class", "input is-danger");
        document.getElementById("errorTeo").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("horat").setAttribute("class", "input is-success");
        document.getElementById("errorTeo").setAttribute("style", "display: none");
    }



    var query = connection.query("INSERT INTO TBL_MATERIA (VCH_NOMBRE, INT_SEMESTRE, INT_HORAS_P, INT_HORAS_T) VALUES (?, ?, ?,?)", [materia, semestre, horap, horat]);
    alertify.success("¡Se ha creado la materia con éxito!");
    setTimeout(function () {
        location.href = "subject.html";
    }, 3000);
    connection.end();
}

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}

function cancel() {
    alertify.error("No se creará ninguna materia.");
    setTimeout(function () {
        location.href = "subject.html";
    }, 3000);
}