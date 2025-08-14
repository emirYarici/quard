// authService.ts
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {supabase} from '../../infra/supabase';
import {Alert} from 'react-native';

const PUBLISHABLE_KEY =
  'pk_test_bGVhZGluZy1oZXJyaW5nLTY4LmNsZXJrLmFjY291bnRzLmRldiQ';
const CLERK_FRONTEND_API =
  'https://leading-herring-68.clerk.accounts.dev/v1/client';

// Email + Password ile Sign Up
export async function signUp(email: string, password: string) {
  try {
    const res = await axios.post(
      `${CLERK_FRONTEND_API}/sign_ups`,
      {
        email_address: [email],
        password,
        first_name: 'Emir',
        last_name: 'Yarıcı',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Clerk-Publishable-Key': PUBLISHABLE_KEY,
        },
      },
    );
    console.log('Sign-up response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Sign-up error:', err.response?.data || err.message);
  }
}

// Email + Password ile Sign In
export async function signIn(email: string, password: string) {
  const res = await axios.post(
    `${CLERK_FRONTEND_API}/v1/client/sign_ins`,
    {
      identifier: email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${CLERK_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return res.data;
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
