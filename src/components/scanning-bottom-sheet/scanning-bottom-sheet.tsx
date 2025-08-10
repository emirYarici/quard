import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Pressable} from 'react-native-gesture-handler';
import {PhotolenghtIndicator} from '../photo-lenght-indicator/photo-lenght-indicator';
import {LongPressButton} from '../long-press-button/long-press-button';
import {SubjectSelector} from '../subject-selector/subject-selector';
import SubSubjectSelectionContainer from '../../containers/subSubject-selection.container';
import {SubSubjectSelector} from '../sub-subject-selector/sub-subject-selector';
import {ImageOrTextSwitch} from '../image-or-text-switch/image-or-text-switch';
import {COLORS} from '../../../constants/colors';
import {TytAytSelector} from '../tyt-ayt-selector/tyt-ayt-selector';
import {SizeUtils} from '../../../utils/size-utils';
import {sizes} from '../../../constants/sizes';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedView} from 'react-native-reanimated/lib/typescript/component/View';
export const ScanningBottomSheet = ({photoList}: {photoList: any[]}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['15%', '35%'], []);
  const bottomSheetIndex = useSharedValue(1);
  // variables

  const onContinue = () => {};
  // renders

  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
    bottomSheetIndex.value = withTiming(index, {duration: 200});
  }, []);
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const animatedStylez = useAnimatedStyle(() => ({
    opacity: interpolate(bottomSheetIndex.value, [0, 1], [0, 1]),
  }));
  const animatedStylezFooter = useAnimatedStyle(() => ({
    opacity: interpolate(bottomSheetIndex.value, [0, 1], [1, 0]),
  }));
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      index={1}
      // onChange={handleSheetChange}
      backgroundStyle={{backgroundColor: COLORS.surface}}
      handleIndicatorStyle={{backgroundColor: COLORS.primary}}
      animatedIndex={bottomSheetIndex}>
      <BottomSheetView style={styles.contentContainer}>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              position: 'absolute',
              // justifyContent: 'space-between',
              width: '100%',
              gap: SizeUtils.responsiveHeight(20),
              flexDirection: 'column',
              paddingVertical: 20,
              paddingHorizontal: 20,
              height: '100%',
            },
            animatedStylez,
          ]}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageOrTextSwitch />
          </View>
          <TytAytSelector />

          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: SizeUtils.responsiveHeight(40),
              gap: sizes.padding,
            }}>
            <SubjectSelector />
            <SubSubjectSelector />
          </View>

          {/* <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <PhotolenghtIndicator photoLenght={photoList.length} />
            <LongPressButton onPress={onContinue} />

            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                paddingVertical: 30,
                paddingHorizontal: 20,
                backgroundColor: 'orange',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
              }}
            />
          </View> */}
        </Animated.View>

        <Animated.View
          style={[
            {
              width: '100%',
              height: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            },
            animatedStylezFooter,
          ]}>
          <Text>Select</Text>
        </Animated.View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.surface,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingBottom: 20,
  },
  footerContainer: {
    borderRadius: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontWeight: '800',
    fontSize: 17,
  },
});
