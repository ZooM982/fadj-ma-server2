const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const medocRoute = require("./routes/products");
const apiRoutes = require('./routes/user');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/", medocRoute);
app.use('/api/users', apiRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie');
    app.listen(port, () => {
      console.log(`Serveur en écoute sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB', err);
  });

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose a mal tourné!');
});
