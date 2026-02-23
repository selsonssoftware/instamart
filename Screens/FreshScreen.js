import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  SafeAreaView, StatusBar, Animated, Dimensions, Platform, Alert
} from 'react-native';

const { width } = Dimensions.get('window');

// --- RESPONSIVE SCALING HELPERS ---
const scale = (size) => (width / 375) * size; // Base width 375 (iPhone size)
const CARD_WIDTH = (width - 48) / 2; 

const DEALS_DATA = [
  { id: 'e1', name: 'Little Hearts', weight: '75 g', price: 1, oldPrice: 20, img: 'https://www.bigbasket.com/media/uploads/p/l/266579_25-britannia-little-hearts-classic-biscuits.jpg' },
  { id: 'e2', name: 'Hershey Kisses', weight: '33 g', price: 1, oldPrice: 55, img: 'https://m.media-amazon.com/images/I/61y8yNl6KRL._SL1500_.jpg' },
];

const FRESH_DATA = [
  { id: 'f1', name: 'Tender Coconut', weight: '1 pc', price: 49, oldPrice: 69, img: 'https://cdn-icons-png.flaticon.com/512/1202/1202125.png' },
  { id: 'f2', name: 'Robusta Banana', weight: '500 g', price: 33, oldPrice: 44, img: 'https://cdn-icons-png.flaticon.com/512/2965/2965701.png' },
  { id: 'f3', name: 'Fresh Tomato', weight: '1 kg', price: 15, oldPrice: 20, img: 'https://cdn-icons-png.flaticon.com/512/2329/2329865.png' },
  { id: 'f4', name: 'Green Grapes', weight: '500 g', price: 80, oldPrice: 110, img: 'https://cdn-icons-png.flaticon.com/512/3198/3198888.png' },
];

export default function FreshScreen({ navigation, route }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Home screen nundi vachina cart state props
  const { cartItems, setCartItems } = route.params || { cartItems: [], setCartItems: () => {} };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    Alert.alert("Success! 🛒", `${product.name}  Add To Home cart .`);
  };

  const ProductCard = ({ item }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressAdd = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start(() => handleAddToCart(item));
    };

    return (
      <View style={styles.productCard}>
        <TouchableOpacity style={styles.wishlistIcon} activeOpacity={0.6}>
          <View style={styles.heartCircle}>
            <Text style={{ fontSize: scale(14) }}>❤️</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.img }} style={styles.productImg} resizeMode="contain" />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.weight}</Text>
          
          <View style={styles.footerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.currentPrice}>₹{item.price}</Text>
              <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
            </View>
            
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity 
                    style={styles.addButton} 
                    activeOpacity={0.8}
                    onPress={onPressAdd}
                >
                    <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* --- RESPONSIVE DYNAMIC HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Fresh Picks</Text>
            <Text style={styles.headerSub}>Fast Delivery in 12m</Text>
        </View>
        
        <TouchableOpacity style={styles.iconButton}>
          <Text style={{ fontSize: scale(18) }}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ flex: 1, opacity: fadeAnim }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Everyday Deals Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Everyday Deals</Text>
          <TouchableOpacity style={styles.seeAllBadge}>
            <Text style={styles.seeAllText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          {DEALS_DATA.map(item => <ProductCard key={item.id} item={item} />)}
        </View>

        {/* Fresh Items Section */}
        <View style={[styles.sectionHeader, { marginTop: scale(24) }]}>
          <Text style={styles.sectionTitle}>Fresh Items</Text>
          <TouchableOpacity style={styles.seeAllBadge}>
            <Text style={styles.seeAllText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          {FRESH_DATA.map(item => <ProductCard key={item.id} item={item} />)}
        </View>

        <View style={{ height: scale(100) }} />
      </Animated.ScrollView>

      {/* Hygiene Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>🛡️ 100% HYGIENICALLY PACKED & DELIVERED</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBFF' },
  
  // --- RESPONSIVE HEADER ---
  header: {
    width: '100%',
    height: Platform.OS === 'ios' ? width * 0.22 : width * 0.30,
    backgroundColor: '#3d25ab',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : width * 0.04,
    
  },
  headerCenter: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  headerTitle: { 
    fontSize: width * 0.048, 
    fontWeight: '900', 
    color: '#ffffff', 
    letterSpacing: -0.5 
  },
  headerSub: { 
    fontSize: width * 0.03, 
    color: '#ffffff', 
    fontWeight: '800', 
    marginTop: 2 
  },
  iconButton: { 
    width: width * 0.11, 
    height: width * 0.11, 
    borderRadius: 12, 
    backgroundColor: '#F4F6F9', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  backText: { 
    fontSize: width * 0.07, 
    color: '#333', 
    fontWeight: '300' 
  },

  scrollContent: { paddingVertical: 12 },

  // Sections
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    marginBottom: 14
  },
  sectionTitle: { fontSize: scale(20), fontWeight: '900', color: '#2D3436' },
  seeAllBadge: { backgroundColor: '#F0E6FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  seeAllText: { color: '#4A0080', fontWeight: '900', fontSize: scale(10) },

  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },

  // Cards
  productCard: { 
    width: CARD_WIDTH, 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    padding: 10, 
    marginBottom: 16,
    shadowColor: '#4A0080',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F3F5'
  },
  wishlistIcon: { position: 'absolute', top: 12, right: 12, zIndex: 10 },
  heartCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.95)', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  imageWrapper: { 
    height: scale(120), 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    borderRadius: 20,
    overflow: 'hidden'
  },
  productImg: { width: '85%', height: '85%' },
  infoContainer: { marginTop: 12, paddingHorizontal: 4 },
  productName: { fontSize: scale(15), fontWeight: '800', color: '#1A1A1A' },
  productWeight: { fontSize: scale(12), color: '#95A5A6', marginTop: 4, fontWeight: '600' },
  footerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 12 
  },
  currentPrice: { fontSize: scale(18), fontWeight: '900', color: '#000' },
  oldPrice: { fontSize: scale(11), color: '#BDC3C7', textDecorationLine: 'line-through', marginTop: 1 },
  addButton: { 
    backgroundColor: '#FFF', 
    paddingHorizontal: scale(16), 
    paddingVertical: scale(8), 
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4A0080'
  },
  addButtonText: { color: '#4A0080', fontSize: scale(12), fontWeight: '900' },

  // Bottom hygiene bar
  bottomBar: { 
    position: 'absolute', 
    bottom: 25, 
    alignSelf: 'center', 
    backgroundColor: 'rgba(31, 38, 42, 0.98)', 
    paddingVertical: 14, 
    paddingHorizontal: 24, 
    borderRadius: 18,
    elevation: 10
  },
  bottomBarText: { color: '#FFF', fontSize: scale(10), fontWeight: '900', letterSpacing: 0.8 }
});