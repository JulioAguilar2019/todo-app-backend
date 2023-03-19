export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: '1.0.0',
      description:
        'A simple Express API for managing tasks in a database with POSTGRESQL and PRISMA ORM ',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        basePath: '/v1/api',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the task',
            },
            name: {
              type: 'string',
              description: 'The name of the task',
            },
            description: {
              type: 'string',
              description: 'The description of the task',
            },
            start_date: {
              type: 'string',
              format: 'date',
              description: 'The start date of the task',
            },
            start_time: {
              type: 'string',
              format: 'time',
              description: 'The start time of the task',
            },
            end_date: {
              type: 'string',
              format: 'date',
              description: 'The end date of the task',
            },
            end_time: {
              type: 'string',
              format: 'time',
              description: 'The end time of the task',
            },
            status: {
              type: 'string',
              description: 'The status of the task',
            },
            task_category_id: {
              type: 'integer',
              description: 'The task category id of the task',
            },
            user_profile_id: {
              type: 'integer',
              description: 'The user profile id of the task',
            },
          },
          required: [
            'id',
            'name',
            'description',
            'start_date',
            'status',
            'task_category_id',
            'user_profile_id',
          ],
          example: {
            id: '1',
            name: 'Task 1',
            description: 'Task 1 description',
            start_date: '2021-01-01',
            start_time: '10:00:00',
            end_date: '2021-01-02',
            end_time: '12:00:00',
            status: 'Pending',
            task_category_id: 1,
            user_profile_id: 1,
          },
        },
      },
    },
    paths: {
      '/v1/api/tasks': {
        get: {
          tags: ['Tasks'],
          summary: 'Get all tasks',
          description: 'this function returns all tasks',
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Task',
                    },
                  },
                },
              },
            },
          },
          parameters: [
            {
              name: 'limit',
              in: 'query',
              description: 'Limit the number of tasks to return',
              required: false,
              schema: {
                type: 'integer',
                minimum: 1,
                maximum: 10,
                default: 5,
              },
            },
            {
              name: 'from',
              in: 'query',
              description: 'Number of tasks to skip',
              required: false,
              schema: {
                type: 'integer',
                minimum: 0,
                maximum: 10,
                default: 0,
              },
            },
          ],
        },
      },
      '/v1/api/tasks/{id}': {
        get: {
          tags: ['Tasks'],
          summary: 'Get a task by id',
          description: 'this function returns a task by id',
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Task',
                    },
                  },
                },
              },
            },
          },
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The id of the task',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
                example: 1,
              },
            },
          ],
        },
      },
    },
  },

  apis: ['./src/routes/*.ts'],
};
