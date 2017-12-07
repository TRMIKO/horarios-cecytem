var alertify = require("alertifyjs");

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}

var app = new Vue({
    el: '#app',
    data: {
        nombre:'',
        esp:'',
        turno:'MATUTINO'

    },
    methods: {
        create: function () {

            var mysql = require('mysql')
            var con = mysql.createConnection({
                host: 'localhost',
                user: 'CECYTEM',
                password: '100%CECYTEM',
                database: 'CECYTEM',
                port: 3306
            })

            var nombre = document.getElementById("nombre").value;

            if (nombre === '') {
                alertify.error("Falta llenar el campo de NOMBRE");
                document.getElementById("nombre").setAttribute("class", "input is-danger");
                document.getElementById("errorNom").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("nombre").setAttribute("class", "input is-success");
                document.getElementById("errorNom").setAttribute("style", "display: none");
            }


            var query2 = con.query('INSERT INTO TBL_GRUPO VALUES(NULL,?,?,?) ', [this.nombre,this.esp,this.turno], function (error, result) {
                if (error) {
                    throw error
                } else {
                    alertify.success("¡El grupo se ha creado con éxito!");
                    setTimeout(function () {
                        location.href = "group.html";
                    }, 3000);
                }
            });

            con.end();

        }
    }


})
