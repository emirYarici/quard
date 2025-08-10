import {FlashList} from '@shopify/flash-list';
import {Grid2x2, Dice1} from 'lucide-react-native';
import {memo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {sizes} from '../../../constants/sizes';
import {SizeUtils} from '../../../utils/size-utils';
import {MidSizedQuestionCard} from '../question-card/mid-sized-question-card';
import {SmallSizedQuestionCard} from '../question-card/small-sized-question-card';
import React from 'react';
import {Question} from '../../../types/question.types';
import {useNavigation} from '@react-navigation/native';
export const ScrollableQuestionList = memo(
  ({questions}: {questions: Question[]}) => {
    const [showingStyle, setShowingStyle] = useState('small');
    const navigation = useNavigation();
    const openFilterPage = () => {
      navigation.push('question-filter-container');
    };

    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          gap: sizes.padding,
        }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            flexDirection: 'row-reverse',
            gap: SizeUtils.responsiveWidth(4),
            paddingHorizontal: sizes.padding,
          }}>
          <Pressable
            style={{backgroundColor: COLORS.primary}}
            onPress={openFilterPage}>
            <Text>Filter</Text>
          </Pressable>
          <Pressable onPress={() => setShowingStyle('small')}>
            <Grid2x2 color={COLORS.textPrimary} />
          </Pressable>
          <Pressable onPress={() => setShowingStyle('medium')}>
            <Dice1 color={COLORS.textPrimary} />
          </Pressable>
        </View>
        <FlashList
          extraData={showingStyle}
          data={questions}
          renderItem={({item, index}) =>
            showingStyle === 'small' ? (
              <View
                style={{
                  paddingLeft:
                    index % 2 === 0 ? sizes.padding : sizes.padding / 2,
                  paddingRight:
                    index % 2 !== 0 ? sizes.padding : sizes.padding / 2,

                  paddingBottom: sizes.padding / 2,
                  flex: 1,
                }}>
                <SmallSizedQuestionCard question={item} />
              </View>
            ) : (
              <View
                style={{
                  paddingBottom: sizes.padding,
                  flex: 1,
                  paddingRight: index % 2 !== 0 ? sizes.padding : 0,
                }}>
                <MidSizedQuestionCard question={item} />
              </View>
            )
          }
          estimatedItemSize={200}
          numColumns={showingStyle === 'small' ? 2 : 1}
        />
      </View>
    );
  },
);
