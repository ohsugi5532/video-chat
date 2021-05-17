import 'source-map-support/register';
import type { APIGatewayProxyEvent } from "aws-lambda"
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import {getAttendeeName} from '../../utils/db';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

const AWS_END_POINT = 'https://service.chime.aws.amazon.com/console';
AWS.config.credentials = new AWS.Credentials(process.env.ACCESS_KEY, process.env.SECRET_KEY, null);
const chime = new AWS.Chime({ region: 'us-east-1' }); // MediaRegionと同じくTOKYOにするとエラーになる
chime.endpoint = new AWS.Endpoint(AWS_END_POINT);  

const getAttendee = async (event: APIGatewayProxyEvent) => {
  try {
    const title = event.queryStringParameters.title;
    const attendeeId = event.queryStringParameters.attendeeId;

    const name = await getAttendeeName(title, attendeeId);
  
    const response = formatJSONResponse({
      attendeeInfo: {
        attendeeId,
        name,
      },
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

export const main = middyfy(getAttendee);
