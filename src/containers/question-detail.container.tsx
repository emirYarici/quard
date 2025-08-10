import {Image, Pressable, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Question} from '../../types/question.types';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {sizes} from '../../constants/sizes';
import {useNavigation} from '@react-navigation/native';
import {Rotate3D} from 'lucide-react-native';
export function QuestionDetailContainer({
  route,
}: {
  route: {params: {question: Question}};
}) {
  console.log('emir deneme', route);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: insets.top + sizes.padding,
      }}>
      <View style={{width: '100%', aspectRatio: 1.5}}>
        {route.params.question.imagePath ? (
          <Image
            style={{flex: 1}}
            source={{
              uri: route.params.question.imagePath,
            }}
          />
        ) : (
          <View style={{flex: 1}}>
            <Text numberOfLines={3}>{route.params.question?.ocrText.text}</Text>
          </View>
        )}
        <Image
          style={{flex: 1}}
          source={{
            uri: route.params.question.solutionImagepath,
          }}
        />
      </View>
      <Pressable
        onPress={() =>
          navigation.push('solution-scanning-container', {
            question: route.params.question,
          })
        }>
        <Text style={{color: COLORS.textPrimary}}>
          Cevabının fotoğrafını çek
        </Text>
      </Pressable>
    </View>
  );
}
