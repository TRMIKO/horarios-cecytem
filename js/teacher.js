var alertify = require("alertifyjs");
var jspdf = require("jspdf");

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}
Vue.component('profesores-comp', {
    props: ['p', 'index'],

    template: '<tr >' +
        '<td> <span>{{index}}</span> </td>' +
        '<td> <span>{{p["VCH_NAME"]}}</span> </td>' +
        '<td> <span>{{p["VCH_A_PATERNO"]}}</span> </td>' +
        '<td> <span>{{p["VCH_A_MATERNO"]}}</span> </td>' +
        '<td> <span><a class="button is-danger" v-on:click="remove(p)"  href="#"><span class="icon"><i class="fa fa-ban"></i></span></a></span> </td>' +
        '<td> <span><a class="button is-info" v-on:click="update(p)"  href="#"><span class="icon"><i class="fa fa-pencil"></i></span></a></span> </td>' +
        '<td> <span><a class="button " v-on:click="pdf(p)"  href="#"><span class="icon"><i class="fa  fa-file-pdf-o "></i></span></a></span> </td>' +
        '</tr>',
    methods: {
        remove: function (p) {
            this.$emit('remove', p['INT_USER'])
        },
        update: function (p) {
            this.$emit('update', p)
        },
        pdf: function (p) {
            this.$emit('pdf', p)
        }

    }
})
Vue.component('horario', {
    props: ['horas', 'hora'],

    template: '<tr >' +
        '<td> <span>{{horas[0]}}</span> </td>' +
        ' <td> <button v-if="vacio(horas[1].data)" v-bind:class="horas[1].classObject">{{horas[1].data}}</button> </td> ' +
        ' <td> <button v-if="vacio(horas[2].data)" v-bind:class="horas[2].classObject">{{horas[2].data}}</button> </td> ' +
        ' <td> <button v-if="vacio(horas[3].data)" v-bind:class="horas[3].classObject">{{horas[3].data}}</button> </td> ' +
        ' <td> <button v-if="vacio(horas[4].data)" v-bind:class="horas[4].classObject">{{horas[4].data}}</button> </td> ' +
        ' <td> <button v-if="vacio(horas[5].data)" v-bind:class="horas[5].classObject">{{horas[5].data}}</button> </td> ' +
        '</tr>',
    methods: {
        vacio: function (a) {
            if (a != '') {
                return true

            } else {
                return false
            }
        }
    }
})
var app = new Vue({
    el: '#app',
    data: {
        salones: [],
        ver: 1,
        profesores: [],
        prof: 0,
        horario: {}
    },
    created: function () {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'CECYTEM',
            password: '100%CECYTEM',
            database: 'CECYTEM',
            port: 3306
        })

        connection.connect();

        connection.query('SELECT * FROM TBL_USER', function (error, result) {
            if (error) {
                throw error;
                console.log("hola");
            } else {
                app.profesor = result
            }
        });

        connection.end();
    },
    methods: {
        close: function () {
            document.getElementById('delete').setAttribute("class", "modal")
            console.log(document.getElementById('text').removeChild(document.getElementById('text').lastChild))
        },
        cerrarPDF: function () {
            document.getElementById('verPDF').setAttribute("class", "modal")
        },
        cupdate: function () {
            alertify.error("Se canceló la actualización de la información del profesor.");
            setTimeout(function () {
                location.href = "teacher.html";
            }, 1500);
        },
        remove: function (id) {
            console.log(id)
            alertify.confirm("Eliminar Profesor", "¿Desea eliminar al profesor ", function () {
                    var mysql = require('mysql')
                    var con = mysql.createConnection({
                        host: 'localhost',
                        user: 'CECYTEM',
                        password: '100%CECYTEM',
                        database: 'CECYTEM',
                        port: 3306
                    })
                    var q = con.query('DELETE FROM TBL_USER WHERE INT_USER= ?', id, function (error, result) {
                        if (error) {
                            throw error;
                        } else {
                            alertify.success("¡El profesor se ha eliminado con éxito!");
                            setTimeout(function () {
                                location.href = "teacher.html";
                            }, 3000);
                        }
                    });
                    con.end();
                },
                function () {
                    alertify.error('Se canceló la petición.');
                });
        },
        update: function (element) {
            this.horario = JSON.parse(element['TXT_HORARIO'])

            document.getElementById('update').setAttribute("class", "modal is-active")
            var fecha1 = null,
                fecha2 = null;
            if (element["DDT_NACIMIENTO"] != null) {
                fecha1 = element["DDT_NACIMIENTO"].getFullYear();
                if (element["DDT_NACIMIENTO"].getMonth() < 10)
                    fecha1 = fecha1 + "-0" + (element["DDT_NACIMIENTO"].getMonth() + 1);
                else
                    fecha1 = fecha1 + "-" + (element["DDT_NACIMIENTO"].getMonth() + 1);
                if (element["DDT_NACIMIENTO"].getDate() < 10)
                    fecha1 = fecha1 + "-0" + element["DDT_NACIMIENTO"].getDate();
                else
                    fecha1 = fecha1 + "-" + element["DDT_NACIMIENTO"].getDate();
            }
            document.getElementById('fechaN').value = fecha1
            if (element["DDT_FECHA_INI_ORG"] != null) {
                fecha2 = element["DDT_FECHA_INI_ORG"].getFullYear();
                if (element["DDT_FECHA_INI_ORG"].getMonth() < 10)
                    fecha2 = fecha2 + "-0" + (element["DDT_FECHA_INI_ORG"].getMonth() + 1);
                else
                    fecha2 = fecha2 + "-" + (element["DDT_FECHA_INI_ORG"].getMonth() + 1);
                if (element["DDT_FECHA_INI_ORG"].getDate() < 10)
                    fecha2 = fecha2 + "-0" + element["DDT_FECHA_INI_ORG"].getDate();
                else
                    fecha2 = fecha2 + "-" + element["DDT_FECHA_INI_ORG"].getDate();
            }
            document.getElementById('fechaI').value = fecha2
            document.getElementById('update').setAttribute("class", "is-active modal")
            document.getElementById('nombre').value = element['VCH_NAME'] == null ? ' ' : element['VCH_NAME']
            document.getElementById('apellidoP').value = element['VCH_A_PATERNO'] == null ? '' : element['VCH_A_PATERNO']
            document.getElementById('apellidoM').value = element['VCH_A_MATERNO'] == null ? '' : element['VCH_A_MATERNO']

            document.getElementById('lugarN').value = element['VCH_LUGAR_NACIMIENTO'] == null ? '' : element['VCH_LUGAR_NACIMIENTO']
            document.getElementById('horasA').value = element['INT_HORAS_ADICIONALES'] == null ? '' : element['INT_HORAS_ADICIONALES']

            document.getElementById('genero').value = element['ENM_GENERO'] == null ? '' : element['ENM_GENERO']
            document.getElementById('estadoC').value = element['ENM_ESTADO_CIVIL'] == null ? '' : element['ENM_ESTADO_CIVIL']

            document.getElementById('status').value = element['ENM_STATUS'] == null ? '' : element['ENM_STATUS']
            document.getElementById('permiso').value = element['ENM_PERMISOS'] == null ? '' : element['ENM_PERMISOS']

            document.getElementById('horasB').value = element['INT_HORAS_BASE'] == null ? '' : element['INT_HORAS_BASE']
            document.getElementById('numeroN').value = element['INT_NUM_NOMINA'] == null ? '' : element['INT_NUM_NOMINA']
            document.getElementById('cedulaD').value = element['VCH_CEDULA_DOCTORADO'] == null ? '' : element['VCH_CEDULA_DOCTORADO']
            document.getElementById('cedulaL').value = element['VCH_CEDULA_LICENCIATURA'] == null ? '' : element['VCH_CEDULA_LICENCIATURA']
            document.getElementById('cedulaM').value = element['VCH_CEDULA_MAESTRIA'] == null ? '' : element['VCH_CEDULA_MAESTRIA']
            document.getElementById('colonia').value = element['VCH_COLONIA'] == null ? '' : element['VCH_COLONIA']

            document.getElementById('mail').value = element['VCH_CORREO'] == null ? '' : element['VCH_CORREO']

            document.getElementById('codigoP').value = element['VCH_CP'] == null ? '' : element['VCH_CP']

            document.getElementById('curp').value = element['VCH_CURP'] == null ? '' : element['VCH_CURP']

            document.getElementById('doctorado').value = element['VCH_DOCTORADO'] == null ? '' : element['VCH_DOCTORADO']
            document.getElementById('licenciatura').value = element['VCH_LICENCIATURA'] == null ? '' : element['VCH_LICENCIATURA']
            document.getElementById('maestria').value = element['VCH_MAESTRIA'] == null ? '' : element['VCH_MAESTRIA']

            document.getElementById('nombramiento').value = element['VCH_NOMBRAMIENTO'] == null ? '' : element['VCH_NOMBRAMIENTO']

            document.getElementById('numeroC').value = element['VCH_NUMERO_CALLE'] == null ? '' : element['VCH_NUMERO_CALLE']
            document.getElementById('calle').value = element['VCH_CALLE'] == null ? '' : element['VCH_CALLE']
            document.getElementById('pass').value = element['VCH_PASS'] == null ? '' : element['VCH_PASS']

            document.getElementById('rfc').value = element['VCH_RFC'] == null ? '' : element['VCH_RFC']
            document.getElementById('telefonoCe').value = element['VCH_TEL_CEL'] == null ? '' : element['VCH_TEL_CEL']
            document.getElementById('telefonoCa').value = element['VCH_TEL_LOCAL'] == null ? '' : element['VCH_TEL_LOCAL']




        },
        pdf: function (p) {
            console.log(p)
            /*************************PDF*****************/
            var mysql = require('mysql');
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'CECYTEM',
                password: '100%CECYTEM',
                database: 'CECYTEM',
                port: 3306
            });

            var queryPDF = connection.query("UPDATE TBL_PDF SET VCH_VALOR=? WHERE VCH_NOMBRE='PROFESOR'", [p.INT_USER]);

            alertify.success("Descargar PDF");
