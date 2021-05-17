import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import * as AWS from 'aws-sdk';
import {v4 as uuid} from 'uuid';
import {getMeeting, putAttendee, putMeeting} from '../../utils/db';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}
const AWS_END_POINT = 'https://service.chime.aws.amazon.com/console';
AWS.config.credentials = new AWS.Credentials(process.env.ACCESS_KEY, process.env.SECRET_KEY, null);
const chime = new AWS.Chime({ region: 'us-east-1' }); // MediaRegionと同じくTOKYOにするとエラーになる
chime.endpoint = new AWS.Endpoint(AWS_END_POINT);  

const joinMeeting: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const title = event.body.title;
  const name = event.body.name;

  try {

    let meetingInfo = await getMeeting(title);
    const meetingId = uuid();
    if (!meetingInfo) {
      meetingInfo = await chime.createMeeting({
        ClientRequestToken: meetingId,
        ExternalMeetingId: meetingId,
        MediaRegion: process.env.AWS_REGION,
      })
      await putMeeting(title, meetingInfo);
    }

    const attendeeInfo = await chime.createAttendee({
      MeetingId: meetingInfo.Meeting.MeetingId,
      ExternalUserId: uuid(),
    }).promise();
    putAttendee(title, attendeeInfo.Attendee.AttendeeId, name);
  
    const response = formatJSONResponse({
      info: {
        meetingInfo,
        attendeeInfo,
      },
      event,
    });

    return {
      ...response,
      headers,
    }
  } catch (error) {
    throw new Error(JSON.stringify({
      statusCode: 404,    
      headers,  
      message: error,
      event,
    }));
  }
}

export const main = middyfy(joinMeeting);
