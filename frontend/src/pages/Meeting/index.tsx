import React from 'react';
import {
  VideoTileGrid,
  UserActivityProvider
} from 'amazon-chime-sdk-component-library-react';
import MeetingDetails from '../../organisms/MeetingDetails';

const Meeting: React.FC = () => {
  return (
    <UserActivityProvider>
      <VideoTileGrid
        className="videos"
        noRemoteVideoView={<MeetingDetails />}
      />
    </UserActivityProvider>
  )
}

export default Meeting;
