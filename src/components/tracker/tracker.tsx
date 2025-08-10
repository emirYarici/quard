'use client';

import {useNavigation} from '@react-navigation/native';
import type React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {sizes} from '../../../constants/sizes';
import storage from '../../../infra/storage';
import {getIconColor} from '../../../utils/question.utils';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface HabitData {
  [key: string]: number; // date string -> completion count (0-4 levels)
}

const {width} = Dimensions.get('window');
const CELL_SIZE = (width - 60) / 7; // Responsive cell size

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Sample data - replace with your actual data
const sampleHabitData: HabitData = {
  '2024-01-01': 4,
  '2024-01-02': 3,
  '2024-01-03': 2,
  '2024-01-05': 4,
  '2024-01-08': 1,
  '2024-01-10': 4,
  '2024-01-12': 3,
  '2024-01-15': 2,
  '2024-01-18': 4,
  '2024-01-20': 1,
  '2024-01-22': 4,
  '2024-01-25': 3,
  '2024-01-28': 2,
  '2024-01-30': 4,
};

export const HabitTracker: React.FC = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habitData, setHabitData] = useState<HabitData>(sampleHabitData);
  const [questionByDate, setquestionByDate] = useState({});
  const [selectedDay, setSelectedDay] = useState<{
    day: number;
    level: number;
    date: string;
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsData = await storage.getQuestions();
        console.log('questionsdata', questionsData);
        const questionByDate = questionsData.reduce(
          (currentObj, currentValue) => {
            const dateStr = currentValue.dateAdded;
            const date = new Date(dateStr);

            const year = date.getUTCFullYear(); // or date.getFullYear() if you want local time
            const month = date.getUTCMonth(); // 0-indexed: January is 0
            const day = date.getUTCDate(); // 1-31

            const formatted = `${year}-${String(month + 1).padStart(
              2,
              '0',
            )}-${String(day).padStart(2, '0')}`;

            if (
              !currentObj[formatted] ||
              !currentObj[formatted][currentValue.subjectId]
            ) {
              currentObj[formatted] = {
                [currentValue.subjectId]: [currentValue],
              };
            } else if (currentObj[formatted][currentValue.subjectId]) {
              currentObj[formatted][currentValue.subjectId].push(currentValue);
            }
            return currentObj;
          },
          {},
        );

        console.log('emir deneme', questionByDate);
        setquestionByDate(questionByDate);
      } catch (error) {
        console.error('Questions yüklenemedi:', error);
      }
    };
    loadQuestions();
  }, []);

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const lastDayOfPrevMonth = new Date(year, month, 0);
  console.log('lastDayOfPrevMonth', lastDayOfPrevMonth.getDate());
  const daysInMonth = lastDay.getDate();

  const startingDayOfWeek = firstDay.getDay();

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Get intensity level for a date
  const getIntensityLevel = (date: string): number => {
    return habitData[date] || 0;
  };

  // Get color based on intensity
  const getIntensityColor = (level: number): string => {
    switch (level) {
      case 0:
        return '#2A2A2A'; // border color for empty days
      case 1:
        return '#FFD1A3'; // tertiary - lightest habit completion
      case 2:
        return '#FDBA74'; // success - medium habit completion
      case 3:
        return '#FF944D'; // primary - high habit completion
      case 4:
        return '#E67C30'; // primaryPressed - maximum habit completion
      default:
        return '#2A2A2A';
    }
  };

  // Handle day press
  const handleDayPress = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}`;

    navigation.push('day-detail-container', {date: dateString});
    // const currentLevel = getIntensityLevel(dateString);
    // const newLevel = currentLevel >= 4 ? 0 : currentLevel + 1;

    // setHabitData(prev => ({
    //   ...prev,
    //   [dateString]: newLevel,
    // }));
  };

  // Handle day long press for details
  const handleDayLongPress = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}`;
    const level = getIntensityLevel(dateString);
    setSelectedDay({day, level, date: dateString});
  };

  // Calculate stats
  const totalDays = daysInMonth;
  const completedDays = Object.keys(habitData).filter(date => {
    const d = new Date(date);
    return (
      d.getMonth() === month && d.getFullYear() === year && habitData[date] > 0
    );
  }).length;
  const completionRate = Math.round((completedDays / totalDays) * 100);

  // Create calendar grid
  const renderCalendarDays = () => {
    const days = [];
    console.log('starting day of the week', startingDayOfWeek);
    // Add empty cells for days before month starts
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(
        <View key={`empty-${i}`}>
          <View style={[styles.dayCell, {backgroundColor: COLORS.background}]}>
            <Text style={[styles.dayText, {color: COLORS.muted}]}>
              {lastDayOfPrevMonth.getDate() - i}
            </Text>
          </View>
          <View style={{height: 50, width: 10}} />
        </View>,
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(
        2,
        '0',
      )}-${String(day).padStart(2, '0')}`;

      console.log('alov', dateString);
      const level = getIntensityLevel(dateString);
      const isToday =
        new Date().toDateString() === new Date(year, month, day).toDateString();

      days.push(
        <View>
          <TouchableOpacity
            key={day}
            style={[
              styles.dayCell,
              {
                borderColor: isToday ? '#FF944D' : 'transparent', // primary color for today
                borderWidth: isToday ? 2 : 0,
              },
            ]}
            onPress={() => handleDayPress(day)}
            onLongPress={() => handleDayLongPress(day)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.dayText,
                {color: level >= 2 ? '#0D0D0D' : COLORS.muted},
              ]}>
              {day}
            </Text>
          </TouchableOpacity>
          <View style={{height: 30, width: 10}}>
            {questionByDate[dateString] &&
              Object.keys(questionByDate[dateString]).map(subjectKey => {
                return (
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: getIconColor(parseInt(subjectKey))
                        .iconColor,
                      margin: 2,
                      borderRadius: 100,
                    }}
                  />
                );
              })}
          </View>
        </View>,
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={goToPreviousMonth}>
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.monthText}>{year}</Text>

            <Text style={styles.monthText}>{MONTHS[month].toUpperCase()}</Text>
          </View>

          <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar */}
      <View style={styles.calendar}>
        {/* Day labels */}
        <View style={styles.dayLabels}>
          {DAYS.map(day => (
            <View key={day} style={styles.dayLabelCell}>
              <Text style={styles.dayLabelText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>{renderCalendarDays()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface, // background
    borderRadius: sizes.radius,
  },
  header: {
    padding: 20,
    backgroundColor: 'transparent', // surface
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // textPrimary
    textAlign: 'center',
    marginBottom: 16,
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLORS.primary, // inputBackground
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // textPrimary
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // textPrimary
    minWidth: 140,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  statBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B3B3B3', // textSecondary
  },
  calendar: {
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  dayLabels: {
    flexDirection: 'row',
  },
  dayLabelCell: {
    width: CELL_SIZE,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B3B3B3', // textSecondary
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: COLORS.secondarySurface,
    // borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  legendContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    fontSize: 12,
    color: '#B3B3B3', // textSecondary
    marginHorizontal: 8,
  },
  legendColors: {
    flexDirection: 'row',
    gap: 2,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#2A2A2A', // border
  },
  addButton: {
    backgroundColor: '#FF944D', // primary
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF', // textPrimary
    fontSize: 12,
    fontWeight: '600',
  },
  instructions: {
    fontSize: 12,
    color: '#B3B3B3', // textSecondary
    textAlign: 'center',
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // darker overlay for dark theme
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1A1A', // surface
    padding: 24,
    borderRadius: 12,
    margin: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A', // border
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // textPrimary
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#B3B3B3', // textSecondary
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FF944D', // primary
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFFFFF', // textPrimary
    fontSize: 14,
    fontWeight: '600',
  },
});
