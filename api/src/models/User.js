// user.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Definir un schema para el modelo de usuario
const userSchema = new Schema({
  dni: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  valorDolar: {
    type: String,
    required: true,
  },
  fechaDeRegistro: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

// Crear y exportar el modelo de usuario
const User = mongoose.model("User", userSchema);
module.exports = User;
