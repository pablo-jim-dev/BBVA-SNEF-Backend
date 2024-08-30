import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { name, email, activity } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: '¡Jugador no encontrado! Regístrate para continuar.' });
        if (name === '' && activity === Object.values(activity).length === 0 && !user) return res.status(404).json({ message: '¡Jugador no encontrado! Regístrate para continuar.' });
        if (user) return res.status(200).json({ message: `¡Bienvenido de vuelta ${user.name}!`, user });

        const newUser = new User({ name, email, activity });
        await newUser.save();
        res.status(201).json({ message: `¡Bienvenido ${newUser.name}!`, user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const score = async (req, res) => {
    const { email, game, score } = req.body;
    console.log(game);
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(200).json({ message: '¡Completaste con éxito tu actividad!' });

        // Check if game already exists in the user's games array
        // If it does, push the new score to the scores array
        // If it doesn't, add the game to the games array
        const gameIndex = user.games.findIndex(g => g.id === game.id);
        console.log('gameIndex: ', gameIndex);
        if (gameIndex !== -1) {
            user.games[gameIndex].score = score;
            user.markModified(`games.${gameIndex}`);
        } else {
            user.games.push({ id: game.id, name: game.title, score: score });
        }
        const userSaved = await user.save();
        console.log(userSaved);
        res.status(200).json({ message: '¡Puntuación registrada con éxito!' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export const users = async (req, res) => {
    const { token } = req.body;
    try {
        // Check if the token is valid
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) return res.status(401).json({ message: '¡No autorizado!' });
        // Get all Users
        const users = await User.find();
        if(!users) return res.status(404).json({ message: '¡No hay jugadores registrados!' });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const checkin = async (req, res) => {
    const { user, token } = req.body;
    try {
        // Check if the token is valid
        const checkToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!checkToken) return res.status(401).json({ message: '¡No autorizado!' });
        // Check if the user already exists
        const userFound = await User.findOne({ email: user.email });
        if (!userFound) return res.status(404).json({ message: '¡Jugador no encontrado! Regístrate para continuar.' });

        const checkin = user.giveaway ? false : true;
        userFound.giveaway = checkin;
        await userFound.save();
        res.status(200).json({ message: `${checkin ? 'El usuario ha recibido su checkin' : 'El usuario no ha recibido su checkin'}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}