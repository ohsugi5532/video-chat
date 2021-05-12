import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';

import * as AWS from 'aws-sdk';
import {v4 as uuid} from 'uuid';

const AWS_END_POINT = 'https://service.chime.aws.amazon.com/console';
AWS.config.credentials = new AWS.Credentials(process.env.ACCESS_KEY, process.env.SECRET_KEY, null);
const chime = new AWS.Chime({ region: 'us-east-1' }); // MediaRegionと同じくTOKYOにするとエラーになる
chime.endpoint = new AWS.Endpoint(AWS_END_POINT);  

const joinMeeting: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const meetingId = event.body.meetingId;
  const clientId = event.body.clientId;

  try {
    const meeting = await chime.getMeeting({
      MeetingId: meetingId,
    }).promise();
  
    const attendee = await chime.createAttendee({
      MeetingId: meeting.Meeting.MeetingId,
      ExternalUserId: `${uuid().substring(0, 8)}#${clientId}`,
    }).promise();
  
    return formatJSONResponse({
      info: {
        meeting,
        attendee,
      },
      event,
    });    
  } catch (error) {
    throw new Error(JSON.stringify({
      statusCode: 404,      
      message: error,
      event,
    }));
  }
}

export const main = middyfy(joinMeeting);
