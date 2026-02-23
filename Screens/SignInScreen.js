import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  LinearGradient
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height * 0.1)).current;
  const inputFocus = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 20, friction: 7, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleFocus = () => {
    Animated.timing(inputFocus, { toValue: 1, duration: 300, useNativeDriver: false }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* --- STATIC GRADIENT BACKGROUND (REPLACING IMAGE FOR CLEAN LOOK) --- */}
      <View style={styles.bgGradient}>
        <View style={[styles.circle, { top: -50, right: -50, backgroundColor: '#7E22CE' }]} />
        <View style={[styles.circle, { bottom: height * 0.2, left: -100, width: 300, height: 300, backgroundColor: '#3B82F6' }]} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

            {/* --- LOGO AREA --- */}
            <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.logoBadge}>
                <Ionicons name="cart-sharp" size={40} color="#FFF" />
              </View>
              <Text style={styles.brandName}>Instamart</Text>
              <Text style={styles.tagline}>Elevate your grocery experience</Text>
            </Animated.View>

            {/* --- GLASS FORM --- */}
            <Animated.View style={[styles.glassCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <Text style={styles.label}>Login to Continue</Text>

              {/* Mobile Field */}
              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <Ionicons name="phone-portrait-outline" size={20} color="#A78BFA" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={setMobile}
                  onFocus={handleFocus}
                />
              </View>

              {/* Password Field */}
              <View style={styles.inputWrapper}>
                <View style={styles.iconBox}>
                  <Ionicons name="lock-closed-outline" size={20} color="#A78BFA" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#A78BFA" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>Forgot Credentials?</Text>
              </TouchableOpacity>

              {/* ACTION BUTTON */}
              <TouchableOpacity
                style={styles.mainBtn}
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>LOGIN  </Text>


              </TouchableOpacity>
            </Animated.View>

            {/* --- SOCIAL LOGIN AREA --- */}
            <Animated.View style={[styles.socialSection, { opacity: fadeAnim }]}>
              <Text style={styles.orText}>OR LOGIN WITH</Text>
              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-google" size={24} color="#FFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-apple" size={24} color="#FFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-facebook" size={24} color="#FFF" /></TouchableOpacity>
              </View>
            </Animated.View>

            <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.footerText}>New here? <Text style={styles.signUpText}>Create Account</Text></Text>
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' }, // Deep Midnight Blue
  bgGradient: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
  circle: { position: 'absolute', width: 250, height: 250, borderRadius: 125, opacity: 0.3 },

  scrollContent: { paddingHorizontal: 30, paddingBottom: 50 },
  header: { marginTop: height * 0.08, alignItems: 'center' },
  logoBadge: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#6D28D9', justifyContent: 'center', alignItems: 'center', elevation: 20, shadowColor: '#6D28D9', shadowOpacity: 0.5 },
  brandName: { fontSize: 32, fontWeight: '900', color: '#FFF', marginTop: 20, letterSpacing: 1 },
  tagline: { color: '#94A3B8', fontSize: 14, marginTop: 5 },

  glassCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 35,
    padding: 25,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  label: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 20 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 65,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(126, 34, 206, 0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  input: { flex: 1, color: '#FFF', fontSize: 16 },

  forgotBtn: { alignSelf: 'flex-end', marginBottom: 25 },
  forgotText: { color: '#A78BFA', fontWeight: '600', fontSize: 13 },

  mainBtn: {
    backgroundColor: '#6D28D9',
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    elevation: 10,
    shadowColor: '#6D28D9'
  },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  btnArrow: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 5, borderRadius: 8 },

  socialSection: { marginTop: 40, alignItems: 'center' },
  orText: { color: '#64748B', fontSize: 12, fontWeight: '800', marginBottom: 20 },
  socialRow: { flexDirection: 'row', gap: 20 },
  socialBtn: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#33415Object' },

  footer: { marginTop: 40, alignItems: 'center' },
  footerText: { color: '#64748B', fontSize: 14 },
  signUpText: { color: '#FFF', fontWeight: '800' }
});