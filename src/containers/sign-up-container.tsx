import {Pressable, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {TextInput} from 'react-native-gesture-handler';
import z, {size} from 'zod';
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
    name: z.string(),
    surname: z.string(),
  });
  const {control, handleSubmit} = useForm({
    defaultValues: {},
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    console.log('Form Data:', data);
    const response = await signUp(
      data.email,
      data.password,
      data.name,
      data.surname,
    );
    console.log('response', response);
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.background,
        flex: 1,
        justifyContent: 'center',
      }}>
      <View
        style={{
          padding: sizes.padding,
          paddingBottom: insets.bottom + SizeUtils.responsiveHeight(100),
          gap: SizeUtils.responsiveHeight(6),
        }}>
        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={{gap: SizeUtils.responsiveHeight(4)}}>
              <Text style={{color: COLORS.textPrimary}}>Email</Text>
              <TextInput
                placeholderTextColor={COLORS.muted}
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                style={{
                  backgroundColor: COLORS.inputBackground,

                  borderRadius: sizes.radius,
                  borderColor: COLORS.muted,
                  padding: sizes.padding / 1.5,
                  color: COLORS.textPrimary,
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </View>
          )}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={{gap: SizeUtils.responsiveHeight(4)}}>
              <Text style={{color: COLORS.textPrimary}}>Şifre</Text>
              <TextInput
                placeholder="Şifre"
                value={value}
                placeholderTextColor={COLORS.muted}
                onChangeText={onChange}
                style={{
                  backgroundColor: COLORS.inputBackground,

                  borderRadius: sizes.radius,
                  borderColor: COLORS.muted,
                  padding: sizes.padding / 1.5,
                  color: COLORS.textPrimary,
                }}
                secureTextEntry
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={{gap: SizeUtils.responsiveHeight(4)}}>
              <Text style={{color: COLORS.textPrimary}}>İsim</Text>
              <TextInput
                placeholder="İsim"
                value={value}
                placeholderTextColor={COLORS.muted}
                onChangeText={onChange}
                style={{
                  backgroundColor: COLORS.inputBackground,

                  borderRadius: sizes.radius,
                  borderColor: COLORS.muted,
                  padding: sizes.padding / 1.5,
                  color: COLORS.textPrimary,
                }}
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="surname"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={{gap: SizeUtils.responsiveHeight(4)}}>
              <Text style={{color: COLORS.textPrimary}}>Soyisim</Text>
              <TextInput
                placeholder="Soyisim"
                placeholderTextColor={COLORS.muted}
                value={value}
                onChangeText={onChange}
                style={{
                  backgroundColor: COLORS.inputBackground,
                  borderRadius: sizes.radius,
                  borderColor: COLORS.muted,
                  padding: sizes.padding / 1.5,
                  color: COLORS.textPrimary,
                }}
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </View>
          )}
        />

        <Pressable
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: sizes.radius,
            padding: sizes.padding,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{color: COLORS.textPrimary, fontWeight: 'bold'}}>
            Signup
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
