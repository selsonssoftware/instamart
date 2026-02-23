import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Dynamic scaling units
const SCALE = width / 375; // Using 375 as base width (iPhone X/11/12 Pro)
const normalize = (size) => Math.round(size * SCALE);

const SAVED_ADDRESSES = [
  {
    id: '1',
    type: 'Home',
    icon: '🏠',
    details: 'Hot Chips, Kamaraj Colony, Kodambakkam, Chennai, Tamil Nadu 600024, India',
    phone: '8688521177',
  },
  {
    id: '2',
    type: 'Work',
    icon: '💼',
    details: 'Selsons Software Developer, Bupathinagar, Boopathy Nagar, Kodambakkam, Chennai, Tamil Nadu 600024, India',
    phone: '8688521177',
  },
  {
    id: '3',
    type: 'Golla Pavan',
    icon: '📍',
    details: 'Railway Station, Madanapalli Road, Bodumalluvaripalle, Andhra Pradesh 517214, India (pileru)',
    phone: '8688521177',
  },
  {
    id: '4',
    type: 'Pavan',
    icon: '📍',
    details: 'Vsr Hostel, Vsr Chittor Road Boy Hostel, Doddipalle, Andhra Pradesh 517214, India',
    phone: '8688521177',
  },
];

export default function SavedAddressScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 30, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* --- PREMIUM HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backCircle}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADDRESSES</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}>
          
          {/* --- SEARCH BOX --- */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <Text style={styles.glassIcon}>🔍</Text>
              <TextInput 
                placeholder="Search your saved addresses" 
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <Text style={styles.sectionLabel}>SAVED ADDRESSES</Text>

          {/* --- ADDRESS LIST --- */}
          <View style={styles.listWrapper}>
            {SAVED_ADDRESSES.map((item, index) => (
              <View key={item.id} style={[styles.addressCard, index === SAVED_ADDRESSES.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.cardRow}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.emojiIcon}>{item.icon}</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.addressType}>{item.type}</Text>
                    <Text style={styles.addressDetails}>{item.details}</Text>
                    <Text style={styles.phoneLabel}>Phone: <Text style={styles.phoneNum}>{item.phone}</Text></Text>
                    
                    <View style={styles.actionGroup}>
                      <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.editText}>EDIT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.deleteText}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* --- FLOATING FOOTER --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addFullBtn} activeOpacity={0.8}>
          <Text style={styles.addFullBtnText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- FULLY RESPONSIVE & PREMIUM STYLES ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FB' 
  },
  
  header: {
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + height * 0.055 : height * 0.015,
    paddingBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  backCircle: {
    width: width * 0.1, 
    height: width * 0.1, 
    borderRadius: (width * 0.1) / 2,
    backgroundColor: '#F3F4F6', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  backIcon: { 
    fontSize: normalize(20), 
    color: '#1F2937' 
  },
  headerTitle: { 
    fontSize: normalize(15), 
    fontWeight: '900', 
    color: '#1F2937', 
    marginLeft: width * 0.04, 
    letterSpacing: 1 
  },

  scrollContent: { 
    paddingBottom: height * 0.15 // Ensures content is not hidden behind the absolute footer
  },

  searchContainer: { 
    backgroundColor: '#FFF', 
    padding: width * 0.05, 
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25, 
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchBox: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#F3F4F6', 
    borderRadius: 12,
    paddingHorizontal: width * 0.04, 
    height: height * 0.065,
    borderWidth: 1, 
    borderColor: '#E5E7EB'
  },
  glassIcon: { 
    fontSize: normalize(16), 
    marginRight: width * 0.025 
  },
  input: { 
    flex: 1, 
    fontSize: normalize(14), 
    color: '#1F2937', 
    fontWeight: '500' 
  },

  sectionLabel: {
    fontSize: normalize(12), 
    fontWeight: '900', 
    color: '#9CA3AF',
    marginLeft: width * 0.05, 
    marginTop: height * 0.035, 
    marginBottom: height * 0.02, 
    letterSpacing: 1.5
  },

  listWrapper: { 
    backgroundColor: '#FFF', 
    marginHorizontal: width * 0.04, 
    borderRadius: 20, 
    overflow: 'hidden', 
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  addressCard: { 
    paddingVertical: height * 0.025, 
    paddingHorizontal: width * 0.045, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F8F9FA' 
  },
  cardRow: { 
    flexDirection: 'row' 
  },
  iconContainer: { 
    width: width * 0.11, 
    height: width * 0.11, 
    borderRadius: 12, 
    backgroundColor: '#F8F9FB', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emojiIcon: { 
    fontSize: normalize(18) 
  },
  detailsContainer: { 
    flex: 1, 
    marginLeft: width * 0.04 
  },
  addressType: { 
    fontSize: normalize(15), 
    fontWeight: '800', 
    color: '#1F2937', 
    marginBottom: height * 0.006 
  },
  addressDetails: { 
    fontSize: normalize(13), 
    color: '#6B7280', 
    lineHeight: normalize(18), 
    marginBottom: height * 0.01 
  },
  phoneLabel: { 
    fontSize: normalize(12), 
    color: '#9CA3AF', 
    fontWeight: '600', 
    marginBottom: height * 0.018 
  },
  phoneNum: { 
    color: '#4B5563' 
  },

  actionGroup: { 
    flexDirection: 'row' 
  },
  actionBtn: { 
    marginRight: width * 0.06 
  },
  editText: { 
    fontSize: normalize(13), 
    fontWeight: '900', 
    color: '#007AFF' 
  },
  deleteText: { 
    fontSize: normalize(13), 
    fontWeight: '900', 
    color: '#e23744' 
  },

  footer: {
    position: 'absolute', 
    bottom: 0, 
    width: '100%',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
    backgroundColor: '#FFF',
    borderTopWidth: 1, 
    borderTopColor: '#F1F3F5',
    paddingBottom: Platform.OS === 'ios' ? height * 0.04 : height * 0.02,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  addFullBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#60B246',
    paddingVertical: height * 0.018,
    borderRadius: 12,
    alignItems: 'center'
  },
  addFullBtnText: { 
    color: '#60B246', 
    fontWeight: '900', 
    fontSize: normalize(14), 
    letterSpacing: 1 
  }
});