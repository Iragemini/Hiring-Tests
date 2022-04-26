export default {
  params: {
    type: 'object',
    required: ['key'],
    properties: {
      key: { type: 'string' },
    },
    additionalProperties: false,
  },
};
