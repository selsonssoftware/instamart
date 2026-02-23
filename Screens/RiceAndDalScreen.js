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

export default function RiceAndDalScreen() {
    const { addToCart, cartItems } = useCart();
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const pantryData = [
        { id: 'r1', name: 'Basmati Rice (Premium)', weight: '5 kg', price: '₹450', strikePrice: '₹550', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop', tag: 'Aromatic' },
        { id: 'r2', name: 'Toor Dal (Arhar)', weight: '1 kg', price: '₹140', strikePrice: '₹170', image: 'https://images.unsplash.com/photo-1585996838426-607bcd87baf0?q=80&w=1000&auto=format&fit=crop', tag: 'Unpolished' },
        { id: 'r3', name: 'Moong Dal', weight: '1 kg', price: '₹120', strikePrice: '₹150', image: 'https://cdn.pixabay.com/photo/2016/09/01/19/23/lentils-1637330_1280.jpg', tag: 'Protein Rich' },
        { id: 'r4', name: 'Chana Dal', weight: '1 kg', price: '₹95', strikePrice: '₹110', image: 'https://cdn.pixabay.com/photo/2017/01/11/11/33/lentils-1971556_1280.jpg', tag: 'Healthy' },
        { id: 'r5', name: 'Kolam Rice', weight: '5 kg', price: '₹320', strikePrice: '₹380', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=1000&auto=format&fit=crop', tag: 'Best Seller' },
        { id: 'r6', name: 'Masoor Dal (Red)', weight: '1 kg', price: '₹105', strikePrice: '₹130', image: 'https://cdn.pixabay.com/photo/2014/11/05/16/00/lentils-518033_1280.jpg', tag: 'Natural' },
    ];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        Alert.alert("Added", `${item.name} added to pantry!`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rice & Dals 🌾</Text>
                
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color="#B45309" />
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
                    <View style={[styles.banner, { backgroundColor: '#FFFBEB' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bannerTitle}>Stock Your Pantry</Text>
                            <Text style={styles.bannerSubtitle}>Flat 15% OFF on Bulk Rice packs</Text>
                        </View>
                        <Ionicons name="cube" size={50} color="#D97706" />
                    </View>
                </View>

                <Text style={styles.sectionHeading}>Grains & Pulses</Text>

                {/* GRID VIEW */}
                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {pantryData.map((item) => (
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
    badge: { position: 'absolute', right: -5, top: -5, backgroundColor: '#B45309', borderRadius: 10, paddingHorizontal: 5, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    bannerContainer: { paddingHorizontal: 15, marginTop: 15 },
    banner: { width: '100%', height: 110, borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#FDE68A' },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#92400E' },
    bannerSubtitle: { fontSize: 13, color: '#B45309', marginTop: 4 },
    sectionHeading: { fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 25, color: '#111827' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 },
    card: { width: (width / 2) - 22, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    tagBox: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(180, 83, 9, 0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, zIndex: 1 },
    tagText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    itemImage: { width: '100%', height: 120 },
    infoBox: { padding: 12 },
    itemName: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
    itemWeight: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    strike: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
    addBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#B45309', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#B45309', fontWeight: 'bold', fontSize: 12 },
});