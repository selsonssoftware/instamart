import React, { useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar, 
    Animated, 
    Dimensions, 
    Image 
} from 'react-native';

const { width } = Dimensions.get('window');

export default function FlashScreen({ navigation }) {
    // Animation Refs
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            })
        ]).start();

        // Navigate after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace('SignIn');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0052FE" />
            
            {/* --- WORK LOCATION HEADER --- */}
            <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
                <View style={styles.iconBox}>
                    <View style={styles.briefcaseIcon} />
                </View>
                <Text style={styles.workTitle}>Work</Text>
                <Text style={styles.addressText}>
                    Selsons Software Developer, Bupathinagar,{"\n"}
                    Boopathy Nagar, Kodambakkam, Chennai,{"\n"}
                    Tamil Nadu 600024, India
                </Text>
            </Animated.View>

            {/* --- MAIN LOGO AREA --- */}
            <Animated.View style={{
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                alignItems: 'center'
            }}>
                <View style={styles.logoContainer}>
                    <View style={styles.orangeBox}>
                        {/* This represents the white "S" location pin icon */}
                        <View style={styles.whitePin} />
                    </View>
                    <Text style={styles.instaText}>insta</Text>
                    <Text style={styles.martText}>mart</Text>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0052FE', // Accurate Blue background
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    headerContainer: {
        position: 'absolute',
        top: 100,
        alignItems: 'center',
        width: '100%',
    },
    iconBox: {
        width: 35,
        height: 35,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    briefcaseIcon: {
        width: 15,
        height: 12,
        backgroundColor: '#FFF',
        borderRadius: 2,
    },
    workTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addressText: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
    },
    logoContainer: {
        alignItems: 'center',
    },
    orangeBox: {
        width: 90,
        height: 80,
        backgroundColor: '#FF6D00', // Swiggy/Instamart Orange
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    whitePin: {
        width: 30,
        height: 35,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 20,
    },
    instaText: {
        fontSize: 54,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 54,
    },
    martText: {
        fontSize: 54,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 54,
        marginTop: -10,
    },
});