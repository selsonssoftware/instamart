import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Animated,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ForgotPasswordScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [mobile, setMobile] = useState('');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 25, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* --- MATCHING VIBRANT DARK BACKGROUND --- */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop' }}
        style={styles.bgImage}
      >
        <View style={styles.darkOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1 }}
          >
            <SafeAreaView style={styles.safeArea}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* --- BACK BUTTON --- */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Ionicons name="chevron-back" size={28} color="#FFF" />
                </TouchableOpacity>

                {/* --- HEADER --- */}
                <Animated.View style={[styles.header, { 
                  marginTop: height * 0.08, 
                  opacity: fadeAnim, 
                  transform: [{ translateY: slideUp }] 
                }]}>
                  <View style={styles.logoBadge}>
                    <Ionicons name="shield-checkmark-outline" size={40} color="#FFF" />
                  </View>
                  <Text style={styles.titleText}>Forgot Password</Text>
                  <Text style={styles.subText}>Don't worry, it happens. Please enter your mobile number to reset.</Text>
                </Animated.View>

                {/* --- FORM CARD (GLASS CARD) --- */}
                <Animated.View style={[styles.glassCard, { 
                  opacity: fadeAnim, 
                  transform: [{ translateY: slideUp }] 
                }]}>
                  
                  {/* Mobile Number Input */}
                  <View style={styles.inputContainer}>
                    <View style={styles.iconBox}>
                      <Ionicons name="call-outline" size={22} color="#A78BFA" />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Mobile Number"
                      placeholderTextColor="rgba(255,255,255,0.4)"
                      value={mobile}
                      onChangeText={setMobile}
                      keyboardType="phone-pad"
                    />
                  </View>

                  {/* RESET BUTTON */}
                  <TouchableOpacity 
                    style={styles.resetBtn} 
                    onPress={() => {
                        // Logic for sending OTP goes here
                        console.log("OTP Sent to:", mobile);
                    }}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.resetBtnText}>SEND OTP</Text>
                    <View style={styles.btnArrow}>
                      <Ionicons name="paper-plane-outline" size={18} color="#FFF" />
                    </View>
                  </TouchableOpacity>

                </Animated.View>

                {/* --- FOOTER --- */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Remembered password?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signInLink}>Sign In</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  bgImage: { flex: 1 },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)', // Deep purple/blue tint
  },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 50 },
  
  backButton: {
    marginTop: Platform.OS === 'ios' ? 10 : 40,
    width: 45, height: 45, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center'
  },

  header: { alignItems: 'center', marginBottom: 40 },
  logoBadge: { 
    width: 90, height: 90, borderRadius: 24,
    backgroundColor: '#6D28D9',
    justifyContent: 'center', alignItems: 'center',
    elevation: 20, shadowColor: '#6D28D9', shadowOpacity: 0.5 
  },
  titleText: { fontSize: 32, fontWeight: '900', color: '#FFF', marginTop: 15, letterSpacing: 1 },
  subText: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8, textAlign: 'center', lineHeight: 20 },

  glassCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)', 
    borderRadius: 35,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 18, 
    paddingHorizontal: 15, 
    height: 65,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconBox: {
    width: 45, height: 45, borderRadius: 12,
    backgroundColor: 'rgba(109, 40, 217, 0.15)',
    justifyContent: 'center', alignItems: 'center', marginRight: 10
  },
  input: { flex: 1, color: '#FFF', fontSize: 16 },
  
  resetBtn: {
    backgroundColor: '#6D28D9',
    height: 65, 
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 15,
    shadowColor: '#6D28D9', shadowOpacity: 0.4, shadowRadius: 10, elevation: 8
  },
  resetBtnText: { fontSize: 16, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  btnArrow: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: 10 },

  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 35,
    alignItems: 'center'
  },
  footerText: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  signInLink: { color: '#FFF', fontWeight: '800', marginLeft: 8, fontSize: 15, textDecorationLine: 'underline' },
});