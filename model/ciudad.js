const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CiudadEsquema = new Schema({
    nombre: {type: String, required: true},
    departamento: {type: String, required: true},
    pais: {type: String, required: true}
});

module.exports = mongoose.model('Ciudad', CiudadEsquema);