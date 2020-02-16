/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.preguntaEditada = new Evento(this);

  this.inicializarStorage();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    let idMax = 0;
    this.preguntas.forEach(element => {
      if (element.id > idMax) {
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
    this.guardar(this.preguntas);
    this.preguntaAgregada.notificar();
  },

  //Hacemos el metodo borrarPregunta
  borrarPregunta: function (id) {
    let preguntaABorrar = this.preguntas.findIndex(element => element.id == id);
    this.preguntas.splice(preguntaABorrar, 1);
    this.guardar(this.preguntas);
    this.preguntaBorrada.notificar();
  },

  // Se borran todas las preguntas
  borrarTodo: function () {
    this.preguntas = [];
    this.guardar(this.preguntas);
    this.todoBorrado.notificar();
  },

  // Se edita una pregunta seleccionada
  editarPregunta: function (id) {
    let preguntaAEditar = this.preguntas.findIndex(element => element.id == id);
    let nuevaPreguntaEditada = prompt('Ingrese la nueva pregunta');
    if (nuevaPreguntaEditada) {
      this.preguntas[preguntaAEditar].textoPregunta = nuevaPreguntaEditada;
      this.guardar(this.preguntas);
      this.preguntaEditada.notificar();
    }
  },

  // Funcion para agregar un voto
  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {

    let indexPreguntaAModificar = this.preguntas.findIndex(element => element.textoPregunta === nombrePregunta)

    let indexRespuestaAModificar = this.preguntas[indexPreguntaAModificar].cantidadPorRespuesta.findIndex(element => element.textoRespuesta === respuestaSeleccionada)

    this.preguntas[indexPreguntaAModificar].cantidadPorRespuesta[indexRespuestaAModificar].cantidad++;

    console.log(this.preguntas)
  },

  //se guardan las preguntas
  guardar: function (preguntas) {
    localStorage.setItem('preguntas', JSON.stringify(preguntas));
  },

  inicializarStorage: function () {
    if (localStorage.getItem('preguntas')) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'))
    }
  }
};
