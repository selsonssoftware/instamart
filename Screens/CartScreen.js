import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet, View, Text, FlatList, Image, TouchableOpacity,
  SafeAreaView, StatusBar, Platform, Dimensions, Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from './CartContext';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#6D28D9',
  secondary: '#F59E0B',
  bg: '#F4F7FE', // Brighter, more modern background
  white: '#FFFFFF',
  textDark: '#0F172A',
  textLight: '#64748B',
  success: '#10B981',
  danger: '#EF4444',
  snackbarBg: '#1E293B',
  accentBg: '#EEF2FF',
};

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, deleteItem } = useCart();

  // --- Snackbar Logic ---
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const snackbarOpacity = useRef(new Animated.Value(0)).current;
  const snackbarTranslateY = useRef(new Animated.Value(20)).current;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.toString().replace(/[^0-9]/g, '')) || 0;
    return acc + (price * (item.quantity || 1));
  }, 0);

  const deliveryFee = subtotal > 500 ? 0 : 25;
  const handlingFee = subtotal > 0 ? 7 : 0;
  const estimatedSavings = Math.floor(subtotal * 0.1); // Dynamic savings logic
  const totalAmount = subtotal + deliveryFee + handlingFee;

  const triggerSnackbar = useCallback(() => {
    setSnackbarVisible(true);
    Animated.parallel([
      Animated.timing(snackbarOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(snackbarTranslateY, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(snackbarOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(snackbarTranslateY, { toValue: 20, duration: 250, useNativeDriver: true }),
      ]).start(() => setSnackbarVisible(false));
    }, 2000);
  }, []);

  const renderCartItem = ({ item }) => {
    const unitPrice = parseInt(item.price.toString().replace(/[^0-9]/g, '')) || 0;
    const lineTotal = unitPrice * item.quantity;

    return (
      <View style={styles.cartCard}>
        <View style={styles.cardMain}>
          <View style={styles.imgContainer}>
            <Image 
              source={typeof item.image === 'number' ? item.image : { uri: item.image }} 
              style={styles.productImg} 
              resizeMode="contain" 
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.productWeight}>{item.weight || 'Standard Pack'}</Text>
            
            <View style={styles.calculationRow}>
              <View style={styles.mathBadge}>
                <Text style={styles.mathText}>{item.quantity} × ₹{unitPrice}</Text>
              </View>
              <Text style={styles.itemLineTotal}>₹{lineTotal}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity 
            onPress={() => { deleteItem(item.id); triggerSnackbar(); }} 
            style={styles.removeBtn}
          >
            <Ionicons name="trash-bin-outline" size={16} color={COLORS.danger} />
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>

          <View style={styles.qtyBox}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 'dec')} style={styles.qtyBtn}>
              <Ionicons name="remove" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 'inc')} style={styles.qtyBtn}>
              <Ionicons name="add" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerCircle}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.statusBadge}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>{cartItems.length} ITEMS READY</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerCircle}>
          <Ionicons name="share-outline" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={subtotal > 0 && (
          <View style={styles.savingsBanner}>
            <Ionicons name="sparkles" size={18} color={COLORS.secondary} />
            <Text style={styles.savingsBannerText}>You're saving ₹{estimatedSavings} on this order!</Text>
          </View>
        )}
        ListFooterComponent={cartItems.length > 0 && (
          <View style={styles.billSection}>
            <Text style={styles.billHeading}>Payment Summary</Text>
            <View style={styles.billCard}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Order Total</Text>
                <Text style={styles.billVal}>₹{subtotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Convenience Fee</Text>
                <Text style={styles.billVal}>₹{handlingFee}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={[styles.billVal, deliveryFee === 0 && {color: COLORS.success, fontWeight: '900'}]}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </Text>
              </View>
              <View style={styles.dashedLine} />
              <View style={styles.totalRow}>
                <Text style={styles.grandLabel}>Grand Total</Text>
                <Text style={styles.grandVal}>₹{totalAmount}</Text>
              </View>
            </View>
            
            <View style={styles.safeTag}>
               <Ionicons name="shield-checkmark" size={16} color={COLORS.textLight} />
               <Text style={styles.safeTagText}>100% Secure Checkout with Instamart</Text>
            </View>
          </View>
        )}
      />

      {/* ULTRA SNACKBAR */}
      {snackbarVisible && (
        <Animated.View style={[styles.snackbar, { opacity: snackbarOpacity, transform: [{ translateY: snackbarTranslateY }] }]}>
          <View style={styles.snackbarContent}>
            <View style={styles.androidIcon}><Ionicons name="logo-android" size={16} color="#000" /></View>
            <Text style={styles.snackbarText}>Updated Successfully</Text>
          </View>
        </Animated.View>
      )}

      {/* FOOTER ACTION BAR */}
      {cartItems.length > 0 && (
        <View style={styles.footerBar}>
          <View style={styles.footerPriceInfo}>
            <Text style={styles.totalPriceText}>₹{totalAmount}</Text>
            <TouchableOpacity><Text style={styles.viewBillText}>View detailed bill</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('SelectAddress')}>
            <Text style={styles.payBtnText}>Select Address</Text>
            <View style={styles.payIconBox}>
              <Ionicons name="chevron-forward" size={18} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: COLORS.white,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
    marginTop: Platform.OS === 'android' ? 30 : 0, elevation: 8, shadowOpacity: 0.1
  },
  headerCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  headerContent: { alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.textDark },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4, backgroundColor: '#F5F3FF', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginRight: 6 },
  statusText: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 0.5 },

  listContent: { paddingBottom: 180, paddingTop: 10 },
  savingsBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', marginHorizontal: 20, padding: 12, borderRadius: 12, marginBottom: 10, gap: 8 },
  savingsBannerText: { color: '#92400E', fontWeight: '800', fontSize: 13 },

  cartCard: {
    backgroundColor: COLORS.white, marginHorizontal: 20, marginTop: 15,
    borderRadius: 28, padding: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05
  },
  cardMain: { flexDirection: 'row', alignItems: 'center' },
  imgContainer: { backgroundColor: '#F8FAFC', borderRadius: 20, padding: 12 },
  productImg: { width: 60, height: 60 },
  infoContainer: { flex: 1, marginLeft: 16 },
  productName: { fontSize: 16, fontWeight: '900', color: COLORS.textDark },
  productWeight: { fontSize: 12, color: COLORS.textLight, marginTop: 2, fontWeight: '600' },
  
  calculationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  mathBadge: { backgroundColor: COLORS.accentBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  mathText: { fontSize: 12, fontWeight: '800', color: COLORS.primary },
  itemLineTotal: { fontSize: 18, fontWeight: '900', color: COLORS.textDark },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  removeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8 },
  removeText: { fontSize: 12, fontWeight: '700', color: COLORS.danger },
  
  qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accentBg, borderRadius: 15, padding: 4 },
  qtyBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  qtyText: { marginHorizontal: 12, fontWeight: '900', color: COLORS.primary, fontSize: 16 },

  billSection: { marginTop: 20, paddingHorizontal: 20 },
  billHeading: { fontSize: 18, fontWeight: '900', color: COLORS.textDark, marginBottom: 15, marginLeft: 5 },
  billCard: { backgroundColor: COLORS.white, padding: 25, borderRadius: 32, elevation: 3 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  billLabel: { fontSize: 14, color: COLORS.textLight, fontWeight: '700' },
  billVal: { fontSize: 14, fontWeight: '800', color: COLORS.textDark },
  dashedLine: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  grandLabel: { fontSize: 18, fontWeight: '900', color: COLORS.textDark },
  grandVal: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
  safeTag: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, gap: 6 },
  safeTagText: { fontSize: 11, color: COLORS.textLight, fontWeight: '600' },

  footerBar: {
    position: 'absolute', bottom: 0, width: '100%', backgroundColor: COLORS.white,
    padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopLeftRadius: 45, borderTopRightRadius: 45, elevation: 35, shadowOpacity: 0.2
  },
  footerPriceInfo: { flex: 1 },
  totalPriceText: { fontSize: 32, fontWeight: '900', color: COLORS.textDark },
  viewBillText: { fontSize: 11, fontWeight: '800', color: COLORS.primary, marginTop: 2 },
  payBtn: {
    backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 18,
    borderRadius: 24, flexDirection: 'row', alignItems: 'center', gap: 10, elevation: 12
  },
  payBtnText: { color: COLORS.white, fontWeight: '900', fontSize: 16 },
  payIconBox: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 4, borderRadius: 8 },

  snackbar: { position: 'absolute', bottom: 120, alignSelf: 'center', zIndex: 9999 },
  snackbarContent: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.snackbarBg, paddingHorizontal: 22, paddingVertical: 14, borderRadius: 32, elevation: 15 },
  androidIcon: { backgroundColor: '#FFF', borderRadius: 12, padding: 4, marginRight: 12 },
  snackbarText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
});