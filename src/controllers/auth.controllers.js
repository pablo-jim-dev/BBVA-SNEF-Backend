import { Admin } from '../models/admin.model.js';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js"

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await Admin.findOne({ email });
        if (!userFound) return res.status(404).json({ message: "El usuario no ha sido encontrado." });
        const comparePassword = bcrypt.compare(password, userFound.password);
        if (!comparePassword) return res.status(401).json({ message: "La contraseña es incorrecta." });
        const token = jwt.sign({ id: userFound._id }, JWT_SECRET);
        res.status(200).json({ email: userFound.email, token: token, message: "Bienvenido." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Ocurrió un error con la petición: ${error.message}` });
    }
}