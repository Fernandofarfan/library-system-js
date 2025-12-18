import user from "../models/user.js";
import { hashPassword, compare_hashed_passwords } from "../utils/hashing.js";
import { createToken } from "../utils/token.js"

export async function register(req, res) {
    try {
        const { email, username, password } = req.body;

        if (!email) {
            return res.json({ message: "El campo de correo electrónico es obligatorio" })
        }
        if (!username) {
            return res.json({ message: "El campo de nombre de usuario es obligatorio" })
        }
        const foundUser = await user.findOne({ where: { username } });

        if (foundUser) {
            return res.json({ message: "¡Este usuario ya está registrado!" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await user.create({ username: username, email: email, password: hashedPassword });

        res.json({ message: "¡Usuario registrado con éxito!" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "¡Error interno del servidor!" });

    }
}

export async function login(req, res) {
    try {

        const { username, password } = req.body;
        const registeredUser = await user.findOne({ where: { username } });

        if (!registeredUser) {
            return res.json({ message: "¡Credenciales inválidas!" });
        }

        const is_matched = await compare_hashed_passwords(password, registeredUser.password);

        if (!is_matched) {
            return res.json({ message: "¡Credenciales inválidas!" });
        }

        // create token
        const token = createToken(registeredUser.id, username);

        return res.json({ message: "¡Usuario inició sesión con éxito!", token });

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: "¡Error interno del servidor!" });

    }
}