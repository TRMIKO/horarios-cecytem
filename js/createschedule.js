var alertify = require("alertifyjs")

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "index.html";
    }, 3000);
}

Vue.component('horario', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td> <a v-on:click="$emit(\'remove\')" class="button is-danger" href="#">' +
    '<span class="icon">' +
    '<i class="fa fa-ban"></i>' +
    '</span>   <span>{{horas[0]}}</span>' +
    '  </a> </td>' +
    ' <td> <button v-if="vacio(horas[1])" v-on:click="emit(hora,1)" class="button">{{horas[1]["nombre"]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[2])" v-on:click="emit(hora,2)" class="button">{{horas[2]["nombre"]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[3])" v-on:click="emit(hora,3)" class="button">{{horas[3]["nombre"]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[4])" v-on:click="emit(hora,4)" class="button">{{horas[4]["nombre"]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[5])" v-on:click="emit(hora,5)" class="button">{{horas[5]["nombre"]}}</button> </td> ' +
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
Vue.component('grupo', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td>{{horas[0]}}</td>' +
    ' <td>{{horas[1]["nombre"]}}</td> ' +
    ' <td>{{horas[3]["nombre"]}}</td> ' +
    ' <td>{{horas[2]["nombre"]}}</td> ' +
    ' <td>{{horas[4]["nombre"]}}</td> ' +
    ' <td>{{horas[5]["nombre"]}}</td> ' +
    '</tr>',
  methods: {
    emit: function(index, day) {
      this.$emit('remove-class', index, day)
    }
  }
})
Vue.component('relacion', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td>{{horas[0]}}</td>' +
    ' <td><button v-on:click="emit(horas[1])" class="button">{{horas[1]}}</button></td> ' +
    ' <td>{{horas[2]}}</td> ' +
    ' <td>{{horas[3]}}</td> ' +
    ' <td>{{horas[4]}}</td> ' +
    ' <td>{{horas[5]["nombre"]}}</td> ' +
    '</tr>',
  methods: {
    emit: function(subject) {
      this.$emit('remove-subject',subject)
    }
  }
})
var app = new Vue({
  el: '#app',
  data: {
    todo:{
      periodo:'',
      grupo:'',
      horario:[],
      salones:[],
      relacion:[]
    },
    msj: 'hola',
    hora: '',
    hini: '',
    mini: '',
    hfin: '',
    mfin: '',
    thorasp: 0,
    thorast: 0,
    thoras: 0,
    materia: '',
    dia: '',
    tiempo: '',
    profesor: '',
    salon: '',
    dbSalones: [],
    dbProfesores: [],
    dbMaterias: [],
    dbGeneracion:[],
    dbGrupo:[],
    horasAgregadas: [],
    profesores:{},
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
    q = con.query('SELECT * FROM TBL_GRUPO', function(error, result) {
      if (error) {
        throw error;
      } else {
        app.dbGrupo=result
        console.log(result);

      }
    });
    con.end();
  },
  methods: {

    addHour: function() {


      this.todo.horario.push({
        0: this.hini + ':' + this.mini + '-' + this.hfin + ':' + this.mfin,
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''


      })

      this.todo.salones.push({
        0: this.hini + ':' + this.mini + '-' + this.hfin + ':' + this.mfin,
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''


      })
      alertify.success('Hora añadida')



    },
    limpiar:function(){
      for (let i = 0; i < this.todo.relacion.length; i++) {
        this.todo.relacion.pop()
      }
      for (let i = 0; i < this.todo.horario.length; i++) {
        this.todo.horario.pop()
      }
      for (let i = 0; i < this.todo.salones.length; i++) {
        this.todo.salones.pop()
      }
      this.thorast = 0
      this.thorasp =0
      this.thoras = 0
    },
    delhora: function(index) {
      this.todo.salones.splice(index, 1)
      this.todo.horario.splice(index, 1)
    },
    delSubject: function(subject) {

    },

    delMateria: function(hora, dia) {
      for (let i = 0; i < this.todo.relacion.length; i++) {
        if (this.todo.horario[hora][dia] == this.todo.relacion[i]['1']) {
            this.todo.relacion[i]['total']--

            if(this.todo.relacion[i]['total']==0){
              this.thorast -= this.todo.relacion[i]['3']
              this.thorasp -= this.todo.relacion[i]['2']
              this.thoras -= this.todo.relacion[i]['4']

              this.todo.relacion.splice(i, 1)
            }

        }

      }
      this.todo.horario[hora][dia] = ''
      this.todo.salones[hora][dia] = ''

      //this.salones[this.tiempo][this.dia]
    },
    eliminar: function(index) {
      alertify.confirm("This is a confirm dialog.",
        function() {
          app.delhora(index)

          alertify.success('Hora eliminada');
        },
        function() {
          alertify.error('Cancelar');

        })
    },
    save:function(){
        console.log(this.todo)
        for(let i=0;i<this.todo.horario.length;i++){


          for (var j = 1; j <6; j++) {
            if (this.todo.salones[i][j]['id']==undefined || this.todo.salones[i][j]['id']==undefined) continue

            console.log("prof :" ,"grupo" +this.todo.grupo,"materias"+this.todo.horario[i][j].id,"salone :"+this.todo.salones[i][j]['id'],"periodo :" +this.todo.periodo,"horario :"+this.todo.horario[i]['0']);
            for(let k=0;k<this.todo.relacion.length;k++){
              //console.log(this.todo.relacion[k]['1'],this.todo.horario[i][j]['nombre']);
              console.log(this.todo.relacion[k]['5']['id']);
              if(this.todo.relacion[k]['1']==this.todo.horario[i][j]['nombre']){
                var mysql = require('mysql')
                var con = mysql.createConnection({
                  host: 'localhost',
                  user: 'CECYTEM',
                  password: '100%CECYTEM',
                  database: 'CECYTEM',
                  port: 3306
                })
                var q = con.query('INSERT INTO TBL_HORARIO VALUES(NULL,?,?,?,?,?,?)',[this.todo.relacion[k]['5']['id'],this.todo.grupo,this.todo.horario[i][j].id,this.todo.salones[i][j]['id'],this.todo.periodo,this.todo.horario[i]['0']], function(error, result) {
                  if (error) {
                    throw error;
                  } else {

                    console.log("AHUEVO PAPI QUE LO HAS LOGRADO")

                  }
                });
                con.end();
              }
            }





          }
        }
    },
    removeClass: function(a, b) {
      console.log(a, b);
      alertify.confirm("This is a confirm dialog.",
        function() {
          app.delMateria(a, b)


          alertify.success('Hora eliminada');
        },
        function() {
          alertify.error('Cancelar');

        })




    },
    removeSubject: function(subject) {

      alertify.confirm("This is a confirm dialog.",
        function() {
          app.delSubject(subject)


          alertify.success('Hora eliminada');
        },
        function() {
          alertify.error('Cancelar');

        })




    },
    setClass: function() {
      //console.log(this.materia,this.tiempo,this.salon,this.profesor,this.dia)
      console.log(this.dbMaterias,this.materia);
      this.todo.horario[this.tiempo][this.dia] = {nombre:this.dbMaterias[this.materia]['VCH_NOMBRE'],
                                                  id:this.dbMaterias[this.materia]['INT_MATERIA']}

      this.todo.salones[this.tiempo][this.dia] = {nombre:this.dbSalones[this.salon]['VCH_NOMBRE'],
                                                  id:this.dbSalones[this.salon]['INT_SALON']}
      for (let i = 0; i < this.todo.relacion.length; i++) {
        if (this.todo.relacion[i][1] == this.dbMaterias[this.materia]['VCH_NOMBRE']){
          this.todo.relacion[i]['total']++
          //console.log(  this.relacion[i]['total'])
          return 0
        }

      }
      this.thorast += this.dbMaterias[this.materia]['INT_HORAS_T']
      this.thorasp += this.dbMaterias[this.materia]['INT_HORAS_P']
      this.thoras += (this.dbMaterias[this.materia]['INT_HORAS_P'] + this.dbMaterias[this.materia]['INT_HORAS_T'])
      this.todo.relacion.push({
        0: 1,
        1: this.dbMaterias[this.materia]['VCH_NOMBRE'],
        2: this.dbMaterias[this.materia]['INT_HORAS_P'],
        3: this.dbMaterias[this.materia]['INT_HORAS_T'],
        4: this.dbMaterias[this.materia]['INT_HORAS_T'] + this.dbMaterias[this.materia]['INT_HORAS_P'],
        5: {nombre:this.dbProfesores[this.profesor]['VCH_NAME'],
            id:this.dbProfesores[this.profesor]['INT_USER']},
        total:1
      })




      // console.log(this.arrayProfesor[0])
    }
  },
  watch: {
    'todo.horario': function() {
      this.horasAgregadas = this.todo.horario.map(function(x) {
        console.log(x);
        return x[0];
      });
    }
  }
})
