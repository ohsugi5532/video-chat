import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import * as AWS from 'aws-sdk';
import {getMeeting} from '../../utils/db';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

const AWS_END_POINT = 'https://service.chime.aws.amazon.com/console';
AWS.config.credentials = new AWS.Credentials(process.env.ACCESS_KEY, process.env.SECRET_KEY, null);
const chime = new AWS.Chime({ region: 'us-east-1' }); // MediaRegionと同じくTOKYOにするとエラーになる
chime.endpoint = new AWS.Endpoint(AWS_END_POINT);  

const deleteMeeting: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const title = event.body.title;
    let meetingInfo = await getMeeting(title);
    await chime.deleteMeeting({
      MeetingId: meetingInfo.Meeting.MeetingId,
    }).promise();
  
    const response = formatJSONResponse({
      event,
    });

    return {
      ...response,
      headers,
    }
  } catch(error) {
    throw new Error(JSON.stringify({
      statusCode: 404, 
      headers,     
      message: error,
      event,
    }));
  }
}

export const main = middyfy(deleteMeeting);
