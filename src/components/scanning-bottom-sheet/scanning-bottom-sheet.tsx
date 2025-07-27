import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Pressable} from 'react-native-gesture-handler';
import {PhotolenghtIndicator} from '../photo-lenght-indicator/photo-lenght-indicator';
import {LongPressButton} from '../long-press-button/long-press-button';
export const ScanningBottomSheet = ({photoList}: {photoList: any[]}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['8%', '30%'], []);
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
      index={0}
      onChange={handleSheetChange}
      footerComponent={renderFooter}>
      <BottomSheetView style={styles.contentContainer}>
        <View
          style={{
            width: '100%',
            flexDirection: 'col',

            paddingVertical: 20,
            height: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <PhotolenghtIndicator photoLenght={photoList.length} />
            <LongPressButton onPress={onContinue} />

            <View
              style={{
                paddingVertical: 30,
                paddingHorizontal: 20,
                backgroundColor: 'orange',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
              }}></View>
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
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'gray',
    alignItems: 'center',
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
