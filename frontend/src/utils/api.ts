import axios from 'axios';

const BASE_URL = 'https://1ccis2cedd.execute-api.ap-northeast-1.amazonaws.com/dev';

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
    meetingId,
    clientId,
  }
  const headers = {
    'Content-Type': 'application/json', 
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
  const data = {
    meetingId,
    clientId,
  }
  const headers = {
    'Content-Type': 'application/json', 
  }
  const response = await axios.post(`${BASE_URL}/joinMeeting`, data, {
    headers,
  });
  const result = await response.data;

  if (result.error) {
    throw new Error(`Server error: ${result.error}`);
  }

  return result;
}

export async function deleteMeeting (
  meetingId: string,
) {
  const data = {
    meetingId,
  }
  const headers = {
    'Content-Type': 'application/json', 
  }
  const response = await axios.post(`${BASE_URL}/deleteMeeting`, data, {
    headers,
  });
  const result = await response.data;
  
  if (result.error) {
    throw new Error(`Server error: ${result.error}`);
  }

  return result;
}
