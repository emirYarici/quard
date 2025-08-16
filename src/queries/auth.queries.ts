// authService.ts
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {supabase} from '../../infra/supabase';
import {Alert} from 'react-native';

// Email + Password ile Sign Up
export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  try {
    const res = await axios.post('https://trai-backend.onrender.com/signup', {
      email: email,
      password,
      firstName,
      lastName,
    });
    console.log('Sign-up response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Sign-up error:', err.response?.data || err.message);
  }
}

export async function signIn(email, password) {
  try {
    const CLERK_API_BASE = 'https://leading-herring-68.clerk.accounts.dev';
    // Step 1: Create sign-in attempt
    const signInResponse = await axios.post(
      `${CLERK_API_BASE}/client/sign_ins`,
      {
        identifier: email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const signInId = signInResponse.data.id;

    // Step 2: Attempt password verification
    const verifyResponse = await axios.post(
      `${CLERK_API_BASE}/client/sign_ins/${signInId}/attempt_first_factor`,
      {
        strategy: 'password',
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (verifyResponse.data.status === 'complete') {
      const sessionToken = verifyResponse.data.created_session_id;
      const userData = verifyResponse.data.user;

      // Store auth data
      await AsyncStorage.setItem('clerk_session_token', sessionToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));

      this.token = sessionToken;
      this.user = userData;

      return {
        success: true,
        token: sessionToken,
        user: userData,
      };
    } else {
      throw new Error('Sign-in incomplete');
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    throw new Error(
      error.response?.data?.errors?.[0]?.message || 'Sign-in failed',
    );
  }
}

export async function saveSessionToken(token: string) {
  await Keychain.setGenericPassword('session', token);
}

export async function getSessionToken() {
  const creds = await Keychain.getGenericPassword();
  return creds ? creds.password : null;
}

export async function signUpWithEmail(email: string, password: string) {
  const {
    data: {session},
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return error ? error : session;
}

export async function signInWithEmail(email: string, password: string) {
  const {error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) Alert.alert(error.message);
}
