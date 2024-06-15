const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventoEsquema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  categorias: [String],
  fecha: { type: Date, required: true },
  lugar: { type: Schema.Types.ObjectId, ref: 'Lugar', required: true },
  asistentes: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
  conferencistas: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
  facultadesOrganizadoras: [String],
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }]
});

// Campo virtual para mostrar el nombre de la ciudad del lugar
EventoEsquema.virtual('nombreCiudadLugar', {
  ref: 'Lugar',
  localField: 'lugar',
  foreignField: '_id',
  justOne: true
});

// Campo virtual para mostrar nombres de usuario de asistentes
EventoEsquema.virtual('nombresAsistentes', {
  ref: 'Usuario',
  localField: 'asistentes',
  foreignField: '_id',
  justOne: false
});

// Campo virtual para mostrar nombres de usuario de conferencistas
EventoEsquema.virtual('nombresConferencistas', {
  ref: 'Usuario',
  localField: 'conferencistas',
  foreignField: '_id',
  justOne: false
});

module.exports = mongoose.model('Evento', EventoEsquema);

