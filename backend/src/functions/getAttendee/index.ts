import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'getAttendee',
        cors: {
          origins: '*',
          headers: [
            'Content-Type',
            'Authorization',
            'Access-Control-Allow-Origin',
            'X-Api-Key',
            'X-Amz-Date',
            'X-Amz-Security-Token',
            'X-Amz-User-Agent',
          ]
        }
      }
    }
  ]
}
