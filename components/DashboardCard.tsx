import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export default function DashboardCard({ title, icon, onPress }: DashboardCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    minHeight: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    textAlign: 'center',
  },
});