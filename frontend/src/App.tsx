import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Home from './pages/Home';
import Meeting from './pages/Meeting';
import {createMeeting, deleteMeeting, joinMeeting} from './utils/api';
import { ThemeProvider } from 'styled-components';
import {
  lightTheme,
  MeetingProvider
} from 'amazon-chime-sdk-component-library-react';

function App() {
  useEffect(() => {
    const meetingId = 'thisisfirstmeeting';
    const clientId = 'test-user';

    console.log('============= Start meeting');

    createMeeting(
      meetingId,
      clientId  
    ).then(result => {
      console.log('============= Create')
      console.log(result);

      joinMeeting(
        meetingId,
        clientId
      ).then(result => {
        console.log('============= Join')
        console.log(result);

        deleteMeeting(meetingId).then(() => {
          console.log('============= End meeting');
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }, []);

  return (
    <Router>
      <ThemeProvider theme={lightTheme}>
        <MeetingProvider>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.DEVICE} component={Meeting} />
          <Route exact path={routes.MEETING} component={Meeting} />
        </MeetingProvider>      
      </ThemeProvider>
    </Router>
  );
}

export default App;
