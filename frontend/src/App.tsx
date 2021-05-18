import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Home from './pages/Home';
import DeviceSetup from './pages/DeviceSetup';
import Meeting from './pages/Meeting';
import { ThemeProvider } from 'styled-components';
import { LogLevel } from 'amazon-chime-sdk-js';
import {
  lightTheme,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import Notifications from './organisms/Notifications';
import NoMeetingRedirect from './organisms/NoMeetingRedirect';
import AppStateProvider from './providers/AppStateProvider';
import NavigationProvider from './providers/NavigationProvider';
import ErrorProvider from './providers/ErrorProvider';

const meetingConfig = {
  name: 'SDK_LOGS',
  batchSize: 85,
  intervalMs: 2000,
  url: '/logs',
  logLevel: LogLevel.INFO,
}

const App: React.FC = () => {
  return (
    <Router>
      <AppStateProvider>
        <ThemeProvider theme={lightTheme}>
          <Notifications />
          <ErrorProvider>
            <MeetingProvider {...meetingConfig}>
              <NavigationProvider>
                <Switch>
                  <Route exact path={routes.HOME} component={Home} />
                  <Route path={routes.DEVICE}>
                    <NoMeetingRedirect>
                      <DeviceSetup />
                    </NoMeetingRedirect>
                  </Route>
                  <Route path={routes.MEETING}>
                    <NoMeetingRedirect>
                      <Meeting />
                    </NoMeetingRedirect>
                  </Route>
                </Switch>
              </NavigationProvider>
            </MeetingProvider>    
          </ErrorProvider>
        </ThemeProvider>
      </AppStateProvider>
    </Router>
  );
}

export default App;
