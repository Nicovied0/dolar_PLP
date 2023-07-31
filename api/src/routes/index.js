const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({ mensaje: "Publicación guardada exitosamente" });
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
  }
});

module.exports = router;
