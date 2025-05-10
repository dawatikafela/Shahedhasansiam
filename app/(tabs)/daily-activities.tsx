import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { Check, Clock, Calendar } from 'lucide-react-native';
import { dailyActivities } from '@/data/activities';

export default function DailyActivitiesScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [activities, setActivities] = useState(dailyActivities);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Format the current date in Bengali
  const formattedDate = new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }).format(currentDate);

  const toggleActivity = (id: number) => {
    const updatedActivities = activities.map(activity => 
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    );
    setActivities(updatedActivities);
    // Save to API/database would go here
  };

  const calculateCompletion = () => {
    const total = activities.length;
    const completed = activities.filter(activity => activity.completed).length;
    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>দৈনিক আমল</Text>
        <TouchableOpacity style={[styles.dateButton, { backgroundColor: colors.primaryLight }]}>
          <Calendar size={18} color={colors.primary} />
          <Text style={[styles.dateButtonText, { color: colors.primary }]}>তারিখ বাছাই</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.dateContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.currentDate, { color: colors.text }]}>{formattedDate}</Text>
      </View>

      <View style={[styles.progressContainer, { borderColor: colors.border }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>অগ্রগতি</Text>
          <Text style={[styles.progressPercentage, { color: colors.primary }]}>
            {completionPercentage}%
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: colors.primary,
                width: `${completionPercentage}%` 
              }
            ]}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.activitiesContainer}>
          {activities.map((activity) => (
            <View 
              key={activity.id} 
              style={[
                styles.activityCard, 
                { 
                  backgroundColor: colors.card,
                  borderColor: activity.completed ? colors.success : colors.border 
                }
              ]}
            >
              <View style={styles.activityInfo}>
                <Text style={[styles.activityTitle, { color: colors.text }]}>
                  {activity.title}
                </Text>
                {activity.description && (
                  <Text style={[styles.activityDescription, { color: colors.textLight }]}>
                    {activity.description}
                  </Text>
                )}
                {activity.targetCount && (
                  <View style={styles.targetCountContainer}>
                    <View style={styles.countBubbles}>
                      {Array.from({ length: activity.targetCount }).map((_, index) => (
                        <View 
                          key={index} 
                          style={[
                            styles.countBubble, 
                            { 
                              backgroundColor: index < activity.completedCount 
                                ? colors.success 
                                : colors.border 
                            }
                          ]} 
                        />
                      ))}
                    </View>
                    <Text style={[styles.countText, { color: colors.textLight }]}>
                      {activity.completedCount}/{activity.targetCount}
                    </Text>
                  </View>
                )}
              </View>
              <Switch
                value={activity.completed}
                onValueChange={() => toggleActivity(activity.id)}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={activity.completed ? colors.primary : colors.textLight}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  dateContainer: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  currentDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  targetCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBubbles: {
    flexDirection: 'row',
    marginRight: 8,
  },
  countBubble: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  countText: {
    fontSize: 12,
  },
});