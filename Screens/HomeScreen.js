import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
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
  Modal,
  TextInput,
  RefreshControl, // PULL TO REFRESH ADD CHESAM
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './CartContext';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#6D28D9',
  secondary: '#F59E0B',
  bg: '#F3F4F6',
  white: '#FFFFFF',
  textMain: '#111827',
  textMuted: '#6B7280',
  accent: '#EF4444',
  success: '#10B981',
};

// --- AUTO SLIDER COMPONENT (Pin to Pin) ---
const AutoSlider = ({ data }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const interval = setInterval(() => {
        let nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
        scrollRef.current?.scrollTo({
          x: nextIndex * (width - 40),
          animated: true,
        });
        setActiveIndex(nextIndex);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeIndex, data]);

  return (
    <View style={styles.sliderWrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
          setActiveIndex(newIndex);
        }}
        style={styles.sliderContainer}
      >
        {data.map((img, index) => (
          <Image key={index} source={{ uri: img.uri }} style={styles.sliderImage} />
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {data.map((_, i) => (
          <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const { cartItems, addToCart, updateQuantity } = useCart();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- REFRESH STATE ADD CHESAM ---
  const [refreshing, setRefreshing] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const snackbarOpacity = useRef(new Animated.Value(0)).current;
  const snackbarTranslateY = useRef(new Animated.Value(20)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const tabFadeAnim = useRef(new Animated.Value(1)).current;

  const totalCartItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);
  const totalWishlistItems = wishlist.length;

  // --- REFRESH LOGIC ---
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data / buffering for 1.5 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // --- WISHLIST TOGGLE LOGIC ---
  const toggleWishlist = (product) => {
    const isExist = wishlist.some(item => item.id === product.id);
    if (isExist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      triggerSnackbar("Removed from Wishlist");
    } else {
      setWishlist([...wishlist, product]);
      triggerSnackbar("Added to Wishlist");
    }
  };
  // --- Static Data ---
  const categories = [
    { id: '1', name: 'All', icon: 'apps-outline' },
    { id: 'c1', name: 'Wedding', icon: 'heart-half-outline' },
    { id: 'c2', name: 'Beauty', icon: 'sparkles-outline' },
    { id: 'c3', name: 'Electronics', icon: 'tv-outline' },
    { id: 'c4', name: 'Fashion', icon: 'shirt-outline' },
    { id: 'c5', name: 'Pharmacy', icon: 'medical-outline' },
    { id: 'c6', name: 'Winter', icon: 'snow-outline' },
    { id: '2', name: 'Maxxsaver', icon: 'pricetag-outline' },
    { id: '3', name: 'Free Gifts', icon: 'gift-outline' },
    { id: '4', name: 'T20', icon: 'baseball-outline' },
    { id: '5', name: 'Premium', icon: 'diamond-outline' },
    { id: '6', name: 'Ramzan', icon: 'star-half-outline' },
  ];

  // --- EXPANDED 5 BANNERS PER TAB ---
  const tabSliders = {
    'All': [
      { uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800' },
      { uri: 'https://images.unsplash.com/photo-1543083115-638c32cd3d58?w=800' },
      { uri: 'https://images.unsplash.com/photo-1506617564039-2f3b650ad701?w=800' },
      { uri: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800' },
      { uri: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800' },
    ],
    'Wedding': [
      { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800' },
      { uri: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800' },
      { uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800' },
      { uri: 'https://images.unsplash.com/photo-1522673607200-164881eeca98?w=800' },
      { uri: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800' },
    ],
    'Beauty': [
      { uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800' },
      { uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800' },
      { uri: 'https://images.unsplash.com/photo-1570172619380-41068cd152bb?w=800' },
      { uri: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800' },
      { uri: 'https://images.unsplash.com/photo-1512496011931-a2c38827c4c5?w=800' },
    ],
    'Electronics': [
      { uri: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800' },
      { uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
      { uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800' },
      { uri: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800' },
      { uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800' },
    ],
    'Fashion': [
      { uri: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800' },
      { uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800' },
      { uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800' },
      { uri: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800' },
      { uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800' },
    ],
    'Pharmacy': [
      { uri: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800' },
      { uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800' },
      { uri: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=800' },
      { uri: 'https://images.unsplash.com/photo-1631549916768-4119b295f946?w=800' },
      { uri: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800' },
    ],
  };






  const tabContent = {
    All: {
      products: [
        {
          id: 'a1',
          name: 'Rice Bag ',
          weight: '1 Kg',
          image: require('../assets/images/rice.jpg'),
          price: '120',
          strikePrice: '150',
          discount: '18% OFF',

          options: [
            { label: '1 Kg', price: '120', image: require('../assets/images/rice.jpg') },
            { label: '3 Kg', price: '360', image: require('../assets/images/rice.jpg') },
            { label: '5 Kg', price: '600', image: require('../assets/images/rice.jpg') },
            { label: '10 Kg', price: '1200', image: require('../assets/images/rice.jpg') },
          ]
        },

        {
          id: 'a2',
          name: 'Fortune Oil',
          weight: '1 L',
          image: require('../assets/images/oil.jpg'),
          price: '140',
          strikePrice: '180',
          discount: '22% OFF',

          options: [
            { label: '1 Ltr', price: '145', image: require('../assets/images/oil.jpg') },
            { label: '3 Ltr', price: '420', image: require('../assets/images/oil.jpg') },
            { label: '5 Ltr', price: '690', image: require('../assets/images/oil.jpg') },
            { label: '10 Ltr', price: '1350', image: require('../assets/images/oil.jpg') },
          ]
        },
        { id: 'win7', name: 'Socks', weight: '3 pairs', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'win8', name: 'Thermal Wear', weight: 'M', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'win9', name: 'Room Heater', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'win10', name: 'Moisturizer', weight: '200 ml', image: require('../assets/images/f.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'win11', name: 'Lip Balm', weight: '10 g', image: require('../assets/images/f.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'win12', name: 'Winter Jacket', weight: 'XL', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 'a3', name: 'Sugar', weight: '1 kg', image: require('../assets/images/sugar.jpg'), price: '50', strikePrice: '65', discount: '23% OFF' },
        { id: 'a4', name: 'Salt', weight: '1 kg', image: require('../assets/images/salt.jpg'), price: '25', strikePrice: '30', discount: '16% OFF' },
        { id: 'a5', name: 'Tea Powder', weight: '250 g', image: require('../assets/images/tea.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'a6', name: 'Biscuits', weight: '200 g', image: require('../assets/images/biscut.jpg'), price: '30', strikePrice: '40', discount: '25% OFF' },
        { id: 'a7', name: 'Cold Drink', weight: '2 L', image: require('../assets/images/coco.jpg'), price: '90', strikePrice: '120', discount: '25% OFF' },
        { id: 'a8', name: 'Soap', weight: '125 g', image: require('../assets/images/soap.jpg'), price: '45', strikePrice: '60', discount: '25% OFF' },
        { id: 'a9', name: 'Detergent', weight: '1 kg', image: require('../assets/images/Detergent.jpg'), price: '110', strikePrice: '150', discount: '26% OFF' },
        { id: 'a10', name: 'Jam', weight: '500 g', image: require('../assets/images/jam.jpg'), price: '160', strikePrice: '200', discount: '20% OFF' },
        { id: 'a11', name: 'Chocolate', weight: '100 g', image: require('../assets/images/chocolate.jpg'), price: '95', strikePrice: '120', discount: '20% OFF' },
        { id: 'a12', name: 'Spices Pack', weight: '200 g', image: require('../assets/images/spaice.jpg'), price: '140', strikePrice: '180', discount: '22% OFF' },
        

         { id: 'win13', name: 'Socks', weight: '3 pairs', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'win14', name: 'Thermal Wear', weight: 'M', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'win15', name: 'Room Heater', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'win130', name: 'Moisturizer', weight: '200 ml', image: require('../assets/images/f.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'win131', name: 'Lip Balm', weight: '10 g', image: require('../assets/images/f.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'win132', name: 'Winter Jacket', weight: 'XL', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 'a33', name: 'Sugar', weight: '1 kg', image: require('../assets/images/sugar.jpg'), price: '50', strikePrice: '65', discount: '23% OFF' },
        { id: 'a34', name: 'Salt', weight: '1 kg', image: require('../assets/images/salt.jpg'), price: '25', strikePrice: '30', discount: '16% OFF' },
        { id: 'a53', name: 'Tea Powder', weight: '250 g', image: require('../assets/images/tea.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'a63', name: 'Biscuits', weight: '200 g', image: require('../assets/images/biscut.jpg'), price: '30', strikePrice: '40', discount: '25% OFF' },
        { id: 'a72', name: 'Cold Drink', weight: '2 L', image: require('../assets/images/coco.jpg'), price: '90', strikePrice: '120', discount: '25% OFF' },
        { id: 'a83', name: 'Soap', weight: '125 g', image: require('../assets/images/soap.jpg'), price: '45', strikePrice: '60', discount: '25% OFF' },
        { id: 'a92', name: 'Detergent', weight: '1 kg', image: require('../assets/images/Detergent.jpg'), price: '110', strikePrice: '150', discount: '26% OFF' },
        { id: 'a1202', name: 'Jam', weight: '500 g', image: require('../assets/images/jam.jpg'), price: '160', strikePrice: '200', discount: '20% OFF' },
        { id: 'a121', name: 'Chocolate', weight: '100 g', image: require('../assets/images/chocolate.jpg'), price: '95', strikePrice: '120', discount: '20% OFF' },
        { id: 'a122', name: 'Spices Pack', weight: '200 g', image: require('../assets/images/spaice.jpg'), price: '140', strikePrice: '180', discount: '22% OFF' },
      ]
    },

    Winter: {
      products: [
        { id: 'win1', name: 'Cold Cream', weight: '100 g', image: require('../assets/images/f.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'win2', name: 'Woolen Cap', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '250', strikePrice: '320', discount: '22% OFF' },
        { id: 'win3', name: 'Hand Gloves', weight: '1 pair', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'win4', name: 'Blanket', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'win5', name: 'Hot Water Bag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'win6', name: 'Sweater', weight: 'L', image: require('../assets/images/bag.jpg'), price: '899', strikePrice: '1199', discount: '25% OFF' },
        { id: 'win7', name: 'Socks', weight: '3 pairs', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'win8', name: 'Thermal Wear', weight: 'M', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'win9', name: 'Room Heater', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'win10', name: 'Moisturizer', weight: '200 ml', image: require('../assets/images/f.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'win11', name: 'Lip Balm', weight: '10 g', image: require('../assets/images/f.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'win12', name: 'Winter Jacket', weight: 'XL', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
      ]
    },

    Maxxsaver: {
      products: [
        { id: 'm1', name: 'Rice Combo Pack', weight: '5 kg', image: require('../assets/images/atta.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'm2', name: 'Oil Combo', weight: '3 L', image: require('../assets/images/oil.jpg'), price: '399', strikePrice: '520', discount: '23% OFF' },
        { id: 'm3', name: 'Soap Pack', weight: '4 pcs', image: require('../assets/images/dettol.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'm4', name: 'Detergent Pack', weight: '2 kg', image: require('../assets/images/surf.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'm5', name: 'Sugar Pack', weight: '3 kg', image: require('../assets/images/d.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'm6', name: 'Tea Combo', weight: '500 g', image: require('../assets/images/d.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'm7', name: 'Snack Box', weight: '1 kg', image: require('../assets/images/biscut.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'm8', name: 'Grocery Kit', weight: '1 set', image: require('../assets/images/d.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'm9', name: 'Cleaning Kit', weight: '1 set', image: require('../assets/images/surf.jpg'), price: '399', strikePrice: '520', discount: '23% OFF' },
        { id: 'm10', name: 'Spice Combo', weight: '500 g', image: require('../assets/images/d.jpg'), price: '180', strikePrice: '240', discount: '25% OFF' },
        { id: 'm11', name: 'Breakfast Pack', weight: '1 kg', image: require('../assets/images/biscut.jpg'), price: '249', strikePrice: '320', discount: '22% OFF' },
        { id: 'm12', name: 'Festival Combo', weight: '1 set', image: require('../assets/images/d.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
      ]
    },

    "Free Gifts": {
      products: [
        { id: 'g1', name: 'Key Chain', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '50', discount: 'FREE' },
        { id: 'g2', name: 'Sticker Pack', weight: '1 set', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '40', discount: 'FREE' },
        { id: 'g3', name: 'Pen', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '20', discount: 'FREE' },
        { id: 'g4', name: 'Notebook', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '60', discount: 'FREE' },
        { id: 'g5', name: 'Coffee Mug', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '150', discount: 'FREE' },
        { id: 'g6', name: 'Toy Car', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '120', discount: 'FREE' },
        { id: 'g7', name: 'Wall Poster', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '80', discount: 'FREE' },
        { id: 'g8', name: 'Badge', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '30', discount: 'FREE' },
        { id: 'g9', name: 'Bookmark', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '25', discount: 'FREE' },
        { id: 'g10', name: 'Diary', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '100', discount: 'FREE' },
        { id: 'g11', name: 'Ball', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '90', discount: 'FREE' },
        { id: 'g12', name: 'Gift Card', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '200', discount: 'FREE' },
      ]
    },

    T20: {
      products: [
        { id: 't1', name: 'Cricket Bat', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 't2', name: 'Cricket Ball', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 't3', name: 'Jersey', weight: 'L', image: require('../assets/images/bag.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 't4', name: 'Cap', weight: 'Free size', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 't5', name: 'Sports Shoes', weight: '9', image: require('../assets/images/bag.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 't6', name: 'Wrist Band', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 't7', name: 'Helmet', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 't8', name: 'Cricket Gloves', weight: '1 pair', image: require('../assets/images/bag.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 't9', name: 'Thigh Guard', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 't10', name: 'Kit Bag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 't11', name: 'Cricket Pads', weight: '1 pair', image: require('../assets/images/bag.jpg'), price: '1199', strikePrice: '1499', discount: '20% OFF' },
        { id: 't12', name: 'Water Bottle', weight: '1 L', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
      ]
    },

    Premium: {
      products: [
        { id: 'pr1', name: 'Luxury Perfume', weight: '100 ml', image: require('../assets/images/f.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'pr2', name: 'Gold Plated Watch', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '4999', strikePrice: '5999', discount: '16% OFF' },
        { id: 'pr3', name: 'Premium Chocolate Box', weight: '500 g', image: require('../assets/images/can.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'pr4', name: 'Designer Handbag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '2999', strikePrice: '3999', discount: '25% OFF' },
        { id: 'pr5', name: 'Leather Wallet', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1899', discount: '21% OFF' },
        { id: 'pr6', name: 'Premium Shoes', weight: '9', image: require('../assets/images/bag.jpg'), price: '3999', strikePrice: '4999', discount: '20% OFF' },
        { id: 'pr7', name: 'Smart Watch', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '2999', strikePrice: '3599', discount: '16% OFF' },
        { id: 'pr8', name: 'Bluetooth Speaker', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '2499', strikePrice: '2999', discount: '16% OFF' },
        { id: 'pr9', name: 'Luxury Candle', weight: '1 unit', image: require('../assets/images/f.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'pr10', name: 'Premium Tea Set', weight: '1 set', image: require('../assets/images/d.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'pr11', name: 'Designer Sunglasses', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1599', strikePrice: '1999', discount: '20% OFF' },
        { id: 'pr12', name: 'Luxury Gift Box', weight: '1 set', image: require('../assets/images/d.jpg'), price: '3499', strikePrice: '3999', discount: '12% OFF' },
      ]
    },

    Ramzan: {
      products: [
        { id: 'r1', name: 'Dates Pack', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'r2', name: 'Dry Fruits Mix', weight: '500 g', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'r3', name: 'Vermicelli', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'r4', name: 'Sugar Syrup', weight: '1 L', image: require('../assets/images/d.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'r5', name: 'Rose Water', weight: '500 ml', image: require('../assets/images/d.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'r6', name: 'Falooda Mix', weight: '200 g', image: require('../assets/images/d.jpg'), price: '120', strikePrice: '160', discount: '25% OFF' },
        { id: 'r7', name: 'Milk Powder', weight: '500 g', image: require('../assets/images/d.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'r8', name: 'Honey', weight: '500 g', image: require('../assets/images/d.jpg'), price: '350', strikePrice: '450', discount: '22% OFF' },
        { id: 'r9', name: 'Juice Pack', weight: '1 L', image: require('../assets/images/coco.jpg'), price: '120', strikePrice: '160', discount: '25% OFF' },
        { id: 'r10', name: 'Sweet Box', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'r11', name: 'Rooh Afza', weight: '1 L', image: require('../assets/images/coco.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'r12', name: 'Gift Hamper', weight: '1 set', image: require('../assets/images/d.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
      ]
    },
    Wedding: {
      products: [
        { id: 'w1', name: 'Dry Fruits Pack', weight: '500 g', image: require('../assets/images/d.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'w2', name: 'Decor Lights', weight: '1 set', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 'w3', name: 'Gift Box', weight: '5 pcs', image: require('../assets/images/d.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'w4', name: 'Flower Garland', weight: '1 set', image: require('../assets/images/d.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'w5', name: 'Invitation Cards', weight: '50 pcs', image: require('../assets/images/d.jpg'), price: '599', strikePrice: '799', discount: '25% OFF' },
        { id: 'w6', name: 'Chocolate Box', weight: '500 g', image: require('../assets/images/d.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 'w7', name: 'Sweets Pack', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'w8', name: 'Decor Candles', weight: '10 pcs', image: require('../assets/images/d.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'w9', name: 'Photo Frame', weight: '1 unit', image: require('../assets/images/d.jpg'), price: '399', strikePrice: '499', discount: '20% OFF' },
        { id: 'w10', name: 'Return Gifts', weight: '10 pcs', image: require('../assets/images/d.jpg'), price: '899', strikePrice: '1199', discount: '25% OFF' },
        { id: 'w11', name: 'Wedding Album', weight: '1 unit', image: require('../assets/images/d.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 'w12', name: 'Stage Decoration', weight: '1 set', image: require('../assets/images/d.jpg'), price: '2999', strikePrice: '3499', discount: '14% OFF' },
      ]
    },

    Beauty: {
      products: [
        { id: 'b1', name: 'Face Wash', weight: '100 ml', image: require('../assets/images/f.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'b2', name: 'Body Lotion', weight: '200 ml', image: require('../assets/images/f.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'b3', name: 'Shampoo', weight: '180 ml', image: require('../assets/images/f.jpg'), price: '250', strikePrice: '300', discount: '16% OFF' },
        { id: 'b4', name: 'Hair Oil', weight: '150 ml', image: require('../assets/images/f.jpg'), price: '160', strikePrice: '200', discount: '20% OFF' },
        { id: 'b5', name: 'Face Cream', weight: '50 g', image: require('../assets/images/f.jpg'), price: '199', strikePrice: '250', discount: '20% OFF' },
        { id: 'b6', name: 'Lip Balm', weight: '10 g', image: require('../assets/images/f.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'b7', name: 'Sunscreen', weight: '100 ml', image: require('../assets/images/f.jpg'), price: '299', strikePrice: '360', discount: '17% OFF' },
        { id: 'b8', name: 'Perfume', weight: '50 ml', image: require('../assets/images/f.jpg'), price: '499', strikePrice: '599', discount: '16% OFF' },
        { id: 'b9', name: 'Makeup Kit', weight: '1 set', image: require('../assets/images/f.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'b10', name: 'Nail Polish', weight: '10 ml', image: require('../assets/images/f.jpg'), price: '99', strikePrice: '130', discount: '24% OFF' },
        { id: 'b11', name: 'Hair Serum', weight: '50 ml', image: require('../assets/images/f.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'b12', name: 'Face Mask', weight: '100 g', image: require('../assets/images/f.jpg'), price: '150', strikePrice: '190', discount: '21% OFF' },
      ]
    },

    Electronics: {
      products: [
        { id: 'e1', name: 'Power Bank', weight: '10000 mAh', image: require('../assets/images/can.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'e2', name: 'USB Cable', weight: '1 m', image: require('../assets/images/can.jpg'), price: '199', strikePrice: '299', discount: '33% OFF' },
        { id: 'e3', name: 'Bluetooth Earphones', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1299', strikePrice: '1599', discount: '18% OFF' },
        { id: 'e4', name: 'LED Bulb', weight: '9 W', image: require('../assets/images/can.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'e5', name: 'Extension Box', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'e6', name: 'Smart Watch', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'e7', name: 'Mobile Charger', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 'e8', name: 'Wireless Mouse', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 'e9', name: 'Keyboard', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'e10', name: 'Torch Light', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'e11', name: 'Headphones', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1499', strikePrice: '1899', discount: '21% OFF' },
        { id: 'e12', name: 'Router', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
      ]
    },

    Fashion: {
      products: [
        { id: 'f1', name: 'T-Shirt', weight: 'L', image: require('../assets/images/bag.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 'f2', name: 'Jeans', weight: '32', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'f3', name: 'Cap', weight: 'Free size', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'f4', name: 'Jacket', weight: 'M', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 'f5', name: 'Shoes', weight: '9', image: require('../assets/images/bag.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },

        { id: 'f6', name: 'Sunglasses', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 'f7', name: 'Belt', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '399', strikePrice: '499', discount: '20% OFF' },
        { id: 'f8', name: 'Wallet', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'f9', name: 'Kurta', weight: 'XL', image: require('../assets/images/bag.jpg'), price: '899', strikePrice: '1199', discount: '25% OFF' },
        { id: 'f10', name: 'Track Pant', weight: 'L', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'f11', name: 'Scarf', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'f12', name: 'Handbag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1899', discount: '21% OFF' },
      ]
    },

    Pharmacy: {
      products: [
        { id: 'p1', name: 'Hand Sanitizer', weight: '500 ml', image: require('../assets/images/dettol.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'p2', name: 'Thermometer', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '250', strikePrice: '300', discount: '16% OFF' },
        { id: 'p3', name: 'Face Mask', weight: '10 pcs', image: require('../assets/images/dettol.jpg'), price: '120', strikePrice: '160', discount: '25% OFF' },
        { id: 'p4', name: 'Pain Relief Spray', weight: '50 ml', image: require('../assets/images/dettol.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'p5', name: 'Vitamin Tablets', weight: '30 tabs', image: require('../assets/images/dettol.jpg'), price: '300', strikePrice: '360', discount: '16% OFF' },
        { id: 'p6', name: 'Cough Syrup', weight: '100 ml', image: require('../assets/images/dettol.jpg'), price: '140', strikePrice: '180', discount: '22% OFF' },
        { id: 'p7', name: 'Antiseptic Liquid', weight: '250 ml', image: require('../assets/images/dettol.jpg'), price: '110', strikePrice: '150', discount: '26% OFF' },
        { id: 'p8', name: 'Glucometer', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'p9', name: 'Bandage Roll', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '60', strikePrice: '90', discount: '33% OFF' },
        { id: 'p10', name: 'Digital BP Monitor', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'p11', name: 'ORS Pack', weight: '200 ml', image: require('../assets/images/dettol.jpg'), price: '40', strikePrice: '60', discount: '33% OFF' },
        { id: 'p12', name: 'First Aid Kit', weight: '1 set', image: require('../assets/images/dettol.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
      ]
    }
  };

  const filteredProducts = useMemo(() => {
    const products = tabContent[activeTab]?.products || tabContent.All.products;
    if (!searchQuery) return products;
    return products.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, activeTab]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 20, friction: 7, useNativeDriver: true }),
    ]).start();
  }, []);

  const triggerSnackbar = useCallback((message) => {
    setSnackbarMessage(message);
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

  const handleAddToCart = (product, variant = null) => {
    const itemToAdd = variant ? { ...product, id: `${product.id}-${variant.label}`, price: variant.price, weight: variant.label } : product;
    addToCart(itemToAdd);
    triggerSnackbar("Added to Cart");
  };

  const handleTabSwitch = (name) => {
    if (activeTab === name) return;
    Animated.timing(tabFadeAnim, { toValue: 0, duration: 100, useNativeDriver: true }).start(() => {
      setActiveTab(name);
      setSearchQuery('');
      Animated.timing(tabFadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const getItemQuantity = (id) => cartItems.find(i => i.id === id)?.quantity || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <Animated.View style={[styles.headerWrapper, { opacity: fadeAnim }]}>
        <View style={styles.topInfoRow}>
          <View style={styles.addressContainer}>
            <Text style={styles.timeText}>9 mins</Text>
            <TouchableOpacity style={styles.addressRow}>
              <Text style={styles.addressText} numberOfLines={1}>Home: Selsons SoftWare Solution...</Text>
              <Ionicons name="chevron-down" size={14} color="#E9D5FF" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('wish', { items: wishlist })}>
              <Ionicons name="heart" size={20} color={COLORS.primary} />
              {totalWishlistItems > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{totalWishlistItems}</Text></View>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart" size={20} color={COLORS.primary} />
              {totalCartItems > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{totalCartItems}</Text></View>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={COLORS.textMuted} />
            <TextInput style={styles.inputStyle} placeholder={`Search items in ${activeTab}`} value={searchQuery} onChangeText={setSearchQuery} />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => handleTabSwitch(cat.name)}>
              <View style={[styles.catIconBox, activeTab === cat.name && styles.activeCatIconBox]}>
                <Ionicons name={cat.icon} size={22} color={activeTab === cat.name ? COLORS.primary : '#fff'} />
              </View>
              <Text style={[styles.categoryText, activeTab === cat.name && styles.activeCategoryText]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* MAIN SCROLL VIEW WITH REFRESH CONTROL ADDED */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary, COLORS.secondary]} // Android buffering colors
            tintColor={COLORS.primary} // iOS buffering color
          />
        }
      >
        <Animated.View style={[{ transform: [{ translateY: slideAnim }], opacity: tabFadeAnim }]}>

          {!searchQuery && <AutoSlider data={tabSliders[activeTab] || tabSliders['All']} />}

          <View style={styles.productsWrapper}>
            {filteredProducts.map((product) => {
              const quantity = getItemQuantity(product.id);
              const isWishlisted = wishlist.some(item => item.id === product.id);

              return (
                <View key={product.id} style={styles.productCard}>
                  <TouchableOpacity style={styles.heartIconGrid} onPress={() => toggleWishlist(product)}>
                    <Ionicons name={isWishlisted ? "heart" : "heart-outline"} size={20} color={isWishlisted ? COLORS.accent : COLORS.textMuted} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product })}>
                    <Image source={product.image} style={styles.productImage} resizeMode="contain" />
                  </TouchableOpacity>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.productPrice}>₹{product.price}</Text>
                  </View>

                  {quantity > 0 ? (
                    <View style={styles.qtyActionContainer}>
                      <TouchableOpacity onPress={() => updateQuantity(product.id, 'dec')} style={styles.qtyBtn}><Ionicons name="remove" size={16} color="#fff" /></TouchableOpacity>
                      <Text style={styles.qtyValue}>{quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(product.id, 'inc')} style={styles.qtyBtn}><Ionicons name="add" size={16} color="#fff" /></TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.screenshotAddBtn}
                      onPress={() => {
                        if (product.options) {
                          setSelectedProduct(product);
                          setModalVisible(true);
                        } else {
                          handleAddToCart(product);
                        }
                      }}
                    >
                      <Text style={styles.addBtnText}>ADD +</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      {/* SNACKBAR */}
      {snackbarVisible && (
        <Animated.View style={[styles.snackbarContainer, { opacity: snackbarOpacity, transform: [{ translateY: snackbarTranslateY }] }]}>
          <View style={styles.snackbarContent}>
            <View style={styles.androidIconBox}><Ionicons name="logo-android" size={16} color="#000" /></View>
            <Text style={styles.snackbarText}>{snackbarMessage}</Text>
          </View>
        </Animated.View>
      )}

      {/* VARIANT MODAL */}
      {selectedProduct && (
        <Modal animationType="slide" transparent visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View><Text style={styles.modalTitle}>Select Unit</Text><Text style={styles.modalProdName}>{selectedProduct.name}</Text></View>
                <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close-circle" size={32} color="#333" /></TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                {selectedProduct.options?.map((opt) => {
                  const vId = `${selectedProduct.id}-${opt.label}`;
                  const qty = getItemQuantity(vId);
                  return (
                    <View key={opt.label} style={styles.variantItemRow}>
                      <View style={styles.variantInfoLeft}>
                        <Image source={opt.image} style={styles.variantSmallImg} />
                        <View><Text style={styles.variantLabelText}>{opt.label}</Text><Text style={styles.variantPriceText}>₹{opt.price}</Text></View>
                      </View>
                      {qty > 0 ? (
                        <View style={styles.modalQtyContainer}>
                          <TouchableOpacity onPress={() => updateQuantity(vId, 'dec')} style={styles.modalQtyBtn}><Ionicons name="remove" size={18} color="#fff" /></TouchableOpacity>
                          <Text style={styles.modalQtyValue}>{qty}</Text>
                          <TouchableOpacity onPress={() => updateQuantity(vId, 'inc')} style={styles.modalQtyBtn}><Ionicons name="add" size={18} color="#fff" /></TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity style={styles.variantAddBtn} onPress={() => handleAddToCart(selectedProduct, opt)}>
                          <Text style={styles.variantAddBtnText}>ADD</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Bottom Nav */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}><MaterialCommunityIcons name="home-variant" size={26} color={COLORS.primary} /><Text style={styles.navTextActive}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Categories')}><Ionicons name="grid-outline" size={24} color="#9CA3AF" /><Text style={styles.navText}>Categories</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  headerWrapper: { backgroundColor: COLORS.primary, paddingTop: Platform.OS === 'ios' ? 10 : 40, paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  topInfoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
  timeText: { color: COLORS.secondary, fontSize: 24, fontWeight: 'bold' },
  addressContainer: { flex: 1 },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressText: { color: '#E9D5FF', fontSize: 12, marginRight: 5 },
  headerRightIcons: { flexDirection: 'row', gap: 10 },
  iconCircle: { backgroundColor: '#fff', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: COLORS.secondary, borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary },
  badgeText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  searchRow: { paddingHorizontal: 20, marginTop: 15 },
  searchInputContainer: { backgroundColor: '#fff', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 48 },
  inputStyle: { flex: 1, marginLeft: 10, fontSize: 14, color: COLORS.textMain },
  categoriesScroll: { paddingLeft: 20, marginTop: 15 },
  categoryItem: { alignItems: 'center', marginRight: 20 },
  catIconBox: { width: 48, height: 48, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  activeCatIconBox: { backgroundColor: COLORS.secondary },
  categoryText: { color: '#E9D5FF', fontSize: 11 },
  activeCategoryText: { color: '#fff', fontWeight: 'bold' },

  sliderWrapper: { marginTop: 15, alignItems: 'center' },
  sliderContainer: { width: width - 40, height: 160, borderRadius: 20 },
  sliderImage: { width: width - 40, height: 160, borderRadius: 20, resizeMode: 'cover' },
  dotContainer: { flexDirection: 'row', position: 'absolute', bottom: 10, alignSelf: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.4)', marginHorizontal: 4 },
  activeDot: { width: 20, backgroundColor: '#FFF' },

  productsWrapper: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, justifyContent: 'space-between', marginTop: 20 },
  productCard: { width: (width / 2) - 18, backgroundColor: '#fff', borderRadius: 18, padding: 12, marginVertical: 8, borderWidth: 1, borderColor: '#F3F4F6' },
  heartIconGrid: { position: 'absolute', top: 10, right: 10, zIndex: 10 },
  productImage: { width: '80%', height: 100, alignSelf: 'center' },
  productInfo: { marginTop: 10 },
  productName: { fontSize: 14, fontWeight: '600', color: COLORS.textMain },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginTop: 4 },

  screenshotAddBtn: { marginTop: 12, borderWidth: 1, borderColor: COLORS.accent, borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
  addBtnText: { color: COLORS.accent, fontWeight: 'bold', fontSize: 13 },
  qtyActionContainer: { marginTop: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accent, borderRadius: 10, height: 36 },
  qtyBtn: { flex: 1, alignItems: 'center' },
  qtyValue: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  snackbarContainer: { position: 'absolute', bottom: 100, alignSelf: 'center', zIndex: 9999 },
  snackbarContent: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7700ff', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 8 },
  androidIconBox: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 3, marginRight: 12 },
  snackbarText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },

  bottomNavigation: { position: 'absolute', bottom: 0, width: width, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#F3F4F6', paddingBottom: Platform.OS === 'ios' ? 25 : 10 },
  navItem: { alignItems: 'center' },
  navTextActive: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary, marginTop: 4 },
  navText: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, maxHeight: height * 0.7 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  modalProdName: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  variantItemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  variantInfoLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  variantSmallImg: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#F9FAFB' },
  variantLabelText: { fontSize: 15, color: '#111', fontWeight: '600' },
  variantPriceText: { fontSize: 16, fontWeight: 'bold', color: '#6D28D9' },
  variantAddBtn: { backgroundColor: '#6D28D9', paddingHorizontal: 25, paddingVertical: 8, borderRadius: 8, minWidth: 80, alignItems: 'center' },
  variantAddBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  modalQtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EF4444', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 5, minWidth: 90, justifyContent: 'space-between' },
  modalQtyBtn: { padding: 4 },
  modalQtyValue: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});

