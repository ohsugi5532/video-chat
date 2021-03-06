import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import routes from '../../routes';
import styled from 'styled-components';
import {
  Heading,
  MicSelection,
  Label,
  SpeakerSelection,
  PrimaryButton,
  SecondaryButton,
  CameraSelection,
  QualitySelection,
  PreviewVideo,
  useLocalAudioInputActivityPreview,
  useAudioOutputs,
  useMeetingManager,
  Modal,
  ModalBody,
  ModalHeader
} from 'amazon-chime-sdk-component-library-react';
import TestSound from '../../utils/TestSound';
import{ StyledContainer, StyledDiv, StyledPanel } from './Styled';
import Card from "../../molecules/Card";
import { useAppState } from "../../providers/AppStateProvider";


const Track = styled.div`
  width: 100%;
  height: 0.625rem;
  background-color: #ecf0f1;
  border-radius: 0.25rem;
`;

const Progress = styled.div`
  height: 0.625rem;
  background-color: #18bc9c;
  border-radius: 0.25rem;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 33ms ease-in-out;
  will-change: transform;
`;

const DeviceSetup: React.FC = () => {
  const history = useHistory();
  const meetingManager = useMeetingManager();
  const { meetingId } = useAppState();

  const activityBarRef = useRef<HTMLDivElement>(null);
  useLocalAudioInputActivityPreview(activityBarRef);

  const { selectedDevice } = useAudioOutputs();
  const [selectedOutput, setSelectedOutput] = useState(selectedDevice);
  const [error, setError] = useState('');

  const handleChange = (deviceId: string): void => {
    setSelectedOutput(deviceId);
  };

  const handleTestSpeaker = () => {
    new TestSound(selectedOutput);
  };

  const enterMeeting = async () => {
    try {
      await meetingManager.start();
      history.push(`${routes.MEETING}/${meetingId}`);
    } catch(err) {
      setError(err.message);
    }
  }

  return (
    <>
      <StyledContainer>
        <StyledDiv>
          <StyledPanel>
            <Heading tag="h2" level={6}>
              Audio
            </Heading>
            <MicSelection />
            <Label style={{ display: 'block', marginBottom: '.5rem' }}>
              Microphone activity
            </Label>
            <Track>
              <Progress ref={activityBarRef} />
            </Track>
            <div style={{ marginTop: '1rem' }}>
              <SpeakerSelection onChange={handleChange} />
              <SecondaryButton label="Test speakers" onClick={handleTestSpeaker} />
            </div>
          </StyledPanel>
          <StyledPanel>
            <Heading tag="h2" level={6}>
              Video
            </Heading>
            <CameraSelection />
            <QualitySelection />
            <Label style={{ display: 'block', marginBottom: '.5rem' }}>
              Video preview
            </Label>
            <PreviewVideo />
          </StyledPanel>
        </StyledDiv>
        <PrimaryButton label={'Enter'} onClick={enterMeeting} />
      </StyledContainer>
      {error && (
        <Modal size="md" onClose={(): void => setError('')}>
          <ModalHeader title={`Meeting ID: ${meetingId}`} />
          <ModalBody>
            <Card
              title="Unable to join meeting"
              description="There was an issue in joining this meeting. Check your connectivity and try again."
              smallText={error}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  )
};

export default DeviceSetup;
