export const schema = {
  models: {
    Todo: {
      name: 'Todo',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        description: {
          name: 'description',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        count: {
          name: 'count',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: [],
        },
        price: {
          name: 'price',
          isArray: false,
          type: 'Float',
          isRequired: true,
          attributes: [],
        },
        completed: {
          name: 'completed',
          isArray: false,
          type: 'Boolean',
          isRequired: true,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'Todos',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: '4401034582a70c60713e1f7f9da3b752',
};
