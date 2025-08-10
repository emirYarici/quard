import {Text, View} from 'react-native';
import React from 'react';
import {SizeUtils} from '../../../../utils/size-utils';
export function QuestionFooter({
  subSubjectHeader,
  textColor,
  textSize,
}: {
  subSubjectHeader: string;
  textColor: string;
  textSize: number;
}) {
  return (
    <View>
      <Text
        style={{
          fontSize: SizeUtils.responsiveFontSize(textSize),
          color: textColor,
        }}>
        {subSubjectHeader?.toUpperCase()}
      </Text>
    </View>
  );
}
