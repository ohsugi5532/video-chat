import React, { useState, ChangeEvent } from "react";
import { useHistory } from 'react-router-dom';
import routes from '../../routes';
import { 
  useMeetingManager,
  FormField,
  Input,
  PrimaryButton,
  SecondaryButton,
} from 'amazon-chime-sdk-component-library-react';
import { createMeeting, joinMeeting } from '../../utils/api';
import { StyledContainer, StyledButtonContainer } from "./Styled";

const Home: React.FC = () => {
  const meetingManager = useMeetingManager();
  const history = useHistory();

  const [meetingId, setMeetingId] = useState<string>('');
  const [clientId, setClientId] = useState<string>('');
  const [meetingIdError, setMeetingIdError] = useState<boolean>(false);
  const [clientIdError, setClientIdError] = useState<boolean>(false);

  const organize = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!meetingId || !clientId) {
      if (!meetingId) setMeetingIdError(true);
      if (!clientId) setClientIdError(true);
      return;
    }

    const data = await createMeeting(meetingId, clientId);
    await meetingManager.join({
      meetingInfo: data.info.meeting,
      attendeeInfo: data.info.meeting,
    });

    history.push(routes.DEVICE);
  }

  const join = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!meetingId || !clientId) {
      if (!meetingId) setMeetingIdError(true);
      if (!clientId) setClientIdError(true);
      return;
    }

    const data = await joinMeeting(meetingId, clientId);
    await meetingManager.join({
      meetingInfo: data.info.meeting,
      attendeeInfo: data.info.meeting,
    });

    history.push(routes.DEVICE);
  }

  return (
    <StyledContainer>
        <form>
          <FormField 
            field={Input} 
            label='Meeting Title' 
            value={meetingId} 
            fieldProps={{name: 'Meeting Title', placeHolder: 'Enter meeting title'}} 
            onChange={(event: ChangeEvent<HTMLInputElement>)=> {
              setMeetingId(event.target.value);
              if (meetingIdError) {
                setMeetingIdError(false);
              }
            }}
            layout='horizontal'
            errorText='Meeting Title MUST be set.'
            error={meetingIdError}
          />
          <FormField 
            field={Input} 
            label='Name' 
            value={clientId} 
            fieldProps={{name: 'Name', placeHolder: 'Enter your name'}} 
            onChange={(event: ChangeEvent<HTMLInputElement>)=> {
              setClientId(event.target.value);
              if (clientIdError) {
                setClientIdError(false);
              }
            }}
            layout='horizontal'
            errorText='Name MUST be set.'
            error={clientIdError}
          />
          <StyledButtonContainer>
            <PrimaryButton label={'Join'} onClick={join}/>
            <SecondaryButton label={'Organize'} onClick={organize}/>
          </StyledButtonContainer>
        </form>
    </StyledContainer>
  );
}

export default Home;