import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Stack, router } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle, Chrome as Home } from 'lucide-react-native';

export default function PaymentConfirmationScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'পেমেন্ট নিশ্চিতকরণ',
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
      
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.successLight }]}>
          <CheckCircle size={80} color={colors.success} />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>পেমেন্ট সফল হয়েছে!</Text>
        <Text style={[styles.message, { color: colors.textLight }]}>
          আপনার ইয়ানত সফলভাবে জমা হয়েছে। ধন্যবাদ আপনার অবদানের জন্য।
        </Text>
        
        <View style={[styles.detailsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textLight }]}>পেমেন্ট আইডি</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>YANAT-458923</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textLight }]}>পরিমাণ</Text>
            <Text style={[styles.detailValue, { color: colors.primary }]}>৳ ৫০০</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textLight }]}>তারিখ</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>৫ জুন, ২০২৫</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textLight }]}>পেমেন্ট পদ্ধতি</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>বিকাশ</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: colors.primary }]}
          onPress={() => router.replace('/')}
        >
          <Home size={20} color={colors.white} />
          <Text style={[styles.homeButtonText, { color: colors.white }]}>হোম পেইজে ফিরুন</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  detailsCard: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  homeButton: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});