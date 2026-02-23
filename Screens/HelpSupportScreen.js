import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Animated,
    TextInput,
    Dimensions,
    Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Dynamic scaling units for perfect responsiveness
const SCALE = width / 375; // 375 is standard iPhone width
const normalize = (size) => Math.round(size * SCALE);
const PADDING = width * 0.05; // 5% standard padding

const helpQueries = [
    { id: 1, title: 'Swiggy One FAQs' },
    { id: 2, title: 'General issues' },
    { id: 3, title: 'Report Safety Emergency' },
    { id: 4, title: 'Instamart Onboarding' },
    { id: 5, title: 'Legal, Terms & Conditions' },
    { id: 6, title: 'FAQs' },
    { id: 7, title: 'Swiggy Money FAQs' },
    { id: 8, title: 'Swiggy HDFC Bank Credit Card' },
];

export default function HelpSupportScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.spring(slideUp, { toValue: 0, tension: 20, friction: 8, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* --- PREMIUM HEADER --- */}
            <View style={styles.header}>
                <View style={styles.headerMain}>
                    <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backCircle}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help & Support</Text>
                    <TouchableOpacity style={styles.historyBadge}>
                        <Text style={styles.historyText}>HISTORY</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}>

                    {/* --- PRO SEARCH BOX --- */}
                    <View style={styles.heroSection}>
                        <Text style={styles.heroTitle}>How can we help you today?</Text>
                        <View style={styles.searchBox}>
                            <Text style={styles.searchIcon}>🔍</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Search order, payment, refund..."
                                value={search}
                                onChangeText={setSearch}
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>

                    {/* --- PRIORITY ACTION CARD --- */}
                    <TouchableOpacity style={styles.priorityCard} activeOpacity={0.9}>
                        <View style={styles.priorityIconBg}>
                            <Text style={styles.priorityEmoji}>📦</Text>
                        </View>
                        <View style={styles.priorityTextContent}>
                            <Text style={styles.priorityTitle}>Issues with Previous Orders</Text>
                            <Text style={styles.prioritySub}>Track status or report missing items</Text>
                        </View>
                        <Text style={styles.chevron}>❯</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionLabel}>HELP WITH OTHER QUERIES</Text>

                    {/* --- LIST SECTION --- */}
                    <View style={styles.listContainer}>
                        {helpQueries.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.6}
                                style={[
                                    styles.listItem,
                                    index === helpQueries.length - 1 && { borderBottomWidth: 0 },
                                ]}
                            >
                                <Text style={styles.listItemText}>{item.title}</Text>
                                <Text style={styles.chevronSmall}>❯</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* --- CONTACT SUPPORT --- */}
                    <View style={styles.footerContact}>
                        <Text style={styles.footerPrompt}>Didn't find what you were looking for?</Text>
                        <TouchableOpacity style={styles.messageBtn} activeOpacity={0.8}>
                            <Text style={styles.messageBtnText}>CHAT WITH US</Text>
                        </TouchableOpacity>
                    </View>

                </Animated.View>
                <View style={{ height: height * 0.05 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

// --- FULLY RESPONSIVE & NEAT STYLES ---
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F4F7FA' 
    },

    // Header Styles Responsive
    header: {
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + height * 0.015 : height * 0.015,
        paddingBottom: height * 0.02,
        paddingHorizontal: PADDING,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
        zIndex: 10,
    },
    headerMain: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },
    backCircle: {
        width: width * 0.1, 
        height: width * 0.1, 
        borderRadius: (width * 0.1) / 2,
        backgroundColor: '#F8F9FB', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    backIcon: { 
        fontSize: normalize(20), 
        color: '#1F2937', 
        fontWeight: '400' 
    },
    headerTitle: { 
        fontSize: normalize(15), 
        fontWeight: '800', 
        color: '#1F2937', 
        flex: 1, 
        marginLeft: width * 0.04 
    },
    historyBadge: {
        backgroundColor: '#FFF0E6', 
        paddingHorizontal: width * 0.03, 
        paddingVertical: height * 0.008,
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: '#FFE0CC'
    },
    historyText: { 
        color: '#FC8019', 
        fontWeight: '900', 
        fontSize: normalize(10) 
    },

    // Hero Search Responsive
    heroSection: { 
        backgroundColor: '#FFF', 
        paddingHorizontal: PADDING, 
        paddingTop: height * 0.03,
        paddingBottom: height * 0.04, 
        borderBottomLeftRadius: 30, 
        borderBottomRightRadius: 30, 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.05, 
        shadowRadius: 10 
    },
    heroTitle: { 
        fontSize: normalize(18), 
        fontWeight: '900', 
        color: '#1F2937', 
        marginBottom: height * 0.025, 
        letterSpacing: -0.5 
    },
    searchBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#F8F9FB', 
        borderRadius: 15,
        paddingHorizontal: width * 0.04, 
        height: height * 0.07,
        borderWidth: 1, 
        borderColor: '#E5E7EB'
    },
    searchIcon: { 
        fontSize: normalize(16), 
        marginRight: width * 0.025 
    },
    input: { 
        flex: 1, 
        fontSize: normalize(13), 
        color: '#1F2937', 
        fontWeight: '500' 
    },

    // Priority Card Responsive
    priorityCard: {
        backgroundColor: '#FFF', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginHorizontal: PADDING, 
        marginTop: -(height * 0.025), 
        padding: PADDING,
        borderRadius: 24, 
        elevation: 15,
        shadowColor: '#4A0080', 
        shadowOpacity: 0.12, 
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 8 },
    },
    priorityIconBg: {
        width: width * 0.14, 
        height: width * 0.14, 
        borderRadius: 18,
        backgroundColor: '#F0E6FF', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    priorityEmoji: { 
        fontSize: normalize(24) 
    },
    priorityTextContent: { 
        flex: 1, 
        marginLeft: width * 0.04 
    },
    priorityTitle: { 
        fontSize: normalize(13), 
        fontWeight: '800', 
        color: '#1F2937' 
    },
    prioritySub: { 
        fontSize: normalize(11), 
        color: '#6B7280', 
        marginTop: height * 0.005 
    },
    chevron: { 
        color: '#D1D5DB', 
        fontSize: normalize(15) 
    },

    sectionLabel: {
        fontSize: normalize(10), 
        fontWeight: '900', 
        color: '#9CA3AF',
        marginLeft: width * 0.06, 
        marginTop: height * 0.04, 
        marginBottom: height * 0.02, 
        letterSpacing: 1.5
    },

    // List Styles Responsive
    listContainer: {
        backgroundColor: '#FFF', 
        marginHorizontal: PADDING,
        borderRadius: 24, 
        overflow: 'hidden',
        borderWidth: 1, 
        borderColor: '#F1F3F5'
    },
    listItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingVertical: height * 0.025, 
        paddingHorizontal: width * 0.06,
        borderBottomWidth: 1, 
        borderBottomColor: '#F8F9FA'
    },
    listItemText: { 
        fontSize: normalize(13), 
        color: '#374151', 
        fontWeight: '600', 
        flex: 1 
    },
    chevronSmall: { 
        color: '#D1D5DB', 
        fontSize: normalize(12) 
    },

    // Footer contact Responsive
    footerContact: { 
        alignItems: 'center', 
        marginTop: height * 0.05, 
        paddingHorizontal: width * 0.06 
    },
    footerPrompt: { 
        fontSize: normalize(12), 
        color: '#6B7280', 
        marginBottom: height * 0.02, 
        textAlign: 'center' 
    },
    messageBtn: {
        width: '100%', 
        backgroundColor: '#FFF',
        borderWidth: 2, 
        borderColor: '#FC8019',
        paddingVertical: height * 0.022, 
        borderRadius: 18,
        alignItems: 'center', 
        shadowColor: '#FC8019',
        shadowOpacity: 0.1, 
        shadowRadius: 10,
    },
    messageBtnText: { 
        color: '#FC8019', 
        fontWeight: '900', 
        fontSize: normalize(12), 
        letterSpacing: 1 
    },

    scrollContent: { 
        paddingBottom: height * 0.08 
    }
});






