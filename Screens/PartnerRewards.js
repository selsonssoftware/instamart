import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PartnerRewardsScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                    >
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>Partner Rewards</Text>
                    <Text style={styles.subtitle}>
                        Earn rewards with every Swiggy order!
                    </Text>
                </View>

                {/* FEATURED PARTNERS */}
                <Text style={styles.sectionTitle}>FEATURED PARTNERS</Text>

                <View style={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1517976487492-5750f3195933' }}
                        style={styles.cardImg}
                    />


                    <View style={styles.logoBadge}>
                        <Text style={styles.logoText}>IndiGo BluChip</Text>
                    </View>

                    <View style={styles.cardBottom}>
                        <View>
                            <Text style={styles.cardTitle}>Earn 1 IndiGo BluChip</Text>
                            <Text style={styles.cardSub}>
                                for every ₹250 spent on Swiggy
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.arrowBtn}>
                            <Text style={styles.arrowText}>›</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={styles.liveText}>Live it up!</Text>
                    <Text style={styles.footerSub}>
                        Crafted with ❤️ in Bengaluru, India
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default PartnerRewardsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f4fb',
    },

    header: {
        backgroundColor: '#e9e3ff',
        paddingTop: Platform.OS === 'android' ? 40 : 30,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        alignItems: 'center',
    },

    backBtn: {
        position: 'absolute',
        left: 15,
        top: Platform.OS === 'android' ? 40 : 30,
    },

    backText: {
        fontSize: width * 0.06,
    },

    title: {
        fontSize: width * 0.055,
        fontWeight: 'bold',
        marginTop: 10,
    },

    subtitle: {
        color: '#555',
        marginTop: 6,
        fontSize: width * 0.035,
        textAlign: 'center',
    },

    sectionTitle: {
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: '#777',
        letterSpacing: 1,
        fontSize: width * 0.035,
    },

    card: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 3,
    },

    cardImg: {
        width: '100%',
        height: height * 0.28,
    },

    logoBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15,
    },

    logoText: {
        color: '#fff',
        fontSize: width * 0.03,
    },

    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },

    cardTitle: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },

    cardSub: {
        color: '#666',
        fontSize: width * 0.032,
        marginTop: 3,
    },

    arrowBtn: {
        backgroundColor: '#ffe7d6',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    arrowText: {
        fontSize: 22,
        color: '#ff7a00',
    },

    footer: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30,
    },

    liveText: {
        fontSize: width * 0.14,
        color: '#ccc',
        fontWeight: 'bold',
    },

    footerSub: {
        marginTop: 10,
        color: '#888',
        fontSize: width * 0.035,
    },
});
