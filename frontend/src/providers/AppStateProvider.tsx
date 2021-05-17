import React, { useContext, useState, createContext, ReactNode } from 'react';

type AppStateProviderProps = {
  children: ReactNode;
}

type AppStateValue = {
  meetingId: string,
  localUserName: string;
  setAppMeetingInfo: (meetingId: string, name: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);
const query = new URLSearchParams(location.search);

const AppStateProvider: React.FC<AppStateProviderProps> = props => {
  const [meetingId, setMeeting] = useState(query.get('meetingId') || '');
  const [localUserName, setLocalName] = useState('');

  const setAppMeetingInfo = (
    meetingId: string,
    name: string,
  ) => {
    setMeeting(meetingId);
    setLocalName(name);
  }

  const providerValue: AppStateValue = {
    meetingId,
    localUserName,
    setAppMeetingInfo,
  }
  return (
    <AppStateContext.Provider value={providerValue}>
      {props.children}
    </AppStateContext.Provider>
  )
};

export function useAppState(): AppStateValue {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return state;
}

export default AppStateProvider;