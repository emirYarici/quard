import {StyleSheet, View} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {useCommonCameraHooks} from '../hooks/common-camera-hooks';
import {CaptureButton} from '../components/capture-button/capture-button';
import {ResizableBox} from '../components/resizable-box/resizable-box';
import React from 'react';
import questionStorage from '../../infra/storage';
import {Question} from '../../types/question.types';
export const SolutionScanningContainer = ({
  route,
}: {
  route: {params: {question: Question}};
}) => {
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
  if (!hasPermission || !device) return null;
  const onTakePhotoPressedHandler = async () => {
    try {
      // 1. Take the full photo
      const photo = await camera?.current?.takePhoto();
      const {croppedImageUri, textResult} = await onTakePhotoPressed(
        photo,
        true,
      );

      questionStorage.addSolutionImageToQuestion(
        croppedImageUri,
        route.params.question,
      );
      // console.log('Recognition Result:', result.text);
      // navigation.push('scan-result-container', {result, croppedImageUri});
    } catch (e) {
      console.error('Failed to take or process photo', e);
    }
  };
  return (
    <View
      style={{
        flex: 1,
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
          bottom: 100,
          width: 70,
          height: 70,
        }}>
        <CaptureButton onTakePhotoPressed={onTakePhotoPressedHandler} />
      </View>
    </View>
  );
};
