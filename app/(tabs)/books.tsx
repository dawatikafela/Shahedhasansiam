import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Search, Filter, BookOpen, Download, User } from 'lucide-react-native';
import { booksList } from '@/data/books';

export default function BooksScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('available');
  const [filteredBooks, setFilteredBooks] = useState(
    booksList.filter(book => book.status === 'available')
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterBooks(text, activeTab);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    filterBooks(searchQuery, tab);
  };

  const filterBooks = (text: string, tab: string) => {
    let filtered = booksList.filter(book => book.status === tab);
    
    if (text.trim() !== '') {
      filtered = filtered.filter(
        book => 
          book.title.toLowerCase().includes(text.toLowerCase()) ||
          book.author.toLowerCase().includes(text.toLowerCase())
      );
    }
    
    setFilteredBooks(filtered);
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => {/* Navigate to book details */}}
    >
      <View style={styles.bookImageContainer}>
        <Image
          source={{ uri: item.coverImage }}
          style={styles.bookCover}
          resizeMode="cover"
        />
      </View>
      <View style={styles.bookInfo}>
        <Text style={[styles.bookTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.bookAuthor, { color: colors.textLight }]}>{item.author}</Text>
        
        {activeTab === 'borrowed' && (
          <View style={styles.borrowedInfo}>
            <User size={14} color={colors.primary} />
            <Text style={[styles.borrowedText, { color: colors.primary }]}>
              {item.borrowedBy}
            </Text>
          </View>
        )}
        
        {activeTab === 'pdf' && (
          <TouchableOpacity 
            style={[styles.downloadButton, { backgroundColor: colors.primaryLight }]}
            onPress={() => {/* Download functionality */}}
          >
            <Download size={14} color={colors.primary} />
            <Text style={[styles.downloadText, { color: colors.primary }]}>ডাউনলোড</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <BookOpen size={60} color={colors.textLight} style={styles.emptyIcon} />
      <Text style={[styles.emptyText, { color: colors.textLight }]}>
        কোন বই পাওয়া যায়নি
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>বইয়ের তালিকা</Text>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.secondaryLight }]}>
          <Filter size={20} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search size={20} color={colors.textLight} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="বই খুঁজুন..."
          placeholderTextColor={colors.textLight}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'available' && { backgroundColor: colors.primaryLight }
          ]}
          onPress={() => handleTabChange('available')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'available' ? colors.primary : colors.textLight }
            ]}
          >
            স্টকে আছে
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'borrowed' && { backgroundColor: colors.primaryLight }
          ]}
          onPress={() => handleTabChange('borrowed')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'borrowed' ? colors.primary : colors.textLight }
            ]}
          >
            ধার দেওয়া হয়েছে
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'pdf' && { backgroundColor: colors.primaryLight }
          ]}
          onPress={() => handleTabChange('pdf')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'pdf' ? colors.primary : colors.textLight }
            ]}
          >
            পিডিএফ
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
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
  borrowedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  borrowedText: {
    fontSize: 14,
    marginLeft: 6,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  downloadText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
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