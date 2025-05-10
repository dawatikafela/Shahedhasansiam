import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { User } from '@/contexts/AuthContext';
import { CreditCard, BookOpen, User as UserIcon, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

interface ProfileSummaryProps {
  user: User | null;
}

export default function ProfileSummary({ user }: ProfileSummaryProps) {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  if (!user) {
    return (
      <TouchableOpacity
        style={[styles.loginPrompt, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => router.push('/login')}
      >
        <Text style={[styles.loginPromptText, { color: colors.text }]}>
          লগইন করুন দাওয়াহ সার্কেলে যোগ দিতে
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <View style={[styles.profileAvatar, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.profileInitial, { color: colors.primary }]}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
            <Text style={[styles.profileSubtext, { color: colors.textLight }]}>
              {user.isAdmin ? 'অ্যাডমিন' : 'সদস্য'} • {user.circleCode}
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.errorLight }]}
          onPress={signOut}
        >
          <LogOut size={16} color={colors.error} />
        </TouchableOpacity>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.statIconContainer, { backgroundColor: colors.primaryLight }]}>
            <CreditCard size={16} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.statValue, { color: colors.primary }]}>৳ {user.totalYanat}</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>মোট ইয়ানত</Text>
          </View>
        </View>

        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

        <View style={styles.statItem}>
          <View style={[styles.statIconContainer, { backgroundColor: colors.primaryLight }]}>
            <BookOpen size={16} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.statValue, { color: colors.primary }]}>৫</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>পঠিত বই</Text>
          </View>
        </View>

        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

        <View style={styles.statItem}>
          <View style={[styles.statIconContainer, { backgroundColor: colors.primaryLight }]}>
            <UserIcon size={16} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.statValue, { color: colors.primary }]}>১২</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>দাওয়াত</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginPrompt: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 24,
  },
  loginPromptText: {
    fontSize: 16,
    fontWeight: '500',
  },
  profileCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDetails: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileSubtext: {
    fontSize: 14,
  },
  logoutButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    marginHorizontal: 8,
  },
});