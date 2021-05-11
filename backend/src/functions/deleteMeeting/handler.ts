import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';

import * as AWS from 'aws-sdk';

const AWS_END_POINT = 'https://service.chime.aws.amazon.com/console';
AWS.config.credentials = new AWS.Credentials(process.env.ACCESS_KEY, process.env.SECRET_KEY, null);
const chime = new AWS.Chime({ region: 'us-east-1' }); // MediaRegionと同じくTOKYOにするとエラーになる
chime.endpoint = new AWS.Endpoint(AWS_END_POINT);  

const deleteMeeting: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const meetingId = event.body.meetingId;
    await chime.deleteMeeting({
      MeetingId: meetingId,
    }).promise();
  
    return formatJSONResponse({
      event,
    });
  } catch(error) {
    throw new Error(JSON.stringify({
      statusCode: 404,      
      message: error,
      event,
    }));
  }
}

export const main = middyfy(deleteMeeting);
