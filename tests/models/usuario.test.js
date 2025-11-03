const { DataTypes } = require('sequelize');
const sequelizeTest = require('../configTestDb');
const Usuario = require('../../models/Usuario');

beforeAll(async () => {
  await sequelizeTest.sync({ force: true });
});

afterAll(async () => {
  await sequelizeTest.close();
});

test('Debe crear un usuario válido', async () => {
  const usuario = await Usuario.create({id : 0,
     nombre: 'User Test', 
     email: 'user@test.com', 
     pass: 'password123' });
  expect(usuario.nombre).toBe('User Test');
  expect(usuario.email).toBe('user@test.com');
});

test('Debe fallar al crear un usuario sin email', 
  async () => {
  await expect(Usuario.create({ 
    nombre: 'User Test', 
    pass: 'password123' })).rejects.toThrow();
});
