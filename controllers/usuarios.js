const Usuario = require('../models/usuario');

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, email o password' });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }

        const usuario = await Usuario.create({ nombre, email, password });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario', detalle: error.message });
    }
};


const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios registrados' });
        }

        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios', detalle: error.message });
    }
};



const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.update(req.body);
        res.json({ message: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario', detalle: error.message });
    }
};


const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario', detalle: error.message });
    }
};

module.exports = { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
