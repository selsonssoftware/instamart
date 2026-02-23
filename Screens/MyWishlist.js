import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const MyWishlistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Home nundi vachina wishlist items ni ikkada store chestham
  const [wishlistItems, setWishlistItems] = useState(route.params?.items || []);

  // Item ni remove chese logic
  const removeFromWishlist = (id) => {
    const updatedList = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productWeight}>{item.weight}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{item.price}</Text>
          {item.strikePrice && <Text style={styles.strikePrice}>{item.strikePrice}</Text>}
        </View>
      </View>
      <TouchableOpacity 
        style={styles.removeBtn} 
        onPress={() => removeFromWishlist(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist ({wishlistItems.length})</Text>
        <View style={{ width: 26 }} />
      </View>

      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        /* EMPTY STATE - Emi lenappudu mathrame idhi kanipisthundhi */
        <View style={styles.emptyContainer}>
          <Text style={styles.likeText}>Like it?</Text>
          <Text style={styles.saveText}>Save it!</Text>
          <Text style={styles.descText}>
            Start adding your favorites and keep them all in one place!
          </Text>
          <TouchableOpacity 
            style={styles.startBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.startBtnText}>Start shopping</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          FREE DELIVERY on orders above ₹99
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MyWishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1B',
  },
  listContainer: {
    padding: 15,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    // Shadow for iOS & Android
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  productWeight: {
    fontSize: 12,
    color: '#888',
    marginVertical: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  strikePrice: {
    fontSize: 12,
    color: '#aaa',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  removeBtn: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  likeText: { fontSize: 32, color: '#e0e0e0', fontWeight: 'bold' },
  saveText: { fontSize: 36, color: '#e0e0e0', fontWeight: 'bold', marginBottom: 20 },
  descText: { textAlign: 'center', color: '#777', fontSize: 14, marginBottom: 30 },
  startBtn: {
    backgroundColor: '#7E22CE', // Instamart Theme Purple
    width: width * 0.7,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: {
    backgroundColor: '#ecfbff',
    padding: 12,
    alignItems: 'center',
  },
  footerText: { fontSize: 12, color: '#333', fontWeight: '500' },
});

