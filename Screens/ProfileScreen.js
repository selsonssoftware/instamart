import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ScrollView,
    Dimensions,
    Image,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive utility calculations
const PADDING = width * 0.05;
const AVATAR_SIZE = width * 0.16;

const menuItems = [
    { id: 1, title: 'Saved Address', icon: '📍', route: 'SavedAddress' },
    { id: 2, title: 'Payment Modes', icon: '💳', route: 'PaymentModes' },
    { id: 3, title: 'My Refunds', icon: '💰', route: 'MyRefunds' },
    { id: 4, title: 'Swiggy Money', icon: '👛', route: 'SwiggyMoney' },
];

const listItems = [
    { id: 5, title: 'Swiggy HDFC Bank Credit Card', icon: '💳', route: 'CreditCard' },
    { id: 6, title: 'Account Statements', icon: '📄', route: 'AccountStatements' },
    { id: 7, title: 'Corporate Rewards', icon: '💼', route: 'CorporateRewards' },
    { id: 8, title: 'Student Rewards', icon: '🎓', route: 'StudentRewards' },
    { id: 9, title: 'My Wishlist', icon: '🔖', route: 'MyWishlist' },
    { id: 10, title: 'Partner Rewards', icon: '👑', route: 'PartnerRewards' },
];

export default function ProfileScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const itemsAnim = useRef(menuItems.map(() => new Animated.Value(0))).current;

    const navigation = useNavigation();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.stagger(80, itemsAnim.map(anim =>
                Animated.spring(anim, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true })
            ))
        ]).start();
    }, []);

    // Header Animation Logic
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* --- PRO STICKY HEADER (Fixed PointerEvents) --- */}
            <Animated.View
                pointerEvents="none" // Initially none to allow clicks to pass through
                style={[
                    styles.stickyHeader, 
                    { opacity: headerOpacity, zIndex: 10 }
                ]}
            >
                <Text style={styles.stickyTitle}>Golla Pawan Kumar</Text>
            </Animated.View>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 0 }}
            >
                {/* --- MAIN HEADER AREA --- */}
                <View style={styles.headerArea}>
                    <View style={styles.headerTop}>
                        <View />
                        <View style={styles.headerRight}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                onPress={() => {
                                    console.log("Navigating to HelpSupport...");
                                    navigation.navigate('HelpSupport');
                                }}
                                style={styles.helpBadge}
                            >
                                <Text style={styles.helpTxt}>Help</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.roundBtn}>
                                <Text style={styles.headerIcon}>⋮</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Animated.View style={[styles.userInfo, { opacity: fadeAnim }]}>
                        <View style={styles.profileRow}>
                            <View style={styles.profileTextContainer}>
                                <Text style={styles.userName} numberOfLines={1}>Golla Pawan Kumar</Text>
                                <Text style={styles.userSub}>+91 8688521177</Text>
                                <Text style={styles.userEmail} numberOfLines={1}>gollasivakumar1470@gmail.com</Text>
                            </View>
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>GP</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>

                {/* --- MEMBERSHIP CARD --- */}
                <Animated.View style={[styles.oneCard, { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }]}>
                    <View style={styles.oneHeader}>
                        <View style={styles.oneBrand}>
                            <Text style={styles.oneLogo}>one</Text>
                            <View style={styles.activePill}><Text style={styles.activeTxt}>ACTIVE</Text></View>
                        </View>
                        <Text style={styles.chevronLarge}>⌵</Text>
                    </View>
                    <View style={styles.savingsBox}>
                        <Text style={styles.savingsTxt}>₹58 saved so far</Text>
                        <View style={styles.progressBar}><View style={styles.progressFill} /></View>
                    </View>
                    <Text style={styles.exploreTxt}>Explore all premium benefits</Text>
                </Animated.View>

                {/* --- QUICK ACTION GRID --- */}
                <View style={styles.gridWrapper}>
                    {menuItems.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            style={{
                                opacity: itemsAnim[index],
                                transform: [{ translateY: itemsAnim[index].interpolate({ inputRange: [0, 1], outputRange: [25, 0] }) }]
                            }}
                        >
                            <TouchableOpacity
                                style={styles.gridCard}
                                onPress={() => { if (item.route) navigation.navigate(item.route); }}
                                activeOpacity={0.7}
                            >
                                <View style={styles.gridIconBg}><Text style={styles.gridEmoji}>{item.icon}</Text></View>
                                <Text style={styles.gridLabel} numberOfLines={2}>{item.title}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* --- DETAILED LIST --- */}
                <View style={styles.listCard}>
                    {listItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.listItem, index === listItems.length - 1 && { borderBottomWidth: 0 }]}
                            activeOpacity={0.6}
                            onPress={() => { if (item.route) navigation.navigate(item.route); }}
                        >
                            <View style={styles.listIconBox}><Text style={styles.listEmoji}>{item.icon}</Text></View>
                            <Text style={styles.listTitle}>{item.title}</Text>
                            <Text style={styles.chevronSmall}>❯</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>PAST ORDERS</Text>

                <View style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderStore}>Instamart</Text>
                        <Text style={styles.orderSub}>Delivery from multiple stores</Text>
                    </View>

                    <View style={styles.deliveryRow}>
                        <Text style={styles.deliveryTitle}>Delivery 1</Text>
                        <View style={styles.cancelRow}>
                            <Text style={styles.cancelText}>Cancelled</Text>
                            <Text style={styles.cancelIcon}>✕</Text>
                        </View>
                    </View>

                    <View style={styles.itemRow}>
                        <View style={styles.qtyBox}><Text style={styles.qtyText}>2x</Text></View>
                        <Text style={styles.itemText}>Tender Coconut (Elaneer)</Text>
                    </View>

                    <View style={styles.orderFooter}>
                        <Text style={styles.orderDate}>Ordered: Feb 12, 4:03 PM</Text>
                        <Text style={styles.orderTotal}>Total: ₹1005.0</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.viewMoreBtn}>
                    <Text style={styles.viewMoreTxt}>VIEW MORE ORDERS ⌄</Text>
                </TouchableOpacity>

                <Text style={styles.versionTxt}>App version 4.102.1</Text>
                <View style={{ height: 100 }} />
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7FA' },
    stickyHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: Platform.OS === 'ios' ? 100 : 80,
        backgroundColor: '#4A0080',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        elevation: 5,
    },
    stickyTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
    headerArea: {
        backgroundColor: '#4A0080',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
        paddingBottom: 80,
        paddingHorizontal: PADDING,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100, // Important for clicks
    },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    helpBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
    },
    helpTxt: { color: '#FFF', fontSize: 14, fontWeight: '800' },
    roundBtn: {
        width: 36, height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center', alignItems: 'center',
    },
    headerIcon: { color: '#FFF', fontSize: 18 },
    userInfo: { marginTop: 30 },
    profileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    profileTextContainer: { flex: 1, paddingRight: 10 },
    userName: { color: '#FFF', fontSize: 24, fontWeight: '900' },
    userSub: { color: '#E0B0FF', fontSize: 15, marginTop: 4, fontWeight: '600' },
    userEmail: { color: '#E0B0FF', fontSize: 12, opacity: 0.8, marginTop: 4 },
    avatarPlaceholder: {
        width: AVATAR_SIZE, height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: '#FFF',
        justifyContent: 'center', alignItems: 'center',
        elevation: 5,
    },
    avatarText: { fontSize: 22, fontWeight: 'bold', color: '#4A0080' },
    oneCard: {
        backgroundColor: '#FFF',
        marginHorizontal: PADDING,
        marginTop: -40,
        borderRadius: 20,
        padding: PADDING,
        elevation: 10,
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,
    },
    oneHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    oneBrand: { flexDirection: 'row', alignItems: 'center' },
    oneLogo: { fontSize: 28, fontWeight: '900', color: '#FF3E4D' },
    activePill: { backgroundColor: '#00B894', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginLeft: 10 },
    activeTxt: { color: '#FFF', fontSize: 10, fontWeight: '900' },
    chevronLarge: { color: '#D1D1D1', fontSize: 24 },
    savingsBox: { marginTop: 15 },
    savingsTxt: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
    progressBar: { height: 4, backgroundColor: '#F3F4F6', borderRadius: 2, marginTop: 8 },
    progressFill: { width: '40%', height: '100%', backgroundColor: '#00B894' },
    exploreTxt: { color: '#6B7280', fontSize: 12, marginTop: 10 },
    gridWrapper: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: PADDING, paddingVertical: 30 },
    gridCard: { width: (width - (PADDING * 2)) / 4.2, alignItems: 'center' },
    gridIconBg: { width: 55, height: 55, backgroundColor: '#FFF', borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#F3F4F6' },
    gridEmoji: { fontSize: 24 },
    gridLabel: { fontSize: 11, textAlign: 'center', marginTop: 8, color: '#4B5563', fontWeight: '700' },
    listCard: { backgroundColor: '#FFF', marginHorizontal: PADDING, borderRadius: 20, paddingVertical: 5, borderWidth: 1, borderColor: '#F3F4F6' },
    listItem: { flexDirection: 'row', alignItems: 'center', padding: PADDING, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
    listIconBox: { width: 35 },
    listEmoji: { fontSize: 18 },
    listTitle: { flex: 1, fontSize: 14, color: '#1F2937', fontWeight: '600' },
    chevronSmall: { color: '#D1D5DB', fontSize: 12 },
    sectionTitle: { fontSize: 12, fontWeight: '900', color: '#9CA3AF', marginLeft: PADDING, marginTop: 30, letterSpacing: 1 },
    orderCard: { backgroundColor: '#FFF', marginHorizontal: PADDING, borderRadius: 15, padding: PADDING, marginTop: 15, borderWidth: 1, borderColor: '#F3F4F6' },
    orderHeader: { backgroundColor: '#F9FAFB', padding: 8, borderRadius: 10, marginBottom: 10 },
    orderStore: { fontSize: 14, fontWeight: '800' },
    orderSub: { fontSize: 11, color: '#6B7280' },
    deliveryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    deliveryTitle: { fontSize: 13, fontWeight: '700' },
    cancelRow: { flexDirection: 'row', alignItems: 'center' },
    cancelText: { color: '#EF4444', fontWeight: '700', fontSize: 12 },
    cancelIcon: { color: '#EF4444', marginLeft: 4 },
    itemRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    qtyBox: { backgroundColor: '#F3F4F6', paddingHorizontal: 6, borderRadius: 4, marginRight: 8 },
    qtyText: { fontWeight: '700', fontSize: 11 },
    itemText: { fontSize: 13, color: '#374151' },
    orderFooter: { borderTopWidth: 1, borderTopColor: '#F3F4F6', marginTop: 10, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between' },
    orderDate: { fontSize: 11, color: '#6B7280' },
    orderTotal: { fontSize: 12, fontWeight: '800' },
    viewMoreBtn: { alignItems: 'center', marginTop: 15 },
    viewMoreTxt: { color: '#2563EB', fontWeight: '800', fontSize: 12 },
    versionTxt: { textAlign: 'center', marginTop: 20, color: '#9CA3AF', fontSize: 11 }
});











  
  