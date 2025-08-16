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
import {signInWithEmail} from '../queries/auth.queries';
export function LoginContainer() {
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
    await signInWithEmail(data.email, data.password);
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
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: SizeUtils.responsiveWidth(16),
            width: SizeUtils.responsiveWidth(16),
            borderRadius: sizes.radius,
          }}
        />
        <Text style={{color: COLORS.textPrimary}}>QUARD</Text>
      </View>
      <View
        style={{
          padding: sizes.padding,
          borderTopLeftRadius: sizes.radius,
          borderTopRightRadius: sizes.radius,
          paddingBottom: insets.bottom + SizeUtils.responsiveHeight(100),
          gap: SizeUtils.responsiveHeight(20),
        }}>
        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={{gap: SizeUtils.responsiveHeight(4)}}>
              <Text style={{color: COLORS.textPrimary}}>Email</Text>
              <TextInput
                placeholder="a@b.com"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={COLORS.muted}
                style={{
                  borderRadius: sizes.radius,
                  borderColor: COLORS.muted,
                  backgroundColor: COLORS.inputBackground,
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
                placeholder="*****"
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

        <Pressable
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: sizes.padding,
            backgroundColor: COLORS.primary,
            borderRadius: sizes.radius,
          }}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{fontWeight: 'bold', color: COLORS.textPrimary}}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
