import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import ImageEditor from '@react-native-community/image-editor';
import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import {useResizableBoxState} from '../components/resizable-box/resizable-box.hooks';
import {ResizableBox} from '../components/resizable-box/resizable-box';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {CaptureButton} from '../components/capture-button/capture-button';
import {LongPressButton} from '../components/long-press-button/long-press-button';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {PhotolenghtIndicator} from '../components/photo-lenght-indicator/photo-lenght-indicator';
import {ScanningBottomSheet} from '../components/scanning-bottom-sheet/scanning-bottom-sheet';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const initialWidth = 250;
const initialHeight = 150;
export default function ScanningContainer() {
  // Use our custom hook to get the state of the box

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const x = useSharedValue((Dimensions.get('window').width - initialWidth) / 2);
  const y = useSharedValue(
    (Dimensions.get('window').height - initialHeight) / 2,
  );

  const width = useSharedValue(initialWidth);
  const height = useSharedValue(initialHeight);

  const [photoList, setPhotoList] = useState<PhotoFile[]>([]);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const navigation = useNavigation();

  const {hasPermission, requestPermission} = useCameraPermission();
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);
  const onContinue = () => {};
  const onTakePhotoPressed = async () => {
    try {
      // 1. Take the full photo
      const photo = await camera?.current?.takePhoto();
      console.log('Full photo taken:', photo);

      // 2. Get the current on-screen position and size of the box
      const box = {
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
      };

      console.log('Screen box:', box);
      console.log('Photo dimensions:', photo.width, photo.height);
      console.log('Screen dimensions:', screenWidth, screenHeight);
      console.log(
        'photoaspect, screenaspect',
        photo?.height / photo?.width,
        screenWidth / screenHeight,
      );

      // 3. Check orientation
      const isPortraitMode = screenHeight > screenWidth;
      const isPhotoLandscape = photo.width > photo.height;

      let realPhotoWidth, realPhotoHeight;
      if (isPortraitMode && isPhotoLandscape) {
        realPhotoHeight = photo?.width;
        realPhotoWidth = photo?.height;
        // Portrait screen, landscape photo - need coordinate transformation
        console.log(
          'Portrait mode with landscape photo - transforming coordinates',
        );
        // Scale factors
      } else {
        realPhotoHeight = photo?.height;
        realPhotoWidth = photo?.width;
        // No rotation needed - direct mapping
      }

      const scaleX = realPhotoWidth / screenWidth;
      const scaleY = realPhotoHeight / screenHeight;
      // 4. Create crop config with bounds checking
      const photoAspectRatio = realPhotoWidth / realPhotoHeight;
      const screenAspectRatio = screenWidth / screenHeight;
      if (photoAspectRatio > screenAspectRatio) {
        // Photo is wider than screen - there are black bars on left/right
        const visibleWidth = screenHeight * photoAspectRatio;
        console.log('visibleWidth', visibleWidth, screenWidth);
        const offsetX = (visibleWidth - screenWidth) / 4;
        box.x = box.x + offsetX;
        box.width = box.width - offsetX;
      }
      const cropConfig = {
        offset: {
          x: box.x * scaleX,
          y: box.y * scaleY,
        },
        size: {
          width: box.width * scaleX,
          height: box.height * scaleY,
        },
      };

      // 5. Ensure crop dimensions are positive
      if (cropConfig.size.width <= 0 || cropConfig.size.height <= 0) {
        console.error('Invalid crop dimensions:', cropConfig);
        return;
      }

      console.log('Final crop config:', cropConfig);

      const croppedImageUri = await ImageEditor.cropImage(
        photo.path,
        cropConfig,
      );

      // 6. Recognize text on the cropped image
      // const result = await TextRecognition.recognize(croppedImageUri.uri);
      setPhotoList(prev => [...prev, croppedImageUri]);
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
      {/* <Camera
        ref={camera}
        photo={true}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      /> */}
      {/* Our interactive box */}
      <ResizableBox x={x} y={y} width={width} height={height} />
      <CaptureButton onTakePhotoPressed={onTakePhotoPressed} />
      <ScanningBottomSheet photoList={photoList} />
    </View>
  );
}
