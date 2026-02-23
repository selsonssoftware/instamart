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
} from 'react-native';

const { width } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = width * 0.44;

const SPORTS_PRODUCTS = [
  { id: '1', name: 'English Willow Bat', brand: 'SG Scorer', price: '4,599', oldPrice: '6,200', img: 'https://cdn-icons-png.flaticon.com/512/5351/5351517.png', discount: '25% OFF' },
  { id: '2', name: 'FIFA Match Ball', brand: 'Adidas', price: '1,299', oldPrice: '1,999', img: 'https://cdn-icons-png.flaticon.com/512/33/33736.png', discount: '35% OFF' },
  { id: '3', name: 'Dumbbell Set (5kg)', brand: 'Kore', price: '899', oldPrice: '1,500', img: 'https://cdn-icons-png.flaticon.com/512/3043/3043232.png', discount: '40% OFF' },
  { id: '4', name: 'Badminton Racket', brand: 'Yonex', price: '2,450', oldPrice: '3,100', img: 'https://cdn-icons-png.flaticon.com/512/1041/1041168.png', discount: '20% OFF' },
];

const SPORTS_BANNERS = [
  'https://img.freepik.com/free-vector/sport-equipment-banner-template_23-2148182512.jpg',
  'https://img.freepik.com/free-psd/fitness-gym-web-banner-template_23-2148949514.jpg'
];

export default function SportsScreen({ navigation }) {
  // Animation Hooks
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#BF360C" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Sports & Fitness</Text>
          <Text style={styles.subtitle}>Gear up for the game</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}>
          
          {/* --- BANNER SLIDER --- */}
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            style={styles.slider}
          >
            {SPORTS_BANNERS.map((banner, index) => (
              <Image key={index} source={{ uri: banner }} style={styles.bannerImg} />
            ))}
          </ScrollView>

          {/* --- CATEGORY CHIPS --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shop by Sport</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
              {['Cricket', 'Football', 'Gym', 'Badminton', 'Yoga', 'Swimming'].map((cat, i) => (
                <TouchableOpacity key={i} style={styles.catBtn}>
                  <Text style={styles.catBtnText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* --- PRODUCT GRID --- */}
          <View style={styles.gridSection}>
            <View style={styles.gridHeader}>
              <Text style={styles.sectionTitle}>Top Selling Gear</Text>
              <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
            </View>

            <View style={styles.productGrid}>
              {SPORTS_PRODUCTS.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>
                  <Image source={{ uri: item.img }} style={styles.productImg} />
                  <View style={styles.cardInfo}>
                    <Text style={styles.brandName}>{item.brand}</Text>
                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.priceRow}>
                      <View>
                        <Text style={styles.price}>₹{item.price}</Text>
                        <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
                      </View>
                      <TouchableOpacity style={styles.addBtn}>
                        <Text style={styles.addText}>ADD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </Animated.View>
      </ScrollView>

      {/* --- FLOATING NOTIFICATION BAR --- */}
      <View style={styles.floatingBar}>
        <Text style={styles.floatingText}>🏆 JOIN THE CLUB FOR EXCLUSIVE DEALS</Text>
      </View>
    </SafeAreaView>
  );
}

// --- CSS / STYLES ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF8F6' 
  },
  header: { 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    backgroundColor: '#BF360C', 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  backArrow: { 
    color: '#FFF', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  title: { 
    color: '#FFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  subtitle: { 
    color: '#FFCCBC', 
    fontSize: 12, 
    fontWeight: '500' 
  },
  scrollContent: { 
    paddingBottom: 100 
  },
  slider: { 
    marginTop: 20, 
    paddingHorizontal: 15 
  },
  bannerImg: { 
    width: width - 30, 
    height: 170, 
    borderRadius: 20, 
    marginRight: 15, 
    resizeMode: 'cover' 
  },
  section: { 
    padding: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4E1505' 
  },
  catRow: { 
    marginTop: 15 
  },
  catBtn: { 
    backgroundColor: '#FFF', 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 15, 
    marginRight: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFDCCF'
  },
  catBtnText: { 
    color: '#BF360C', 
    fontWeight: 'bold', 
    fontSize: 13 
  },
  gridSection: { 
    paddingHorizontal: 15 
  },
  gridHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  seeAll: { 
    color: '#BF360C', 
    fontWeight: 'bold' 
  },
  productGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  card: { 
    width: PRODUCT_CARD_WIDTH, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    marginBottom: 15, 
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden' 
  },
  discountBadge: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    backgroundColor: '#E64A19', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderBottomRightRadius: 15, 
    zIndex: 2 
  },
  discountText: { 
    color: '#FFF', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  productImg: { 
    width: '70%', 
    height: 110, 
    alignSelf: 'center', 
    marginTop: 25, 
    resizeMode: 'contain' 
  },
  cardInfo: { 
    padding: 12 
  },
  brandName: {
    fontSize: 10,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  productName: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 5 
  },
  price: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  oldPrice: { 
    fontSize: 11, 
    color: '#999', 
    textDecorationLine: 'line-through' 
  },
  addBtn: { 
    backgroundColor: '#BF360C', 
    paddingHorizontal: 15, 
    paddingVertical: 7, 
    borderRadius: 10 
  },
  addText: { 
    color: '#FFF', 
    fontSize: 11, 
    fontWeight: 'bold' 
  },
  floatingBar: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    backgroundColor: '#263238', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 10,
  },
 
});