//            html2canvas(document.getElementById("plantillaPDF"), {
//                onrendered: function (canvas) {
//                    var img = canvas;
//                    var doc = new jspdf();
//
//                    doc.addImage(img, 'JPEG', -2, 0);
//                    doc.setFontSize(12);
//                    doc.text(70, 32, p.VCH_NAME)
//                    doc.text(120, 32, p.VCH_A_PATERNO)
//                    doc.text(170, 32, p.VCH_A_MATERNO)
                    setTimeout(function () {
                        location.href="pdfTeacher.html";
                    }, 3000);
   //             }
  //          });


            //            doc.save('profesor.pdf')
            //            var url = '../visorPDF/web/varianza.pdf';
            //            PDFJS.workerSrc = '../visorPDF/build/pdf.worker.js';
            //            var loadingTask = PDFJS.getDocument(url);
            //            loadingTask.promise.then(function (pdf) {
            //                console.log('PDF loaded');
            //
            //                // Fetch the first page
            //                var pageNumber = 1;
            //                pdf.getPage(pageNumber).then(function (page) {
            //                    console.log('Page loaded');
            //
            //                    var scale = 1.5;
            //                    var viewport = page.getViewport(scale);
            //
            //                    // Prepare canvas using PDF page dimensions
            //                    var canvas = document.getElementById('cuerpoPDF');
            //                    var context = canvas.getContext('2d');
            //
            //                    // Render PDF page into canvas context
            //                    var renderContext = {
            //                        canvasContext: context,
            //                        viewport: viewport
            //                    };
            //                    var renderTask = page.render(renderContext);
            //                    renderTask.then(function () {
            //                        console.log('Page rendered');
            //                    });
            //                });
            //            }, function (reason) {
            //                // PDF loading error
            //                console.error(reason);
            //            });
            /***********************PDF*****************/
        },
        view: function () {

        }
    },
    created: function () {

        var mysql = require('mysql')
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'CECYTEM',
            password: '100%CECYTEM',
            database: 'CECYTEM',
            port: 3306
        })
        var query2 = connection.query('SELECT * FROM TBL_USER ', function (error, result) {
            if (error) {
                throw error
            } else {
                //console.log(result)
                app.profesores = result

            }
        });

        connection.end();

    }
})
//app.view()

