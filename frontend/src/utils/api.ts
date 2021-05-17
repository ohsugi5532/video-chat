import axios from 'axios';

const BASE_URL = 'https://1ccis2cedd.execute-api.ap-northeast-1.amazonaws.com/dev';

export type MeetingResponse = {
  info: {
    meetingInfo: any;
    attendeeInfo: any;
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
  title: string,
  name: string
): Promise<MeetingResponse> {
  const data = {
    title,
    name,
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
  title: string,
) {
  const data = {
    title,
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

export function getAttendee (
  title: string
) {
  return async (chimeAttendeeId: string, _externalUserId?: string | undefined) => {
    const response = await axios.get(`${BASE_URL}/getAttendee`, {params: {
      title,
      chimeAttendeeId,
    }});
    const result = await response.data;
  
    if (result.error) {
      throw new Error(`Server error: ${result.error}`);
    }
  
    return {
      name: result.attendeeInfo.name,
    };
  }
};

