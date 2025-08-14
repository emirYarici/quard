import {Pressable, Text, View} from 'react-native';
import {SizeUtils} from '../../../utils/size-utils';
import {useQuestionFilterStore} from '../../stores/filter.store';
import {sizes} from '../../../constants/sizes';
import {Check} from 'lucide-react-native';
import {COLORS} from '../../../constants/colors';
import {size} from 'zod';

export const HasSolutionComponent = () => {
  const {toggleHasSolution, hasSolution} = useQuestionFilterStore();
  return (
    <Pressable
      onPress={toggleHasSolution}
      style={{
        flexDirection: 'row',
        gap: SizeUtils.responsiveWidth(10),
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: sizes.padding / 3,
          borderRadius: sizes.radius,
          borderWidth: 1,
          backgroundColor: hasSolution ? COLORS.primary : 'transparent',
          borderColor: COLORS.primary,
        }}>
        <Check
          size={15}
          color={COLORS.textPrimary}
          opacity={hasSolution ? 1 : 0}
        />
      </View>
      <Text style={{color: COLORS.textPrimary}}>
        Cevap Fotoğrafları olanlar
      </Text>
    </Pressable>
  );
};
