var alertify = require("alertifyjs");

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "index.html";
    }, 3000);
}

var app = new Vue({
    el: '#app',
    data: {
        nombre: ''

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
            var query2 = con.query('INSERT INTO TBL_SALON VALUES(NULL,?) ', [this.nombre], function (error, result) {
                if (error) {
                    throw error
                } else {
                    alertify.success("¡El salón se ha creado con éxito!");
                    setTimeout(function () {
                        location.href = "classroom.html";
                    }, 3000);
                }
            });

            con.end();

        }
    }


})
