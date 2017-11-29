var alertify = require("alertifyjs")

function salir() {
  location.href = "signin.html";
}

Vue.component('horario', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td> <a v-on:click="$emit(\'remove\')" class="button is-danger" href="#">' +
    '<span class="icon">' +
    '<i class="fa fa-ban"></i>' +
    '</span>   <span>{{horas[0]}}</span>' +
    '  </a> </td>' +
    ' <td> <button v-if="vacio(horas[1])" v-on:click="emit(hora,1)" class="button">{{horas[1]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[2])" v-on:click="emit(hora,2)" class="button">{{horas[2]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[3])" v-on:click="emit(hora,3)" class="button">{{horas[3]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[4])" v-on:click="emit(hora,4)" class="button">{{horas[4]}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[5])" v-on:click="emit(hora,5)" class="button">{{horas[5]}}</button> </td> ' +
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
    ' <td>{{horas[1]}}</td> ' +
    ' <td>{{horas[2]}}</td> ' +
    ' <td>{{horas[3]}}</td> ' +
    ' <td>{{horas[4]}}</td> ' +
    ' <td>{{horas[5]}}</td> ' +
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
    ' <td>{{horas[5]}}</td> ' +
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
    arrayMateria: [],
    arrayProfesor: [],
    arraySalon: [],
    dia: '',
    tiempo: '',
    profesor: '',
    salon: '',
    salones: [],
    horasAgregadas: [],
    relacion: [

    ],
    horas: [

    ]
  },
  methods: {

    addHour: function() {


      this.horas.push({
        0: this.hini + ':' + this.mini + '-' + this.hfin + ':' + this.mfin,
        1: '',
        2: '',
        3: '',
        4: '',
        5: ''


      })

      this.salones.push({
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
      for (let i = 0; i < this.relacion.length; i++) {
        this.relacion.pop()
      }
      for (let i = 0; i < this.horas.length; i++) {
        this.horas.pop()
      }
      for (let i = 0; i < this.salones.length; i++) {
        this.salones.pop()
      }
      this.thorast = 0
      this.thorasp =0
      this.thoras = 0
    },
    delhora: function(index) {
      this.salones.splice(index, 1)
      this.horas.splice(index, 1)
    },
    delSubject: function(subject) {
      for(let j=0;j<this.horas.length;j++){
        console.log(this.horas[j])
        for(let i=1;i<6;i++){
          console.log(this.horas[j][i],subject)
          if(this.horas[j][i]==subject){
            this.horas[j][i]=''
            this.salones[j][i]=''
          }
        }
      }
      for(let i=0;i<this.relacion.length;i++){
        if(this.relacion[i][1]==subject){
          this.thorast -= this.relacion[i]['3']
          this.thorasp -= this.relacion[i]['2']
          this.thoras -= this.relacion[i]['4']
          this.relacion.splice(i, 1)
        }
      }
    },

    delMateria: function(hora, dia) {
      for (let i = 0; i < this.relacion.length; i++) {
        if (this.horas[hora][dia] == this.relacion[i]['1']) {
            this.relacion[i]['total']--
            if(this.relacion[i]['total']==0){
              this.thorast -= this.relacion[i]['3']
              this.thorasp -= this.relacion[i]['2']
              this.thoras -= this.relacion[i]['4']

              this.relacion.splice(i, 1)
            }

        }

      }
      this.horas[hora][dia] = ''
      this.salones[hora][dia] = ''

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
      this.horas[this.tiempo][this.dia] = this.arrayMateria[this.materia]['VCH_NOMBRE']

      this.salones[this.tiempo][this.dia] = this.arraySalon[this.salon]['VCH_NOMBRE']
      for (let i = 0; i < this.relacion.length; i++) {
        if (this.relacion[i][1] == this.arrayMateria[this.materia]['VCH_NOMBRE'])
          this.relacion[i]['total']++
          console.log(  this.relacion[i]['total'])
          return 0
      }
      this.thorast += this.arrayMateria[this.materia]['INT_HORAS_T']
      this.thorasp += this.arrayMateria[this.materia]['INT_HORAS_P']
      this.thoras += (this.arrayMateria[this.materia]['INT_HORAS_P'] + this.arrayMateria[this.materia]['INT_HORAS_T'])
      this.relacion.push({
        0: 1,
        1: this.arrayMateria[this.materia]['VCH_NOMBRE'],
        2: this.arrayMateria[this.materia]['INT_HORAS_P'],
        3: this.arrayMateria[this.materia]['INT_HORAS_T'],
        4: this.arrayMateria[this.materia]['INT_HORAS_T'] + this.arrayMateria[this.materia]['INT_HORAS_P'],
        5: this.arrayProfesor[this.profesor]['VCH_NAME'],
        total:1
      })




      // console.log(this.arrayProfesor[0])
    }
  },
  watch: {
    horas: function() {
      this.horasAgregadas = this.horas.map(function(x) {
        return x[0];
      });
    }
  }
})
//console.log(app['_data'])



function salones() {
  var mysql = require('mysql')
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'CECYTEM',
    port: 3306
  })
  var q = con.query('SELECT * FROM TBL_SALON', function(error, result) {
    if (error) {
      throw error;
    } else {

      let i = 0
      result.forEach(function(element) {
        let opt = document.createElement('option')
        opt.setAttribute("value", i++)
        opt.appendChild(document.createTextNode(element['VCH_NOMBRE']))
        document.getElementById('salon').appendChild(opt)
        app['_data']['arraySalon'].push(element)


      })
    }
  });
  con.end();
}





// llamadas a base de datos
function materia() {
  var mysql = require('mysql')
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'CECYTEM',
    port: 3306
  })
  var q = con.query('SELECT * FROM TBL_MATERIA', function(error, result) {
    if (error) {
      throw error;
    } else {
      let i = 0
      result.forEach(function(element) {
        let opt = document.createElement('option')
        opt.setAttribute("value", i++)
        opt.appendChild(document.createTextNode(element['VCH_NOMBRE']))
        document.getElementById('materia').appendChild(opt)
        app['_data']['arrayMateria'].push(element)

      })
    }
  });
  con.end();
}

function profesor() {
  var mysql = require('mysql')
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'CECYTEM',
    port: 3306
  })
  var q = con.query('SELECT * FROM TBL_USER', function(error, result) {
    if (error) {
      throw error;
    } else {

      result.forEach(function(element) {
        let i = 0
        let opt = document.createElement('option')
        opt.setAttribute("value", i++)
        opt.appendChild(document.createTextNode(element['VCH_A_PATERNO'] + ' ' + element['VCH_A_MATERNO'] + ' ' + element['VCH_NAME'] + " 3"))
        document.getElementById('profesor').appendChild(opt)
        app['_data']['arrayProfesor'].push(element)

      })

    }
  });
  con.end();
}
profesor()
salones()
materia()
