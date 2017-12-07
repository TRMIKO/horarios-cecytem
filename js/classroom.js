var alertify = require("alertifyjs");

function salir() {
    alertify.error("¡Nos vemos pronto!");
    setTimeout(function () {
        location.href = "signin.html";
    }, 3000);
}
Vue.component('salones', {
  props: ['salon'],

  template: '<tr >' +
    '<td> <span>{{salon["VCH_NOMBRE"]}}</span> </td>' +


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
        salones: [],
        msj: 'hola',
        salones:[]
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
      var query2 = con.query('SELECT * FROM TBL_SALON ', function (error, result) {
              if (error) {
                  throw error
              } else {
                  console.log(result)
                  app.salones=result
                  this.test=result
                  console.log(this.result)

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
                       alertify.success("Descargar PDF");
                        setTimeout(function () {
                            location.href="pdfClassroom.html";
                        }, 3000);
                  })

                  td.appendChild(span2)
                  tr.appendChild(td)



                  document.getElementById('content').appendChild(tr)
                  console.log(tr)
              })
      }
  });

con.end();

    },
    methods: {
        close: function (elm) {
            document.getElementById('delete').setAttribute("class", "modal")
            //document.getElementById('text').removeChild(document.getElementById('text')[0])
            document.getElementById('delete-btn').removeEventListener("click", function () {
                console.log(element['INT_SALON'])
            })
            console.log(document.getElementById('text').removeChild(document.getElementById('text').lastChild))
        },
        del: function (id) {
            console.log(id)
        },
        testo:function(){
          console.log(this.salones);
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
