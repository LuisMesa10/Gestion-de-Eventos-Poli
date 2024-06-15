const mongoose = require('mongoose');
const { schema } = require('./ciudad');
const ciudad = require('./ciudad');
const Schema = mongoose.Schema;

const LugarEsquema = new Schema({
    nombre: { type : String, required: true },
    direccion: { type: String, required: true },
    ciudad : { type : Schema.Types.ObjectId, ref: 'Ciudad', required : true }
});

LugarEsquema.virtual('nombreCiudad', {
    ref: 'Ciudad',
    localField: 'ciudad',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Lugar', LugarEsquema);
