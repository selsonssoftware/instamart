import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Dynamic scaling units for perfect responsiveness
const SCALE = width / 375; // 375 is standard iPhone width
const normalize = (size) => Math.round(size * SCALE);
const PADDING = width * 0.05; // 5% standard padding

export default function MyRefundsScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideIn = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideIn, { toValue: 0, tension: 20, friction: 8, useNativeDriver: true }),
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
        <Text style={styles.headerTitle}>Refund Status</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideIn }] }}>
          
          {/* --- MODERN INFO ALERT --- */}
          <View style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>IMPORTANT</Text>
              </View>
              <View style={styles.iconCircle}>
                <Text style={styles.rupeeIcon}>₹</Text>
                <View style={styles.rotateArrow}>
                  <Text style={{ fontSize: normalize(10), color: '#4A0080' }}>↺</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.alertDescription}>
              Due to some ongoing enhancements to Swiggy Money, your refunds will be directed to the original{' '}
              <Text style={styles.boldAccent}>payment source.</Text>
            </Text>
          </View>

          {/* --- PRO EMPTY STATE --- */}
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
               <Text style={styles.emptyEmoji}>💸</Text>
            </View>
            <Text style={styles.emptyMainText}>No past refunds found</Text>
            <Text style={styles.emptySubText}>
              Any refunds you receive will be displayed here for your reference.
            </Text>
          </View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- FULLY RESPONSIVE & NEAT STYLES ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FB' 
  },

  // Header Responsive
  header: {
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + height * 0.055 : height * 0.015,
    paddingBottom: height * 0.02,
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
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
    letterSpacing: 0.5 
  },

  scrollContent: { 
    paddingHorizontal: PADDING, 
    paddingTop: height * 0.025 
  },

  // Alert Card Responsive
  alertCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: PADDING,
    borderWidth: 1,
    borderColor: '#F0F2F5',
    elevation: 4,
    shadowColor: '#4A0080',
    shadowOpacity: 0.06,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
  },
  alertHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: height * 0.02 
  },
  infoBadge: { 
    backgroundColor: '#F0E6FF', 
    paddingHorizontal: width * 0.025, 
    paddingVertical: height * 0.005, 
    borderRadius: 6 
  },
  infoText: { 
    fontSize: normalize(9), 
    color: '#4A0080', 
    fontWeight: '900' 
  },
  
  iconCircle: {
    width: width * 0.11, 
    height: width * 0.11, 
    borderRadius: (width * 0.11) / 2,
    backgroundColor: '#F8F9FB', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#E5E7EB'
  },
  rupeeIcon: { 
    fontSize: normalize(14), 
    color: '#1F2937', 
    fontWeight: 'bold' 
  },
  rotateArrow: { 
    position: 'absolute', 
    right: 8, 
    top: 8 
  },

  alertDescription: { 
    fontSize: normalize(12), 
    color: '#6B7280', 
    lineHeight: normalize(18) 
  },
  boldAccent: { 
    fontWeight: '800', 
    color: '#1F2937' 
  },

  // Empty State Responsive
  emptyContainer: {
    marginTop: height * 0.12,
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },
  emptyIconBg: {
    width: width * 0.2, 
    height: width * 0.2, 
    borderRadius: (width * 0.2) / 2,
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3, 
    shadowOpacity: 0.05, 
    marginBottom: height * 0.03,
    borderWidth: 1, 
    borderColor: '#F0F2F5'
  },
  emptyEmoji: { 
    fontSize: normalize(28), 
    opacity: 0.5 
  },
  emptyMainText: { 
    fontSize: normalize(16), 
    fontWeight: '800', 
    color: '#374151', 
    textAlign: 'center' 
  },
  emptySubText: { 
    fontSize: normalize(12), 
    color: '#9CA3AF', 
    textAlign: 'center', 
    marginTop: height * 0.015, 
    lineHeight: normalize(18), 
    fontWeight: '500' 
  },
});