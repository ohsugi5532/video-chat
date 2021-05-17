export default {
  type: "object",
  properties: {
    title: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['title', 'name'],
} as const;
