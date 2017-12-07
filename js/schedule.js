var alertify = require("alertifyjs")
Vue.component('horario', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    ' <td> <button v-if="vacio(horas[1])"  class="button">{{horas[1]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[2])"  class="button">{{horas[2]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[3])"  class="button">{{horas[3]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[4])"  class="button">{{horas[4]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[5])"  class="button">{{horas[5]}}</button> </td> ' +
    '</tr>',
  methods: {
    emit: function(index, day) {
      this.$emit('remove-class', index, day)
    },
    vacio:function(a){
      if (a!=''){
        return true

      }
      else {
        return false
      }
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
    var q = con.query('SELECT G.VCH_NOMBRE,N.VCH_NOMBRE,G.ENM_TURNO,G.VCH_ESPACIALIDAD FROM  TBL_HORARIO H JOIN TBL_GRUPO G ON H.INT_GRUPO=G.INT_GRUPO JOIN TBL_GENERACION N ON N.INT_GENERACION=H.INT_GENERACION  GROUP BY G.VCH_NOMBRE,N.VCH_NOMBRE,G.ENM_TURNO,G.VCH_ESPACIALIDAD ORDER BY N.VCH_NOMBRE DESC', function(error, result) {
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
