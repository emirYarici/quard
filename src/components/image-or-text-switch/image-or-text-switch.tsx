import {Switch} from 'react-native';
import React from 'react';
import {useScannerStore} from '../../stores/scanner.store';
import {COLORS} from '../../../constants/colors';
export function ImageOrTextSwitch() {
  const {toggleSaveAsImage, saveAsImage} = useScannerStore();
  return (
    <Switch
      trackColor={{false: COLORS.inputBackground, true: COLORS.inputBackground}}
      thumbColor={saveAsImage ? COLORS.primary : '#f4f3f4'}
      ios_backgroundColor={COLORS.inputBackground}
      onValueChange={() => toggleSaveAsImage()}
      value={saveAsImage}
    />
  );
}
