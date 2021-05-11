export default {
  type: "object",
  properties: {
    meetingId: { type: 'string' },
  },
  require: ['meetingId'],
} as const;
