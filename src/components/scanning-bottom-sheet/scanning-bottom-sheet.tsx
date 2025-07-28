import React, {useCallback, useMemo, useRef} from 'react';
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
export const ScanningBottomSheet = ({photoList}: {photoList: any[]}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['8%', '25%'], []);
  // variables
  const sections = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => ({
          title: `Section ${index}`,
          data: Array(10)
            .fill(0)
            .map((_, index) => `Item ${index}`),
        })),
    [],
  );

  const onContinue = () => {};
  // renders
  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props} bottomInset={24}></BottomSheetFooter>
    ),
    [],
  );
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      index={1}
      onChange={handleSheetChange}
      footerComponent={renderFooter}
      backgroundStyle={{backgroundColor: COLORS.surface}}
      handleIndicatorStyle={{backgroundColor: COLORS.primary}}>
      <BottomSheetView style={styles.contentContainer}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: 'col',
            paddingVertical: 20,
            paddingHorizontal: 20,
            height: '100%',
          }}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <SubjectSelector />
            <ImageOrTextSwitch />
            <SubSubjectSelector />
          </View>

          <View
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
          </View>
        </View>
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
