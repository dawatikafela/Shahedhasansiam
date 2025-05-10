import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Bell, Pin, Calendar, ChevronRight, Download, Image as ImageIcon } from 'lucide-react-native';
import { noticesList } from '@/data/notices';

export default function NoticesScreen() {
  const { colors } = useTheme();
  const [notices, setNotices] = useState(noticesList);

  const renderNoticeItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.noticeCard, 
        { 
          backgroundColor: colors.card, 
          borderColor: item.isPinned ? colors.primary : colors.border 
        }
      ]}
      onPress={() => {/* Navigate to notice details */}}
    >
      <View style={styles.noticeHeader}>
        <View style={styles.noticeTitleContainer}>
          {item.isPinned && (
            <Pin size={16} color={colors.primary} style={styles.pinIcon} />
          )}
          <Text style={[styles.noticeTitle, { color: colors.text }]}>{item.title}</Text>
        </View>
        <View style={[styles.dateContainer, { backgroundColor: colors.primaryLight }]}>
          <Calendar size={12} color={colors.primary} />
          <Text style={[styles.dateText, { color: colors.primary }]}>{item.date}</Text>
        </View>
      </View>
      
      <Text style={[styles.noticeContent, { color: colors.textLight }]} numberOfLines={3}>
        {item.content}
      </Text>
      
      {item.hasAttachment && (
        <View style={styles.attachmentsContainer}>
          {item.hasImage && (
            <View style={styles.attachmentPreview}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.attachmentImage}
                resizeMode="cover"
              />
            </View>
          )}
          
          {item.hasDocument && (
            <TouchableOpacity 
              style={[styles.documentButton, { backgroundColor: colors.secondaryLight }]}
              onPress={() => {/* Download document */}}
            >
              <Download size={14} color={colors.secondary} />
              <Text style={[styles.documentText, { color: colors.secondary }]}>ডাউনলোড</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={[styles.viewDetailsText, { color: colors.primary }]}>বিস্তারিত দেখুন</Text>
        <ChevronRight size={16} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>নোটিশ বোর্ড</Text>
      </View>

      <FlatList
        data={notices}
        renderItem={renderNoticeItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  listContainer: {
    paddingBottom: 24,
  },
  noticeCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noticeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  pinIcon: {
    marginRight: 6,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 4,
  },
  noticeContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  attachmentsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  attachmentPreview: {
    marginRight: 12,
  },
  attachmentImage: {
    width: 80,
    height: 60,
    borderRadius: 6,
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  documentText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
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
});