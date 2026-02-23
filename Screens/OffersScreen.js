import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';

const offerCoupons = [
  { id: '1', code: 'SAVE50', desc: 'Get 50% OFF on first 3 orders', color: '#FFF3E0' },
  { id: '2', code: 'FREEDEL', desc: 'Free Delivery on orders above ₹199', color: '#E8F5E9' },
  { id: '3', code: 'CASH100', desc: 'Flat ₹100 Cashback on Grocery', color: '#E1F5FE' },
];

export default function OffersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#d32f2f" />
      
      {/* Updated Header with Circular Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        
        <View>
          <Text style={styles.title}>Super Offers 🎁</Text>
          <Text style={styles.subTitle}>Save more every day</Text>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Promo Section */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>MEGA SALE IS LIVE!</Text>
          <Text style={styles.promoDiscount}>UP TO 70% OFF</Text>
          <Text style={styles.promoTime}>Ends in: 05h : 20m : 15s</Text>
        </View>

        <Text style={styles.sectionHeader}>Available Coupons</Text>
        
        {offerCoupons.map((item) => (
          <View key={item.id} style={[styles.couponCard, { backgroundColor: item.color }]}>
            <View style={styles.couponLeft}>
              <Text style={styles.couponCode}>{item.code}</Text>
              <Text style={styles.couponDesc}>{item.desc}</Text>
            </View>
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyText}>COPY</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.emptySpace}>
          <Text style={{ fontSize: 40 }}>🛍️</Text>
          <Text style={styles.infoText}>More bank offers loading...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    backgroundColor: '#d32f2f', 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // NEAT CIRCULAR BUTTON STYLE
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  backArrow: { 
    color: '#fff', 
    fontSize: 26, 
    fontWeight: 'bold',
    marginTop: -8 
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  subTitle: { color: '#ffcdd2', fontSize: 11 },
  promoBanner: {
    margin: 15,
    padding: 25,
    backgroundColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
  },
  promoTitle: { color: '#FFD700', fontWeight: 'bold', fontSize: 16 },
  promoDiscount: { color: '#fff', fontSize: 32, fontWeight: '900', marginVertical: 5 },
  promoTime: { color: '#ffcdd2', fontSize: 12 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10, marginBottom: 5 },
  couponCard: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 20,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#d32f2f',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  couponCode: { fontSize: 18, fontWeight: 'bold', color: '#d32f2f' },
  couponDesc: { fontSize: 12, color: '#555', marginTop: 4 },
  applyBtn: { backgroundColor: '#d32f2f', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8 },
  applyText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  emptySpace: { alignItems: 'center', marginTop: 40, paddingBottom: 50 },
  infoText: { color: '#888', marginTop: 10, fontSize: 14 }
});















