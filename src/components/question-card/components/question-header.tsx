import {Text, View} from 'react-native';
import {SizeUtils} from '../../../../utils/size-utils';
import React from 'react';
import {COLORS} from '../../../../constants/colors';
export function QuestionHeader({
  header,
  iconbg,
  fontSize,
  iconSize,
}: {
  header: string;
  iconbg: string;
  fontSize: number;
  iconSize: number;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SizeUtils.responsiveWidth(2),
      }}>
      <View
        style={{
          width: SizeUtils.responsiveHeight(iconSize),
          height: SizeUtils.responsiveHeight(iconSize),
          backgroundColor: iconbg,
          borderRadius: 100,
        }}
      />
      <Text
        style={{
          fontSize: SizeUtils.responsiveFontSize(fontSize),
          color: COLORS.textPrimary,
        }}>
        {header?.toUpperCase()}
      </Text>
    </View>
  );
}
