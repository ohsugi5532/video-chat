import React from "react";
// import { useHistory } from 'react-router-dom';
// import routes from '../../routes';
// import { 
//   useMeetingManager,
//   FormField,
//   Input,
//   PrimaryButton,
//   SecondaryButton,
// } from 'amazon-chime-sdk-component-library-react';
// import { createMeeting, joinMeeting } from '../../utils/api';
// import { StyledContainer, StyledButtonContainer } from "./Styled";
// import { useAppState } from "../../providers/AppStateProvider";

import MeetingFormSelector from "../../organisms/MeetingFormSelector";
import { StyledLayout } from './Styled';
import { VersionLabel } from '../../utils/VersionLabel';

const Home: React.FC = () => {
  return (
    <StyledLayout>
      <MeetingFormSelector />
      <VersionLabel />
    </StyledLayout>
  )
  // const meetingManager = useMeetingManager();
  // const history = useHistory();
  // const { setAppMeetingInfo } = useAppState();

  // const [meetingId, setMeetingId] = useState<string>('');
  // const [clientId, setClientId] = useState<string>('');
  // const [meetingIdError, setMeetingIdError] = useState<boolean>(false);
  // const [clientIdError, setClientIdError] = useState<boolean>(false);

  // const organize = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const id = meetingId.trim().toLocaleLowerCase();
  //   const attendeeName = clientId.trim();

  //   if (!id || !attendeeName) {
  //     if (!id) setMeetingIdError(true);
  //     if (!attendeeName) setClientIdError(true);
  //     return;
  //   }

  //   const result1 = await createMeeting(id, attendeeName);
  //   const result2 = await joinMeeting(
  //     result1.info.meeting.Meeting.MeetingId, 
  //     result1.info.attendee.Attendee.ExternalUserId
  //   );

  //   await meetingManager.join({
  //     meetingInfo: result2.info.meeting.Meeting,
  //     attendeeInfo: result2.info.attendee.Attendee,
  //   });

  //   setAppMeetingInfo(id, attendeeName);
  //   history.push(routes.DEVICE);
  // }

  // const join = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const id = meetingId.trim().toLocaleLowerCase();
  //   const attendeeName = clientId.trim();

  //   if (!id || !attendeeName) {
  //     if (!id) setMeetingIdError(true);
  //     if (!attendeeName) setClientIdError(true);
  //     return;
  //   }

  //   const data = await joinMeeting(id, attendeeName);
  //   await meetingManager.join({
  //     meetingInfo: data.info.meeting,
  //     attendeeInfo: data.info.meeting,
  //   });

  //   setAppMeetingInfo(id, attendeeName);
  //   history.push(routes.DEVICE);
  // }

  // return (
  //   <StyledContainer>
  //       <form>
  //         <FormField 
  //           field={Input} 
  //           label='Meeting Title' 
  //           value={meetingId} 
  //           fieldProps={{name: 'Meeting Title', placeHolder: 'Enter meeting title'}} 
  //           onChange={(event: ChangeEvent<HTMLInputElement>)=> {
  //             setMeetingId(event.target.value);
  //             if (meetingIdError) {
  //               setMeetingIdError(false);
  //             }
  //           }}
  //           layout='horizontal'
  //           errorText='Meeting Title MUST be set.'
  //           error={meetingIdError}
  //         />
  //         <FormField 
  //           field={Input} 
  //           label='Name' 
  //           value={clientId} 
  //           fieldProps={{name: 'Name', placeHolder: 'Enter your name'}} 
  //           onChange={(event: ChangeEvent<HTMLInputElement>)=> {
  //             setClientId(event.target.value);
  //             if (clientIdError) {
  //               setClientIdError(false);
  //             }
  //           }}
  //           layout='horizontal'
  //           errorText='Name MUST be set.'
  //           error={clientIdError}
  //         />
  //         <StyledButtonContainer>
  //           <PrimaryButton label={'Join'} onClick={join}/>
  //           <SecondaryButton label={'Organize'} onClick={organize}/>
  //         </StyledButtonContainer>
  //       </form>
  //   </StyledContainer>
  // );
}

export default Home;