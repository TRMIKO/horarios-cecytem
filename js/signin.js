var alertify = require("alertifyjs");
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
        message: 'Hello Vue!',
        info: []
    },
    created: function () {

    }
})

function Verificar() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'CECYTEM',
        password: '100%CECYTEM',
        database: 'CECYTEM',
        port: 3306
    });
    var mail = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    console.log(mail, pass);
    connection.connect(function (error) {
        if (error) {
            throw error;
        } else {
            console.log('Conexion correcta.');
        }
    });

    var query2 = connection.query('SELECT * FROM TBL_USER WHERE VCH_CORREO=? AND VCH_PASS=?', [mail, pass], function (error, result) {
        if (error) {
            throw error;
        } else {
            var mail = document.getElementById("email").value;
            var pass = document.getElementById("password").value;
            if (result.length > 0 && pass === result[0]['VCH_PASS'] && mail === result[0]['VCH_CORREO']) {
                if (result[0]['ENM_PERMISOS'] === "ADMIN") {
                    alertify.success("Datos Correctos. Ingresando.")
                    setTimeout(function () {
                        location.href = "index.html";
                    }, 3000);
                } else {
                    alertify.success("Datos Correctos. Ingresando.")
                    var modal = document.getElementById("mod");
                    setTimeout(function () {
                        modal.setAttribute("class", "modal is-active");
                    }, 3000);

                    var nombre = document.getElementById("nombre"),
                        apellidoP = document.getElementById("apellidoP"),
                        apellidoM = document.getElementById("apellidoM"),
                        lugarN = document.getElementById("lugarN"),
                        fechaN = document.getElementById("fechaN"),
                        genero = document.getElementById("genero"),
                        estadoC = document.getElementById("estadoC"),
                        curp = document.getElementById("curp"),
                        rfc = document.getElementById("rfc"),
                        colonia = document.getElementById("colonia"),
                        calle = document.getElementById("calle"),
                        numeroC = document.getElementById("numeroC"),
                        codigoP = document.getElementById("codigoP"),
                        telefonoCa = document.getElementById("telefonoCa"),
                        telefonoCe = document.getElementById("telefonoCe"),
                        fechaI = document.getElementById("fechaI"),
                        numeroN = document.getElementById("numeroN"),
                        nombramiento = document.getElementById("nombramiento"),
                        status = document.getElementById("status"),
                        horasB = document.getElementById("horasB"),
                        horasA = document.getElementById("horasA"),
                        licenciatura = document.getElementById("licenciatura"),
                        cedulaL = document.getElementById("cedulaL"),
                        maestria = document.getElementById("maestria"),
                        cedulaM = document.getElementById("cedulaM"),
                        doctorado = document.getElementById("doctorado"),
                        cedulaD = document.getElementById("cedulaD"),
                        mail = document.getElementById("mail"),
                        pass = document.getElementById("pass"),
                        fecha1 = null,
                        fecha2 = null;

                    nombre.value = result[0]["VCH_NAME"];
                    apellidoP.value = result[0]["VCH_A_PATERNO"];
                    apellidoM.value = result[0]["VCH_A_MATERNO"];
                    lugarN.value = result[0]["VCH_LUGAR_NACIMIENTO"];
                    if (result[0]["DDT_NACIMIENTO"] != null) {
                        fecha1 = result[0]["DDT_NACIMIENTO"].getFullYear();
                        if (result[0]["DDT_NACIMIENTO"].getMonth() < 10)
                            fecha1 = fecha1 + "-0" + (result[0]["DDT_NACIMIENTO"].getMonth() + 1);
                        else
                            fecha1 = fecha1 + "-" + (result[0]["DDT_NACIMIENTO"].getMonth() + 1);
                        if (result[0]["DDT_NACIMIENTO"].getDate() < 10)
                            fecha1 = fecha1 + "-0" + result[0]["DDT_NACIMIENTO"].getDate();
                        else
                            fecha1 = fecha1 + "-" + result[0]["DDT_NACIMIENTO"].getDate();
                    }
                    fechaN.value = fecha1;
                    genero.value = result[0]["ENM_GENERO"];
                    estadoC.value = result[0]["ENM_ESTADO_CIVIL"];
                    curp.value = result[0]["VCH_CURP"];
                    rfc.value = result[0]["VCH_RFC"];
                    colonia.value = result[0]["VCH_COLONIA"];
                    calle.value = result[0]["VCH_CALLE"];
                    numeroC.value = result[0]["VCH_NUMERO_CALLE"];
                    codigoP.value = result[0]["VCH_CP"];
                    telefonoCa.value = result[0]["VCH_TEL_LOCAL"];
                    telefonoCe.value = result[0]["VCH_TEL_CEL"];
                    if (result[0]["DDT_FECHA_INI_ORG"] != null) {
                        fecha2 = result[0]["DDT_FECHA_INI_ORG"].getFullYear();
                        if (result[0]["DDT_FECHA_INI_ORG"].getMonth() < 10)
                            fecha2 = fecha2 + "-0" + (result[0]["DDT_FECHA_INI_ORG"].getMonth() + 1);
                        else
                            fecha2 = fecha2 + "-" + (result[0]["DDT_FECHA_INI_ORG"].getMonth() + 1);
                        if (result[0]["DDT_FECHA_INI_ORG"].getDate() < 10)
                            fecha2 = fecha2 + "-0" + result[0]["DDT_FECHA_INI_ORG"].getDate();
                        else
                            fecha2 = fecha2 + "-" + result[0]["DDT_FECHA_INI_ORG"].getDate();
                    }
                    fechaI.value = fecha2;
                    numeroN.value = result[0]["INT_NUM_NOMINA"];
                    nombramiento.value = result[0]["VCH_NOMBRAMIENTO"];
                    status.value = result[0]["ENM_STATUS"];
                    horasB.value = result[0]["INT_HORAS_BASE"];
                    horasA.value = result[0]["INT_HORAS_ADICIONALES"];
                    licenciatura.value = result[0]["VCH_LICENCIATURA"];
                    cedulaL.value = result[0]["VCH_CEDULA_LICENCIATURA"];
                    maestria.value = result[0]["VCH_MAESTRIA"];
                    cedulaM.value = result[0]["VCH_CEDULA_MAESTRIA"];
                    doctorado.value = result[0]["VCH_DOCTORADO"];
                    cedulaD.value = result[0]["VCH_CEDULA_DOCTORADO"];
                    mail.value = result[0]["VCH_CORREO"];
                    pass.value = result[0]["VCH_PASS"];
                }
            } else {
                alertify.error("Usuario o contraseña incorrectos.");
                document.getElementById("email").value = null;
                document.getElementById("password").value = null;
            }
        }
    });

    connection.end();
}

