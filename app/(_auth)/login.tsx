import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { Eye, EyeOff, LogIn } from 'lucide-react-native';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [circleCode, setCircleCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!phoneNumber || !password || !circleCode) {
        setError('সকল তথ্য পূরণ করুন');
        return;
      }
      
      await signIn(phoneNumber, password, circleCode);
      router.replace('/');
    } catch (error) {
      setError('লগইন করতে ব্যর্থ। আবার চেষ্টা করুন।');
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
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: colors.primary }]}>হালাকা</Text>
          <Text style={[styles.logoSubtext, { color: colors.text }]}>মধুপুর দাওয়াহ সার্কেল</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.formTitle, { color: colors.text }]}>লগইন করুন</Text>
          
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
            <Text style={[styles.inputLabel, { color: colors.text }]}>পাসওয়ার্ড</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.passwordInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
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

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
          >
            <LogIn size={20} color={colors.white} />
            <Text style={[styles.loginButtonText, { color: colors.white }]}>লগইন</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => router.push('/register')}
          >
            <Text style={[styles.registerLinkText, { color: colors.textLight }]}>
              অ্যাকাউন্ট নেই? <Text style={{ color: colors.primary }}>রেজিস্ট্রেশন করুন</Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoSubtext: {
    fontSize: 16,
    marginTop: 8,
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
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
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
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  registerLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  registerLinkText: {
    fontSize: 14,
  },
});