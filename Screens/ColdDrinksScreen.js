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

export default function ColdDrinksScreen() {
    const { addToCart, cartItems } = useCart();
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const drinksData = [
        { id: 'cd1', name: 'Coca-Cola Original', weight: '750 ml', price: '₹45', strikePrice: '₹50', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000&auto=format&fit=crop', tag: 'Chilled' },
        { id: 'cd2', name: 'Fresh Orange Juice', weight: '1 L', price: '₹120', strikePrice: '₹150', image: 'https://images.unsplash.com/photo-1600266175161-cffe458bc2ad?q=80&w=1000&auto=format&fit=crop', tag: '100% Natural' },
        { id: 'cd3', name: 'Sprite Lemon-Lime', weight: '750 ml', price: '₹45', strikePrice: '₹50', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1000&auto=format&fit=crop', tag: 'Refreshing' },
        { id: 'cd4', name: 'Mango Frooti', weight: '600 ml', price: '₹40', strikePrice: '₹45', image: 'https://images.unsplash.com/photo-1546173159-315724a93c90?q=80&w=1000&auto=format&fit=crop', tag: 'Best Seller' },
        { id: 'cd5', name: 'Red Bull Energy', weight: '250 ml', price: '₹115', strikePrice: '₹125', image: 'https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=1000&auto=format&fit=crop', tag: 'Energy' },
        { id: 'cd6', name: 'Coconut Water', weight: '200 ml', price: '₹50', strikePrice: '₹60', image: 'https://images.unsplash.com/photo-1526644210901-3c5888a7061d?q=80&w=1000&auto=format&fit=crop', tag: 'Healthy' },
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

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cold Drinks & Juices 🥤</Text>
                
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color="#0891B2" />
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
                    <View style={[styles.banner, { backgroundColor: '#ECFEFF' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bannerTitle}>Ice Cold Deals</Text>
                            <Text style={styles.bannerSubtitle}>Beat the heat with chilled beverages</Text>
                        </View>
                        <Ionicons name="snow-outline" size={50} color="#0891B2" />
                    </View>
                </View>

                <Text style={styles.sectionHeading}>Chilled Beverages</Text>

                {/* GRID VIEW */}
                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {drinksData.map((item) => (
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
    badge: { position: 'absolute', right: -5, top: -5, backgroundColor: '#0891B2', borderRadius: 10, paddingHorizontal: 5, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    bannerContainer: { paddingHorizontal: 15, marginTop: 15 },
    banner: { width: '100%', height: 110, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#CFFAFE' },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#164E63' },
    bannerSubtitle: { fontSize: 13, color: '#0891B2', marginTop: 4 },
    sectionHeading: { fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 25, color: '#111827' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 },
    card: { width: (width / 2) - 22, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    tagBox: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(8, 145, 178, 0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, zIndex: 1 },
    tagText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    itemImage: { width: '100%', height: 120 },
    infoBox: { padding: 12 },
    itemName: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
    itemWeight: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    strike: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
    addBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0891B2', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#0891B2', fontWeight: 'bold', fontSize: 12 },
});