function Actualizar() {
    var mysql = require('mysql')
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'CECYTEM',
        password: '100%CECYTEM',
        database: 'CECYTEM',
        port: 3306
    })
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var q = con.query('SELECT * FROM TBL_USER WHERE VCH_CORREO=? AND VCH_PASS=?', [email, password], function (error, result) {
        if (error) {
            throw error;
        } else {
            var nombre = document.getElementById("nombre").value,
                apellidoP = document.getElementById("apellidoP").value,
                apellidoM = document.getElementById("apellidoM").value,
                lugarN = document.getElementById("lugarN").value,
                fechaN = document.getElementById("fechaN").value,
                genero = document.getElementById("genero").value,
                estadoC = document.getElementById("estadoC").value,
                curp = document.getElementById("curp").value,
                rfc = document.getElementById("rfc").value,
                colonia = document.getElementById("colonia").value,
                calle = document.getElementById("calle").value,
                numeroC = document.getElementById("numeroC").value,
                codigoP = document.getElementById("codigoP").value,
                telefonoCa = document.getElementById("telefonoCa").value,
                telefonoCe = document.getElementById("telefonoCe").value,
                fechaI = document.getElementById("fechaI").value,
                numeroN = document.getElementById("numeroN").value,
                nombramiento = document.getElementById("nombramiento").value,
                status = document.getElementById("status").value,
                horasB = document.getElementById("horasB").value,
                horasA = document.getElementById("horasA").value,
                licenciatura = document.getElementById("licenciatura").value,
                cedulaL = document.getElementById("cedulaL").value,
                maestria = document.getElementById("maestria").value,
                cedulaM = document.getElementById("cedulaM").value,
                doctorado = document.getElementById("doctorado").value,
                cedulaD = document.getElementById("cedulaD").value,
                mail = document.getElementById("mail").value,
                pass = document.getElementById("pass").value;

            if (nombre === "") {
                alertify.error("Falta llenar el campo del NOMBRE");
                document.getElementById("nombre").setAttribute("class", "input is-danger");
                document.getElementById("errorNombre").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("nombre").setAttribute("class", "input is-success");
                document.getElementById("errorNombre").setAttribute("style", "display: none");
            }
            if (apellidoP === "") {
                alertify.error("Falta llenar el campo del APELLIDO PATERNO");
                document.getElementById("apellidoP").setAttribute("class", "input is-danger");
                document.getElementById("errorAP").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("apellidoP").setAttribute("class", "input is-success");
                document.getElementById("errorAP").setAttribute("style", "display: none");
            }
            if (lugarN === "") {
                alertify.error("Falta llenar el campo del LUGAR DE NACIMIENTO");
                document.getElementById("lugarN").setAttribute("class", "input is-danger");
                document.getElementById("errorLN").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("lugarN").setAttribute("class", "input is-success");
                document.getElementById("errorLN").setAttribute("style", "display: none");
            }

            if (fechaN === "") {
                alertify.error("Falta llenar el campo de FECHA DE NACIMIENTO");
                document.getElementById("fechaN").setAttribute("class", "input is-danger");
                document.getElementById("errorNac").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("fechaN").setAttribute("class", "input is-success");
                document.getElementById("errorNac").setAttribute("style", "display: none");
            }
            if (genero === "") {
                alertify.error("Falta llenar el campo de GÉNERO");
                document.getElementById("genero").setAttribute("class", "input is-danger");
                document.getElementById("errorGen").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("genero").setAttribute("class", "input is-success");
                document.getElementById("errorGen").setAttribute("style", "display: none");
            }
            if (estadoC === "") {
                alertify.error("Falta llenar el campo de ESTADO CÍVIL");
                document.getElementById("estadoC").setAttribute("class", "input is-danger");
                document.getElementById("errorEC").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("estadoC").setAttribute("class", "input is-success");
                document.getElementById("errorEC").setAttribute("style", "display: none");
            }
            if (curp === "") {
                alertify.error("Falta llenar el campo del CURP");
                document.getElementById("curp").setAttribute("class", "input is-danger");
                document.getElementById("errorCURP").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("curp").setAttribute("class", "input is-success");
                document.getElementById("errorCURP").setAttribute("style", "display: none");
            }
            if (rfc === "") {
                alertify.error("Falta llenar el campo del RFC");
                document.getElementById("rfc").setAttribute("class", "input is-danger");
                document.getElementById("errorRFC").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("rfc").setAttribute("class", "input is-success");
                document.getElementById("errorRFC").setAttribute("style", "display: none");
            }
            if (colonia === "") {
                alertify.error("Falta llenar el campo de COLONIA");
                document.getElementById("colonia").setAttribute("class", "input is-danger");
                document.getElementById("errorCol").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("colonia").setAttribute("class", "input is-success");
                document.getElementById("errorCol").setAttribute("style", "display: none");
            }
            if (calle === "") {
                alertify.error("Falta llenar el campo de CALLE");
                document.getElementById("calle").setAttribute("class", "input is-danger");
                document.getElementById("errorCalle").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("calle").setAttribute("class", "input is-success");
                document.getElementById("errorCalle").setAttribute("style", "display: none");
            }
            if (numeroC === "") {
                alertify.error("Falta llenar el campo de NÚMERO DE CASA");
                document.getElementById("numeroC").setAttribute("class", "input is-danger");
                document.getElementById("errorNC").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("numeroC").setAttribute("class", "input is-success");
                document.getElementById("errorNC").setAttribute("style", "display: none");
            }
            if (codigoP === "") {
                alertify.error("Falta llenar el campo del CÓDIGO POSTAL");
                document.getElementById("codigoP").setAttribute("class", "input is-danger");
                document.getElementById("errorCP").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("codigoP").setAttribute("class", "input is-success");
                document.getElementById("errorCP").setAttribute("style", "display: none");
            }
            if (telefonoCa === "") {
                alertify.error("Falta llenar el campo del TÉLEFONO DE PREFERENCIA");
                document.getElementById("telefonoCa").setAttribute("class", "input is-danger");
                document.getElementById("errorT1").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("telefonoCa").setAttribute("class", "input is-success");
                document.getElementById("errorT1").setAttribute("style", "display: none");
            }
            if (numeroN === "") {
                alertify.error("Falta llenar el campo de NÚMERO DE NÓMINA");
                document.getElementById("numeroN").setAttribute("class", "input is-danger");
                document.getElementById("errorNN").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("numeroN").setAttribute("class", "input is-success");
                document.getElementById("errorNN").setAttribute("style", "display: none");
            }
            if (fechaI === "") {
                alertify.error("Falta llenar el campo del FECHA INICIO EN EL PLANTEL");
                document.getElementById("fechaI").setAttribute("class", "input is-danger");
                document.getElementById("errorFIDP").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("fechaI").setAttribute("class", "input is-success");
                document.getElementById("errorFIDP").setAttribute("style", "display: none");
            }
            if (nombramiento === "") {
                alertify.error("Falta llenar el campo de NOMBRAMIENTO");
                document.getElementById("nombramiento").setAttribute("class", "input is-danger");
                document.getElementById("errorNombra").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("nombramiento").setAttribute("class", "input is-success");
                document.getElementById("errorNombra").setAttribute("style", "display: none");
            }
            if (status === "") {
                alertify.error("Falta llenar el campo de ESTATUS");
                document.getElementById("status").setAttribute("class", "input is-danger");
                document.getElementById("errorSta").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("status").setAttribute("class", "input is-success");
                document.getElementById("errorSta").setAttribute("style", "display: none");
            }

            if (horasB === "") {
                alertify.error("Falta llenar el campo de HORAS BASE");
                document.getElementById("horasB").setAttribute("class", "input is-danger");
                document.getElementById("errorHB").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("horasB").setAttribute("class", "input is-success");
                document.getElementById("errorHB").setAttribute("style", "display: none");
            }
            if (horasA === "") {
                alertify.error("Falta llenar el campo de HORAS ADICIONALES");
                document.getElementById("horasA").setAttribute("class", "input is-danger");
                document.getElementById("errorHA").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("horasA").setAttribute("class", "input is-success");
                document.getElementById("errorHA").setAttribute("style", "display: none");
            }
            if (licenciatura === "") {
                alertify.error("Falta llenar el campo de LICENCIATURA");
                document.getElementById("licenciatura").setAttribute("class", "input is-danger");
                document.getElementById("errorLic").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("licenciatura").setAttribute("class", "input is-success");
                document.getElementById("errorLic").setAttribute("style", "display: none");
            }
            if (cedulaL === "") {
                alertify.error("Falta llenar el campo de CÉDULA DE LICENCIATURA");
                document.getElementById("cedulaL").setAttribute("class", "input is-danger");
                document.getElementById("errorCL").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("cedulaL").setAttribute("class", "input is-success");
                document.getElementById("errorCL").setAttribute("style", "display: none");
            }
            if (mail === "") {
                alertify.error("Falta llenar el campo del CORREO");
                document.getElementById("mail").setAttribute("class", "input is-danger");
                document.getElementById("errorCorreo").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("mail").setAttribute("class", "input is-success");
                document.getElementById("errorCorreo").setAttribute("style", "display: none");
            }
            if (pass === "") {
                alertify.error("Falta llenar el campo de CONTRASEÑA");
                document.getElementById("pass").setAttribute("class", "input is-danger");
                document.getElementById("errorPass").setAttribute("style", "display: block");
                return 0;
            } else {
                document.getElementById("pass").setAttribute("class", "input is-success");
                document.getElementById("errorPass").setAttribute("style", "display: none");
            }
            if (apellidoM === "")
                apellidoM = null;
            if (telefonoCe === "")
                telefonoCe = null;
            if (maestria === "")
                maestria = null;
            if (cedulaM === "")
                cedulaM = null;
            if (doctorado === "")
                doctorado = null;
            if (cedulaD === "")
                cedulaD = null;

            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'CECYTEM',
                password: '100%CECYTEM',
                database: 'CECYTEM',
                port: 3306
            })

            var upload = connection.query("UPDATE TBL_USER SET VCH_NAME=?, VCH_A_PATERNO=?, VCH_A_MATERNO=?, INT_NUM_NOMINA=?, ENM_ESTADO_CIVIL=?, ENM_GENERO=?, VCH_LUGAR_NACIMIENTO=?, DDT_NACIMIENTO=?, VCH_CURP=?, VCH_RFC=?, VCH_CORREO=?, DDT_FECHA_INI_ORG=?, VCH_NOMBRAMIENTO=?, ENM_STATUS=?, INT_HORAS_BASE=?, INT_HORAS_ADICIONALES=?, VCH_LICENCIATURA=?, VCH_CEDULA_LICENCIATURA=?, VCH_MAESTRIA=?, VCH_CEDULA_MAESTRIA=?, VCH_DOCTORADO=?, VCH_CEDULA_DOCTORADO=?, VCH_CP=?, VCH_COLONIA=?, VCH_CALLE=?, VCH_NUMERO_CALLE=?, VCH_TEL_LOCAL=?, VCH_TEL_CEL=?, VCH_PASS=? WHERE INT_USER=?", [nombre, apellidoP, apellidoM, numeroN, estadoC, genero, lugarN, fechaN, curp, rfc, mail, fechaI, nombramiento, status, horasB, horasA, licenciatura, cedulaL, maestria, cedulaM, doctorado, cedulaD, codigoP, colonia, calle, numeroC, telefonoCa, telefonoCe, pass, result[0]["INT_USER"]], function (error, result) {
                if (error)
                    throw error;
                else {
                    alertify.success("¡Información actualizada con éxito!");
                    setTimeout(function () {
                        location.href = "signin.html";
                    }, 3000);
                }
            });




        }
    });
    con.end();

}

function mostrar() {
    var pass = document.getElementById("pass"),
        checkbox = document.getElementById("mostrar");

    if (checkbox.checked == true)
        pass.type = "text";
    else
        pass.type = "password";
}

function cerrar() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}

function mostrarInfo() {
    document.getElementById("informacion").setAttribute("style", "display: block");
    document.getElementById("disponibilidad").setAttribute("style", "display: none");
    document.getElementById("btnDispo").setAttribute("class", "button is-link is-outlined");
    document.getElementById("btnInfo").setAttribute("class", "button is-link");
}

function mostrarDispo() {
    document.getElementById("informacion").setAttribute("style", "display: none");
    document.getElementById("disponibilidad").setAttribute("style", "display: block");
    document.getElementById("btnInfo").setAttribute("class", "button is-link is-outlined");
    document.getElementById("btnDispo").setAttribute("class", "button is-link");
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function soloNum(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "1234567890";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}
