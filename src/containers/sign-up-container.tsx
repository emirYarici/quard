import {Pressable, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {TextInput} from 'react-native-gesture-handler';
import z from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {sizes} from '../../constants/sizes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SizeUtils} from '../../utils/size-utils';
import {signUp, signUpWithEmail} from '../queries/auth.queries';
export function SignupContainer() {
  const insets = useSafeAreaInsets();
  const schema = z.object({
    email: z.email(),
    password: z.string(),
  });
  const {control, handleSubmit} = useForm({
    defaultValues: {},
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    console.log('Form Data:', data);
    const response = await signUpWithEmail(data.email, data.password);
    console.log('response', response);
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.background,
        flex: 1,
        flexDirection: 'column-reverse',
      }}>
      <View
        style={{
          backgroundColor: COLORS.secondarySurface,
          padding: sizes.padding,
          paddingBottom: insets.bottom + SizeUtils.responsiveHeight(100),
        }}>
        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                style={{borderWidth: 1, marginBottom: 8, padding: 8}}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </>
          )}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                style={{borderWidth: 1, marginBottom: 8, padding: 8}}
                secureTextEntry
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </>
          )}
        />

        <Pressable onPress={handleSubmit(onSubmit)}>
          <Text>Signup</Text>
        </Pressable>
      </View>
    </View>
  );
}
