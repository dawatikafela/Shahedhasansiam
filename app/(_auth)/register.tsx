import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { Eye, EyeOff, ArrowLeft, UserPlus } from 'lucide-react-native';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [circleCode, setCircleCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (!name || !phoneNumber || !address || !password || !confirmPassword || !circleCode) {
        setError('সকল তথ্য পূরণ করুন');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('পাসওয়ার্ড মিলছে না');
        return;
      }
      
      await register(name, phoneNumber, address, password, circleCode);
      router.replace('/');
    } catch (error) {
      setError('রেজিস্ট্রেশন করতে ব্যর্থ। আবার চেষ্টা করুন।');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
      
        <View style={styles.formContainer}>
          <Text style={[styles.formTitle, { color: colors.text }]}>নতুন অ্যাকাউন্ট</Text>
          
          {error ? (
            <View style={[styles.errorContainer, { backgroundColor: colors.errorLight }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>সার্কেল কোড</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
              placeholder="সার্কেল কোড লিখুন"
              placeholderTextColor={colors.textLight}
              value={circleCode}
              onChangeText={setCircleCode}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>নাম</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
              placeholder="আপনার পূর্ণ নাম লিখুন"
              placeholderTextColor={colors.textLight}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>ফোন নাম্বার</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
              placeholder="আপনার ফোন নাম্বার লিখুন"
              placeholderTextColor={colors.textLight}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>ঠিকানা</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
              placeholder="আপনার ঠিকানা লিখুন"
              placeholderTextColor={colors.textLight}
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>পাসওয়ার্ড</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.passwordInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                placeholder="পাসওয়ার্ড লিখুন"
                placeholderTextColor={colors.textLight}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.textLight} />
                ) : (
                  <Eye size={20} color={colors.textLight} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>পাসওয়ার্ড নিশ্চিত করুন</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.passwordInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                placeholder="পাসওয়ার্ড আবার লিখুন"
                placeholderTextColor={colors.textLight}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color={colors.textLight} />
                ) : (
                  <Eye size={20} color={colors.textLight} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: colors.primary }]}
            onPress={handleRegister}
          >
            <UserPlus size={20} color={colors.white} />
            <Text style={[styles.registerButtonText, { color: colors.white }]}>রেজিস্ট্রেশন করুন</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/login')}
          >
            <Text style={[styles.loginLinkText, { color: colors.textLight }]}>
              অ্যাকাউন্ট আছে? <Text style={{ color: colors.primary }}>লগইন করুন</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingVertical: 12,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  registerButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
  },
});