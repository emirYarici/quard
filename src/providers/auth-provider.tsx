import {createContext, useContext, useEffect, useState} from 'react';
import {supabase} from '../../infra/supabase';
import {Session} from '@supabase/supabase-js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  console.log('hellllloooooo', session);

  return (
    <AuthContext.Provider
      value={{
        session,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
