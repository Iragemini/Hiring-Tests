export default {
  body: {
    type: 'object',
    required: ['item'],
    properties: {
      item: { type: 'string' },
    },
    additionalProperties: false,
  },
};
