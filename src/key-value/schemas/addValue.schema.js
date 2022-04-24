export default {
  body: {
    type: 'object',
    required: ['key', 'value'],
    properties: {
      key: { type: 'string' },
      value: { type: 'string' },
      ttl: { type: 'number', minimum: 1 },
    },
    additionalProperties: false,
  },
};
