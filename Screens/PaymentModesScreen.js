import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  StatusBar, ScrollView, Image, Animated, Platform, Dimensions,
  LinearGradient
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const normalize = (size) => Math.round(size * (width / 375));

const UPI_APPS = [
  {
    id: '1',
    name: 'Google Pay',
    icon: 'https://cdn-icons-png.flaticon.com/512/6124/6124998.png',
    color: '#E8F0FE',
    routeName: 'PaymentSuccess'
  },
  {
    id: '2',
    name: 'PhonePe',
    icon: 'https://cdn-icons-png.flaticon.com/512/10505/10505676.png',
    color: '#F3E5F5',
    routeName: 'PaymentSuccess'
  },
  {
    id: '3',
    name: 'Paytm',
    icon: 'https://cdn-icons-png.flaticon.com/512/825/825454.png',
    color: '#E1F5FE',
    routeName: 'PaymentSuccess'
  },
];

export default function PaymentModesScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 20, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const PaymentSection = ({ title, children }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.premiumCard}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- NEAT HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#1A1A1A" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <Text style={styles.headerSub}>Choose how you want to pay</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}>

          {/* --- UPI SECTION --- */}
          <PaymentSection title="UPI PAYMENTS">
            {UPI_APPS.map((app, index) => (
              <TouchableOpacity
                key={app.id}
                // Ikkada navigation trigger avtundi
                onPress={() => navigation.navigate(app.routeName)}
                style={[styles.row, index === UPI_APPS.length - 1 && { borderBottomWidth: 0 }]}
              >
                <View style={styles.leftInfo}>
                  <View style={[styles.iconCircle, { backgroundColor: app.color }]}>
                    <Image source={{ uri: app.icon }} style={styles.paymentIcon} />
                  </View>
                  <Text style={styles.methodName}>{app.name}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#C1C1C1" />
              </TouchableOpacity>
            ))}
          </PaymentSection>
          {/* --- CARDS SECTION --- */}
          <PaymentSection title="CARDS">
            <TouchableOpacity style={styles.addCardAction}>
              <View style={styles.plusCircle}>
                <Ionicons name="add" size={20} color="#FFF" />
              </View>
              <View style={styles.addCardTextContainer}>
                <Text style={styles.addCardTitle}>Add Debit / Credit Card</Text>
                <Text style={styles.addCardSub}>Visa, Mastercard, RuPay & more</Text>
              </View>
            </TouchableOpacity>

            {/* Visual Card Logos */}
            <View style={styles.logoGrid}>
              <MaterialCommunityIcons name="visa" size={34} color="#1A1F71" />
              <MaterialCommunityIcons name="credit-card-chip" size={30} color="#FF5F00" style={{ marginLeft: 15 }} />
              <Text style={styles.moreLogoText}>+4 more</Text>
            </View>
          </PaymentSection>

          {/* --- WALLETS --- */}
          <PaymentSection title="WALLETS & OTHERS">
            <TouchableOpacity style={styles.row}>
              <View style={styles.leftInfo}>
                <View style={styles.iconCircle}><Text style={{ fontSize: 20 }}>👛</Text></View>
                <Text style={styles.methodName}>Amazon Pay / Mobikwik</Text>
              </View>
              <Text style={styles.linkText}>LINK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
              <View style={styles.leftInfo}>
                <View style={styles.iconCircle}><Text style={{ fontSize: 20 }}>💵</Text></View>
                <Text style={styles.methodName}>Cash on Delivery</Text>
              </View>
              <Ionicons name="checkmark-circle" size={22} color="#10B981" />
            </TouchableOpacity>
          </PaymentSection>

        </Animated.View>
      </ScrollView>

      {/* Bottom Secure Tag */}
      <View style={styles.secureTag}>
        <Ionicons name="shield-checkmark" size={14} color="#6B7280" />
        <Text style={styles.secureText}>100% SECURE PAYMENTS</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  header: {
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 40 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  backBtn: {
    width: 45, height: 45, borderRadius: 15,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 15,
    borderWidth: 1, borderColor: '#F1F3F5'
  },
  headerTitle: { fontSize: normalize(18), fontWeight: '900', color: '#1A1A1A' },
  headerSub: { fontSize: normalize(12), color: '#6B7280', marginTop: 2 },

  scrollContent: { padding: 18, paddingBottom: 100 },

  sectionContainer: { marginBottom: 25 },
  sectionLabel: {
    fontSize: normalize(11), fontWeight: '800', color: '#4B5563',
    marginLeft: 8, marginBottom: 12, letterSpacing: 1.2
  },
  premiumCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
    borderWidth: 1, borderColor: '#FFF'
  },

  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 18, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6'
  },
  leftInfo: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 45, height: 45, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1, borderColor: '#F1F3F5'
  },
  paymentIcon: { width: 26, height: 26, resizeMode: 'contain' },
  methodName: { fontSize: normalize(14), fontWeight: '700', color: '#374151', marginLeft: 15 },

  addCardAction: {
    flexDirection: 'row', alignItems: 'center',
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6'
  },
  plusCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center', alignItems: 'center'
  },
  addCardTextContainer: { marginLeft: 15 },
  addCardTitle: { fontSize: normalize(14), fontWeight: '800', color: '#1A1A1A' },
  addCardSub: { fontSize: normalize(11), color: '#9CA3AF', marginTop: 2 },

  logoGrid: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingLeft: 75 },
  moreLogoText: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginLeft: 15 },

  linkText: { color: '#007AFF', fontWeight: '900', fontSize: normalize(12) },

  secureTag: {
    position: 'absolute', bottom: 30, alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 8,
    borderRadius: 20, elevation: 2
  },
  secureText: { fontSize: 10, fontWeight: '800', color: '#6B7280', marginLeft: 6, letterSpacing: 0.5 }
});