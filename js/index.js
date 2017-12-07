

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
        vacio: function (a) {
            if (a != '') {
                return true

            } else {
                return false
            }
        }
    }
})
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
