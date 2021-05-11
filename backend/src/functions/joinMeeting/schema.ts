export default {
  type: "object",
  properties: {
    meetingId: { type: 'string' },
    clientId: { type: 'string' },
  },
  require: ['meetingId', 'clientId'],
} as const;
