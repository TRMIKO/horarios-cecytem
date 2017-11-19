//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),

 
//creamos un objeto para ir almacenando todo lo que necesitemos
var api = {};

//obtenemos todos los usuarios
api.getDirectConnection: function(host, port, user, password, database) {
        var connectionProps = {
          host: 'localhost',
          database:'CECYTEM',
          user: 'root',
          password: '123'
        };
       
        console.log(connectionProps);
        return mysql.createConnection(connectionProps);
      }
api.getConnection: function() {
        var _this = this;
       
        return new Promise(function(resolve, reject) {
              resolve(_this.getDirectConnection());
          });
        

}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = api;