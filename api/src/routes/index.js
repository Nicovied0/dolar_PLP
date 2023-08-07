const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const usuarios = await User.find();

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
  const { dni, nombre, email, telefono, fechaNacimiento, valorDolar } =
    req.body;

  // Crear un nuevo usuario
  const nuevoUsuario = new User({
    dni,
    nombre,
    email,
    telefono,
    fechaNacimiento,
    valorDolar,
  });

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

router.post("/precio", async (req, res) => {
  try {
    const valorDolarBuscado = parseFloat(req.body.valorDolar);

    if (isNaN(valorDolarBuscado)) {
      return res
        .status(400)
        .json({ error: "El valorDolar proporcionado no es válido" });
    }

    const usuarios = await User.find();

    if (usuarios.length === 0) {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }

    usuarios.sort(
      (a, b) =>
        Math.abs(parseFloat(a.valorDolar) - valorDolarBuscado) -
        Math.abs(parseFloat(b.valorDolar) - valorDolarBuscado)
    );

    const usuarioCercano = usuarios[0];

    res.json(usuarioCercano);
  } catch (error) {
    console.error("Error al buscar usuarios por valorDolar:", error);
    res.status(500).json({ error: "Error al buscar usuarios por valorDolar" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;

    const usuario = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

module.exports = router;
