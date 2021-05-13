import React, { useRef, useState } from "react";
import styled from 'styled-components';
import {
  Heading,
  MicSelection,
  Label,
  SpeakerSelection,
  SecondaryButton,
  CameraSelection,
  QualitySelection,
  PreviewVideo,
  useLocalAudioInputActivityPreview,
  useAudioOutputs,
} from 'amazon-chime-sdk-component-library-react';
import TestSound from './TestSound';
import{ StyledContainer, StyledPanel } from './Styled';

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
  const activityBarRef = useRef<HTMLDivElement>(null);
  useLocalAudioInputActivityPreview(activityBarRef);

  const { selectedDevice } = useAudioOutputs();
  const [selectedOutput, setSelectedOutput] = useState(selectedDevice);

  const handleChange = (deviceId: string): void => {
    setSelectedOutput(deviceId);
  };

  const handleTestSpeaker = () => {
    new TestSound(selectedOutput);
  };

  return (
    <StyledContainer>
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
        <SpeakerSelection onChange={handleChange} />
        <SecondaryButton label="Test speakers" onClick={handleTestSpeaker} />
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
    </StyledContainer>
  )
};

export default DeviceSetup;
