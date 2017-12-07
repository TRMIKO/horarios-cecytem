var alertify = require("alertifyjs");

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}
Vue.component('grupo', {
  props: ['g'],

  template: '<tr >' +
    '<td> <span>{{g["INT_GRUPO"]}}</span> </td>' +
    '<td> <span>{{g["VCH_NOMBRE"]}}</span> </td>' +
    '<td> <span>{{g["VCH_ESPACIALIDAD"]}}</span> </td>' +
    '<td> <span>{{g["ENM_TURNO"]}}</span> </td>' +
    '<td> <span><a class="button is-danger" v-on:click="remove(g)"  href="#"><span class="icon"><i class="fa fa-ban"></i></span></a></span> </td>' +
    '<td> <span><a class="button is-info" v-on:click="update(g)"  href="#"><span class="icon"><i class="fa fa-pencil"></i></span></a></span> </td>' +
    '</tr>',
    methods: {
      remove: function(p) {
        this.$emit('remove',p)

      },
      update: function(p) {
        this.$emit('update',p)
      }

    }
})
var app = new Vue({
    el: '#app',
    data: {
        salones: [],
        msj: 'hola',
        salones:[],
        infoGrupo:[]
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
      var query2 = con.query('SELECT * FROM TBL_GRUPO ', function (error, result) {
              if (error) {
                  throw error
              } else {
                  console.log(result)
                  app.salones=result
                  this.test=result
                  console.log(this.result)


              }

            });

        con.end();

    },
    methods: {
      close: function () {
          document.getElementById('update').setAttribute("class", "modal")

      },
        del: function (id) {
            console.log(id)
        },
        remove:function(g){
          console.log(g);
            
          alertify.confirm("Eliminar Grupo", "¿Desea eliminar el grupo?",
            function(){
              var mysql = require('mysql')
              var con = mysql.createConnection({
                host: 'localhost',
                user: 'CECYTEM',
                password: '100%CECYTEM',
                database: 'CECYTEM',
                port: 3306
              })
              var q = con.query('DELETE FROM TBL_GRUPO WHERE INT_GRUPO= ?',[g["INT_GRUPO"]] ,function(error, result) {
                if (error) {
                  throw error;
                } else {
                       alertify.success('¡Grupo eliminado con éxito!');
                        setTimeout(function() {
                            location.href="group.html";
                        }), 3000;
                }
              });
              con.end();

            },
            function(){
              alertify.error('Se canceló la petición.');
            });
        },
        update:function(g){
          document.getElementById('update').setAttribute("class", "modal is-active")
          var mysql = require('mysql')
          var con = mysql.createConnection({
            host: 'localhost',
            user: 'CECYTEM',
            password: '100%CECYTEM',
            database: 'CECYTEM',
            port: 3306
          })
          var q = con.query('SELECT * FROM TBL_GRUPO WHERE INT_GRUPO= ?',[g["INT_GRUPO"]] ,function(error, result) {
            if (error) {
              throw error;
            } else {
                   app.infoGrupo=result[0]
                  console.log(app.infoGrupo);
            }
          });
          con.end();

        },
        actualiza:function(){
          var mysql = require('mysql')
          var con = mysql.createConnection({
            host: 'localhost',
            user: 'CECYTEM',
            password: '100%CECYTEM',
            database: 'CECYTEM',
            port: 3306
          })
          console.log([this.infoGrupo['VCH_NOMBRE'],this.infoGrupo['VCH_ESPACIALIDAD'],this.infoGrupo['ENM_TURNO']] );
          var q = con.query('UPDATE TBL_GRUPO SET VCH_NOMBRE= ?, VCH_ESPACIALIDAD=?, ENM_TURNO= ? WHERE INT_GRUPO=?',[this.infoGrupo['VCH_NOMBRE'],this.infoGrupo['VCH_ESPACIALIDAD'],this.infoGrupo['ENM_TURNO'],this.infoGrupo['INT_GRUPO']] ,function(error, result) {
            if (error) {
              throw error;
            } else {
                  alertify.success('Actualizado');
            }
          });
          con.end();
        },
        view: function () {
            var mysql = require('mysql')
            var con = mysql.createConnection({
                host: 'localhost',
                user: 'CECYTEM',
                password: '100%CECYTEM',
                database: 'CECYTEM',
                port: 3306
            })
            var query2 = con.query('SELECT * FROM TBL_SALON ', function (error, result) {
                    if (error) {
                        throw error
                    } else {
                        console.log(result)
                        this.test=result

                        result.forEach(function (element) {
                            let tr = document.createElement('tr')

                            let td = document.createElement('td')
                            td.appendChild(document.createTextNode(element['INT_SALON']))
                            tr.appendChild(td)


                            td = document.createElement('td')
                            td.appendChild(document.createTextNode(element['VCH_NOMBRE']))
                            tr.appendChild(td)

                            td = document.createElement('td')
                            let span = document.createElement('span')
                            let i = document.createElement('i')

                            i.setAttribute("class", "fa fa-ban")
                            span.appendChild(i)
                            span.setAttribute("class", "icon is-small")

                            let span2 = document.createElement('span')
                            span2.appendChild(span)
                            span2.setAttribute("class", "button is-danger")
                            span2.addEventListener("click", function () {
                                alertify.confirm("Eliminar Salón", "¿Desea eliminar el salón " + element['VCH_NOMBRE'] + "?" ,
                                    function () {
                                        var con = mysql.createConnection({
                                            host: 'localhost',
                                            user: 'CECYTEM',
                                            password: '100%CECYTEM',
                                            database: 'CECYTEM',
                                            port: 3306
                                        })
                                        var q = con.query('DELETE FROM TBL_SALON WHERE INT_SALON= ?', [element['INT_SALON']], function (error, result) {
                                            if (error) {
                                                throw error;
                                            } else {
                                                alertify.success("¡El salón se ha eliminado con éxito!");
                                                setTimeout(function () {
                                                    location.href = "classroom.html";
                                                }, 3000);
                                            }
                                        });
                                        con.end();
                                    },
                                    function () {
                                        alertify.error('Cancelado.');
                                    });
                        })
                        td.appendChild(span2)
                        tr.appendChild(td)



                        td = document.createElement('td')
                        span = document.createElement('span')
                        i = document.createElement('i')

                        i.setAttribute("class", "fa fa-file-pdf-o")
                        span.appendChild(i)
                        span.setAttribute("class", "icon is-small")

                        span2 = document.createElement('span')
                        span2.appendChild(span)
                        span2.setAttribute("class", "button")
                        span2.addEventListener("click", function () {
                            console.log("pdf")
                        })

                        td.appendChild(span2)
                        tr.appendChild(td)



                        document.getElementById('content').appendChild(tr)
                        console.log(tr)
                    })
            }
        });

    con.end();


}
}
})
