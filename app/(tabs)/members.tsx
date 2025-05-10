import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Search, Plus, Filter, Phone, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import { membersList } from '@/data/members';

export default function MembersScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(membersList);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredMembers(membersList);
    } else {
      const filtered = membersList.filter(
        member => 
          member.name.toLowerCase().includes(text.toLowerCase()) ||
          member.phone.includes(text) ||
          member.address.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  };

  const renderMemberItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.memberCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => router.push({
        pathname: '/member-details',
        params: { id: item.id }
      })}
    >
      <View style={styles.memberImageContainer}>
        <View style={[styles.memberAvatar, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.memberInitial, { color: colors.primary }]}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.memberInfo}>
        <Text style={[styles.memberName, { color: colors.text }]}>{item.name}</Text>
        <View style={styles.memberDetail}>
          <Phone size={14} color={colors.textLight} />
          <Text style={[styles.memberDetailText, { color: colors.textLight }]}>{item.phone}</Text>
        </View>
        <View style={styles.memberDetail}>
          <MapPin size={14} color={colors.textLight} />
          <Text style={[styles.memberDetailText, { color: colors.textLight }]}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>সদস্যবৃন্দ</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
            <Plus size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.secondaryLight }]}>
            <Filter size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search size={20} color={colors.textLight} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="সদস্য খুঁজুন..."
          placeholderTextColor={colors.textLight}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <Text style={[styles.resultsCount, { color: colors.textLight }]}>
        মোট {filteredMembers.length} জন সদস্য
      </Text>

      <FlatList
        data={filteredMembers}
        renderItem={renderMemberItem}
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
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
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
  resultsCount: {
    fontSize: 14,
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 24,
  },
  memberCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  memberImageContainer: {
    marginRight: 12,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInitial: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  memberDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  memberDetailText: {
    fontSize: 14,
    marginLeft: 6,
  },
});