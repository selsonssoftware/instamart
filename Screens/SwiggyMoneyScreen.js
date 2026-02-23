import React, { useEffect, useRef } from 'react';
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

// Dynamic scaling units for perfect responsiveness
const SCALE = width / 375; // 375 is standard iPhone width
const normalize = (size) => Math.round(size * SCALE);
const PADDING = width * 0.05; // 5% standard padding

export default function SwiggyMoneyScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 20, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* --- PREMIUM HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backCircle}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Swiggy Money</Text>
          <View style={styles.poweredBy}>
            <Text style={styles.poweredText}>powered by</Text>
            <Text style={styles.razorpayText}>Razorpay</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}>
          
          {/* --- PURPLE BALANCE CARD --- */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceRow}>
              <View>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceAmount}>₹0</Text>
              </View>
              <View style={styles.iconCircle}>
                <Text style={{ fontSize: normalize(28) }}>💰</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.balanceDesc}>
              Swiggy money can be used for all your orders across Food, Instamart, Dineout & more.
            </Text>
          </View>

          {/* --- GIFT VOUCHER SECTION --- */}
          <TouchableOpacity style={styles.promoCard} activeOpacity={0.9}>
            <View style={styles.promoInfo}>
              <Text style={styles.promoTitle}>Share love through e-gift vouchers!</Text>
              <Text style={styles.promoSub}>Celebrate special occasions with your loved ones.</Text>
              <Text style={styles.actionLink}>Buy a gift voucher →</Text>
            </View>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6041/6041440.png' }} 
              style={styles.promoImg} 
            />
          </TouchableOpacity>

          {/* --- ALERT CARD --- */}
          <View style={styles.alertCard}>
            <View style={styles.alertIconBg}>
              <Text style={{ fontSize: normalize(18) }}>💳</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Major update alert!</Text>
              <Text style={styles.alertSub}>HDFC Credit Card cashback now credits directly in the statement.</Text>
            </View>
          </View>

          {/* --- EMPTY STATE --- */}
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
               <Text style={{ fontSize: normalize(45), opacity: 0.2 }}>🏦</Text>
            </View>
            <Text style={styles.emptyLabel}>No recent transactions</Text>
          </View>

        </Animated.View>
        <View style={{ height: height * 0.05 }} />
      </ScrollView>

      {/* --- STICKY FOOTER --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.mainAddBtn} activeOpacity={0.8}>
          <Text style={styles.mainAddBtnText}>Add Balance</Text>
        </TouchableOpacity>
        <View style={styles.redeemRow}>
          <Text style={styles.haveVoucher}>Have a gift voucher? </Text>
          <TouchableOpacity>
            <Text style={styles.redeemNow}>Redeem Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- FULLY RESPONSIVE & NEAT STYLES ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FB' 
  },

  // Header Styles
  header: {
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + height * 0.055 : height * 0.015,
    paddingBottom: height * 0.02,
    paddingHorizontal: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  headerMain: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
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
    color: '#4A0080', 
    fontWeight: 'bold' 
  },
  headerTitle: { 
    fontSize: normalize(15), 
    fontWeight: '800', 
    color: '#1F2937', 
    flex: 1, 
    marginLeft: width * 0.04 
  },
  poweredBy: { 
    alignItems: 'flex-end' 
  },
  poweredText: { 
    fontSize: normalize(7), 
    color: '#9CA3AF', 
    fontWeight: '800', 
    textTransform: 'uppercase' 
  },
  razorpayText: { 
    fontSize: normalize(10), 
    fontWeight: '900', 
    color: '#02042B' 
  },

  scrollContent: { 
    paddingHorizontal: PADDING, 
    paddingTop: height * 0.025, 
    paddingBottom: height * 0.18 // Ensures content clears the absolute footer
  },

  // Balance Card Styles
  balanceCard: {
    backgroundColor: '#4A0080',
    borderRadius: 28,
    padding: PADDING,
    marginBottom: height * 0.025,
    elevation: 10,
    shadowColor: '#4A0080',
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
  },
  balanceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  balanceLabel: { 
    color: '#E0B0FF', 
    fontSize: normalize(12), 
    fontWeight: '700', 
    letterSpacing: 0.5 
  },
  balanceAmount: { 
    color: '#FFF', 
    fontSize: normalize(44), 
    fontWeight: '900', 
    marginTop: height * 0.005 
  },
  iconCircle: {
    width: width * 0.15, 
    height: width * 0.15, 
    borderRadius: (width * 0.15) / 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  divider: { 
    height: 1, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    marginVertical: height * 0.025 
  },
  balanceDesc: { 
    color: '#FFF', 
    fontSize: normalize(11), 
    opacity: 0.7, 
    lineHeight: normalize(16), 
    fontWeight: '500' 
  },

  // Promo Card Styles
  promoCard: {
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    padding: PADDING,
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: height * 0.02,
    borderWidth: 1, 
    borderColor: '#F0F2F5', 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  promoInfo: { 
    flex: 1 
  },
  promoTitle: { 
    fontSize: normalize(13), 
    fontWeight: '800', 
    color: '#1F2937' 
  },
  promoSub: { 
    fontSize: normalize(11), 
    color: '#6B7280', 
    marginTop: height * 0.006, 
    lineHeight: normalize(15) 
  },
  actionLink: { 
    color: '#4A0080', 
    fontWeight: '900', 
    marginTop: height * 0.015, 
    fontSize: normalize(11) 
  },
  promoImg: { 
    width: width * 0.18, 
    height: width * 0.18, 
    resizeMode: 'contain', 
    marginLeft: width * 0.025 
  },

  // Alert Card Styles
  alertCard: {
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: width * 0.04,
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#F0F2F5'
  },
  alertIconBg: {
    width: width * 0.12, 
    height: width * 0.12, 
    borderRadius: 12,
    backgroundColor: '#F8F9FB', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: width * 0.04
  },
  alertTitle: { 
    fontSize: normalize(12), 
    fontWeight: '800', 
    color: '#1F2937' 
  },
  alertSub: { 
    fontSize: normalize(10), 
    color: '#9CA3AF', 
    marginTop: height * 0.003, 
    lineHeight: normalize(14) 
  },

  // Empty State Styles
  emptyContainer: { 
    alignItems: 'center', 
    marginTop: height * 0.05 
  },
  emptyIconBg: { 
    opacity: 0.5, 
    marginBottom: height * 0.01 
  },
  emptyLabel: { 
    color: '#9CA3AF', 
    fontSize: normalize(12), 
    fontWeight: '600' 
  },

  // Footer Styles
  footer: {
    position: 'absolute', 
    bottom: 0, 
    width: '100%',
    paddingHorizontal: PADDING,
    paddingTop: height * 0.02,
    backgroundColor: '#FFF',
    borderTopWidth: 1, 
    borderTopColor: '#F1F3F5',
    paddingBottom: Platform.OS === 'ios' ? height * 0.04 : height * 0.02,
    elevation: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
  },
  mainAddBtn: {
    backgroundColor: '#4A0080', 
    paddingVertical: height * 0.022,
    borderRadius: 18, 
    alignItems: 'center', 
    marginBottom: height * 0.018,
  },
  mainAddBtnText: { 
    color: '#FFF', 
    fontWeight: '900', 
    fontSize: normalize(14), 
    letterSpacing: 0.5 
  },
  redeemRow: { 
    flexDirection: 'row', 
    justifyContent: 'center' 
  },
  haveVoucher: { 
    color: '#6B7280', 
    fontSize: normalize(11), 
    fontWeight: '500' 
  },
  redeemNow: { 
    color: '#4A0080', 
    fontWeight: '900', 
    fontSize: normalize(11) 
  }
});