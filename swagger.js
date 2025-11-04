const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Usuarios',
    version: '1.0.0',
    description: 'Documentación del módulo de usuarios',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local',
    },
  ],
  tags: [{ name: 'Usuarios', description: 'Operaciones CRUD de usuario' }],
  paths: {
    '/usuarios': {
      get: {
        tags: ['Usuarios'],
        summary: 'Obtener todos los usuarios',
        responses: {
          200: {
            description: 'Lista de usuarios obtenida correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Usuario' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Usuarios'],
        summary: 'Crear un nuevo usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Usuario' },
            },
          },
        },
        responses: {
          201: { description: 'Usuario creado correctamente' },
          400: { description: 'Error de validación' },
        },
      },
    },
    '/usuarios/{id}': {
      put: {
        tags: ['Usuarios'],
        summary: 'Actualizar un usuario existente',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: { type: 'integer' },
            required: true,
            description: 'ID del usuario a actualizar',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Usuario' },
            },
          },
        },
        responses: {
          200: { description: 'Usuario actualizado correctamente' },
          404: { description: 'Usuario no encontrado' },
        },
      },
      delete: {
        tags: ['Usuarios'],
        summary: 'Eliminar un usuario',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: { type: 'integer' },
            required: true,
            description: 'ID del usuario a eliminar',
          },
        ],
        responses: {
          200: { description: 'Usuario eliminado correctamente' },
          404: { description: 'Usuario no encontrado' },
        },
      },
    },
  },
  components: {
    schemas: {
      Usuario: {
        type: 'object',
        required: ['nombre', 'email', 'password'],
        properties: {
          id: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'Juan Pérez' },
          email: { type: 'string', example: 'juan.perez@example.com' },
          password: { type: 'string', example: '123456' },
        },
      },
    },
  },
};

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger UI disponible en: http://localhost:8085/api-docs');
};

module.exports = setupSwagger;
