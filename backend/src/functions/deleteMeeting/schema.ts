export default {
  type: "object",
  properties: {
    meetingId: { type: 'string' },
  },
  required: ['meetingId'],
} as const;
