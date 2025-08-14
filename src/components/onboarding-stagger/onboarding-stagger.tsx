import {Stagger} from '@animatereactnative/stagger';
import {sizes} from '../../../constants/sizes';
import React from 'react';
import {Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {size} from 'zod';
export function OnboardingStagger() {
  return (
    <Stagger
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: sizes.padding,
        gap: 10,
      }}
      initialEnteringDelay={200}
      stagger={500}
      duration={300}>
      <View
        style={{
          width: '100%',
          backgroundColor: COLORS.primary,
          borderRadius: sizes.radius,
          padding: sizes.padding,
        }}>
        <Text>Aklına takılan sorular aklında kalmasın!</Text>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: COLORS.primary,
          borderRadius: sizes.radius,
          padding: sizes.padding,
        }}>
        <Text>Analiz et, sor, kaydet</Text>
      </View>
    </Stagger>
  );
}
