import React, { useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView, 
    Animated, 
    StatusBar, 
    Platform,
    Dimensions 
} from 'react-native';

const { height } = Dimensions.get('window');

export default function MainAddressScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.spring(slideUp, { toValue: 0, tension: 20, friction: 8, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            
            {/* --- PREMIUM HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Address</Text>
            </View>

            <Animated.ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideUp }] }]}
            >
                {/* --- ADDRESS CARD --- */}
                <View style={styles.addressCard}>
                    <View style={styles.addressHeader}>
                        <Text style={styles.type}>🏠 Home</Text>
                        <View style={styles.defaultBadge}><Text style={styles.defaultTxt}>DEFAULT</Text></View>
                    </View>
                    <Text style={styles.addressText}>
                        Selsons Software, Kodambakkam, Road No. 36, Chennai, TamilNadu, 500033
                    </Text>
                    <View style={styles.actionRow}>
                        <TouchableOpacity><Text style={styles.actionBtn}>EDIT</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={[styles.actionBtn, { color: '#e23744' }]}>DELETE</Text></TouchableOpacity>
                    </View>
                </View>

                {/* --- ADD NEW BUTTON --- */}
                <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
                    <Text style={styles.addBtnText}>+ Add New Address</Text>
                </TouchableOpacity>

                {/* --- WISHLIST STYLE EMPTY STATE PLACEHOLDER --- */}
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Like it?{'\n'}Save it!</Text>
                    <View style={styles.placeholderRow}>
                        <View style={styles.dummyCard} />
                        <View style={styles.dummyCard} />
                    </View>
                    <Text style={styles.emptySub}>Manage your favorite delivery locations easily in one place.</Text>
                </View>

            </Animated.ScrollView>

            {/* --- PRO FOOTER (Optional) --- */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>FREE DELIVERY on orders above ₹99</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    
    header: {
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
        paddingBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
        elevation: 2,
    },
    backCircle: {
        width: 38, height: 38, borderRadius: 19,
        backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center'
    },
    backIcon: { fontSize: 22, color: '#1F2937' },
    headerTitle: { fontSize: 18, fontWeight: '900', color: '#1F2937', marginLeft: 15 },

    content: { padding: 20, paddingBottom: 100 },

    // Address Card Styles
    addressCard: { 
        backgroundColor: '#FFF', 
        padding: 20, 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: '#F0F2F5',
        elevation: 4,
        shadowColor: '#4A0080', shadowOpacity: 0.05, shadowRadius: 10,
        marginBottom: 20 
    },
    addressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    type: { fontWeight: '800', fontSize: 16, color: '#1A1A1A' },
    defaultBadge: { backgroundColor: '#F0E6FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5 },
    defaultTxt: { fontSize: 9, fontWeight: '900', color: '#4A0080' },
    addressText: { color: '#6B7280', lineHeight: 22, fontSize: 14, marginBottom: 15 },
    
    actionRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F8F9FA', paddingTop: 15 },
    actionBtn: { marginRight: 25, fontWeight: '800', fontSize: 13, color: '#4A0080' },

    addBtn: { 
        borderStyle: 'dashed', 
        borderWidth: 1.5, 
        borderColor: '#4A0080', 
        padding: 18, 
        borderRadius: 16, 
        alignItems: 'center',
        backgroundColor: '#FBF9FF'
    },
    addBtnText: { color: '#4A0080', fontWeight: '800', fontSize: 15 },

    // Wishlist Style Empty State (Based on Screenshot)
    emptyState: { marginTop: 50, alignItems: 'center' },
    emptyTitle: { fontSize: 42, fontWeight: '900', color: '#E2E4E8', textAlign: 'center', lineHeight: 45 },
    placeholderRow: { flexDirection: 'row', marginTop: 30, marginBottom: 30 },
    dummyCard: { width: 100, height: 120, backgroundColor: '#F8F9FB', borderRadius: 15, marginHorizontal: 10 },
    emptySub: { textAlign: 'center', color: '#9CA3AF', fontSize: 13, paddingHorizontal: 40, lineHeight: 20 },

    footer: {
        position: 'absolute', bottom: 0, width: '100%',
        backgroundColor: '#E6F7F5', paddingVertical: 12,
        alignItems: 'center'
    },
    footerText: { fontSize: 11, fontWeight: '800', color: '#008296', letterSpacing: 0.5 }
});












