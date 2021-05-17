import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Home from './pages/Home';
import DeviceSetup from './pages/DeviceSetup';
import Meeting from './pages/Meeting';
// import {createMeeting, deleteMeeting, joinMeeting} from './utils/api';
import { ThemeProvider } from 'styled-components';
import { LogLevel } from 'amazon-chime-sdk-js';
import {
  lightTheme,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import AppStateProvider from './providers/AppStateProvider';

const meetingConfig = {
  name: 'SDK_LOGS',
  batchSize: 85,
  intervalMs: 2000,
  url: '/logs',
  logLevel: LogLevel.INFO,
}

const App: React.FC = () => {
  // 疎通確認
  // 
  // useEffect(() => {
  //   const meetingId = 'this-is-first-meeting';
  //   const clientId = 'test-user';

  //   console.log('============= Start meeting');

  //   createMeeting(
  //     meetingId,
  //     clientId  
  //   ).then(result => {
  //     console.log('============= Create')
  //     console.log(result);

  //     joinMeeting(
  //       result.info.meeting.Meeting.MeetingId,
  //       result.info.attendee.Attendee.ExternalUserId
  //     ).then(result => {
  //       console.log('============= Join')
  //       console.log(result);

  //       deleteMeeting(result.info.meeting.Meeting.MeetingId).then(() => {
  //         console.log('============= End meeting');
  //       })
  //     })
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, []);

  return (
    <Router>
      <AppStateProvider>
        <ThemeProvider theme={lightTheme}>
          <MeetingProvider {...meetingConfig}>
            <Switch>
              <Route exact path={routes.HOME} component={Home} />
              <Route path={routes.DEVICE} component={DeviceSetup} />
              <Route path={routes.MEETING} component={Meeting} />
            </Switch>
          </MeetingProvider>      
        </ThemeProvider>
      </AppStateProvider>
    </Router>
  );
}

export default App;
