const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
  const { firstname, lastname, email, gender, password, birthday } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "L'utilisateur avec cet email existe déjà" });
    }

    // Création d'un nouvel utilisateur
    user = new User({
      firstname,
      lastname,
      email,
      gender,
      password,
      birthday,
    });

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarde de l'utilisateur dans la base de données
    await user.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (err) {
    console.error(err.message);

    // Vérifiez si l'erreur provient d'un index unique
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `Un utilisateur avec ce ${field} existe déjà` });
    }

    res.status(500).send("Erreur Serveur");
  }
};



// Fonction de connexion (login)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé" });
  }

  // Vérifier le mot de passe avec bcrypt (exemple, si tu utilises bcrypt)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect" });
  }

  // Générer le token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

// Fonction pour récupérer les informations du profil utilisateur
exports.getUserProfile = async (req, res) => {
  try {
    // Récupère l'utilisateur à partir du token
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};


// Suppression de l'utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur Serveur");
  }
};

// Mise à jour des informations de l'utilisateur
exports.updateUser = async (req, res) => {
  const { firstname, lastname, email, gender, password, birthday } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour des informations de l'utilisateur
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (birthday) user.birthday = birthday;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "Informations mises à jour avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur Serveur");
  }
};

// Déconnexion (pour effacer la session, dépendent de la gestion des sessions)
exports.logoutUser = (req, res) => {
  req.session = null; // Si vous utilisez des sessions
  res.json({ message: "Déconnexion réussie" });
};

// Fonction pour générer un token (ajoutez votre logique ici)
const generateToken = (userId) => {
  // Implémentez votre logique pour générer un token JWT ou autre
  return "dummyToken"; // Remplacez par le vrai token généré
};
