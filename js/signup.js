var alertify = require("alertifyjs");

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}
Vue.component('horario', {
  props: ['horas', 'hora'],

  template: '<tr >' +
    '<td> <span>{{horas[0]}}</span> </td>' +
    ' <td> <button v-if="vacio(horas[1].data)" v-bind:class="horas[1].classObject">{{horas[1].data}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[2].data)" v-bind:class="horas[2].classObject">{{horas[2].data}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[3].data)" v-bind:class="horas[3].classObject">{{horas[3].data}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[4].data)" v-bind:class="horas[4].classObject">{{horas[4].data}}</button> </td> ' +
    ' <td> <button v-if="vacio(horas[5].data)" v-bind:class="horas[5].classObject">{{horas[5].data}}</button> </td> ' +
    '</tr>',
  methods: {
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
    muestra:1,
    hini:0,
    mini:0,
    hfin:0,
    mfin:0,
    dia:1,
    disp:'0',
    prof:{
      nombre:'',
      apellidoM:'',
      apellidoP:'',
      lugarN:'',
      fechaN:'',
      genero:'',
      estadoC:'',
      rfc:'',
      curp:'',
      colonia:'',
      calle:'',
      numeroC:'',
      numeroN:'',
      codigoP:'',
      telefonoCa:'',
      telefonoCe:'',
      fechaI:'',
      nombramiento:'',
      status:'',
      horasB:'',
      horasA:'',
      licenciatura:'',
      cedulaL:'',
      maestria:'',
      cedulaM:'',
      doctorado:'',
      cedulaD:'',
      permiso:'',
      mail:'',
      pass:''
    },

    horas:[
      {0:"6:00-7:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"7:00-8:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"8:00-9:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"9:00-10:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"10:00-11:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"11:00-12:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"12:00-13:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"13:00-14:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"14:00-15:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"15:00-16:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"16:00-17:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"17:00-18:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"18:00-19:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"19:00-20:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"20:00-21:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}},
      {0:"21:00-22:00",1:{data:'',classObject:{}},2:{data:'',classObject:{}},3:{data:'',classObject:{}},4:{data:'',classObject:{}},5:{data:'',classObject:{}}}
      ]
  },
  methods:{
    addHour:function(){
      for(let i=parseInt(this.hini);i<parseInt(this.hfin);i++){
        this.horas[i][this.dia]['data']=((this.disp=='1') ? 'Bueno' : ((this.disp=='2') ? 'Medio' :'Malo'))
        this.horas[i][this.dia]['classObject']={
            button:true,
            'is-success':(this.disp=='1') ? true : false,
            'is-warning':(this.disp=='2') ? true : false,
            'is-danger':(this.disp=='3') ? true : false
        }

      }
    },

      createProf:function(){
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'CECYTEM',
            password: '100%CECYTEM',
            database: 'CECYTEM',
            port: 3306
        })
        var query = con.query("INSERT INTO TBL_USER (VCH_NAME, VCH_A_PATERNO, VCH_A_MATERNO, INT_NUM_NOMINA, ENM_ESTADO_CIVIL, ENM_GENERO, VCH_LUGAR_NACIMIENTO, DDT_NACIMIENTO, VCH_CURP, VCH_RFC, VCH_CORREO, DDT_FECHA_INI_ORG, VCH_NOMBRAMIENTO, ENM_STATUS, INT_HORAS_BASE, INT_HORAS_ADICIONALES, VCH_LICENCIATURA, VCH_CEDULA_LICENCIATURA, VCH_MAESTRIA, VCH_CEDULA_MAESTRIA, VCH_DOCTORADO, VCH_CEDULA_DOCTORADO, VCH_CP, VCH_COLONIA, VCH_CALLE, VCH_NUMERO_CALLE, VCH_TEL_LOCAL, VCH_TEL_CEL, VCH_PASS, ENM_PERMISOS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellidoP, apellidoM, numeroN, estadoC, genero, lugarN, fechaN, curp, rfc, mail, fechaI, nombramiento, status, horasB, horasA, licenciatura, cedulaL, maestria, cedulaM, doctorado, cedulaD, codigoP, colonia, calle, numeroC, telefonoCa, telefonoCe, pass, 'NULL'],function(error, result) {
          if (error) {
            throw error;
          } else {
              console.log("ekfoskfslkjfklslkfjlskdjflkjslkjflskjlkfjslkjflksdjkfljskljflksjdfkljskljdfsk");

          }
        });





        con.end();

      }
  }
})

