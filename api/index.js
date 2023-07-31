const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// Conexión a la base de datos
const dbConnect = require("./src/config/mongo");

// Importar las rutas desde la carpeta "routes"
const routes = require("./src/routes/index");

// Montar las rutas en la aplicación
app.use("/", routes);

dbConnect().then(
  (res) => {
    app.listen(PORT, () => {
      console.log("Successfully connected");
      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    });
  },

  (error) => {
    console.log("Connection error", error);
  }
);