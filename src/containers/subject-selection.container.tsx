import {Text, TouchableOpacity, View} from 'react-native';
import {getSubjectVisuals, subjects} from '../../constants/lessons';
import React from 'react';
import {useScannerStore} from '../stores/scanner.store';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../constants/colors';
import {CommonHeader} from '../components/common-header/common-header';
import {sizes} from '../../constants/sizes';

export default function SubjectSelectionContainer() {
  const {selectSubjectId} = useScannerStore();
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <CommonHeader title="Konu" />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: sizes.padding,
        }}>
        {subjects?.map(subject => {
          const {Icon, iconColor, bgColor} = getSubjectVisuals(subject.value);

          return (
            <TouchableOpacity
              onPress={() => {
                selectSubjectId(subject.id);
                navigation.goBack();
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: '49%',
                aspectRatio: 1, // Makes square items
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: bgColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={subject.id}>
              <Icon size={32} color={iconColor} />
              <Text>{subject.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
