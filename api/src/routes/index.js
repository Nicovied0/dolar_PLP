const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await User.find();

    // Enviar los usuarios como respuesta JSON
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

router.post("/", (req, res) => {
  const { dni, nombre, email, telefono, fechaNacimiento,valorDolar } = req.body;

  // Crear un nuevo usuario
  const nuevoUsuario = new User({
    dni,
    nombre,
    email,
    telefono,
    fechaNacimiento,
    valorDolar
  });

  // Guardar el usuario en la base de datos
  nuevoUsuario.save((err, usuarioGuardado) => {
    if (err) {
      console.error("Error al guardar el usuario:", err);
      res.status(500).json({ error: "Error al guardar el usuario" });
    } else {
      console.log("Usuario guardado exitosamente:", usuarioGuardado);
      res.status(201).json({ mensaje: "Usuario guardado exitosamente" });
    }
  });
});

module.exports = router;
