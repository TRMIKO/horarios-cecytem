function crearMateria() {
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

    var materia = document.getElementById("materia").value,
        semestre = document.getElementById("semestre").value,
        hora = document.getElementById("hora").value;
    
    var query = connection.query("INSERT INTO TBL_MATERIA (VCH_NOMBRE, INT_SEMESTRE, INT_HORAR) VALUES (?, ?, ?)", [materia, semestre, hora]);
    connection.end();
}
