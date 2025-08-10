import ImageEditor from '@react-native-community/image-editor';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const useCommonCameraHooks = () => {
  const initialWidth = 250;
  const initialHeight = 150;
  const x = useSharedValue((Dimensions.get('window').width - initialWidth) / 2);
  const y = useSharedValue(
    (Dimensions.get('window').height - initialHeight) / 2,
  );

  const width = useSharedValue(initialWidth);
  const height = useSharedValue(initialHeight);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);
  const onTakePhotoPressed = async (
    photo: PhotoFile,
    saveAsImage: boolean,
  ): Promise<{croppedImageUri: string; textResult: string}> => {
    try {
      // 1. Take the full photo
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
        return {croppedImageUri: undefined, textResult: undefined};
      }

      console.log('Final crop config:', cropConfig);

      const croppedImageUri = await ImageEditor.cropImage(
        photo.path,
        cropConfig,
      );

      // 6. Recognize text on the cropped image

      const textResult = !saveAsImage
        ? await TextRecognition.recognize(croppedImageUri.uri)
        : undefined;

      return {croppedImageUri, textResult};

      // console.log('Recognition Result:', result.text);
      // navigation.push('scan-result-container', {result, croppedImageUri});
    } catch (e) {
      console.error('Failed to take or process photo', e);
    }
  };
  return {
    width,
    height,
    camera,
    device,
    hasPermission,
    x,
    y,
    onTakePhotoPressed,
  };
};
