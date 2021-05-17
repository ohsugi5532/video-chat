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
import Navigation from '../../organisms/Navigation';
import MeetingRoster from '../../organisms/MeetingRoster';

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
        </StyledContent>
        {showNavbar ? <Navigation /> : null}
        {showRoster ? <MeetingRoster /> : null}
      </StyledLayout>
    </UserActivityProvider>
  )
}

export default Meeting;
