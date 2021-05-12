export default {
  type: "object",
  properties: {
    meetingId: { type: 'string' },
    clientId: { type: 'string' },
  },
  required: ['meetingId', 'clientId'],
} as const;
