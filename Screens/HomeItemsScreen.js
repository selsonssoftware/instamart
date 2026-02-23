import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (width - 50) / 2; // Perfectly responsive 2-column grid

const HOME_DATA = [
  { id: '1', name: 'High-Speed Ceiling Fan', brand: 'Usha', price: '2,499', oldPrice: '3,200', img: 'https://cdn-icons-png.flaticon.com/512/911/911424.png', discount: '22% OFF' },
  { id: '2', name: 'Smart LED Bulb (12W)', brand: 'Philips', price: '499', oldPrice: '899', img: 'https://cdn-icons-png.flaticon.com/512/305/305590.png', discount: '44% OFF' },
  { id: '3', name: 'Decorative Floor Lamp', brand: 'HomeLook', price: '1,299', oldPrice: '2,499', img: 'https://cdn-icons-png.flaticon.com/512/3233/3233816.png', discount: '48% OFF' },
  { id: '4', name: 'Rechargeable Table Fan', brand: 'Bajaj', price: '1,850', oldPrice: '2,400', img: 'https://cdn-icons-png.flaticon.com/512/1000/1000782.png', discount: '23% OFF' },
];

const HOME_BANNERS = [
  'https://img.freepik.com/free-psd/interior-design-concept-social-media-banner_23-2148530328.jpg',
  'https://img.freepik.com/free-vector/modern-home-sale-banner-template_23-2148906560.jpg'
];

export default function HomeItemsScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 20, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* --- PREMIUM EARTH-TONE HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Home & Decor</Text>
            <Text style={styles.headerSubtitle}>Light up your living space</Text>
          </View>
          <TouchableOpacity style={styles.searchCircle}>
            <Text style={{ fontSize: 18 }}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}>
          
          {/* --- HERO BANNER SLIDER --- */}
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            style={styles.sliderWrapper}
          >
            {HOME_BANNERS.map((banner, index) => (
              <Image key={index} source={{ uri: banner }} style={styles.bannerImg} />
            ))}
          </ScrollView>

          {/* --- ESSENTIAL CATEGORIES --- */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Shop Essentials</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
              {['Fans', 'Lighting', 'Kitchen', 'Cleaning', 'Decor', 'Bedding'].map((cat, i) => (
                <TouchableOpacity key={i} style={styles.catChip} activeOpacity={0.7}>
                  <Text style={styles.catChipText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* --- BEST SELLERS GRID --- */}
          <View style={styles.gridSection}>
            <View style={styles.gridHeader}>
              <Text style={styles.sectionTitle}>Best Sellers</Text>
              <TouchableOpacity><Text style={styles.seeAll}>View All</Text></TouchableOpacity>
            </View>

            <View style={styles.productGrid}>
              {HOME_DATA.map((item) => (
                <TouchableOpacity key={item.id} style={styles.productCard} activeOpacity={0.9}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                  <Image source={{ uri: item.img }} style={styles.productImg} />
                  <View style={styles.productDetails}>
                    <Text style={styles.brandTag}>{item.brand}</Text>
                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.priceRow}>
                      <View>
                        <Text style={styles.price}>₹{item.price}</Text>
                        <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
                      </View>
                      <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
                        <Text style={styles.addText}>ADD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </Animated.View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- FLOATING OFFER TAG --- */}
      <View style={styles.floatingBar}>
        <Text style={styles.floatingText}>✨ FLAT 10% OFF ON ALL ELECTRICALS</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBFA' },

  // Header Styles
  header: {
    backgroundColor: '#4E342E',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#4E342E', shadowOpacity: 0.3, shadowRadius: 15
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backCircle: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center'
  },
  backIcon: { fontSize: 24, color: '#FFF' },
  titleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 19, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 11, color: '#D7CCC8', marginTop: 2, fontWeight: '600' },
  searchCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'
  },

  scrollContent: { paddingTop: 10 },

  // Slider Styles
  sliderWrapper: { marginTop: 15, paddingLeft: 20 },
  bannerImg: { 
    width: width - 40, 
    height: 180, 
    borderRadius: 24, 
    marginRight: 15, 
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#EFEBE9'
  },

  // Category Chips
  sectionContainer: { marginTop: 25 },
  sectionTitle: { fontSize: 17, fontWeight: '900', color: '#3E2723', marginLeft: 20, letterSpacing: -0.5 },
  catRow: { paddingLeft: 20, marginTop: 15, paddingRight: 20 },
  catChip: { 
    backgroundColor: '#FFF', paddingHorizontal: 22, paddingVertical: 12, 
    borderRadius: 16, marginRight: 12, elevation: 3,
    borderWidth: 1, borderColor: '#EFEBE9', shadowOpacity: 0.05
  },
  catChipText: { fontSize: 13, fontWeight: '800', color: '#5D4037' },

  // Product Grid
  gridSection: { paddingHorizontal: 20, marginTop: 30 },
  gridHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  seeAll: { color: '#8D6E63', fontWeight: '800', fontSize: 14 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { 
    width: PRODUCT_CARD_WIDTH, backgroundColor: '#FFF', borderRadius: 24, 
    marginBottom: 20, elevation: 5, shadowColor: '#4E342E', shadowOpacity: 0.08, 
    shadowRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#EFEBE9'
  },
  discountBadge: { 
    position: 'absolute', top: 0, left: 0, backgroundColor: '#795548', 
    paddingHorizontal: 10, paddingVertical: 5, borderBottomRightRadius: 15, zIndex: 2
  },
  discountText: { color: '#FFF', fontSize: 9, fontWeight: '900' },
  productImg: { width: '75%', height: 110, alignSelf: 'center', marginTop: 30, resizeMode: 'contain' },
  productDetails: { padding: 15, backgroundColor: '#FAF9F8' },
  brandTag: { fontSize: 9, color: '#A1887F', fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  productName: { fontSize: 14, fontWeight: '800', color: '#3E2723', marginVertical: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 },
  price: { fontSize: 16, fontWeight: '900', color: '#111' },
  oldPrice: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through', marginTop: 2 },
  addBtn: { backgroundColor: '#5D4037', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  addText: { color: '#FFF', fontSize: 11, fontWeight: '900' },

  floatingBar: {
    position: 'absolute', bottom: 30, alignSelf: 'center', 
    backgroundColor: 'rgba(62, 39, 35, 0.95)', paddingVertical: 14, 
    paddingHorizontal: 25, borderRadius: 20, elevation: 10
  },
  floatingText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 }
});