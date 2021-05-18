import * as AWS from 'aws-sdk';

const MEETING_TABLE_NAME = process.env.MEETING_TABLE_NAME;
const ATTENDEE_TABLE_NAME = process.env.ATTENDEE_TABLE_NAME;

AWS.config.credentials = new AWS.Credentials(process.env.ACCESS_KEY, process.env.SECRET_KEY, null);
const ddb = new AWS.DynamoDB();
const oneDayFromNow = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

export const getMeeting = async (title) => {
  const result = await ddb.getItem({
    TableName: MEETING_TABLE_NAME,
    Key: {
      'Title': {
        S: title
      },
    },
  }).promise();
  return result.Item ? JSON.parse(result.Item.Data.S) : null;
}

export const putMeeting = async (title, meetingInfo) => {
  await ddb.putItem({
    TableName: MEETING_TABLE_NAME,
    Item: {
      'Title': { S: title },
      'Data': { S: JSON.stringify(meetingInfo) },
      'TTL': {
        N: '' + oneDayFromNow
      }
    }
  }).promise();
}

export const getAttendeeName = async (title, attendeeId) => {
  const result = await ddb.getItem({
    TableName: ATTENDEE_TABLE_NAME,
    Key: {
      'AttendeeId': {
        S: `${title}/${attendeeId}`
      }
    }
  }).promise();

  if (!result.Item) {
    return 'Unknown';
  }
  return result.Item.Name.S;
}

export const putAttendee = async (title, attendeeId, name) => {
  await ddb.putItem({
    TableName: ATTENDEE_TABLE_NAME,
    Item: {
      'AttendeeId': {
        S: `${title}/${attendeeId}`
      },
      'Name': { 
        S: name 
      },
      'TTL': {
        N: '' + oneDayFromNow
      }
    }
  }).promise();
}