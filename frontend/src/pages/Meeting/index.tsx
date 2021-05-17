import React from 'react';
import {
  VideoTileGrid,
  UserActivityProvider
} from 'amazon-chime-sdk-component-library-react';
import MeetingDetails from '../../organisms/MeetingDetails';
import { StyledLayout, StyledContent } from './Styled';
import { useNavigation } from '../../providers/NavigationProvider';
import useMeetingEndRedirect from '../../hooks/useMeetingEndRedirect';
import MeetingMetrics from '../../organisms/MeetingMetrics';
import MeetingControls from '../../organisms/MeetingControls';
import NavigationControl from '../../organisms/Navigation/NavigationControl';

const Meeting: React.FC = () => {
  useMeetingEndRedirect();
  const { showNavbar, showRoster } = useNavigation();

  return (
    <UserActivityProvider>
      <StyledLayout showNav={showNavbar} showRoster={showRoster}>
        <StyledContent>
          <MeetingMetrics />
          <VideoTileGrid
            className="videos"
            noRemoteVideoView={<MeetingDetails />}
          />
            <MeetingControls />
        </StyledContent>
        <NavigationControl />
      </StyledLayout>
    </UserActivityProvider>
  )
}

export default Meeting;
