export default {
  type: "object",
  properties: {
    clientId: { type: 'string' },
  },
  require: ['clientId'],
} as const;
