import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import ImageEditor from '@react-native-community/image-editor';

import {ResizableBox} from '../components/resizable-box/resizable-box';

import {CaptureButton} from '../components/capture-button/capture-button';

import BottomSheet from '@gorhom/bottom-sheet';

import {ScanningBottomSheet} from '../components/scanning-bottom-sheet/scanning-bottom-sheet';
import questionStorage from '../../infra/storage';

import {useScannerStore} from '../stores/scanner.store';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {useCommonCameraHooks} from '../hooks/common-camera-hooks';

export default function ScanningContainer({
  route,
}: {
  route: {params: {isSolutionFlow: boolean}};
}) {
  // Use our custom hook to get the state of the box
  const {selectedSubjectId, selectedSubSubjectId, saveAsImage, isTyt} =
    useScannerStore();
  const {
    width,
    height,
    camera,
    device,
    hasPermission,
    x,
    y,
    onTakePhotoPressed,
  } = useCommonCameraHooks();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [photoList, setPhotoList] = useState<PhotoFile[]>([]);

  const navigation = useNavigation();

  const onContinue = () => {};
  const onTakePhotoPressedHandler = async () => {
    try {
      // 1. Take the full photo
      const photo = await camera?.current?.takePhoto();

      const {croppedImageUri, textResult} = await onTakePhotoPressed(
        photo,
        saveAsImage,
      );
      console.log(photo?.path, 'photopath');
      setPhotoList(prev => [...prev, croppedImageUri]);

      questionStorage.saveQuestion(
        saveAsImage ? croppedImageUri : undefined,
        textResult,
        selectedSubjectId,
        selectedSubSubjectId,
        isTyt,
      );
      // console.log('Recognition Result:', result.text);
      // navigation.push('scan-result-container', {result, croppedImageUri});
    } catch (e) {
      console.error('Failed to take or process photo', e);
    }
  };

  if (device == null) return null;

  if (!hasPermission) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'gray',
        flexDirection: 'column',
      }}>
      <Camera
        ref={camera}
        photo={true}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      {/* Our interactive box */}
      <ResizableBox x={x} y={y} width={width} height={height} />
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: 250,
          width: 70,
          height: 70,
        }}>
        <CaptureButton onTakePhotoPressed={onTakePhotoPressedHandler} />
      </View>
      <ScanningBottomSheet photoList={photoList} />
    </View>
  );
}
