import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { ArrowLeft, Send, Paperclip, Mic } from 'lucide-react-native';
import { chatMessages } from '@/data/messages';

export default function ChatScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const { id, name } = params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: false });
      }, 200);
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    setTimeout(() => {
      flatListRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === 'me';
    
    return (
      <View 
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.theirMessageContainer,
        ]}
      >
        <View 
          style={[
            styles.messageBubble,
            isMe 
              ? { backgroundColor: colors.primary } 
              : { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }
          ]}
        >
          <Text 
            style={[
              styles.messageText,
              isMe ? { color: colors.white } : { color: colors.text }
            ]}
          >
            {item.text}
          </Text>
          <Text 
            style={[
              styles.messageTime,
              isMe ? { color: colors.white + '99' } : { color: colors.textLight }
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen
          options={{
            title: name as string,
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color={colors.white} />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
          }}
        />
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={24} color={colors.textLight} />
          </TouchableOpacity>
          
          <TextInput
            style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
            placeholder="বার্তা লিখুন..."
            placeholderTextColor={colors.textLight}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          {message.trim() === '' ? (
            <TouchableOpacity style={styles.micButton}>
              <Mic size={24} color={colors.textLight} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.sendButton, { backgroundColor: colors.primary }]}
              onPress={sendMessage}
            >
              <Send size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    marginHorizontal: 8,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});