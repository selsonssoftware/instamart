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

export default function DairyBreadEggScreen() {
    const { addToCart, cartItems } = useCart();
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    // Dairy, Bread & Eggs Data
    const dairyData = [
        { id: 'd1', name: 'Fresh Milk (Full Cream)', weight: '500 ml', price: '₹33', strikePrice: '₹35', image: 'https://images.unsplash.com/photo-1563636619-e9107b93183e?q=80&w=1000&auto=format&fit=crop', tag: 'Daily Essential' },
        { id: 'd2', name: 'Brown Bread', weight: '400 g', price: '₹45', strikePrice: '₹55', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop', tag: 'Whole Wheat' },
        { id: 'd3', name: 'Farm Fresh Eggs', weight: '6 Pcs', price: '₹48', strikePrice: '₹60', image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?q=80&w=1000&auto=format&fit=crop', tag: 'High Protein' },
        { id: 'd4', name: 'Fresh Paneer', weight: '200 g', price: '₹85', strikePrice: '₹100', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop', tag: 'Soft & Fresh' },
        { id: 'd5', name: 'Salted Butter', weight: '100 g', price: '₹56', strikePrice: '₹60', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=1000&auto=format&fit=crop', tag: 'Pure Veg' },
        { id: 'd6', name: 'Fresh Curd (Dahi)', weight: '400 g', price: '₹35', strikePrice: '₹40', image: 'https://images.unsplash.com/photo-1485962391944-82655a496924?q=80&w=1000&auto=format&fit=crop', tag: 'Probiotic' },
    ];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        Alert.alert("Added", `${item.name} added to your basket!`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dairy & Breakfast 🥛</Text>
                
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color="#0284C7" />
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
                    <View style={[styles.banner, { backgroundColor: '#E0F2FE' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.bannerTitle}>Morning Fresh!</Text>
                            <Text style={styles.bannerSubtitle}>Get Milk & Bread delivered by 7 AM</Text>
                        </View>
                        <Image 
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/869/869664.png' }} 
                            style={{ width: 60, height: 60 }} 
                        />
                    </View>
                </View>

                <Text style={styles.sectionHeading}>Eggs & Dairy Essentials</Text>

                {/* ITEMS GRID */}
                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {dairyData.map((item) => (
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
                                    <TouchableOpacity
                                        style={styles.addBtn}
                                        onPress={() => handleAddToCart(item)}
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
        elevation: 2,
        paddingTop: Platform.OS === 'android' ? 50 : 20,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1B' },
    badge: { 
        position: 'absolute', 
        right: -5, 
        top: -5, 
        backgroundColor: '#0284C7', 
        borderRadius: 10, 
        paddingHorizontal: 5,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    bannerContainer: { paddingHorizontal: 15, marginTop: 15 },
    banner: { 
        width: '100%', 
        height: 110, 
        borderRadius: 20, 
        padding: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BAE6FD'
    },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0369A1' },
    bannerSubtitle: { fontSize: 13, color: '#075985', marginTop: 4 },
    sectionHeading: { fontSize: 18, fontWeight: '800', marginLeft: 15, marginTop: 25, color: '#111827' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 },
    card: { width: (width / 2) - 22, backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    tagBox: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, zIndex: 1, borderWidth: 0.5, borderColor: '#DDD' },
    tagText: { color: '#0369A1', fontSize: 10, fontWeight: 'bold' },
    itemImage: { width: '100%', height: 120 },
    infoBox: { padding: 12 },
    itemName: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
    itemWeight: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    strike: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
    addBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0284C7', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#0284C7', fontWeight: 'bold', fontSize: 12 },
});