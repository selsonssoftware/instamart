import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://masonshop.in/api/product_api');
      const json = await response.json();
      if (json.status) {
        setProducts(json.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      {/* Product Image */}
      <Image 
        source={{ uri: item.image[0] }} 
        style={styles.productImage} 
        resizeMode="cover"
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.categoryText}>{item.category_name}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.sellingPrice}>₹{item.selling}</Text>
          <Text style={styles.marketPrice}>₹{item.market}</Text>
          <Text style={styles.discount}>
            {Math.round(((item.market - item.selling) / item.market) * 100)}% OFF
          </Text>
        </View>

        <Text style={styles.pvText}>PV: {item.pv}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Our Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', padding: 15, textAlign: 'center' },
  listPadding: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
  productImage: {
    width: 120,
    height: 140,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  categoryText: { fontSize: 12, color: '#888', textTransform: 'uppercase' },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  sellingPrice: { fontSize: 18, fontWeight: 'bold', color: '#2ecc71' },
  marketPrice: { 
    fontSize: 14, 
    color: '#999', 
    textDecorationLine: 'line-through', 
    marginLeft: 10 
  },
  discount: { fontSize: 12, color: '#e74c3c', marginLeft: 10, fontWeight: 'bold' },
  pvText: { fontSize: 12, color: '#555', marginTop: 2 },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default ProductList;