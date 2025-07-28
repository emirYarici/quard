'use client';

import {useNavigation} from '@react-navigation/native';
import type React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';

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
  const [selectedDay, setSelectedDay] = useState<{
    day: number;
    level: number;
    date: string;
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
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
    const currentLevel = getIntensityLevel(dateString);
    const newLevel = currentLevel >= 4 ? 0 : currentLevel + 1;

    setHabitData(prev => ({
      ...prev,
      [dateString]: newLevel,
    }));
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

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <View
          key={`empty-${i}`}
          style={[styles.dayCell, {backgroundColor: 'transparent'}]}
        />,
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(
        2,
        '0',
      )}-${String(day).padStart(2, '0')}`;
      const level = getIntensityLevel(dateString);
      const isToday =
        new Date().toDateString() === new Date(year, month, day).toDateString();

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            {
              backgroundColor: getIntensityColor(level),
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
              {color: level >= 2 ? '#0D0D0D' : '#FFFFFF'},
            ]}>
            {day}
          </Text>
        </TouchableOpacity>,
      );
    }

    return days;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={goToPreviousMonth}>
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.monthText}>
            {MONTHS[month]} {year}
          </Text>

          <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBadge}>
            <Text style={styles.statText}>
              {completedDays}/{totalDays} days
            </Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statText}>{completionRate}% complete</Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statText}>7 day streak</Text>
          </View>
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

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendContent}>
            <Text style={styles.legendText}>Less</Text>
            <View style={styles.legendColors}>
              {[0, 1, 2, 3, 4].map(level => (
                <View
                  key={level}
                  style={[
                    styles.legendColor,
                    {backgroundColor: getIntensityColor(level)},
                  ]}
                />
              ))}
            </View>
            <Text style={styles.legendText}>More</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.push('scanning-container')}>
            <Text style={styles.addButtonText}>+ Soru ekle</Text>
          </TouchableOpacity>
        </View>

        {/* Instructions */}
      </View>

      {/* Day Details Modal */}
      <Modal
        visible={selectedDay !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedDay(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedDay && `${MONTHS[month]} ${selectedDay.day}, ${year}`}
            </Text>
            <Text style={styles.modalText}>
              {selectedDay?.level === 0
                ? 'No habits completed'
                : `${selectedDay?.level} habit${
                    (selectedDay?.level || 0) > 1 ? 's' : ''
                  } completed`}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSelectedDay(null)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // background
  },
  header: {
    padding: 20,
    backgroundColor: 'transparent', // surface
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A', // border
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
    justifyContent: 'center',
    marginBottom: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2E2E2E', // inputBackground
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
    backgroundColor: '#2E2E2E', // inputBackground
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A', // border
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B3B3B3', // textSecondary
  },
  calendar: {
    padding: 20,
    backgroundColor: '#1A1A1A', // surface
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A', // border
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  dayLabels: {
    flexDirection: 'row',
    marginBottom: 8,
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
    marginBottom: 24,
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
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
