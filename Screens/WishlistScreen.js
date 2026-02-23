import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from './CartContext'; 

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#6D28D9',
  bg: '#F8F9FA',
  white: '#FFFFFF',
  textMain: '#1F2937',
  textMuted: '#6B7280',
  accent: '#E11D48', // Instamart Pink/Red
  snackbarBg: '#374151',
};

export default function WishlistScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addToCart } = useCart();
  
  const [items, setItems] = useState(route.params?.items || []);
  
  // --- Snackbar States ---
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const snackbarOpacity = useRef(new Animated.Value(0)).current;
  const snackbarTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (route.params?.items) {
      setItems(route.params.items);
    }
  }, [route.params?.items]);

  const triggerSnackbar = useCallback((msg) => {
    setSnackbarMsg(msg);
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

  const removeItem = (id) => {
    const filtered = items.filter(item => item.id !== id);
    setItems(filtered);
    triggerSnackbar("Removed from Wishlist");
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeItem(item.id); // Typically "Move to Cart" removes it from Wishlist
    triggerSnackbar("Moved to Cart");
  };

  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Ionicons name="heart-outline" size={80} color="#E5E7EB" />
      </View>
      <Text style={styles.emptyTitle}>Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>Your favorite items will appear here.</Text>
      <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.goBack()}>
        <Text style={styles.shopNowText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircleHeader}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>My Wishlist</Text>
          <Text style={styles.itemCount}>{items.length} Items saved</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {items.length === 0 ? renderEmptyWishlist() : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {items.map((item) => (
              <View key={item.id} style={styles.card}>
                {/* Remove Icon */}
                <TouchableOpacity style={styles.removeIcon} onPress={() => removeItem(item.id)}>
                  <Ionicons name="trash-outline" size={18} color={COLORS.accent} />
                </TouchableOpacity>

                <View style={styles.imageBox}>
                  <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                </View>

                <View style={styles.infoBox}>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.weightText}>{item.weight || '1 unit'}</Text>
                  
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{item.price}</Text>
                    {item.strikePrice && <Text style={styles.strikePrice}>₹{item.strikePrice}</Text>}
                  </View>

                  <TouchableOpacity style={styles.moveToCartBtn} onPress={() => handleMoveToCart(item)}>
                    <Text style={styles.moveToCartText}>Move to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* --- SNACKBAR --- */}
      {snackbarVisible && (
        <Animated.View style={[styles.snackbar, { opacity: snackbarOpacity, transform: [{ translateY: snackbarTranslateY }] }]}>
          <View style={styles.snackbarContent}>
            <View style={styles.androidIconBox}><Ionicons name="logo-android" size={16} color="#000" /></View>
            <Text style={styles.snackbarText}>{snackbarMsg}</Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  iconCircleHeader: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  itemCount: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500' },
  
  scrollContent: { paddingBottom: 100, paddingTop: 15 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15 },
  
  card: {
    backgroundColor: '#fff',
    width: (width / 2) - 22,
    borderRadius: 16,
    marginBottom: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 3,
  },
  removeIcon: { position: 'absolute', top: 10, right: 10, zIndex: 10, backgroundColor: '#FFF1F2', padding: 6, borderRadius: 10 },
  imageBox: { height: 110, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  productImage: { width: '85%', height: '85%' },
  
  infoBox: { marginTop: 5 },
  productName: { fontSize: 14, fontWeight: '700', color: COLORS.textMain },
  weightText: { fontSize: 12, color: COLORS.textMuted, marginVertical: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  price: { fontSize: 16, fontWeight: '800', color: COLORS.textMain },
  strikePrice: { fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through', marginLeft: 6 },
  
  moveToCartBtn: { backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  moveToCartText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyIconCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 2 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginBottom: 30 },
  shopNowButton: { backgroundColor: COLORS.primary, paddingHorizontal: 40, paddingVertical: 14, borderRadius: 12 },
  shopNowText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  // Snackbar
  snackbar: { position: 'absolute', bottom: 40, alignSelf: 'center', zIndex: 9999 },
  snackbarContent: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.snackbarBg, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 8 },
  androidIconBox: { backgroundColor: '#fff', borderRadius: 10, padding: 3, marginRight: 12 },
  snackbarText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});