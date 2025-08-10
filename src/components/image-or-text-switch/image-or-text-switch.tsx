import {Switch, View} from 'react-native';
import React from 'react';
import {useScannerStore} from '../../stores/scanner.store';
import {COLORS} from '../../../constants/colors';
import {Image, MessageSquareText} from 'lucide-react-native';
import {sizes} from '../../../constants/sizes';
export function ImageOrTextSwitch() {
  const {toggleSaveAsImage, saveAsImage} = useScannerStore();
  return (
    <View style={{flexDirection: 'row', gap: sizes.padding}}>
      <MessageSquareText />
      <Switch
        trackColor={{
          false: COLORS.inputBackground,
          true: COLORS.inputBackground,
        }}
        thumbColor={saveAsImage ? COLORS.primary : '#f4f3f4'}
        ios_backgroundColor={COLORS.inputBackground}
        onValueChange={() => toggleSaveAsImage()}
        value={saveAsImage}
      />
      <Image />
    </View>
  );
}
