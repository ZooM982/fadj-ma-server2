const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');
const { loginUser, getUserProfile } = require('../controllers/userController');

// Route pour l'inscription
router.post('/register', userController.registerUser);

// Route pour la connexion
router.post('/login', loginUser);

// Route pour recuperer le user
router.get('/profile', authenticateUser, getUserProfile);

// Route pour la suppression d'un utilisateur
router.delete('/delete', userController.deleteUser);

// Route pour la modification des informations d'un utilisateur
router.put('/update', userController.updateUser);

// Route pour la déconnexion
router.post('/logout', userController.logoutUser);

module.exports = router;
