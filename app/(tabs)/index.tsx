import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import DashboardCard from '@/components/DashboardCard';
import { Users, BookOpen, Target, Bell, MessageCircle, BookCheck, CreditCard } from 'lucide-react-native';
import ProfileSummary from '@/components/ProfileSummary';
import { router } from 'expo-router';
import LoadingScreen from '@/components/LoadingScreen';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user, isLoading } = useAuth();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Simulated fetch of recent announcements
    // Would be replaced with actual API call
    setAnnouncements([
      {
        id: 1,
        title: 'মাসিক মিটিং',
        date: '১৫ জুন, ২০২৫',
        body: 'আগামী শুক্রবার সকাল ১০টায় মাসিক মিটিং অনুষ্ঠিত হবে। সকলকে সময়মত উপস্থিত থাকার অনুরোধ করা যাচ্ছে।'
      }
    ]);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const navigationCards = [
    { title: 'সদস্যবৃন্দ', icon: <Users size={24} color={colors.primary} />, route: 'members' },
    { title: 'বইয়ের তালিকা', icon: <BookOpen size={24} color={colors.primary} />, route: 'books' },
    { title: 'টার্গেট', icon: <Target size={24} color={colors.primary} />, route: 'targets' },
    { title: 'দৈনিক আমল', icon: <BookCheck size={24} color={colors.primary} />, route: 'daily-activities' },
    { title: 'নোটিশ', icon: <Bell size={24} color={colors.primary} />, route: 'notices' },
    { title: 'বার্তা', icon: <MessageCircle size={24} color={colors.primary} />, route: 'messages' },
    { title: 'ইয়ানত', icon: <CreditCard size={24} color={colors.primary} />, route: 'yanat' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.titleBangla, { color: colors.primary }]}>হালাকা</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>মধুপুর দাওয়াহ সার্কেল</Text>
        </View>

        {/* Profile summary */}
        <ProfileSummary user={user} />

        {/* Quick navigation cards */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>দ্রুত অ্যাকসেস</Text>
        <View style={styles.cardsContainer}>
          {navigationCards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              icon={card.icon}
              onPress={() => router.push(`/(tabs)/${card.route}`)}
            />
          ))}
        </View>

        {/* Recent announcements */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>সাম্প্রতিক ঘোষণা</Text>
        {announcements.map((announcement) => (
          <View 
            key={announcement.id} 
            style={[styles.announcementCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.announcementHeader}>
              <Text style={[styles.announcementTitle, { color: colors.primary }]}>{announcement.title}</Text>
              <Text style={[styles.announcementDate, { color: colors.textLight }]}>{announcement.date}</Text>
            </View>
            <Text style={[styles.announcementBody, { color: colors.text }]}>{announcement.body}</Text>
            <TouchableOpacity 
              style={[styles.viewMoreButton, { backgroundColor: colors.primaryLight }]}
              onPress={() => router.push('/(tabs)/notices')}
            >
              <Text style={[styles.viewMoreText, { color: colors.primary }]}>আরও দেখুন</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  titleBangla: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  announcementCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  announcementDate: {
    fontSize: 12,
  },
  announcementBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  viewMoreButton: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '500',
  },
});