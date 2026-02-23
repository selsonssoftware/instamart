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

export default function FreshFruitsScreen() {
    const { addToCart, cartItems } = useCart();
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    // Fruits Data
    const fruitData = [
        { id: 'f1', name: 'Alphonso Mango', weight: '1 kg', price: '₹150', strikePrice: '₹200', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop', tag: 'Seasonal' },
        { id: 'f2', name: 'Red Apple', weight: '500 g', price: '₹90', strikePrice: '₹120', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop', tag: 'Best Seller' },
        { id: 'f3', name: 'Banana (Robusta)', weight: '1 Dozen', price: '₹60', strikePrice: '₹80', image: 'https://images.unsplash.com/photo-1571771894821-ad99026.jpg?q=80&w=1000&auto=format&fit=crop', tag: 'Energy' },
        { id: 'f4', name: 'Green Grapes', weight: '500 g', price: '₹70', strikePrice: '₹100', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=1000&auto=format&fit=crop', tag: 'Seedless' },
        { id: 'f5', name: 'Pomegranate', weight: '2 Pcs', price: '₹110', strikePrice: '₹140', image: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=1000&auto=format&fit=crop', tag: 'Healthy' },
        { id: 'f6', name: 'Sweet Orange', weight: '1 kg', price: '₹85', strikePrice: '₹110', image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=1000&auto=format&fit=crop', tag: 'Vitamin C' },
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
                <Text style={styles.headerTitle}>Fresh Fruits 🍎</Text>
                
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color="#E11D48" />
                    {cartItems.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartItems.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* PROMO BANNER SLIDER */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll}>
                    <View style={[styles.banner, { backgroundColor: '#FFF1F2' }]}>
                        <View>
                            <Text style={styles.bannerTitle}>Summer Special</Text>
                            <Text style={styles.bannerSubtitle}>Refreshing Mangoes</Text>
                        </View>
                        <Ionicons name="sunny" size={50} color="#FBBF24" />
                    </View>
                    <View style={[styles.banner, { backgroundColor: '#F0F9FF' }]}>
                        <View>
                            <Text style={styles.bannerTitle}>Fruit Basket</Text>
                            <Text style={styles.bannerSubtitle}>Save ₹50 on Combo</Text>
                        </View>
                        <Ionicons name="gift" size={50} color="#0EA5E9" />
                    </View>
                </ScrollView>

                <Text style={styles.sectionHeading}>Premium Fruits</Text>

                {/* FRUITS GRID */}
                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {fruitData.map((fruit) => (
                        <View key={fruit.id} style={styles.card}>
                            <View style={styles.tagBox}>
                                <Text style={styles.tagText}>{fruit.tag}</Text>
                            </View>
                            <Image source={{ uri: fruit.image }} style={styles.fruitImage} resizeMode="cover" />

                            <View style={styles.infoBox}>
                                <Text style={styles.fruitName}>{fruit.name}</Text>
                                <Text style={styles.fruitWeight}>{fruit.weight}</Text>

                                <View style={styles.priceRow}>
                                    <View>
                                        <Text style={styles.price}>{fruit.price}</Text>
                                        <Text style={styles.strike}>{fruit.strikePrice}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.addBtn}
                                        onPress={() => handleAddToCart(fruit)}
                                    >
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        elevation: 3,
        paddingTop: Platform.OS === 'android' ? 50 : 20,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1B' },
    badge: { 
        position: 'absolute', 
        right: -5, 
        top: -5, 
        backgroundColor: '#E11D48', 
        borderRadius: 10, 
        paddingHorizontal: 5,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    bannerScroll: { paddingLeft: 15, marginTop: 15 },
    banner: { width: width * 0.75, height: 100, borderRadius: 20, marginRight: 15, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1B' },
    bannerSubtitle: { fontSize: 14, color: '#4B5563', marginTop: 4 },
    sectionHeading: { fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 25, color: '#111827' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 },
    card: { width: (width / 2) - 22, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    tagBox: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(225, 29, 72, 0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, zIndex: 1 },
    tagText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    fruitImage: { width: '100%', height: 120 },
    infoBox: { padding: 12 },
    fruitName: { fontSize: 15, fontWeight: 'bold', color: '#1F2937' },
    fruitWeight: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    strike: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
    addBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E11D48', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#E11D48', fontWeight: 'bold', fontSize: 12 },
});