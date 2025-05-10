import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Check, Clock, CircleAlert as AlertCircle, Plus, ChevronRight } from 'lucide-react-native';
import { targetsList } from '@/data/targets';

export default function TargetsScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('active');
  const [targets, setTargets] = useState(targetsList);

  const filteredTargets = targets.filter(
    target => activeTab === 'active' ? !target.completed : target.completed
  );

  const toggleTargetStatus = (id: number) => {
    const updatedTargets = targets.map(target => 
      target.id === id ? { ...target, completed: !target.completed } : target
    );
    setTargets(updatedTargets);
  };

  const getStatusIcon = (target) => {
    if (target.completed) {
      return <Check size={16} color={colors.success} />;
    } else if (new Date(target.deadline) < new Date()) {
      return <AlertCircle size={16} color={colors.error} />;
    } else {
      return <Clock size={16} color={colors.primary} />;
    }
  };

  const renderTargetItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.targetCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => {/* Navigate to target details */}}
    >
      <View style={styles.targetHeader}>
        <View style={styles.targetTitleContainer}>
          {getStatusIcon(item)}
          <Text style={[styles.targetTitle, { color: colors.text }]}>{item.title}</Text>
        </View>
        <Switch
          value={item.completed}
          onValueChange={() => toggleTargetStatus(item.id)}
          trackColor={{ false: colors.border, true: colors.primaryLight }}
          thumbColor={item.completed ? colors.primary : colors.textLight}
        />
      </View>
      
      <Text style={[styles.targetDescription, { color: colors.textLight }]} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.targetFooter}>
        <Text style={[styles.deadlineText, { color: colors.textLight }]}>
          শেষ তারিখ: {item.deadline}
        </Text>
        
        {item.assignedTo && (
          <Text style={[styles.assignedText, { color: colors.primary }]}>
            দায়িত্বপ্রাপ্ত: {item.assignedTo}
          </Text>
        )}
      </View>
      
      <View style={styles.targetProgressContainer}>
        <View 
          style={[
            styles.targetProgressBar, 
            { backgroundColor: colors.border }
          ]}
        >
          <View 
            style={[
              styles.targetProgress, 
              { 
                backgroundColor: colors.primary,
                width: `${item.progress}%` 
              }
            ]}
          />
        </View>
        <Text style={[styles.targetProgressText, { color: colors.text }]}>
          {item.progress}%
        </Text>
      </View>
      
      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={[styles.viewDetailsText, { color: colors.primary }]}>বিস্তারিত দেখুন</Text>
        <ChevronRight size={16} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <AlertCircle size={60} color={colors.textLight} style={styles.emptyIcon} />
      <Text style={[styles.emptyText, { color: colors.textLight }]}>
        কোন টার্গেট পাওয়া যায়নি
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>টার্গেট</Text>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'active' && { backgroundColor: colors.primaryLight }
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'active' ? colors.primary : colors.textLight }
            ]}
          >
            চলমান টার্গেট
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'completed' && { backgroundColor: colors.primaryLight }
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'completed' ? colors.primary : colors.textLight }
            ]}
          >
            সম্পন্ন টার্গেট
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTargets}
        renderItem={renderTargetItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />
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
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 24,
  },
  targetCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  targetDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  targetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  deadlineText: {
    fontSize: 12,
  },
  assignedText: {
    fontSize: 12,
    fontWeight: '500',
  },
  targetProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  targetProgressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  targetProgress: {
    height: 8,
    borderRadius: 4,
  },
  targetProgressText: {
    fontSize: 12,
    fontWeight: '600',
    width: 36,
    textAlign: 'right',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
  },
});