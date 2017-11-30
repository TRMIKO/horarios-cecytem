var alertify = require("alertifyjs");

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
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'CECYTEM',
        password: '100%CECYTEM',
        database: 'CECYTEM',
        port: 3306
    });

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

    if (nombre === "")
        nombre = null;
    if (apellidoP === "")
        apellidoP = null;
    if (apellidoM === "")
        apellidoM = null;
    if (lugarN === "")
        lugarN = null;
    if (fechaN === "")
        fechaN = null;
    if (curp === "")
        curp = null;
    if (rfc === "")
        rfc = null;
    if (colonia === "")
        colonia = null;
    if (calle === "")
        calle = null;
    if (numeroC === "")
        numeroC = null;
    if (codigoP === "")
        codigoP = null;
    if (telefonoCa === "")
        telefonoCa = null;
    if (telefonoCe === "")
        telefonoCe = null;
    if (fechaI === "")
        fechaI = null;
    if (numeroN === "")
        numeroN = null;
    if (nombramiento === "")
        nombramiento = null;
    if (horasB === "")
        horasB = null;
    if (horasA === "")
        horasA = null;
    if (mail === "")
        mail = null;
    if (pass === "")
        pass = null;
    if (licenciatura === "")
        licenciatura = null;
    if (cedulaL === "")
        cedulaL = null;
    if (maestria === "")
        maestria = null;
    if (cedulaM === "")
        cedulaM = null;
    if (doctorado === "")
        doctorado = null;
    if (cedulaD === "")
        cedulaD = null;
    if (genero === "")
        genero = null;
    if (estadoC === "")
        estadoC = null;
    if (status === "")
        status = null;

    var query = connection.query("UPDATE TBL_USER SET VCH_NAME=?, VCH_A_PATERNO=?, VCH_A_MATERNO=?, INT_NUM_NOMINA=?, ENM_ESTADO_CIVIL=?, ENM_GENERO=?, VCH_LUGAR_NACIMIENTO=?, DDT_NACIMIENTO=?, VCH_CURP=?, VCH_RFC=?, VCH_CORREO=?, DDT_FECHA_INI_ORG=?, VCH_NOMBRAMIENTO=?, ENM_STATUS=?, INT_HORAS_BASE=?, INT_HORAS_ADICIONALES=?, VCH_LICENCIATURA=?, VCH_CEDULA_LICENCIATURA=?, VCH_MAESTRIA=?, VCH_CEDULA_MAESTRIA=?, VCH_DOCTORADO=?, VCH_CEDULA_DOCTORADO=?, VCH_CP=?, VCH_COLONIA=?, VCH_CALLE=?, VCH_NUMERO_CALLE=?, VCH_TEL_LOCAL=?, VCH_TEL_CEL=?, VCH_PASS=? WHERE VCH_CORREO=? AND VCH_PASS=?", [nombre, apellidoP, apellidoM, numeroN, estadoC, genero, lugarN, fechaN, curp, rfc, mail, fechaI, nombramiento, status, horasB, horasA, licenciatura, cedulaL, maestria, cedulaM, doctorado, cedulaD, codigoP, colonia, calle, numeroC, telefonoCa, telefonoCe, pass, mail, pass]);

    alertify.success("¡Información actualizada con éxito!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);


    connection.end();
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

function mostrarInfo () {
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