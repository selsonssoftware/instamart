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

export default function PoojaNeedsScreen() {
    const { addToCart, cartItems } = useCart();
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const poojaData = [
        { id: 'pj1', name: 'Premium Agarbatti', weight: '1 Pack', price: '₹45', strikePrice: '₹60', image: 'https://images.unsplash.com/photo-1612470650917-a9a3b2b80f7f?q=80&w=1000&auto=format&fit=crop', tag: 'Aromatic' },
        { id: 'pj2', name: 'Pure Cow Ghee Diya', weight: '30 Pcs', price: '₹160', strikePrice: '₹190', image: 'https://images.unsplash.com/photo-1605342006504-f44618e404be?q=80&w=1000&auto=format&fit=crop', tag: 'Natural' },
        { id: 'pj3', name: 'Camphor (Kapoor)', weight: '50 g', price: '₹85', strikePrice: '₹110', image: 'https://images.unsplash.com/photo-1612470650917-a9a3b2b80f7f?q=80&w=1000&auto=format&fit=crop', tag: 'Essential' },
        { id: 'pj4', name: 'Pooja Oil (Lamp)', weight: '500 ml', price: '₹120', strikePrice: '₹150', image: 'https://images.unsplash.com/photo-1605342006504-f44618e404be?q=80&w=1000&auto=format&fit=crop', tag: 'Long Lasting' },
        { id: 'pj5', name: 'Matchbox Bundle', weight: '10 Pcs', price: '₹20', strikePrice: '₹25', image: 'https://images.unsplash.com/photo-1612470650917-a9a3b2b80f7f?q=80&w=1000&auto=format&fit=crop', tag: 'Utility' },
        { id: 'pj6', name: 'Cotton Wicks (Round)', weight: '100 Pcs', price: '₹35', strikePrice: '₹50', image: 'https://images.unsplash.com/photo-1605342006504-f44618e404be?q=80&w=1000&auto=format&fit=crop', tag: 'Daily Pooja' },
    ];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        Alert.alert("Added to Basket", `${item.name} is ready for your pooja.`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pooja Needs 🪔</Text>
                
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color="#991B1B" />
                    {cartItems.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartItems.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* PROMO BANNER */}
                <View style={styles.bannerContainer}>
                    <View style={[styles.banner, { backgroundColor: '#FEF2F2' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bannerTitle}>Spiritual Essentials</Text>
                            <Text style={styles.bannerSubtitle}>Pure products for your daily devotion</Text>
                        </View>
                        <Ionicons name="color-filter-outline" size={50} color="#991B1B" />
                    </View>
                </View>

                <Text style={styles.sectionHeading}>Devotional Items</Text>

                {/* GRID VIEW */}
                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {poojaData.map((item) => (
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
    badge: { position: 'absolute', right: -5, top: -5, backgroundColor: '#991B1B', borderRadius: 10, paddingHorizontal: 5, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    bannerContainer: { paddingHorizontal: 15, marginTop: 15 },
    banner: { width: '100%', height: 110, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#FECACA' },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#7F1D1D' },
    bannerSubtitle: { fontSize: 13, color: '#991B1B', marginTop: 4 },
    sectionHeading: { fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 25, color: '#111827' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 },
    card: { width: (width / 2) - 22, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    tagBox: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(153, 27, 27, 0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, zIndex: 1 },
    tagText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    itemImage: { width: '100%', height: 120 },
    infoBox: { padding: 12 },
    itemName: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
    itemWeight: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    strike: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
    addBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#991B1B', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#991B1B', fontWeight: 'bold', fontSize: 12 },
});