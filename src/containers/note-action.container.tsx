import {useStyle} from '@wb/assets';
import {useSwaAction} from '@wb/hooks';
import {Translations, translate} from '@wb/localization';
import {HalfContainerHeader} from '@wb/ui';
import {FC} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {wrapScrollViewConfigured} from 'react-native-scroll-into-view';
import stylesFn from './SwaAction.container.styles';

import {SwaActionForm} from './components';
export function NoteActionContainer() {
  const insets = useSafeAreaInsets();
  const styles = useStyle(stylesFn, insets.top);
  const {goPreviosPage} = useSwaAction(navigation);
  const params = route.params;
  const onClosePressed = () => {
    goPreviosPage();
  };
  const KeyboardAwareScrollViewWithScroller = wrapScrollViewConfigured({
    refPropName: 'innerRef',
  })(KeyboardAwareScrollView);
  return (
    <KeyboardAwareScrollViewWithScroller
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={styles.mainContainer}
      scrollEnabled={true}
      bounces={false}>
      <View style={styles.innerContainer}>
        <HalfContainerHeader
          label={translate(
            params.isUpdate
              ? Translations.SwaAction.UpdateHeader
              : Translations.SwaAction.AddHeader,
          )}
          onClose={onClosePressed}
        />
        <SwaActionForm
          isUpdate={params.isUpdate}
          navigation={navigation}
          goPreviousPage={goPreviosPage}
        />
      </View>
    </KeyboardAwareScrollViewWithScroller>
  );
}
