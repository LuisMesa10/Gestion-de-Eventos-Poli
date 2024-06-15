const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Ciudad = require('../model/ciudad');
const Lugar = require('../model/lugar');
const Usuario = require('../model/usuario');
const Comentario = require('../model/comentario');
const Evento = require('../model/evento');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/gestion-eventos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


// Rutas para CRUD de cada modelo

// Crear nueva ciudad
app.post('/ciudades', async (req, res) => {
  try {
    const ciudad = new Ciudad(req.body);
    const result = await ciudad.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Obtener todas las ciudades
app.get('/ciudades', async (req, res) => {
  try {
    const ciudades = await Ciudad.find();
    res.status(200).send(ciudades);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE Ciudad por ID
app.delete('/ciudades/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ciudad = await Ciudad.findByIdAndDelete(id);
    if (!ciudad) {
      return res.status(404).send({ message: 'Ciudad no encontrada' });
    }
    res.status(200).send({ message: 'Ciudad eliminada correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT (Actualizar) Ciudad por ID
app.put('/ciudades/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ciudad = await Ciudad.findByIdAndUpdate(id, req.body, { new: true });
    if (!ciudad) {
      return res.status(404).send({ message: 'Ciudad no encontrada' });
    }
    res.status(200).send(ciudad);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Crear nuevo lugar
app.post('/lugares', async (req, res) => {
  try {
    const lugar = new Lugar(req.body);
    const result = await lugar.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE Lugar por ID
app.delete('/lugares/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const lugar = await Lugar.findByIdAndDelete(id);
    if (!lugar) {
      return res.status(404).send({ message: 'Lugar no encontrado' });
    }
    res.status(200).send({ message: 'Lugar eliminado correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT (Actualizar) Lugar por ID
app.put('/lugares/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const lugar = await Lugar.findByIdAndUpdate(id, req.body, { new: true });
    if (!lugar) {
      return res.status(404).send({ message: 'Lugar no encontrado' });
    }
    res.status(200).send(lugar);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Crear nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const result = await usuario.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los usuarios con la información de ciudad poblada
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('ciudad');
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE Usuario por ID
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.status(200).send({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT (Actualizar) Usuario por ID
app.put('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Crear nuevo comentario
app.post('/comentarios', async (req, res) => {
  try {
    const comentario = new Comentario(req.body);
    const result = await comentario.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Obtener todos los comentarios con la información de usuario poblada
app.get('/comentarios', async (req, res) => {
  try {
    const comentarios = await Comentario.find().populate('usuario', 'nombreUsuario');
    res.status(200).send(comentarios);
  } catch (error) {
    res.status(400).send(error);
  }
});
// DELETE Comentario por ID
app.delete('/comentarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comentario = await Comentario.findByIdAndDelete(id);
    if (!comentario) {
      return res.status(404).send({ message: 'Comentario no encontrado' });
    }
    res.status(200).send({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT (Actualizar) Comentario por ID
app.put('/comentarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comentario = await Comentario.findByIdAndUpdate(id, req.body, { new: true });
    if (!comentario) {
      return res.status(404).send({ message: 'Comentario no encontrado' });
    }
    res.status(200).send(comentario);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Crear nuevo evento
app.post('/eventos', async (req, res) => {
  try {
    const evento = new Evento(req.body);
    const result = await evento.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los lugares con la información de ciudad poblada
app.get('/lugares', async (req, res) => {
  try {
      const lugares = await Lugar.find().populate('ciudad');
      res.status(200).send(lugares);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Obtener todos los eventos con población de referencias
app.get('/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find()
      .populate({
        path: 'lugar',
        populate: {
          path: 'ciudad',
          select: 'nombre departamento pais'
        }
      })
      .populate('asistentes', 'nombreUsuario nombreCompleto tipoRelacion email ciudad')
      .populate('conferencistas', 'nombreUsuario nombreCompleto tipoRelacion email ciudad')
      .populate({
        path: 'comentarios',
        populate: {
          path: 'usuario',
          select: 'nombreUsuario'
        }
      })
      .exec();

    res.status(200).send(eventos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE Evento por ID
app.delete('/eventos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const evento = await Evento.findByIdAndDelete(id);
    if (!evento) {
      return res.status(404).send({ message: 'Evento no encontrado' });
    }
    res.status(200).send({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).send(error);
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
