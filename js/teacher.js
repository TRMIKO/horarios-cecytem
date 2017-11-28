function salir() {
    location.href = "signin.html";
}

Vue.component('my-component', {
    template: '<div>A custom component!</div>',
    props: ['salones']
})
var app = new Vue({
    el: '#app',
    data: {
        salones: [],
        msj: 'hola'
    },
    methods: {
        close: function () {
            document.getElementById('delete').setAttribute("class", "modal")


            console.log(document.getElementById('text').removeChild(document.getElementById('text').lastChild))
        },
        cupdate: function () {
            document.getElementById('update').setAttribute("class", "modal")



        },
        del: function (id) {
            console.log(id)
        },
        view: function () {
            var mysql = require('mysql')
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123',
                database: 'CECYTEM',
                port: 3306
            })
            var query2 = connection.query('SELECT * FROM TBL_USER ', function (error, result) {
                if (error) {
                    throw error
                } else {
                    console.log(result)
                    result.forEach(function (element) {
                        console.log(element)
                        let tr = document.createElement('tr')

                        let td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['INT_USER']))
                        tr.appendChild(td)
                        td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['VCH_NAME']))
                        tr.appendChild(td)

                        td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['VCH_A_PATERNO']))
                        tr.appendChild(td)

                        td = document.createElement('td')
                        td.appendChild(document.createTextNode(element['VCH_A_MATERNO']))
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
                            p = document.createElement('p')
                            p.appendChild(document.createTextNode(element['VCH_NAME'] + ' ' + element['VCH_A_PATERNO'] + ' ' + element['VCH_A_MATERNO']))
                            document.getElementById('delete').setAttribute("class", "is-active modal")
                            document.getElementById('text').appendChild(p)
                            document.getElementById('delete-btn').addEventListener("click", function () {

                                this.removeEventListener('click', arguments.callee);
                                document.getElementById('delete').setAttribute("class", "modal")
                                var con = mysql.createConnection({
                                    host: 'localhost',
                                    user: 'root',
                                    password: '123',
                                    database: 'CECYTEM',
                                    port: 3306
                                })
                                var q = con.query('DELETE FROM TBL_USER WHERE INT_USER= ?', [element['INT_']], function (error, result) {
                                    if (error) {
                                        throw error;
                                    } else {
                                        console.log("borrado")
                                    }
                                });
                                con.end();

                            })

                        })
                        td.appendChild(span2)
                        tr.appendChild(td)

                        td = document.createElement('td')
                        span = document.createElement('span')
                        i = document.createElement('i')

                        i.setAttribute("class", "fa fa-pencil")
                        span.appendChild(i)
                        span.setAttribute("class", "icon is-small")

                        span2 = document.createElement('span')
                        span2.appendChild(span)
                        span2.setAttribute("class", "button is-info")
                        span2.addEventListener("click", function () {
                            document.getElementById('update').setAttribute("class", "is-active modal")
                            document.getElementById('nombre').value = element['VCH_NAME'] == null ? ' ' : element['VCH_NAME']
                            document.getElementById('apellidoP').value = element['VCH_A_PATERNO'] == null ? '' : element['VCH_A_PATERNO']
                            document.getElementById('apellidoM').value = element['VCH_A_MATERNO'] == null ? '' : element['VCH_A_MATERNO']
                            document.getElementById('fechaN').value = element['DDT_NACIMIENTO'] == null ? '' : element['DDT_NACIMIENTO']
                            document.getElementById('lugarN').value = element['VCH_LUGAR_NACIMIENTO'] == null ? '' : element['VCH_LUGAR_NACIMIENTO']
                            document.getElementById('horasA').value = element['INT_HORAS_ADICIONALES'] == null ? '' : element['INT_HORAS_ADICIONALES']

                            document.getElementById('genero').value = element['ENM_GENERO'] == null ? '' : element['ENM_GENERO']

                            document.getElementById('status').value = element['ENM_STATUS'] == null ? '' : element['ENM_STATUS']

                            document.getElementById('horasB').value = element['INT_HORAS_BASE'] == null ? '' : element['INT_HORAS_BASE']
                            document.getElementById('numeroN').value = element['INT_NUM_NOMINA'] == null ? '' : element['INT_NUM_NOMINA']
                            document.getElementById('cedulaD').value = element['VCH_CEDULA_DOCTORADO'] == null ? '' : element['VCH_CEDULA_DOCTORADO']
                            document.getElementById('cedulaL').value = element['VCH_CEDULA_DOCTORADO'] == null ? '' : element['VCH_CEDULA_LICENCIATURA']
                            document.getElementById('cedulaL').value = element['VCH_CEDULA_MAESTRIA'] == null ? '' : element['VCH_CEDULA_MAESTRIA']
                            document.getElementById('colonia').value = element['VCH_COLONIA'] == null ? '' : element['VCH_COLONIA']

                            document.getElementById('mail').value = element['VCH_CORREO'] == null ? '' : element['VCH_CORREO']

                            document.getElementById('codigoP').value = element['VCH_CP'] == null ? '' : element['VCH_CP']

                            document.getElementById('curp').value = element['VCH_CURP'] == null ? '' : element['VCH_CURP']

                            document.getElementById('doctorado').value = element['VCH_DOCTORADO'] == null ? '' : element['VCH_DOCTORADO']
                            document.getElementById('licenciatura').value = element['VCH_LICENCIATURA'] == null ? '' : element['VCH_LICENCIATURA']
                            document.getElementById('maestria').value = element['VCH_MAESTRIA'] == null ? '' : element['VCH_MAESTRIA']

                            document.getElementById('nombramiento').value = element['VCH_NOMBRAMIENTO'] == null ? '' : element['VCH_NOMBRAMIENTO']

                            document.getElementById('numeroC').value = element['VCH_NUMERO_CALLE'] == null ? '' : element['VCH_NUMERO_CALLE']
                            document.getElementById('pass').value = element['VCH_PASS'] == null ? '' : element['VCH_PASS']

                            document.getElementById('rfc').value = element['VCH_RFC'] == null ? '' : element['VCH_RFC']
                            document.getElementById('telefonoCe').value = element['VCH_TEL_CEL'] == null ? '' : element['VCH_TEL_CEL']
                            document.getElementById('telefonoCa').value = element['VCH_TEL_LOCAL'] == null ? '' : element['VCH_TEL_LOCAL']
                            document.getElementById('update-btn').addEventListener("click", function () {
                                /*var con = mysql.createConnection({
                                      host: 'localhost',
                                      user: 'root',
                                      password: '123',
                                      database: 'CECYTEM',
                                      port: 3306
                                  })
                                 var q = con.query('UPDATE TBL_MATERIA SET VCH_NOMBRE= ?,INT_SEMESTRE=?,INT_HORAR=? WHERE INT_MATERIA= ?',[document.getElementById('materia').value,document.getElementById('semestre').value,document.getElementById('hora').value,element['INT_MATERIA']], function(error, result){
                                      if(error){
                                         throw error;
                                      }else{
                                          console.log("actualizado")
                                           location.reload();
                                      }
                                   });
                                  con.end();*/
                            })


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
                        span2.setAttribute("class", "button is-light")
                        span2.addEventListener("click", function () {
                            document.getElementById('update').setAttribute("class", "is-active modal")
                            document.getElementById('materia').value = element['VCH_NOMBRE']
                            document.getElementById('semestre').value = element['INT_SEMESTRE']
                            document.getElementById('hora').value = element['INT_HORAR']
                            document.getElementById('update-btn').addEventListener("click", function () {
                                /* var con = mysql.createConnection({
                                       host: 'localhost',
                                       user: 'root',
                                       password: '123',
                                       database: 'CECYTEM',
                                       port: 3306
                                   })
                                  var q = con.query('UPDATE TBL_MATERIA SET VCH_NOMBRE= ?,INT_SEMESTRE=?,INT_HORAR=? WHERE INT_MATERIA= ?',[document.getElementById('materia').value,document.getElementById('semestre').value,document.getElementById('hora').value,element['INT_MATERIA']], function(error, result){
                                       if(error){
                                          throw error;
                                       }else{
                                           console.log("actualizado")
                                            location.reload();
                                       }
                                    });
                                   con.end();*/
                            })


                        })
                        td.appendChild(span2)
                        tr.appendChild(td)



                        document.getElementById('content').appendChild(tr)
                        console.log(tr)
                    })







                }
            });

            connection.end();


        }
    }
})
app.view()
