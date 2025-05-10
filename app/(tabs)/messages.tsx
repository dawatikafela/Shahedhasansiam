import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Search, MessageCircle, Users, Plus } from 'lucide-react-native';
import { messagesList } from '@/data/messages';
import { router } from 'expo-router';

export default function MessagesScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('private');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messagesList.filter(
    message => activeTab === 'private' ? !message.isGroup : message.isGroup
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.messageCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => router.push({
        pathname: '/chat-screen',
        params: { id: item.id, name: item.name }
      })}
    >
      <View style={styles.avatarContainer}>
        <View 
          style={[
            styles.avatar, 
            { 
              backgroundColor: item.isGroup ? colors.secondaryLight : colors.primaryLight 
            }
          ]}
        >
          <Text style={[
            styles.avatarText, 
            { color: item.isGroup ? colors.secondary : colors.primary }
          ]}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        {item.unread > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.badgeText, { color: colors.white }]}>{item.unread}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.messageInfo}>
        <View style={styles.messageHeader}>
          <Text style={[styles.messageName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.messageTime, { color: colors.textLight }]}>{item.time}</Text>
        </View>
        <Text style={[styles.messagePreview, { color: colors.textLight }]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>বার্তা</Text>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search size={20} color={colors.textLight} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="খুঁজুন..."
          placeholderTextColor={colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'private' && { backgroundColor: colors.primaryLight }
          ]}
          onPress={() => setActiveTab('private')}
        >
          <MessageCircle size={18} color={activeTab === 'private' ? colors.primary : colors.textLight} />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'private' ? colors.primary : colors.textLight }
            ]}
          >
            ব্যক্তিগত
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'group' && { backgroundColor: colors.primaryLight }
          ]}
          onPress={() => setActiveTab('group')}
        >
          <Users size={18} color={activeTab === 'group' ? colors.primary : colors.textLight} />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'group' ? colors.primary : colors.textLight }
            ]}
          >
            দলগত
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMessages}
        renderItem={renderMessageItem}
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
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  listContainer: {
    paddingBottom: 24,
  },
  messageCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
  },
  messagePreview: {
    fontSize: 14,
  },
});