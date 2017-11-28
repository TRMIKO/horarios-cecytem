function salir() {
    location.href = "signin.html";
}

Vue.component('horario', {
            props: ['horas'],

            template: '<tr>' +
                ' <td> {{horas[0]}} </td> ' +
                ' <td> {{horas[1]}} </td> ' +
                ' <td> {{horas[2]}} </td> ' +
                ' <td> {{horas[3]}} </td> ' +
                ' <td> {{horas[4]}} </td> ' +
                ' <td> {{horas[5]}} </td> ' +
                '</tr>'
        })
        var app = new Vue({
            el: '#app',
            data: {
                msj: 'hola',
                hora: '',
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
                        0: this.hora,
                        1: '',
                        2: '',
                        3: '',
                        4: '',
                        5: ''


                    })

                    this.salones.push({
                        0: this.hora,
                        1: '',
                        2: '',
                        3: '',
                        4: '',
                        5: ''


                    })
                },
                setClass: function() {
                    //console.log(this.materia,this.tiempo,this.salon,this.profesor,this.dia)
                    this.horas[this.tiempo][this.dia] = this.arrayMateria[this.materia]['VCH_NOMBRE']

                    this.salones[this.tiempo][this.dia] = this.arraySalon[this.salon]['VCH_NOMBRE']
                    for (let i = 0; i < this.relacion.length; i++) {
                        if (this.relacion[i][1] == this.arrayMateria[this.materia]['VCH_NOMBRE'])
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
                        5: this.arrayProfesor[this.profesor]['VCH_NAME']
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