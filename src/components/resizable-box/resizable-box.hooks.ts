import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

export function useResizableBoxState({initialWidth, initialHeight}) {
  const x = useSharedValue((Dimensions.get('window').width - initialWidth) / 2);
  const y = useSharedValue(
    (Dimensions.get('window').height - initialHeight) / 2,
  );
  const width = useSharedValue(initialWidth);
  const height = useSharedValue(initialHeight);
  return {x, y, width, height};
}
