const request = require('supertest');
const sequelizeTest = require('../configTestDb');
const Server = require('../../models/server');
const Usuario = require('../../models/usuario');

const server = new Server().app;

beforeAll(async () => {
  await sequelizeTest.sync({ force: true });
});

afterAll(async () => {
  await sequelizeTest.close();
});

describe('Pruebas de endpoints CRUD para /api/usuarios', () => {
  test('POST /api/usuarios debe crear un usuario', async () => {
    const response = await request(server)
      .post('/api/usuarios')
      .send({ nombre: 'UsuarioTest', email: 'test@correo.com', pass: '12345' });
    expect(response.status).toBe(201);
    expect(response.body.nombre).toBe('UsuarioTest');
  });

  test('GET /api/usuarios debe devolver una lista de usuarios', async () => {
    const response = await request(server).get('/api/usuarios');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('PUT /api/usuarios/:id debe actualizar un usuario', async () => {
    const usuario = await Usuario.create({ nombre: 'UsuarioActualizar', email: 'update@test.com', pass: 'pass123' });
    const response = await request(server)
      .put(`/api/usuarios/${usuario.id}`)
      .send({ nombre: 'UsuarioActualizado' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuario actualizado correctamente');
  });

  test('DELETE /api/usuarios/:id debe eliminar un usuario', async () => {
    const usuario = await Usuario.create({ nombre: 'UsuarioEliminar', email: 'delete@test.com', pass: 'pass123' });
    const response = await request(server).delete(`/api/usuarios/${usuario.id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuario eliminado correctamente');
  });
});
