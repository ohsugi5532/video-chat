import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'deleteMeeting',
        request: {
          schemas: {
            'application/json': schema
          }
        },
        cors: {
          origins: '*',
          headers: [
            'Content-Type',
            'Authorization',
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
