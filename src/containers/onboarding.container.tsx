import {Button, Pressable, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {OnboardingStagger} from '../components/onboarding-stagger/onboarding-stagger';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-gesture-handler';
import {size} from 'zod';
import {sizes} from '../../constants/sizes';
import {SizeUtils} from '../../utils/size-utils';
import {useNavigation} from '@react-navigation/native';
export function OnboardingContainer() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <OnboardingStagger />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: COLORS.textPrimary,
            textAlign: 'center',
          }}>
          Hedef soruları kaçırma
        </Text>
        <Text style={{fontSize: 14, color: COLORS.muted, textAlign: 'center'}}>
          Aklında kalan sorulara tekrardan dön
        </Text>

        <View style={{flex: 0.2, padding: sizes.padding, gap: 10}}>
          <TouchableOpacity
            style={{
              marginTop: 10,
              width: '100%',
              borderRadius: 10,
              backgroundColor: COLORS.primary,
              padding: sizes.padding * 1.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '500'}}>Haydi Başla</Text>
          </TouchableOpacity>
          <Pressable
            style={{
              flexDirection: 'row',
              gap: SizeUtils.responsiveWidth(4),
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.push('login-container');
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.textPrimary,
                fontWeight: '500',
              }}>
              Zaten bir hesabın var mı?
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.primary,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Giriş yap
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
