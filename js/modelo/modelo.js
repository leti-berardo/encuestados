/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    let idMax = 0;
    this.preguntas.forEach(element => {
      debugger;
      if (element.id > idMax ) {
        idMax = element.id;
      }
    });
    return idMax;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //Hacemos el metodo borrarPregunta
  borrarPregunta: function (id) {
    this.preguntas.splice(id, 1);
    this.guardar();
  },

  //se guardan las preguntas
  guardar: function () {
  },
};
