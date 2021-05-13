import React from 'react';
import {
  VideoTileGrid,
  UserActivityProvider
} from 'amazon-chime-sdk-component-library-react';

const Meeting: React.FC = () => {
  return (
    <UserActivityProvider>
      <VideoTileGrid
        className="videos"
      />
    </UserActivityProvider>
  )
}

export default Meeting;
