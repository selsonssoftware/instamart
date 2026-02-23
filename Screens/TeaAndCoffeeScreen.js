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

export default function TeaAndCoffeeScreen() {
    const { addToCart, cartItems } = useCart();
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const beverageData = [
        { id: 'tc1', name: 'Premium Assam Tea', weight: '500 g', price: '₹240', strikePrice: '₹280', image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?q=80&w=1000&auto=format&fit=crop', tag: 'Strong' },
        { id: 'tc2', name: 'Instant Coffee Powder', weight: '100 g', price: '₹315', strikePrice: '₹350', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop', tag: 'Rich Aroma' },
        { id: 'tc3', name: 'Green Tea (Lemon)', weight: '25 Bags', price: '₹175', strikePrice: '₹210', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1000&auto=format&fit=crop', tag: 'Healthy' },
        { id: 'tc4', name: 'Filter Coffee Blend', weight: '250 g', price: '₹145', strikePrice: '₹180', image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1000&auto=format&fit=crop', tag: 'Traditional' },
        { id: 'tc5', name: 'Masala Chai Pouch', weight: '250 g', price: '₹120', strikePrice: '₹150', image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?q=80&w=1000&auto=format&fit=crop', tag: 'Spiced' },
        { id: 'tc6', name: 'Roasted Coffee Beans', weight: '500 g', price: '₹680', strikePrice: '₹750', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop', tag: 'Premium' },
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
                <Text style={styles.headerTitle}>Tea & Coffee ☕</Text>
                
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color="#78350F" />
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
                    <View style={[styles.banner, { backgroundColor: '#FEF3C7' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bannerTitle}>Morning Brew</Text>
                            <Text style={styles.bannerSubtitle}>Up to 25% OFF on Premium Blends</Text>
                        </View>
                        <Ionicons name="cafe" size={50} color="#92400E" />
                    </View>
                </View>

                <Text style={styles.sectionHeading}>Beverage Essentials</Text>

                {/* GRID VIEW */}
                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {beverageData.map((item) => (
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
    badge: { position: 'absolute', right: -5, top: -5, backgroundColor: '#78350F', borderRadius: 10, paddingHorizontal: 5, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    bannerContainer: { paddingHorizontal: 15, marginTop: 15 },
    banner: { width: '100%', height: 110, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#FDE68A' },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#78350F' },
    bannerSubtitle: { fontSize: 13, color: '#92400E', marginTop: 4 },
    sectionHeading: { fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 25, color: '#111827' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 },
    card: { width: (width / 2) - 22, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    tagBox: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(120, 53, 15, 0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, zIndex: 1 },
    tagText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    itemImage: { width: '100%', height: 120 },
    infoBox: { padding: 12 },
    itemName: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
    itemWeight: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    strike: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
    addBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#78350F', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#78350F', fontWeight: 'bold', fontSize: 12 },
});




 