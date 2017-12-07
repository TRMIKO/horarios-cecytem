var alertify = require("alertifyjs")
function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}
Vue.component('horario', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    ' <td>{{horas["GEN"]}}</td> ' +
    ' <td>{{horas["TURNO"]}}</td> ' +
    ' <td>{{horas["ESP"]}}</td> ' +
    ' <td>{{horas["GRUPO"]}}</td> ' +
    '<td> <span><a class="button is-danger" v-on:click="remove(p)"  href="#"><span class="icon"><i class="fa fa-ban"></i></span></a></span> </td>' +
    '<td> <span><a class="button is-info" v-on:click="update(p)"  href="#"><span class="icon"><i class="fa fa-pencil"></i></span></a></span> </td>' +
    '<td> <span><a class="button " v-on:click="pdf(p)"  href="#"><span class="icon"><i class="fa  fa-file-pdf-o "></i></span></a></span> </td>' +
    '</tr>',
    methods: {
      remove: function(p) {
        this.$emit('remove',p['INT_USER'])
      },
      update: function(p) {
        this.$emit('update',p)
      },pdf: function(p) {
        this.$emit('pdf',p)
      }

    }
})
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    dbHorario:[]
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
    var q = con.query('SELECT N.VCH_NOMBRE AS GEN,N.INT_GENERACION AS IDG,G.ENM_TURNO AS TURNO,G.VCH_ESPACIALIDAD AS ESP,G.VCH_NOMBRE AS GRUPO,G.INT_GRUPO IDGR FROM  (TBL_HORARIO H JOIN TBL_GRUPO G ON H.INT_GRUPO=G.INT_GRUPO JOIN TBL_GENERACION N ON N.INT_GENERACION=H.INT_GENERACION)  GROUP BY G.VCH_NOMBRE,N.VCH_NOMBRE,G.ENM_TURNO,G.VCH_ESPACIALIDAD,N.INT_GENERACION,G.INT_GRUPO ORDER BY N.VCH_NOMBRE DESC', function(error, result) {
      if (error) {
        throw error;
      } else {
          app.dbHorario=result
          console.log(result);

      }
    });
    con.end();
  },
  methods:{
    getHorario:function(){
      var mysql = require('mysql')
      var con = mysql.createConnection({
        host: 'localhost',
        user: 'CECYTEM',
        password: '100%CECYTEM',
        database: 'CECYTEM',
        port: 3306
      })
      var q = con.query('SELECT * FROM TBL_HORARIO', function(error, result) {
        if (error) {
          throw error;
        } else {

            console.log(result)

        }
      });
      con.end();
    }
  }


})

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "index.html";
    }, 3000);
}
