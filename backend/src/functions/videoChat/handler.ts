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

const videoChat: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let meeting = undefined;
  let meetingId = event.body.meetingId;
  if (!meetingId) {
    meetingId = uuid();
    meeting = await chime.createMeeting({
      ClientRequestToken: meetingId,
      ExternalMeetingId: meetingId,
      MediaRegion: process.env.AWS_REGION,
    }).promise();
  } else {
    meeting = await chime.getMeeting({
      MeetingId: meetingId,
    }).promise();
  }

  const userId = `${uuid().substring(0, 8)}#${event.body.clientId}`;
  const attendee = await chime.createAttendee({
    MeetingId: meeting.Meeting.MeetingId,
    ExternalUserId: userId,
  }).promise();

  await chime.deleteMeeting({
    MeetingId: meeting.Meeting.MeetingId,
  }).promise();

  return formatJSONResponse({
    info: {
      meeting,
      attendee,
    },
    event,
  });
}

export const main = middyfy(videoChat);
