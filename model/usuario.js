const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioEsquema = new Schema({
  nombreUsuario: { type: String, required: true },
  nombreCompleto: { type: String, required: true },
  tipoRelacion: { type: String, required: true },
  email: { type: String, required: true },
  ciudad: { type: Schema.Types.ObjectId, ref: 'Ciudad', required: true }
});

// Campo virtual para mostrar el nombre de la ciudad
UsuarioEsquema.virtual('nombreCiudad', {
  ref: 'Ciudad',
  localField: 'ciudad',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Usuario', UsuarioEsquema);