import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AccountStatementsScreen({ navigation }) {
  const [selectedDuration, setSelectedDuration] = useState(null);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 20, friction: 7, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* --- PREMIUM STICKY HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Statements</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}>
          
          {/* --- PEACH BANNER SECTION (Swiggy Style Padding) --- */}
          <View style={styles.bannerCard}>
            <View style={styles.bannerRow}>
              <View style={styles.textContainer}>
                <Text style={styles.mainTitle}>Account Statements</Text>
                <Text style={styles.subTitle}>
                  Invoices for reimbursements or record-keeping
                </Text>
              </View>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7792/7792135.png' }} 
                style={styles.bannerImg} 
              />
            </View>
          </View>

          {/* --- FORM SECTION --- */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Select Duration</Text>
            <TouchableOpacity style={styles.dropdown} activeOpacity={0.7}>
              <Text style={styles.dropdownText}>
                {selectedDuration ? selectedDuration : 'Select the time period'}
              </Text>
              <Text style={styles.chevron}>⌵</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <View style={styles.infoIconBg}>
                <Text style={{ fontSize: 14 }}>📧</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoText}>
                  Your statement will be sent within 3 hours to:
                </Text>
                <Text style={styles.userEmail}>gollapavan5273@gmail.com</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.helpLink}>
              <Text style={styles.helpText}>How account statements works?</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>

      {/* --- STICKY FOOTER BUTTON --- */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.primaryBtn, !selectedDuration && styles.disabledBtn]} 
          activeOpacity={0.8}
        >
          <Text style={styles.primaryBtnText}>Get Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  // Header
  header: {
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center'
  },
  backIcon: { fontSize: 22, color: '#000', fontWeight: 'bold' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginLeft: 15 },

  scrollContent: { paddingBottom: 120 },

  // Banner Card
  bannerCard: {
    backgroundColor: '#FFF5F0', // Soft Peach
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 28,
    padding: 25,
    overflow: 'hidden',
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textContainer: { flex: 1, paddingRight: 10 },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#1F2937', lineHeight: 30 },
  subTitle: { fontSize: 13, color: '#6B7280', marginTop: 8, lineHeight: 18, fontWeight: '500' },
  bannerImg: { width: 90, height: 90, resizeMode: 'contain' },

  // Form
  formContainer: { paddingHorizontal: 20, marginTop: 30 },
  label: { fontSize: 14, fontWeight: '800', color: '#374151', marginBottom: 12, marginLeft: 5 },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#F0F2F5',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2
  },
  dropdownText: { fontSize: 15, color: '#9CA3AF', fontWeight: '600' },
  chevron: { fontSize: 20, color: '#1F2937' },

  // Info Box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 20,
    padding: 16,
    marginTop: 25,
  },
  infoIconBg: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center',
    marginRight: 15, elevation: 1
  },
  infoText: { fontSize: 12, color: '#6B7280', lineHeight: 16 },
  userEmail: { fontSize: 13, fontWeight: '800', color: '#1F2937', marginTop: 2 },

  helpLink: { marginTop: 20, marginLeft: 5 },
  helpText: { color: '#4A0080', fontWeight: '800', fontSize: 13 },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, width: '100%',
    padding: 20, backgroundColor: '#FFF',
    borderTopWidth: 1, borderTopColor: '#F1F3F5',
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
  },
  primaryBtn: {
    backgroundColor: '#4A0080', paddingVertical: 18,
    borderRadius: 18, alignItems: 'center',
  },
  disabledBtn: { backgroundColor: '#E5E7EB' },
  primaryBtnText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
});