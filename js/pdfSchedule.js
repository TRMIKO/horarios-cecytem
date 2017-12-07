var alertify = require("alertifyjs");
const ipc = require('electron').ipcRenderer;
Vue.component('hour', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td> </span>   <span>{{horas[0]}}</span>' +
    ' <td>{{horas[1]["nombre"]}}</td> ' +
    ' <td>{{horas[2]["nombre"]}}</td> ' +
    ' <td>{{horas[3]["nombre"]}}</td> ' +
    ' <td>{{horas[4]["nombre"]}}</td> ' +
    ' <td>{{horas[5]["nombre"]}}</td> ' +
    '</tr>'
})

Vue.component('grupo', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td>{{horas[0]}}</td>' +
    ' <td>{{horas[1]["nombre"]}}</td> ' +
    ' <td>{{horas[2]["nombre"]}}</td> ' +
    ' <td>{{horas[3]["nombre"]}}</td> ' +
    ' <td>{{horas[4]["nombre"]}}</td> ' +
    ' <td>{{horas[5]["nombre"]}}</td> ' +
    '</tr>'
})
Vue.component('relacion', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td>{{horas[0]}}</td>' +
    ' <td>{{horas[1]}}</td> ' +
    ' <td>{{horas[2]}}</td> ' +
    ' <td>{{horas[3]}}</td> ' +
    ' <td>{{horas[4]}}</td> ' +
    ' <td>{{horas[5]["nombre"]}}</td> ' +
    '</tr>'
})
var app = new Vue({
  el: '#app',
  data: {
    msj: 'Hello Vue!',
    dbHorario:{},
    dbProfesores: [],
    dbMaterias: [],
    dbGeneracion:[],
    dbGrupo:[],
    info:[]
  },
  created:function(){
    var mysql = require('mysql')
    var con = mysql.createConnection({
      host: 'localhost',
      user: 'CECYTEM',
      password: '100%CECYTEM',
      database: 'CECYTEM',
      port: 3306
    })
    var q = con.query('SELECT N.VCH_NOMBRE AS GEN,N.INT_GENERACION AS IDG,G.ENM_TURNO AS TURNO,G.VCH_ESPACIALIDAD AS ESP,G.VCH_NOMBRE AS GRUPO,G.INT_GRUPO AS IDGR,  H.TXT_JSON AS JSON FROM  (TBL_HORARIO H JOIN TBL_GRUPO G ON H.INT_GRUPO=G.INT_GRUPO JOIN TBL_GENERACION N ON N.INT_GENERACION=H.INT_GENERACION) WHERE H.INT_GENERACION=3 AND G.INT_GRUPO=5   GROUP BY G.VCH_NOMBRE,N.VCH_NOMBRE,G.ENM_TURNO,G.VCH_ESPACIALIDAD,N.INT_GENERACION,G.INT_GRUPO,H.TXT_JSON  ORDER BY N.VCH_NOMBRE DESC', function(error, result) {
      if (error) {
        throw error;
      } else {
          app.dbHorario=JSON.parse(result[0]['JSON'])
          console.log(app.dbHorario);
          app.info=result[0]
          console.log(app.info);

      }
    });
    con.end();

    var mysql = require('mysql')
    var con = mysql.createConnection({
      host: 'localhost',
      user: 'CECYTEM',
      password: '100%CECYTEM',
      database: 'CECYTEM',
      port: 3306
    })
    var q = con.query('SELECT * FROM TBL_USER', function(error, result) {
      if (error) {
        throw error;
      } else {

          app.dbProfesores=result

      }
    });
    con.end();
    var con = mysql.createConnection({
      host: 'localhost',
      user: 'CECYTEM',
      password: '100%CECYTEM',
      database: 'CECYTEM',
      port: 3306
    })
    q = con.query('SELECT * FROM TBL_SALON', function(error, result) {
      if (error) {
        throw error;
      } else {
          app.dbSalones=result
      }

    });
    con.end();
    var con = mysql.createConnection({
      host: 'localhost',
      user: 'CECYTEM',
      password: '100%CECYTEM',
      database: 'CECYTEM',
      port: 3306
    })
    q = con.query('SELECT * FROM TBL_MATERIA', function(error, result) {
      if (error) {
        throw error;
      } else {
        app.dbMaterias=result

      }
    });
    con.end();
    var con = mysql.createConnection({
      host: 'localhost',
      user: 'CECYTEM',
      password: '100%CECYTEM',
      database: 'CECYTEM',
      port: 3306
    })
  q = con.query('SELECT * FROM TBL_GENERACION', function(error, result) {
      if (error) {
        throw error;
      } else {
        app.dbGeneracion=result

      }
    });
    con.end();
    var con = mysql.createConnection({
      host: 'localhost',
      user: 'CECYTEM',
      password: '100%CECYTEM',
      database: 'CECYTEM',
      port: 3306
    })

    q = con.query('SELECT * FROM TBL_GRUPO WHERE INT_GRUPO=?',[3], function(error, result) {
      if (error) {
        throw error;
      } else {
        app.dbGrupo=result
          //console.log(app.dbHorario);
          //console.log(app.dbHorario);
      //  console.log(result);

      }
    });
    con.end();
  }
})
function regresar() {
    alertify.error("Regresando.");
    setTimeout(function () {
        location.href = "schedule.html";
    }, 3000);
}

function descargar() {
    document.getElementById("btns").setAttribute("style", "display: none");
    ipc.send('print-to-pdf');
    setTimeout(function () {
        document.getElementById("btns").setAttribute("style", "display: block");
    }, 3000);
}
