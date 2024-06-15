const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioEsquema = new Schema({
  texto: { type: String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

// Campo virtual para mostrar el nombre de usuario
ComentarioEsquema.virtual('nombreUsuario', {
  ref: 'Usuario',
  localField: 'usuario',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Comentario', ComentarioEsquema);