function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }
    function soloNum(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "1234567890";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}
function registrarUsuario() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'CECYTEM',
        password: '100%CECYTEM',
        database: 'CECYTEM',
        port: 3306
    })
    con.connect(function (error) {
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
        permiso = "",
        mail = document.getElementById("mail").value,
        pass = document.getElementById("pass").value;

    if (nombre === "") {
        alertify.error("Falta llenar el campo del NOMBRE");
        document.getElementById("nombre").setAttribute("class", "input is-danger");
        document.getElementById("errorNombre").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("nombre").setAttribute("class", "input is-success");
        document.getElementById("errorNombre").setAttribute("style", "display: none");
    }
    if (apellidoP === "") {
        alertify.error("Falta llenar el campo del APELLIDO PATERNO");
        document.getElementById("apellidoP").setAttribute("class", "input is-danger");
        document.getElementById("errorAP").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("apellidoP").setAttribute("class", "input is-success");
        document.getElementById("errorAP").setAttribute("style", "display: none");
    }
    if (lugarN === "") {
        alertify.error("Falta llenar el campo del LUGAR DE NACIMIENTO");
        document.getElementById("lugarN").setAttribute("class", "input is-danger");
        document.getElementById("errorLN").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("lugarN").setAttribute("class", "input is-success");
        document.getElementById("errorLN").setAttribute("style", "display: none");
    }

    if (fechaN === "") {
        alertify.error("Falta llenar el campo de FECHA DE NACIMIENTO");
        document.getElementById("fechaN").setAttribute("class", "input is-danger");
        document.getElementById("errorNac").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("fechaN").setAttribute("class", "input is-success");
        document.getElementById("errorNac").setAttribute("style", "display: none");
    }
    if (genero === "") {
        alertify.error("Falta llenar el campo de GÉNERO");
        document.getElementById("genero").setAttribute("class", "input is-danger");
        document.getElementById("errorGen").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("genero").setAttribute("class", "input is-success");
        document.getElementById("errorGen").setAttribute("style", "display: none");
    }
    if (estadoC === "") {
        alertify.error("Falta llenar el campo de ESTADO CÍVIL");
        document.getElementById("estadoC").setAttribute("class", "input is-danger");
        document.getElementById("errorEC").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("estadoC").setAttribute("class", "input is-success");
        document.getElementById("errorEC").setAttribute("style", "display: none");
    }
    if (curp === "") {
        alertify.error("Falta llenar el campo del CURP");
        document.getElementById("curp").setAttribute("class", "input is-danger");
        document.getElementById("errorCURP").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("curp").setAttribute("class", "input is-success");
        document.getElementById("errorCURP").setAttribute("style", "display: none");
    }
    if (rfc === "") {
        alertify.error("Falta llenar el campo del RFC");
        document.getElementById("rfc").setAttribute("class", "input is-danger");
        document.getElementById("errorRFC").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("rfc").setAttribute("class", "input is-success");
        document.getElementById("errorRFC").setAttribute("style", "display: none");
    }
    if (colonia === "") {
        alertify.error("Falta llenar el campo de COLONIA");
        document.getElementById("colonia").setAttribute("class", "input is-danger");
        document.getElementById("errorCol").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("colonia").setAttribute("class", "input is-success");
        document.getElementById("errorCol").setAttribute("style", "display: none");
    }
    if (calle === "") {
        alertify.error("Falta llenar el campo de CALLE");
        document.getElementById("calle").setAttribute("class", "input is-danger");
        document.getElementById("errorCalle").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("calle").setAttribute("class", "input is-success");
        document.getElementById("errorCalle").setAttribute("style", "display: none");
    }
    if (numeroC === "") {
        alertify.error("Falta llenar el campo de NÚMERO DE CASA");
        document.getElementById("numeroC").setAttribute("class", "input is-danger");
        document.getElementById("errorNC").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("numeroC").setAttribute("class", "input is-success");
        document.getElementById("errorNC").setAttribute("style", "display: none");
    }
    if (codigoP === "") {
        alertify.error("Falta llenar el campo del CÓDIGO POSTAL");
        document.getElementById("codigoP").setAttribute("class", "input is-danger");
        document.getElementById("errorCP").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("codigoP").setAttribute("class", "input is-success");
        document.getElementById("errorCP").setAttribute("style", "display: none");
    }
    if (telefonoCa === "") {
        alertify.error("Falta llenar el campo del TÉLEFONO DE PREFERENCIA");
        document.getElementById("telefonoCa").setAttribute("class", "input is-danger");
        document.getElementById("errorT1").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("telefonoCa").setAttribute("class", "input is-success");
        document.getElementById("errorT1").setAttribute("style", "display: none");
    }
    if (numeroN === "") {
        alertify.error("Falta llenar el campo de NÚMERO DE NÓMINA");
        document.getElementById("numeroN").setAttribute("class", "input is-danger");
        document.getElementById("errorNN").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("numeroN").setAttribute("class", "input is-success");
        document.getElementById("errorNN").setAttribute("style", "display: none");
    }
    if (fechaI === "") {
        alertify.error("Falta llenar el campo del FECHA INICIO EN EL PLANTEL");
        document.getElementById("fechaI").setAttribute("class", "input is-danger");
        document.getElementById("errorFIDP").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("fechaI").setAttribute("class", "input is-success");
        document.getElementById("errorFIDP").setAttribute("style", "display: none");
    }
    if (nombramiento === "") {
        alertify.error("Falta llenar el campo de NOMBRAMIENTO");
        document.getElementById("nombramiento").setAttribute("class", "input is-danger");
        document.getElementById("errorNombra").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("nombramiento").setAttribute("class", "input is-success");
        document.getElementById("errorNombra").setAttribute("style", "display: none");
    }
    if (status === "") {
        alertify.error("Falta llenar el campo de ESTATUS");
        document.getElementById("status").setAttribute("class", "input is-danger");
        document.getElementById("errorSta").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("status").setAttribute("class", "input is-success");
        document.getElementById("errorSta").setAttribute("style", "display: none");
    }

    if (horasB === "") {
        alertify.error("Falta llenar el campo de HORAS BASE");
        document.getElementById("horasB").setAttribute("class", "input is-danger");
        document.getElementById("errorHB").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("horasB").setAttribute("class", "input is-success");
        document.getElementById("errorHB").setAttribute("style", "display: none");
    }
    if (horasA === "") {
        alertify.error("Falta llenar el campo de HORAS ADICIONALES");
        document.getElementById("horasA").setAttribute("class", "input is-danger");
        document.getElementById("errorHA").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("horasA").setAttribute("class", "input is-success");
        document.getElementById("errorHA").setAttribute("style", "display: none");
    }
    if (licenciatura === "") {
        alertify.error("Falta llenar el campo de LICENCIATURA");
        document.getElementById("licenciatura").setAttribute("class", "input is-danger");
        document.getElementById("errorLic").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("licenciatura").setAttribute("class", "input is-success");
        document.getElementById("errorLic").setAttribute("style", "display: none");
    }
    if (cedulaL === "") {
        alertify.error("Falta llenar el campo de CÉDULA DE LICENCIATURA");
        document.getElementById("cedulaL").setAttribute("class", "input is-danger");
        document.getElementById("errorCL").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("cedulaL").setAttribute("class", "input is-success");
        document.getElementById("errorCL").setAttribute("style", "display: none");
    }
    if (mail === "") {
        alertify.error("Falta llenar el campo del CORREO");
        document.getElementById("mail").setAttribute("class", "input is-danger");
        document.getElementById("errorCorreoRepetido").setAttribute("style", "display: none");
        document.getElementById("errorCorreo").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("errorCorreo").setAttribute("style", "display: none");
        var mail2 = con.query("SELECT VCH_CORREO FROM TBL_USER WHERE VCH_CORREO = ?", [mail], function (error, result) {
            console.log(result[0]);
            validarCorreo = result[0];
            if (error) {
                throw error;
            } else {
                if (result.length > 0) {
                    document.getElementById("mail").setAttribute("class", "input is-danger");
                    document.getElementById("errorCorreoRepetido").setAttribute("style", "display: block");
                    document.getElementById("errorPass").setAttribute("style", "display: none");
                    document.getElementById("pass").setAttribute("class", "input");
                    alertify.error("Este correo ya está registrado. Intente con otro diferente.");
                    return 0;
                } else {
                    document.getElementById("mail").setAttribute("class", "input is-success");
                    document.getElementById("errorCorreoRepetido").setAttribute("style", "display: none");
                }
            }
        });
        if (document.getElementById("errorCorreoRepetido").getAttribute("style") === "display: block") {
            return 0;
        }
        document.getElementById("mail").setAttribute("class", "input is-success");
    }

    if (pass === "") {
        alertify.error("Falta llenar el campo de CONTRASEÑA");
        document.getElementById("pass").setAttribute("class", "input is-danger");
        document.getElementById("errorPass").setAttribute("style", "display: block");
        return 0;
    } else {
        document.getElementById("pass").setAttribute("class", "input is-success");
        document.getElementById("errorPass").setAttribute("style", "display: none");
    }
    if (apellidoM === "")
        apellidoM = null;
    if (telefonoCe === "")
        telefonoCe = null;
    if (maestria === "")
        maestria = null;
    if (cedulaM === "")
        cedulaM = null;
    if (doctorado === "")
        doctorado = null;
    if (cedulaD === "")
        cedulaD = null;
    if (permiso === "")
        permiso = null;

    var query = con.query("INSERT INTO TBL_USER (VCH_NAME, VCH_A_PATERNO, VCH_A_MATERNO, INT_NUM_NOMINA, ENM_ESTADO_CIVIL, ENM_GENERO, VCH_LUGAR_NACIMIENTO, DDT_NACIMIENTO, VCH_CURP, VCH_RFC, VCH_CORREO, DDT_FECHA_INI_ORG, VCH_NOMBRAMIENTO, ENM_STATUS, INT_HORAS_BASE, INT_HORAS_ADICIONALES, VCH_LICENCIATURA, VCH_CEDULA_LICENCIATURA, VCH_MAESTRIA, VCH_CEDULA_MAESTRIA, VCH_DOCTORADO, VCH_CEDULA_DOCTORADO, VCH_CP, VCH_COLONIA, VCH_CALLE, VCH_NUMERO_CALLE, VCH_TEL_LOCAL, VCH_TEL_CEL, VCH_PASS, ENM_PERMISOS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellidoP, apellidoM, numeroN, estadoC, genero, lugarN, fechaN, curp, rfc, mail, fechaI, nombramiento, status, horasB, horasA, licenciatura, cedulaL, maestria, cedulaM, doctorado, cedulaD, codigoP, colonia, calle, numeroC, telefonoCa, telefonoCe, pass, permiso],function(error, result) {
      if (error) {
        throw error;
      } else {
          console.log("ekfoskfslkjfklslkfjlskdjflkjslkjflskjlkfjslkjflksdjkfljskljflksjdfkljskljdfsk");
          alertify.success('Success message');

      }
    });





    con.end();


    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);


}
