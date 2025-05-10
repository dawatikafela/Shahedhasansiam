import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { router, Stack } from 'expo-router';
import { ArrowLeft, CreditCard, Calendar, Check, ChevronRight, ChevronsUpDown } from 'lucide-react-native';
import { yanatData } from '@/data/yanat';

export default function YanatScreen() {
  const { colors } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [amount, setAmount] = useState('');
  
  const months = [
    'June 2025', 
    'May 2025', 
    'April 2025', 
    'March 2025',
    'February 2025',
    'January 2025',
    'December 2024'
  ];
  
  const handlePayment = () => {
    // Handle payment logic
    router.push('/payment-confirmation');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'ইয়ানত',
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
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>মাসিক ইয়ানত</Text>
          <Text style={[styles.headerDescription, { color: colors.textLight }]}>
            সদস্যদের দাওয়াতি কাফেলার কাজে নিয়মিত অর্থ সহায়তা
          </Text>
        </View>
        
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>আপনার মাসিক ইয়ানত</Text>
          <Text style={[styles.infoAmount, { color: colors.primary }]}>৳ ৫০০</Text>
        </View>
        
        <View style={styles.monthSelectorContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>মাস নির্বাচন করুন</Text>
          
          <TouchableOpacity
            style={[styles.dropdownButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={[styles.dropdownButtonText, { color: colors.text }]}>{selectedMonth}</Text>
            <ChevronsUpDown size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          {isDropdownOpen && (
            <View style={[styles.dropdown, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedMonth === month && { backgroundColor: colors.primaryLight }
                  ]}
                  onPress={() => {
                    setSelectedMonth(month);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.dropdownItemText, 
                      { color: selectedMonth === month ? colors.primary : colors.text }
                    ]}
                  >
                    {month}
                  </Text>
                  {selectedMonth === month && <Check size={16} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.paymentSummary}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>পেমেন্ট সারসংক্ষেপ</Text>
          
          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>মাসিক ইয়ানত</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>৳ ৫০০</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>বিশেষ অবদান</Text>
              <View style={styles.inputContainer}>
                <Text style={[styles.currencySymbol, { color: colors.text }]}>৳</Text>
                <TextInput
                  style={[styles.amountInput, { color: colors.text }]}
                  placeholder="0"
                  placeholderTextColor={colors.textLight}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>মোট</Text>
              <Text style={[styles.totalValue, { color: colors.primary }]}>
                ৳ {500 + (parseInt(amount) || 0)}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.paymentMethods}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>পেমেন্ট পদ্ধতি</Text>
          
          <TouchableOpacity 
            style={[styles.paymentMethodCard, { backgroundColor: colors.card, borderColor: colors.primary }]}
          >
            <View style={styles.paymentMethodInfo}>
              <CreditCard size={24} color={colors.primary} />
              <Text style={[styles.paymentMethodText, { color: colors.text }]}>বিকাশ</Text>
            </View>
            <View style={[styles.selectedIndicator, { backgroundColor: colors.primary }]}>
              <Check size={16} color={colors.white} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.paymentMethodCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.paymentMethodInfo}>
              <CreditCard size={24} color={colors.textLight} />
              <Text style={[styles.paymentMethodText, { color: colors.text }]}>নগদ</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.historySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>পূর্ববর্তী ইয়ানত</Text>
          
          {yanatData.map((item, index) => (
            <View 
              key={index} 
              style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.historyInfo}>
                <Text style={[styles.historyMonth, { color: colors.text }]}>{item.month}</Text>
                <Text style={[styles.historyDate, { color: colors.textLight }]}>{item.date}</Text>
              </View>
              <View style={styles.historyAmount}>
                <Text style={[styles.historyAmountText, { color: colors.primary }]}>৳ {item.amount}</Text>
                <ChevronRight size={16} color={colors.textLight} />
              </View>
            </View>
          ))}
        </View>
        
        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: colors.primary }]}
          onPress={handlePayment}
        >
          <Text style={[styles.payButtonText, { color: colors.white }]}>পেমেন্ট করুন</Text>
        </TouchableOpacity>
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
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  monthSelectorContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  paymentSummary: {
    marginBottom: 24,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 16,
    marginRight: 2,
  },
  amountInput: {
    fontSize: 16,
    minWidth: 60,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentMethods: {
    marginBottom: 24,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    marginLeft: 12,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historySection: {
    marginBottom: 24,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyMonth: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
  },
  historyAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  payButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});