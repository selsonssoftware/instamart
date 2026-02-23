import React, { useState, useRef, useEffect } from 'react';
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
    Animated,
    Platform,
    Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './CartContext'; 

const { width } = Dimensions.get('window');

export default function MeatAndSeafoodScreen() {
    const { addToCart, cartItems } = useCart();
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const meatData = [
        { id: 'm1', name: 'Fresh Chicken Curry Cut', weight: '500 g', price: '₹165', strikePrice: '₹190', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1000&auto=format&fit=crop', tag: 'Antibiotic Free' },
        { id: 'm2', name: 'Tender Mutton (Goat)', weight: '500 g', price: '₹450', strikePrice: '₹499', image: 'https://images.unsplash.com/photo-1603360946369-dc9bb025810f?q=80&w=1000&auto=format&fit=crop', tag: 'Freshly Cut' },
        { id: 'm3', name: 'Rohu Fish (Bengali Cut)', weight: '500 g', price: '₹180', strikePrice: '₹220', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop', tag: 'Fresh Catch' },
        { id: 'm4', name: 'Chicken Breast Boneless', weight: '450 g', price: '₹210', strikePrice: '₹250', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1000&auto=format&fit=crop', tag: 'High Protein' },
        { id: 'm5', name: 'Fresh Prawns (Medium)', weight: '250 g', price: '₹240', strikePrice: '₹280', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=1000&auto=format&fit=crop', tag: 'Cleaned' },
        { id: 'm6', name: 'Eggs (Pack of 12)', weight: '12 Pcs', price: '₹95', strikePrice: '₹110', image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?q=80&w=1000&auto=format&fit=crop', tag: 'Farm Fresh' },
    ];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        Alert.alert("Success", `${item.name} added to cart!`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meat & Seafood 🥩</Text>
                
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color="#B91C1C" />
                    {cartItems.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartItems.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.bannerContainer}>
                    <View style={[styles.banner, { backgroundColor: '#FEF2F2' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bannerTitle}>Quality Meat</Text>
                            <Text style={styles.bannerSubtitle}>Hygienically Packed & Delivered</Text>
                        </View>
                        <Ionicons name="shield-checkmark" size={50} color="#DC2626" />
                    </View>
                </View>

                <Text style={styles.sectionHeading}>Fresh From Farm</Text>

                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {meatData.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.tagBox}>
                                <Text style={styles.tagText}>{item.tag}</Text>
                            </View>
                            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />

                            <View style={styles.infoBox}>
                                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.itemWeight}>{item.weight}</Text>

                                <View style={styles.priceRow}>
                                    <View>
                                        <Text style={styles.price}>{item.price}</Text>
                                        <Text style={styles.strike}>{item.strikePrice}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(item)}>
                                        <Text style={styles.addText}>ADD</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', elevation: 2, paddingTop: Platform.OS === 'android' ? 50 : 20 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1B' },
    badge: { position: 'absolute', right: -5, top: -5, backgroundColor: '#B91C1C', borderRadius: 10, paddingHorizontal: 5, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    bannerContainer: { paddingHorizontal: 15, marginTop: 15 },
    banner: { width: '100%', height: 110, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#FECACA' },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#991B1B' },
    bannerSubtitle: { fontSize: 13, color: '#B91C1C', marginTop: 4 },
    sectionHeading: { fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 25, color: '#111827' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 },
    card: { width: (width / 2) - 22, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    tagBox: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(185, 28, 28, 0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, zIndex: 1 },
    tagText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    itemImage: { width: '100%', height: 120 },
    infoBox: { padding: 12 },
    itemName: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
    itemWeight: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    strike: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
    addBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#B91C1C', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#B91C1C', fontWeight: 'bold', fontSize: 12 },
});