function mostrar() {
    var pass = document.getElementById("pass"),
        checkbox = document.getElementById("mostrar");

    if (checkbox.checked == true)
        pass.type = "text";
    else
        pass.type = "password";
}


// result.forEach(function (element) {
//     //console.log(element)
//     let tr = document.createElement('tr')
//
//     let td = document.createElement('td')
//     td.appendChild(document.createTextNode(element['INT_USER']))
//     tr.appendChild(td)
//     td = document.createElement('td')
//     td.appendChild(document.createTextNode(element['VCH_NAME']))
//     tr.appendChild(td)
//
//     td = document.createElement('td')
//     td.appendChild(document.createTextNode(element['VCH_A_PATERNO']))
//     tr.appendChild(td)
//
//     td = document.createElement('td')
//     td.appendChild(document.createTextNode(element['VCH_A_MATERNO'] == null ? '' : element['VCH_A_MATERNO']))
//     tr.appendChild(td)
//
//
//     td = document.createElement('td')
//     let span = document.createElement('span')
//     let i = document.createElement('i')
//
//     i.setAttribute("class", "fa fa-ban")
//     span.appendChild(i)
//     span.setAttribute("class", "icon is-small")
//
//     let span2 = document.createElement('span')
//     span2.appendChild(span)
//     span2.setAttribute("class", "button is-danger")
//     span2.addEventListener("click", function () {
//         alertify.confirm("Eliminar Profesor", "¿Desea eliminar al profesor " + element['VCH_NAME'] + " " + element['VCH_A_PATERNO'] + "" + (element['VCH_A_MATERNO'] == null ? "" : " " + element['VCH_A_MATERNO']) + "?",
//             function () {
//                 var con = mysql.createConnection({
//                     host: 'localhost',
//                     user: 'CECYTEM',
//                     password: '100%CECYTEM',
//                     database: 'CECYTEM',
//                     port: 3306
//                 })
//                 var q = con.query('DELETE FROM TBL_USER WHERE INT_USER= ?', [element['INT_USER']], function (error, result) {
//                     if (error) {
//                         throw error;
//                     } else {
//                         alertify.success("¡El profesor se ha eliminado con éxito!");
//                         setTimeout(function () {
//                             location.href = "teacher.html";
//                         }, 3000);
//                     }
//                 });
//                 con.end();
//             },
//             function () {
//                 alertify.error('Se canceló la petición.');
//             });
//     })
//     td.appendChild(span2)
//     tr.appendChild(td)
//
//     td = document.createElement('td')
//     span = document.createElement('span')
//     i = document.createElement('i')
//
//     i.setAttribute("class", "fa fa-pencil")
//     span.appendChild(i)
//     span.setAttribute("class", "icon is-small")
//
//     span2 = document.createElement('span')
//     span2.appendChild(span)
//     span2.setAttribute("class", "button is-info")
//     span2.addEventListener("click", function () {
//         var fecha1 = null,
//             fecha2 = null;
//         if (element["DDT_NACIMIENTO"] != null) {
//             fecha1 = element["DDT_NACIMIENTO"].getFullYear();
//             if (element["DDT_NACIMIENTO"].getMonth() < 10)
//                 fecha1 = fecha1 + "-0" + (element["DDT_NACIMIENTO"].getMonth() + 1);
//             else
//                 fecha1 = fecha1 + "-" + (element["DDT_NACIMIENTO"].getMonth() + 1);
//             if (element["DDT_NACIMIENTO"].getDate() < 10)
//                 fecha1 = fecha1 + "-0" + element["DDT_NACIMIENTO"].getDate();
//             else
//                 fecha1 = fecha1 + "-" + element["DDT_NACIMIENTO"].getDate();
//         }
//         document.getElementById('fechaN').value = fecha1
//         if (element["DDT_FECHA_INI_ORG"] != null) {
//             fecha2 = element["DDT_FECHA_INI_ORG"].getFullYear();
//             if (element["DDT_FECHA_INI_ORG"].getMonth() < 10)
//                 fecha2 = fecha2 + "-0" + (element["DDT_FECHA_INI_ORG"].getMonth() + 1);
//             else
//                 fecha2 = fecha2 + "-" + (element["DDT_FECHA_INI_ORG"].getMonth() + 1);
//             if (element["DDT_FECHA_INI_ORG"].getDate() < 10)
//                 fecha2 = fecha2 + "-0" + element["DDT_FECHA_INI_ORG"].getDate();
//             else
//                 fecha2 = fecha2 + "-" + element["DDT_FECHA_INI_ORG"].getDate();
//         }
//         document.getElementById('fechaI').value = fecha2
//         document.getElementById('update').setAttribute("class", "is-active modal")
//         document.getElementById('nombre').value = element['VCH_NAME'] == null ? ' ' : element['VCH_NAME']
//         document.getElementById('apellidoP').value = element['VCH_A_PATERNO'] == null ? '' : element['VCH_A_PATERNO']
//         document.getElementById('apellidoM').value = element['VCH_A_MATERNO'] == null ? '' : element['VCH_A_MATERNO']
//
//         document.getElementById('lugarN').value = element['VCH_LUGAR_NACIMIENTO'] == null ? '' : element['VCH_LUGAR_NACIMIENTO']
//         document.getElementById('horasA').value = element['INT_HORAS_ADICIONALES'] == null ? '' : element['INT_HORAS_ADICIONALES']
//
//         document.getElementById('genero').value = element['ENM_GENERO'] == null ? '' : element['ENM_GENERO']
//         document.getElementById('estadoC').value = element['ENM_ESTADO_CIVIL'] == null ? '' : element['ENM_ESTADO_CIVIL']
//
//         document.getElementById('status').value = element['ENM_STATUS'] == null ? '' : element['ENM_STATUS']
//         document.getElementById('permiso').value = element['ENM_PERMISOS'] == null ? '' : element['ENM_PERMISOS']
//
//         document.getElementById('horasB').value = element['INT_HORAS_BASE'] == null ? '' : element['INT_HORAS_BASE']
//         document.getElementById('numeroN').value = element['INT_NUM_NOMINA'] == null ? '' : element['INT_NUM_NOMINA']
//         document.getElementById('cedulaD').value = element['VCH_CEDULA_DOCTORADO'] == null ? '' : element['VCH_CEDULA_DOCTORADO']
//         document.getElementById('cedulaL').value = element['VCH_CEDULA_LICENCIATURA'] == null ? '' : element['VCH_CEDULA_LICENCIATURA']
//         document.getElementById('cedulaM').value = element['VCH_CEDULA_MAESTRIA'] == null ? '' : element['VCH_CEDULA_MAESTRIA']
//         document.getElementById('colonia').value = element['VCH_COLONIA'] == null ? '' : element['VCH_COLONIA']
//
//         document.getElementById('mail').value = element['VCH_CORREO'] == null ? '' : element['VCH_CORREO']
//
//         document.getElementById('codigoP').value = element['VCH_CP'] == null ? '' : element['VCH_CP']
//
//         document.getElementById('curp').value = element['VCH_CURP'] == null ? '' : element['VCH_CURP']
//
//         document.getElementById('doctorado').value = element['VCH_DOCTORADO'] == null ? '' : element['VCH_DOCTORADO']
//         document.getElementById('licenciatura').value = element['VCH_LICENCIATURA'] == null ? '' : element['VCH_LICENCIATURA']
//         document.getElementById('maestria').value = element['VCH_MAESTRIA'] == null ? '' : element['VCH_MAESTRIA']
//
//         document.getElementById('nombramiento').value = element['VCH_NOMBRAMIENTO'] == null ? '' : element['VCH_NOMBRAMIENTO']
//
//         document.getElementById('numeroC').value = element['VCH_NUMERO_CALLE'] == null ? '' : element['VCH_NUMERO_CALLE']
//         document.getElementById('calle').value = element['VCH_CALLE'] == null ? '' : element['VCH_CALLE']
//         document.getElementById('pass').value = element['VCH_PASS'] == null ? '' : element['VCH_PASS']
//
//         document.getElementById('rfc').value = element['VCH_RFC'] == null ? '' : element['VCH_RFC']
//         document.getElementById('telefonoCe').value = element['VCH_TEL_CEL'] == null ? '' : element['VCH_TEL_CEL']
//         document.getElementById('telefonoCa').value = element['VCH_TEL_LOCAL'] == null ? '' : element['VCH_TEL_LOCAL']
//         document.getElementById('update-btn').addEventListener("click", function () {
//             var mysql = require('mysql');
//             var connection = mysql.createConnection({
//                 host: 'localhost',
//                 user: 'root',
//                 password: 'DeathRocker',
//                 database: 'CECYTEM',
//                 port: 3306
//             });
//             connection.connect(function (error) {
//                 if (error) {
//                     throw error;
//                 } else {
//                     console.log('Conexion correcta.');
//                 }
//             });
//
//             var nombre = document.getElementById("nombre").value,
//                 apellidoP = document.getElementById("apellidoP").value,
//                 apellidoM = document.getElementById("apellidoM").value,
//                 lugarN = document.getElementById("lugarN").value,
//                 fechaN = document.getElementById("fechaN").value,
//                 genero = document.getElementById("genero").value,
//                 estadoC = document.getElementById("estadoC").value,
//                 curp = document.getElementById("curp").value,
//                 rfc = document.getElementById("rfc").value,
//                 colonia = document.getElementById("colonia").value,
//                 calle = document.getElementById("calle").value,
//                 numeroC = document.getElementById("numeroC").value,
//                 codigoP = document.getElementById("codigoP").value,
//                 telefonoCa = document.getElementById("telefonoCa").value,
//                 telefonoCe = document.getElementById("telefonoCe").value,
//                 fechaI = document.getElementById("fechaI").value,
//                 numeroN = document.getElementById("numeroN").value,
//                 nombramiento = document.getElementById("nombramiento").value,
//                 status = document.getElementById("status").value,
//                 horasB = document.getElementById("horasB").value,
//                 horasA = document.getElementById("horasA").value,
//                 licenciatura = document.getElementById("licenciatura").value,
//                 cedulaL = document.getElementById("cedulaL").value,
//                 maestria = document.getElementById("maestria").value,
//                 cedulaM = document.getElementById("cedulaM").value,
//                 doctorado = document.getElementById("doctorado").value,
//                 cedulaD = document.getElementById("cedulaD").value,
//                 permiso = document.getElementById("permiso").value,
//                 mail = document.getElementById("mail").value,
//                 pass = document.getElementById("pass").value;
//
//             if (nombre === "") {
//                 alertify.error("Falta llenar el campo del NOMBRE");
//                 document.getElementById("nombre").setAttribute("class", "input is-danger");
//                 document.getElementById("errorNombre").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("nombre").setAttribute("class", "input is-success");
//                 document.getElementById("errorNombre").setAttribute("style", "display: none");
//             }
//             if (apellidoP === "") {
//                 alertify.error("Falta llenar el campo del APELLIDO PATERNO");
//                 document.getElementById("apellidoP").setAttribute("class", "input is-danger");
//                 document.getElementById("errorAP").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("apellidoP").setAttribute("class", "input is-success");
//                 document.getElementById("errorAP").setAttribute("style", "display: none");
//             }
//             if (lugarN === "") {
//                 alertify.error("Falta llenar el campo del LUGAR DE NACIMIENTO");
//                 document.getElementById("lugarN").setAttribute("class", "input is-danger");
//                 document.getElementById("errorLN").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("lugarN").setAttribute("class", "input is-success");
//                 document.getElementById("errorLN").setAttribute("style", "display: none");
//             }
//
//             if (fechaN === "") {
//                 alertify.error("Falta llenar el campo de FECHA DE NACIMIENTO");
//                 document.getElementById("fechaN").setAttribute("class", "input is-danger");
//                 document.getElementById("errorNac").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("fechaN").setAttribute("class", "input is-success");
//                 document.getElementById("errorNac").setAttribute("style", "display: none");
//             }
//             if (genero === "") {
//                 alertify.error("Falta llenar el campo de GÉNERO");
//                 document.getElementById("genero").setAttribute("class", "input is-danger");
//                 document.getElementById("errorGen").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("genero").setAttribute("class", "input is-success");
//                 document.getElementById("errorGen").setAttribute("style", "display: none");
//             }
//             if (estadoC === "") {
//                 alertify.error("Falta llenar el campo de ESTADO CÍVIL");
//                 document.getElementById("estadoC").setAttribute("class", "input is-danger");
//                 document.getElementById("errorEC").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("estadoC").setAttribute("class", "input is-success");
//                 document.getElementById("errorEC").setAttribute("style", "display: none");
//             }
//             if (curp === "") {
//                 alertify.error("Falta llenar el campo del CURP");
//                 document.getElementById("curp").setAttribute("class", "input is-danger");
//                 document.getElementById("errorCURP").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("curp").setAttribute("class", "input is-success");
//                 document.getElementById("errorCURP").setAttribute("style", "display: none");
//             }
//             if (rfc === "") {
//                 alertify.error("Falta llenar el campo del RFC");
//                 document.getElementById("rfc").setAttribute("class", "input is-danger");
//                 document.getElementById("errorRFC").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("rfc").setAttribute("class", "input is-success");
//                 document.getElementById("errorRFC").setAttribute("style", "display: none");
//             }
//             if (colonia === "") {
//                 alertify.error("Falta llenar el campo de COLONIA");
//                 document.getElementById("colonia").setAttribute("class", "input is-danger");
//                 document.getElementById("errorCol").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("colonia").setAttribute("class", "input is-success");
//                 document.getElementById("errorCol").setAttribute("style", "display: none");
//             }
//             if (calle === "") {
//                 alertify.error("Falta llenar el campo de CALLE");
//                 document.getElementById("calle").setAttribute("class", "input is-danger");
//                 document.getElementById("errorCalle").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("calle").setAttribute("class", "input is-success");
//                 document.getElementById("errorCalle").setAttribute("style", "display: none");
//             }
//             if (numeroC === "") {
//                 alertify.error("Falta llenar el campo de NÚMERO DE CASA");
//                 document.getElementById("numeroC").setAttribute("class", "input is-danger");
//                 document.getElementById("errorNC").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("numeroC").setAttribute("class", "input is-success");
//                 document.getElementById("errorNC").setAttribute("style", "display: none");
//             }
//             if (codigoP === "") {
//                 alertify.error("Falta llenar el campo del CÓDIGO POSTAL");
//                 document.getElementById("codigoP").setAttribute("class", "input is-danger");
//                 document.getElementById("errorCP").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("codigoP").setAttribute("class", "input is-success");
//                 document.getElementById("errorCP").setAttribute("style", "display: none");
//             }
//             if (telefonoCa === "") {
//                 alertify.error("Falta llenar el campo del TÉLEFONO DE PREFERENCIA");
//                 document.getElementById("telefonoCa").setAttribute("class", "input is-danger");
//                 document.getElementById("errorT1").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("telefonoCa").setAttribute("class", "input is-success");
//                 document.getElementById("errorT1").setAttribute("style", "display: none");
//             }
//             if (numeroN === "") {
//                 alertify.error("Falta llenar el campo de NÚMERO DE NÓMINA");
//                 document.getElementById("numeroN").setAttribute("class", "input is-danger");
//                 document.getElementById("errorNN").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("numeroN").setAttribute("class", "input is-success");
//                 document.getElementById("errorNN").setAttribute("style", "display: none");
//             }
//             if (fechaI === "") {
//                 alertify.error("Falta llenar el campo del FECHA INICIO EN EL PLANTEL");
//                 document.getElementById("fechaI").setAttribute("class", "input is-danger");
//                 document.getElementById("errorFIDP").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("fechaI").setAttribute("class", "input is-success");
//                 document.getElementById("errorFIDP").setAttribute("style", "display: none");
//             }
//             if (nombramiento === "") {
//                 alertify.error("Falta llenar el campo de NOMBRAMIENTO");
//                 document.getElementById("nombramiento").setAttribute("class", "input is-danger");
//                 document.getElementById("errorNombra").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("nombramiento").setAttribute("class", "input is-success");
//                 document.getElementById("errorNombra").setAttribute("style", "display: none");
//             }
//             if (status === "") {
//                 alertify.error("Falta llenar el campo de ESTATUS");
//                 document.getElementById("status").setAttribute("class", "input is-danger");
//                 document.getElementById("errorSta").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("status").setAttribute("class", "input is-success");
//                 document.getElementById("errorSta").setAttribute("style", "display: none");
//             }
//
//             if (horasB === "") {
//                 alertify.error("Falta llenar el campo de HORAS BASE");
//                 document.getElementById("horasB").setAttribute("class", "input is-danger");
//                 document.getElementById("errorHB").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("horasB").setAttribute("class", "input is-success");
//                 document.getElementById("errorHB").setAttribute("style", "display: none");
//             }
//             if (horasA === "") {
//                 alertify.error("Falta llenar el campo de HORAS ADICIONALES");
//                 document.getElementById("horasA").setAttribute("class", "input is-danger");
//                 document.getElementById("errorHA").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("horasA").setAttribute("class", "input is-success");
//                 document.getElementById("errorHA").setAttribute("style", "display: none");
//             }
//             if (licenciatura === "") {
//                 alertify.error("Falta llenar el campo de LICENCIATURA");
//                 document.getElementById("licenciatura").setAttribute("class", "input is-danger");
//                 document.getElementById("errorLic").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("licenciatura").setAttribute("class", "input is-success");
//                 document.getElementById("errorLic").setAttribute("style", "display: none");
//             }
//             if (cedulaL === "") {
//                 alertify.error("Falta llenar el campo de CÉDULA DE LICENCIATURA");
//                 document.getElementById("cedulaL").setAttribute("class", "input is-danger");
//                 document.getElementById("errorCL").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("cedulaL").setAttribute("class", "input is-success");
//                 document.getElementById("errorCL").setAttribute("style", "display: none");
//             }
//             if (permiso === "") {
//                 alertify.error("Falta llenar el campo de PERMISO");
//                 document.getElementById("permiso").setAttribute("class", "input is-danger");
//                 document.getElementById("errorPer").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("permiso").setAttribute("class", "input is-success");
//                 document.getElementById("errorPer").setAttribute("style", "display: none");
//             }
//             if (mail === "") {
//                 alertify.error("Falta llenar el campo del CORREO");
//                 document.getElementById("mail").setAttribute("class", "input is-danger");
//                 document.getElementById("errorCorreo").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("mail").setAttribute("class", "input is-success");
//                 document.getElementById("errorCorreo").setAttribute("style", "display: none");
//             }
//             if (pass === "") {
//                 alertify.error("Falta llenar el campo de CONTRASEÑA");
//                 document.getElementById("pass").setAttribute("class", "input is-danger");
//                 document.getElementById("errorPass").setAttribute("style", "display: block");
//                 return 0;
//             } else {
//                 document.getElementById("pass").setAttribute("class", "input is-success");
//                 document.getElementById("errorPass").setAttribute("style", "display: none");
//             }
//             if (apellidoM === "")
//                 apellidoM = null;
//             if (telefonoCe === "")
//                 telefonoCe = null;
//             if (maestria === "")
//                 maestria = null;
//             if (cedulaM === "")
//                 cedulaM = null;
//             if (doctorado === "")
//                 doctorado = null;
//             if (cedulaD === "")
//                 cedulaD = null;
//
//             var query = connection.query("UPDATE TBL_USER SET VCH_NAME=?, VCH_A_PATERNO=?, VCH_A_MATERNO=?, INT_NUM_NOMINA=?, ENM_ESTADO_CIVIL=?, ENM_GENERO=?, VCH_LUGAR_NACIMIENTO=?, DDT_NACIMIENTO=?, VCH_CURP=?, VCH_RFC=?, VCH_CORREO=?, DDT_FECHA_INI_ORG=?, VCH_NOMBRAMIENTO=?, ENM_STATUS=?, INT_HORAS_BASE=?, INT_HORAS_ADICIONALES=?, VCH_LICENCIATURA=?, VCH_CEDULA_LICENCIATURA=?, VCH_MAESTRIA=?, VCH_CEDULA_MAESTRIA=?, VCH_DOCTORADO=?, VCH_CEDULA_DOCTORADO=?, VCH_CP=?, VCH_COLONIA=?, VCH_CALLE=?, VCH_NUMERO_CALLE=?, VCH_TEL_LOCAL=?, VCH_TEL_CEL=?, VCH_PASS=?, ENM_PERMISOS=? WHERE INT_USER=?", [nombre, apellidoP, apellidoM, numeroN, estadoC, genero, lugarN, fechaN, curp, rfc, mail, fechaI, nombramiento, status, horasB, horasA, licenciatura, cedulaL, maestria, cedulaM, doctorado, cedulaD, codigoP, colonia, calle, numeroC, telefonoCa, telefonoCe, pass, permiso, element['INT_USER']]);
//
//
//             alertify.success("¡Se ha actualizado la información del profesor con éxito!");
//             setTimeout(function () {
//                 location.href = "teacher.html";
//             }, 3000);
//
//             connection.end();
//             /*var con = mysql.createConnection({
//                   host: 'localhost',
//                   user: 'root',
//                   password: '123',
//                   database: 'CECYTEM',
//                   port: 3306
//               })
//              var q = con.query('UPDATE TBL_MATERIA SET VCH_NOMBRE= ?,INT_SEMESTRE=?,INT_HORAR=? WHERE INT_MATERIA= ?',[document.getElementById('materia').value,document.getElementById('semestre').value,document.getElementById('hora').value,element['INT_MATERIA']], function(error, result){
//                   if(error){
//                      throw error;
//                   }else{
//                       console.log("actualizado")
//                        location.reload();
//                   }
//                });
//               con.end();*/
//         })
//
//
//     })
//     td.appendChild(span2)
//     tr.appendChild(td)
//
//
//     td = document.createElement('td')
//     span = document.createElement('span')
//     i = document.createElement('i')
//
//     i.setAttribute("class", "fa fa-file-pdf-o")
//     span.appendChild(i)
//     span.setAttribute("class", "icon is-small")
//
//     span2 = document.createElement('span')
//     span2.appendChild(span)
//     span2.setAttribute("class", "button is-light")
//     span2.addEventListener("click", function () {
//         document.getElementById('update').setAttribute("class", "is-active modal")
//         document.getElementById('materia').value = element['VCH_NOMBRE']
//         document.getElementById('semestre').value = element['INT_SEMESTRE']
//         document.getElementById('hora').value = element['INT_HORAR']
//         document.getElementById('update-btn').addEventListener("click", function () {
//             /* var con = mysql.createConnection({
//                    host: 'localhost',
//                    user: 'root',
//                    password: '123',
//                    database: 'CECYTEM',
//                    port: 3306
//                })
//               var q = con.query('UPDATE TBL_MATERIA SET VCH_NOMBRE= ?,INT_SEMESTRE=?,INT_HORAR=? WHERE INT_MATERIA= ?',[document.getElementById('materia').value,document.getElementById('semestre').value,document.getElementById('hora').value,element['INT_MATERIA']], function(error, result){
//                    if(error){
//                       throw error;
//                    }else{
//                        console.log("actualizado")
//                         location.reload();
//                    }
//                 });
//                con.end();*/
//         })
//
//
//     })
//     td.appendChild(span2)
//     tr.appendChild(td)
//
//
//
//     document.getElementById('content').appendChild(tr)
//     //console.log(tr)
// })
