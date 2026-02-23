import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from './CartContext';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#6D28D9', // Deep Pro Purple
  success: '#10B981',
  textMain: '#111827',
  textMuted: '#6B7280',
  bgLight: '#F9FAFB',
  white: '#FFFFFF',
  snackbarBg: '#374151',
};

export default function ProductDetails({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product.options ? product.options[0] : { label: product.weight, price: product.price }
  );

  // --- Pro Snackbar Animation ---
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const snackOpacity = useRef(new Animated.Value(0)).current;
  const snackTranslateY = useRef(new Animated.Value(20)).current;

  const triggerSnackbar = useCallback(() => {
    setSnackbarVisible(true);
    Animated.parallel([
      Animated.timing(snackOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(snackTranslateY, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(snackOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(snackTranslateY, { toValue: 20, duration: 250, useNativeDriver: true }),
      ]).start(() => setSnackbarVisible(false));
    }, 2000);
  }, []);

  const handleAddToCart = () => {
    const finalProduct = { 
      ...product, 
      price: selectedVariant.price, 
      weight: selectedVariant.label, 
      id: `${product.id}-${selectedVariant.label}` 
    };
    addToCart(finalProduct);
    triggerSnackbar();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="share-outline" size={22} color={COLORS.textMain} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={22} color={COLORS.textMain} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* PRODUCT HERO SECTION */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.mainImage} resizeMode="contain" />
          {product.discount && (
            <View style={styles.proDiscountBadge}>
              <Text style={styles.proDiscountText}>{product.discount.toUpperCase()}</Text>
            </View>
          )}
        </View>

        {/* DETAILS SECTION */}
        <View style={styles.detailsBox}>
          <Text style={styles.brandTag}>INSTAMART PREMIUM</Text>
          <Text style={styles.productTitle}>{product.name}</Text>
          <View style={styles.timeRow}>
            <Ionicons name="timer" size={16} color={COLORS.success} />
            <Text style={styles.timeText}>9-12 MINS</Text>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.currentPrice}>₹{selectedVariant.price}</Text>
              <Text style={styles.taxText}>MRP (Inclusive of all taxes)</Text>
            </View>
            {product.strikePrice && (
              <Text style={styles.strikePrice}>₹{product.strikePrice}</Text>
            )}
          </View>

          <View style={styles.divider} />

          {/* UNIT SELECTOR */}
          {product.options && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Unit</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantScroll}>
                {product.options.map((opt) => (
                  <TouchableOpacity
                    key={opt.label}
                    activeOpacity={0.8}
                    style={[styles.unitCard, selectedVariant.label === opt.label && styles.unitCardActive]}
                    onPress={() => setSelectedVariant(opt)}
                  >
                    <Text style={[styles.unitLabel, selectedVariant.label === opt.label && styles.unitLabelActive]}>{opt.label}</Text>
                    <Text style={styles.unitPrice}>₹{opt.price}</Text>
                    {selectedVariant.label === opt.label && (
                      <View style={styles.checkBadge}>
                        <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* DESCRIPTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.description}>
              Sourced directly and handled with care. This {product.name} is guaranteed fresh and meets all safety standards. Perfect for daily consumption.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* PRO BOTTOM BAR */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerPrice}>₹{selectedVariant.price}</Text>
          <Text style={styles.footerLink}>View bill details</Text>
        </View>
        <TouchableOpacity style={styles.proAddBtn} onPress={handleAddToCart}>
          <Text style={styles.proAddBtnText}>ADD TO CART</Text>
          <Ionicons name="cart" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* --- PRO SNACKBAR --- */}
      {snackbarVisible && (
        <Animated.View style={[styles.snackbar, { opacity: snackOpacity, transform: [{ translateY: snackTranslateY }] }]}>
          <View style={styles.snackbarContent}>
            <View style={styles.androidIcon}><Ionicons name="logo-android" size={16} color="#000" /></View>
            <Text style={styles.snackbarText}>Item added to cart</Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  headerRight: { flexDirection: 'row', gap: 15 },
  headerIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  
  imageContainer: { width: width, height: 320, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  mainImage: { width: '85%', height: '85%' },
  proDiscountBadge: { position: 'absolute', bottom: 20, left: 16, backgroundColor: '#2563EB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  proDiscountText: { color: '#FFF', fontWeight: '900', fontSize: 11, letterSpacing: 0.5 },

  detailsBox: { padding: 20, backgroundColor: COLORS.white, borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -20, elevation: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  brandTag: { color: COLORS.primary, fontWeight: '800', fontSize: 12, letterSpacing: 1.5 },
  productTitle: { fontSize: 24, fontWeight: '900', color: COLORS.textMain, marginTop: 8 },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 5 },
  timeText: { color: COLORS.success, fontWeight: '800', fontSize: 12 },
  
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 24 },
  currentPrice: { fontSize: 32, fontWeight: '900', color: COLORS.textMain },
  strikePrice: { fontSize: 18, color: '#9CA3AF', textDecorationLine: 'line-through', marginBottom: 5 },
  taxText: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 24 },
  
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.textMain, marginBottom: 16 },
  variantScroll: { flexDirection: 'row' },
  unitCard: { padding: 16, borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 16, marginRight: 12, minWidth: 100, alignItems: 'center', backgroundColor: '#FFF' },
  unitCardActive: { borderColor: COLORS.primary, backgroundColor: '#F5F3FF' },
  unitLabel: { fontSize: 15, fontWeight: '700', color: '#4B5563' },
  unitLabelActive: { color: COLORS.primary },
  unitPrice: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 },
  checkBadge: { position: 'absolute', top: -10, right: -10, backgroundColor: '#FFF', borderRadius: 10 },

  description: { fontSize: 15, color: '#4B5563', lineHeight: 24 },
  
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: width, 
    backgroundColor: '#FFF', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 18, 
    borderTopWidth: 1, 
    borderTopColor: '#F3F4F6' 
  },
  footerPrice: { fontSize: 20, fontWeight: '900', color: COLORS.textMain },
  footerLink: { fontSize: 12, color: COLORS.primary, fontWeight: '700', marginTop: 2 },
  proAddBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 10, elevation: 4 },
  proAddBtnText: { color: '#FFF', fontWeight: '900', fontSize: 15 },

  // SNACKBAR
  snackbar: { position: 'absolute', bottom: 100, alignSelf: 'center', zIndex: 9999 },
  snackbarContent: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.snackbarBg, paddingHorizontal: 22, paddingVertical: 14, borderRadius: 32, elevation: 12 },
  androidIcon: { backgroundColor: '#FFF', borderRadius: 10, padding: 3, marginRight: 12 },
  snackbarText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});