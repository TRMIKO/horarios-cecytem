var alertify = require("alertifyjs");

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}

Vue.component('my-component', {
    template: '<div>A custom component!</div>',
    props: ['salones']
})
var app = new Vue({
    el: '#app',
    data: {
        salones: [],
        msj: 'hola'
    },
    methods: {
        close: function () {
            document.getElementById('delete').setAttribute("class", "modal")


            console.log(document.getElementById('text').removeChild(document.getElementById('text').lastChild))
        },
        cupdate: function () {
            alertify.error("Se canceló la actualización de la información de la materia.");
            setTimeout(function () {
                location.href = "subject.html";
            }, 3000);
        },
        del: function (id) {
            console.log(id)
        },
        view: function () {
            var mysql = require('mysql')
            var con = mysql.createConnection({
                host: 'localhost',
                user: 'CECYTEM',
                password: '100%CECYTEM',
                database: 'CECYTEM',
                port: 3306
            })
            var query2 = con.query('SELECT * FROM TBL_MATERIA ', function (error, result) {
                if (error) {
                    throw error
                } else {
                    console.log(result)
                    result.forEach(function (element) {
                        console.log(element)
                        let tr = document.createElement('tr')

                        let td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['INT_MATERIA']))
                        tr.appendChild(td)
                        td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['VCH_NOMBRE']))
                        tr.appendChild(td)

                        td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['INT_SEMESTRE']))
                        tr.appendChild(td)

                        td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['INT_HORAS_P']))
                        tr.appendChild(td)

                        td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['INT_HORAS_T']))
                        tr.appendChild(td)


                        td = document.createElement('td')
                        let span = document.createElement('span')
                        let i = document.createElement('i')

                        i.setAttribute("class", "fa fa-ban")
                        span.appendChild(i)
                        span.setAttribute("class", "icon is-small")

                        let span2 = document.createElement('span')
                        span2.appendChild(span)
                        span2.setAttribute("class", "button is-danger")
                        span2.addEventListener("click", function () {
                            alertify.confirm("Eliminar Materia", "¿Desea eliminar la materia " + element['VCH_NOMBRE'] + "?",
                                function () {
                                    var con = mysql.createConnection({
                                        host: 'localhost',
                                        user: 'CECYTEM',
                                        password: '100%CECYTEM',
                                        database: 'CECYTEM',
                                        port: 3306
                                    })
                                    var q = con.query('DELETE FROM TBL_MATERIA WHERE INT_MATERIA= ?', [element['INT_MATERIA']], function (error, result) {
                                        if (error) {
                                            throw error;
                                        } else {
                                            alertify.success("¡La materia se ha eliminado con éxito!");
                                            setTimeout(function () {
                                                location.href = "subject.html";
                                            }, 3000);
                                        }
                                    });
                                    con.end();
                                },
                                function () {
                                    alertify.error('Se canceló la petición.');
                                });
                            /*                            p = document.createElement('p')
                                                        p.appendChild(document.createTextNode(element['VCH_NOMBRE']))
                                                        document.getElementById('delete').setAttribute("class", "is-active modal")
                                                        document.getElementById('text').appendChild(p)
                                                        document.getElementById('delete-btn').addEventListener("click", function () {

                                                            this.removeEventListener('click', arguments.callee);
                                                            document.getElementById('delete').setAttribute("class", "modal")
                                                            var conn = mysql.createConnection({
                                                                host: 'localhost',
                                                                user: 'CECYTEM',
                                                                password: '100%CECYTEM',
                                                                database: 'CECYTEM',
                                                                port: 3306
                                                            })
                                                            var q = conn.query('DELETE FROM TBL_MATERIA WHERE INT_MATERIA= ?', [element['INT_MATERIA']], function (error, result) {
                                                                if (error) {
                                                                    throw error;
                                                                } else {
                                                                    console.log("borrado")
                                                                }
                                                            });
                                                            conn.end();

                                                        })
                            */
                        })
                        td.appendChild(span2)
                        tr.appendChild(td)



                        td = document.createElement('td')
                        span = document.createElement('span')
                        i = document.createElement('i')

                        i.setAttribute("class", "fa fa-pencil")
                        span.appendChild(i)
                        span.setAttribute("class", "icon is-small")

                        span2 = document.createElement('span')
                        span2.appendChild(span)
                        span2.setAttribute("class", "button is-info")
                        span2.addEventListener("click", function () {
                            document.getElementById('update').setAttribute("class", "is-active modal")
                            document.getElementById('materia').value = element['VCH_NOMBRE']
                            document.getElementById('semestre').value = element['INT_SEMESTRE']
                            document.getElementById('horap').value = element['INT_HORAS_P']
                            document.getElementById('horat').value = element['INT_HORAS_T']
                            document.getElementById('update-btn').addEventListener("click", function () {
                                var conn = mysql.createConnection({
                                    host: 'localhost',
                                    user: 'CECYTEM',
                                    password: '100%CECYTEM',
                                    database: 'CECYTEM',
                                    port: 3306
                                })

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

                                var q = conn.query('UPDATE TBL_MATERIA SET VCH_NOMBRE= ?,INT_SEMESTRE=?,INT_HORAS_P=?,INT_HORAS_T=? WHERE INT_MATERIA= ?', [materia, semestre, horap, horat, element['INT_MATERIA']], function (error, result) {
                                    if (error) {
                                        throw error;
                                    } else {
                                        alertify.success("¡Se actualizó la información de la materia!");
                                        setTimeout(function () {
                                            location.href = "subject.html";
                                        }, 3000);
                                    }
                                });
                                conn.end();
                            })


                        })
                        td.appendChild(span2)
                        tr.appendChild(td)



                        document.getElementById('content').appendChild(tr)
                        console.log(tr)
                    })







                }
            });

            con.end();


        }
    }
})
app.view()
