import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CorporateRewards() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Corporate Rewards</Text>
          <Text style={styles.headerSub}>
            Verify your corporate email address to unlock{'\n'}
            exclusive Swiggy rewards!
          </Text>

          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4205/4205906.png' }}
            style={styles.heroImg}
            resizeMode="contain"
          />

          <Text style={styles.secureTxt}>
            ✦ SECURE & PRIVATE. JUST FOR VERIFICATION ✦
          </Text>
        </View>

        {/* VERIFY CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>VERIFY YOUR WORK EMAIL</Text>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter your email ID"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.otpBtn} disabled>
              <Text style={styles.otpText}>Get OTP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BENEFITS */}
        <Text style={styles.subHeading}>BENEFITS</Text>

        <View style={styles.benefitsCard}>
          <View style={styles.benefitRow}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.benefitText}>
              one - Free Delivery at Discounted Price
            </Text>
          </View>

          <View style={styles.benefitRow}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.benefitText}>Flat 67% OFF on Food</Text>
          </View>

          <View style={styles.benefitRow}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.benefitText}>
              Additional ₹100 OFF on Instamart
            </Text>
          </View>

          <View style={styles.benefitRow}>
            <Text style={styles.plus}>＋</Text>
            <Text style={styles.benefitText}>
              Up to ₹2000 OFF on Dineout & more!
            </Text>
          </View>

          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4225/4225683.png' }}
            style={styles.giftImg}
          />
        </View>

        {/* HOW IT WORKS */}
        <Text style={styles.subHeading}>HOW IT WORKS</Text>

        <View style={styles.howCard}>
          <Text style={styles.step}>
            1  Enter your work email ID & click "Get OTP".
          </Text>
          <Text style={styles.step}>
            2  Check your email for the OTP.
          </Text>
          <Text style={styles.step}>
            3  Enter OTP & unlock your rewards.
          </Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F8' },

  header: {
    backgroundColor: '#4B2C82',
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 16,
    top: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
  },

  backIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginTop: 10,
  },

  headerSub: {
    color: '#E5D9FF',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 13,
  },

  heroImg: {
    width: 180,
    height: 180,
    marginVertical: 10,
  },

  secureTxt: {
    color: '#E5D9FF',
    fontSize: 11,
    marginTop: 6,
  },

  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
    marginBottom: 10,
  },

  inputBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 14,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },

  otpBtn: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  otpText: {
    color: '#9CA3AF',
    fontWeight: '700',
  },

  subHeading: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 12,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 1,
  },

  benefitsCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  plus: {
    color: '#7C3AED',
    fontSize: 18,
    marginRight: 8,
  },

  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },

  giftImg: {
    width: 90,
    height: 90,
    alignSelf: 'flex-end',
    marginTop: -20,
  },

  howCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  step: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
});
