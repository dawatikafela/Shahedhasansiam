import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { ArrowLeft, Phone, MapPin, Mail, Calendar, BookOpen, MessageCircle, Target } from 'lucide-react-native';
import { membersList } from '@/data/members';

export default function MemberDetailsScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const { id } = params;
  
  // Find member from the list
  const member = membersList.find(m => m.id === Number(id)) || membersList[0];
  
  // Tabs for member details
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <View style={styles.tabContent}>
            <View style={styles.infoSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>ব্যক্তিগত তথ্য</Text>
              
              <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.infoRow}>
                  <Phone size={18} color={colors.primary} />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, { color: colors.textLight }]}>ফোন</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{member.phone}</Text>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <MapPin size={18} color={colors.primary} />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, { color: colors.textLight }]}>ঠিকানা</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{member.address}</Text>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <Mail size={18} color={colors.primary} />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, { color: colors.textLight }]}>ইমেইল</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{member.email || 'নেই'}</Text>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <Calendar size={18} color={colors.primary} />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, { color: colors.textLight }]}>জয়েন করেছেন</Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>{member.joinDate}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>ইয়ানত</Text>
              
              <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.yanatSummary}>
                  <View style={styles.yanatItem}>
                    <Text style={[styles.yanatLabel, { color: colors.textLight }]}>মাসিক</Text>
                    <Text style={[styles.yanatValue, { color: colors.primary }]}>৳ {member.monthlyYanat}</Text>
                  </View>
                  
                  <View style={[styles.yanatDivider, { backgroundColor: colors.border }]} />
                  
                  <View style={styles.yanatItem}>
                    <Text style={[styles.yanatLabel, { color: colors.textLight }]}>এ পর্যন্ত</Text>
                    <Text style={[styles.yanatValue, { color: colors.success }]}>৳ {member.totalYanat}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={[styles.viewMoreButton, { backgroundColor: colors.primaryLight }]}
                  onPress={() => router.push('/yanat')}
                >
                  <Text style={[styles.viewMoreText, { color: colors.primary }]}>বিস্তারিত দেখুন</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
        
      case 'books':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>বইয়ের তালিকা</Text>
            
            {member.books && member.books.length > 0 ? (
              member.books.map((book, index) => (
                <View 
                  key={index} 
                  style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={styles.bookImageContainer}>
                    <Image
                      source={{ uri: book.coverImage }}
                      style={styles.bookCover}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.bookInfo}>
                    <Text style={[styles.bookTitle, { color: colors.text }]}>{book.title}</Text>
                    <Text style={[styles.bookAuthor, { color: colors.textLight }]}>{book.author}</Text>
                    <View style={styles.bookDate}>
                      <Calendar size={14} color={colors.primary} />
                      <Text style={[styles.bookDateText, { color: colors.primary }]}>
                        নেওয়ার তারিখ: {book.borrowDate}
                      </Text>
                    </View>
                    <Text style={[
                      styles.returnDate, 
                      { 
                        color: new Date(book.returnDate) < new Date() 
                          ? colors.error 
                          : colors.success 
                      }
                    ]}>
                      ফেরত: {book.returnDate}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
                <BookOpen size={40} color={colors.textLight} />
                <Text style={[styles.emptyStateText, { color: colors.textLight }]}>
                  কোন বই নেওয়া হয়নি
                </Text>
              </View>
            )}
          </View>
        );
        
      case 'targets':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>টার্গেট</Text>
            
            {member.targets && member.targets.length > 0 ? (
              member.targets.map((target, index) => (
                <View 
                  key={index} 
                  style={[styles.targetCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <Text style={[styles.targetTitle, { color: colors.text }]}>{target.title}</Text>
                  <Text style={[styles.targetDescription, { color: colors.textLight }]}>{target.description}</Text>
                  
                  <View style={styles.targetFooter}>
                    <Text style={[styles.targetDeadline, { color: colors.textLight }]}>
                      শেষ তারিখ: {target.deadline}
                    </Text>
                    <View 
                      style={[
                        styles.targetStatus, 
                        { 
                          backgroundColor: target.completed 
                            ? colors.successLight 
                            : colors.primaryLight 
                        }
                      ]}
                    >
                      <Text 
                        style={[
                          styles.targetStatusText, 
                          { 
                            color: target.completed 
                              ? colors.success 
                              : colors.primary 
                          }
                        ]}
                      >
                        {target.completed ? 'সম্পন্ন' : 'চলমান'}
                      </Text>
                    </View>
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
                            backgroundColor: target.completed 
                              ? colors.success 
                              : colors.primary,
                            width: `${target.progress}%` 
                          }
                        ]}
                      />
                    </View>
                    <Text style={[styles.targetProgressText, { color: colors.text }]}>
                      {target.progress}%
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
                <Target size={40} color={colors.textLight} />
                <Text style={[styles.emptyStateText, { color: colors.textLight }]}>
                  কোন টার্গেট নেই
                </Text>
              </View>
            )}
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: colors.card + 'CC' }]}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View 
            style={[
              styles.profileAvatarLarge, 
              { backgroundColor: colors.primaryLight }
            ]}
          >
            <Text style={[styles.profileInitialLarge, { color: colors.primary }]}>
              {member.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          
          <Text style={[styles.profileName, { color: colors.text }]}>{member.name}</Text>
          
          <View style={styles.profileActions}>
            <TouchableOpacity 
              style={[styles.profileAction, { backgroundColor: colors.primaryLight }]}
              onPress={() => router.push({
                pathname: '/chat-screen',
                params: { id: member.id, name: member.name }
              })}
            >
              <MessageCircle size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.profileAction, { backgroundColor: colors.primaryLight }]}
              onPress={() => {/* Make a phone call */}}
            >
              <Phone size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'profile' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('profile')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'profile' ? colors.primary : colors.textLight }
              ]}
            >
              প্রোফাইল
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'books' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('books')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'books' ? colors.primary : colors.textLight }
              ]}
            >
              বই
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'targets' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('targets')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'targets' ? colors.primary : colors.textLight }
              ]}
            >
              টার্গেট
            </Text>
          </TouchableOpacity>
        </View>
        
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 8,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
  },
  profileAvatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitialLarge: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileActions: {
    flexDirection: 'row',
  },
  profileAction: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
  },
  yanatSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yanatItem: {
    flex: 1,
    alignItems: 'center',
  },
  yanatDivider: {
    width: 1,
    height: 40,
  },
  yanatLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  yanatValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewMoreButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bookCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  bookImageContainer: {
    marginRight: 12,
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 8,
  },
  bookDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookDateText: {
    fontSize: 14,
    marginLeft: 6,
  },
  returnDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  targetCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  targetDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  targetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  targetDeadline: {
    fontSize: 14,
  },
  targetStatus: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  targetStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  targetProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  emptyState: {
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 16,
  },
});