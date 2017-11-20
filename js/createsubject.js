function crearMateria() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123',
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
        horap = document.getElementById("horap").value;
        horat = document.getElementById("horat").value;

    
    var query = connection.query("INSERT INTO TBL_MATERIA (VCH_NOMBRE, INT_SEMESTRE, INT_HORAS_P, INT_HORAS_T) VALUES (?, ?, ?,?)", [materia, semestre, horap,horat]);
    connection.end();
}
