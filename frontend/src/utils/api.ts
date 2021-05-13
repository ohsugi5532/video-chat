import axios from 'axios';

const BASE_URL = 'https://7m98elidxl.execute-api.ap-northeast-1.amazonaws.com/dev';

export type MeetingResponse = {
  info: {
    meeting: any;
    attendee: any;
  }
}

export async function createMeeting (
  meetingId: string,
  clientId: string
): Promise<MeetingResponse> {
  const data = {
    'body': {
      'meetinId': meetingId,
      'clientId': clientId,
    }
  }
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
  const response = await axios.post(`${BASE_URL}/createMeeting`, data, {
    headers,
  });
  const result = await response.data;

  if (result.error) {
    throw new Error(`Server error: ${result.error}`);
  }

  return result;
}

export async function joinMeeting (
  meetingId: string,
  clientId: string
): Promise<MeetingResponse> {
  const body = {
    'meetinId': meetingId,
    'clientId': clientId,
  }
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
  const response = await fetch(
    `${BASE_URL}/joinMeeting`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(`Server error: ${data.error}`);
  }

  return data;
}

export async function deleteMeeting (
  meetingId: string,
) {
  const body = {
    'meetingId': meetingId,
  }
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
  const response = await fetch(
    `${BASE_URL}/deleteMeeting`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(`Server error: ${data.error}`);
  }
}
