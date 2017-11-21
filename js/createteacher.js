function crearProfesor() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'DeathRocker',
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
        permiso = document.getElementById("permiso").value,
        mail = document.getElementById("mail").value,
        pass = document.getElementById("pass").value;
        
        if ( nombre === "" )
            nombre = null;
        if ( apellidoP === "" )
            apellidoP = null;
        if ( apellidoM === "" )
            apellidoM = null;
        if ( lugarN === "" )
            lugarN = null;
        if ( fechaN === "" )
            fechaN = null;
        if ( curp === "" )
            curp = null;
        if ( rfc === "" )
            rfc = null;
        if ( colonia === "" )
            colonia = null;
        if ( calle === "" )
            calle = null;
        if ( numeroC === "" )
            numeroC = null;
        if ( codigoP === "" )
            codigoP = null;
        if ( telefonoCa === "" )
            telefonoCa= null;
        if ( telefonoCe === "" )
            telefonoCe= null;
        if ( fechaI === "" )
            fechaI = null;
        if ( numeroN === "" )
            numeroN = null;
        if ( nombramiento === "" )
            nombramiento = null;
        if ( horasB === "" )
            horasB = null;
        if ( horasA === "" )
            horasA = null;
        if ( mail === "" )
            mail = null;
        if ( pass === "" )
            pass = null;
        if ( licenciatura === "" )
            licenciatura = null;
        if ( cedulaL=== "" )
            cedulaL= null;
        if ( maestria === "" )
            maestria = null;
        if ( cedulaM === "" )
            cedulaM = null;
        if ( doctorado === "" )
            doctorado = null;
        if ( cedulaD === "" )
            cedulaD = null;
        if ( genero === "" )
            genero = null;
        if ( estadoC === "" )
            estadoC = null;
        if ( permiso === "" )
            permiso = null;
        if ( status === "" )
            status = null;

    var query = connection.query("INSERT INTO TBL_USER (VCH_NAME, VCH_A_PATERNO, VCH_A_MATERNO, INT_NUM_NOMINA, ENM_ESTADO_CIVIL, ENM_GENERO, VCH_LUGAR_NACIMIENTO, DDT_NACIMIENTO, VCH_CURP, VCH_RFC, VCH_CORREO, DDT_FECHA_INI_ORG, VCH_NOMBRAMIENTO, ENM_STATUS, INT_HORAS_BASE, INT_HORAS_ADICIONALES, VCH_LICENCIATURA, VCH_CEDULA_LICENCIATURA, VCH_MAESTRIA, VCH_CEDULA_MAESTRIA, VCH_DOCTORADO, VCH_CEDULA_DOCTORADO, VCH_CP, VCH_COLONIA, VCH_CALLE, VCH_NUMERO_CALLE, VCH_TEL_LOCAL, VCH_TEL_CEL, VCH_PASS, ENM_PERMISOS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellidoP, apellidoM, numeroN, estadoC, genero, lugarN, fechaN, curp, rfc, mail, fechaI, nombramiento, status, horasB, horasA, licenciatura, cedulaL, maestria, cedulaM, doctorado, cedulaD, codigoP, colonia, calle, numeroC, telefonoCa, telefonoCe, pass, permiso]);
    
    connection.end();
}