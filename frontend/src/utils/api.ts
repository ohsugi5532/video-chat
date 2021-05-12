const BASE_URL = 'https://7m98elidxl.execute-api.ap-northeast-1.amazonaws.com/dev/';

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
  const response = await fetch(
    `${BASE_URL}createMeeting?meetingId=${encodeURIComponent(meetingId)}&clientId=${encodeURIComponent(clientId)}`
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(`Server error: ${data.error}`);
  }

  return data;
}

export async function joinMeeting (
  meetingId: string,
  clientId: string
): Promise<MeetingResponse> {
  const response = await fetch(
    `${BASE_URL}joinMeeting?meetingId=${encodeURIComponent(meetingId)}&clientId=${encodeURIComponent(clientId)}`
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(`Server error: ${data.error}`);
  }

  return data;
}

export async function endMeeting (
  meetingId: string,
) {
  const response = await fetch(
    `${BASE_URL}deleteMeeting?meetingId=${encodeURIComponent(meetingId)}`
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(`Server error: ${data.error}`);
  }
}
