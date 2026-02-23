import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const StudentRewardsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Student Rewards</Text>
          <Text style={styles.subtitle}>
            Verify your student email address to unlock exclusive Swiggy rewards!
          </Text>

          <Image
            source={{ uri: 'https://i.imgur.com/9QqF6sL.png' }} // sample image
            style={styles.heroImg}
          />
        </View>

        {/* EMAIL CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>VERIFY YOUR COLLEGE EMAIL</Text>

          <TextInput
            placeholder="Enter your email ID"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <TouchableOpacity style={styles.otpBtn}>
            <Text style={styles.otpText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        {/* NO STUDENT EMAIL */}
        <TouchableOpacity style={styles.noEmailBtn}>
          <Text style={styles.noEmailText}>No student email ID?  &gt;</Text>
        </TouchableOpacity>

        {/* BENEFITS */}
        <Text style={styles.heading}>BENEFITS</Text>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitText}>+ One – Free Deliveries at ₹9</Text>
          <Text style={styles.benefitText}>+ Flat 67% OFF on Food</Text>
          <Text style={styles.benefitText}>+ Additional ₹50 OFF on Instamart</Text>
          <Text style={styles.benefitText}>+ Flat 20% OFF on Dineout and more!</Text>
        </View>

        {/* HOW IT WORKS */}
        <Text style={styles.heading}>HOW IT WORKS</Text>

        <View style={styles.howCard}>
          <Text style={styles.step}>1. Enter your college email ID & click "Get OTP"</Text>
          <Text style={styles.step}>2. Check your email for the OTP</Text>
          <Text style={styles.step}>3. Verify OTP & unlock rewards</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentRewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f7',
    paddingTop: 5, // top padding
  },

  header: {
    backgroundColor: '#7A1E4A',
    padding: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 15,
    top: 15,
    marginTop:20,
  },

  backText: {
    color: '#fff',
    fontSize: 24,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },

  subtitle: {
    color: '#eee',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
  },

  heroImg: {
    width: width * 0.55,
    height: width * 0.55,
    resizeMode: 'contain',
    marginVertical: 10,
  },

  card: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    padding: 15,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
  },

  otpBtn: {
    backgroundColor: '#ddd',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  otpText: {
    color: '#777',
    fontWeight: 'bold',
  },

  noEmailBtn: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  noEmailText: {
    color: '#ff6a00',
    fontWeight: 'bold',
  },

  heading: {
    marginLeft: 15,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#777',
  },

  benefitCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    padding: 15,
  },

  benefitText: {
    fontSize: 14,
    marginBottom: 8,
  },

  howCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },

  step: {
    fontSize: 14,
    marginBottom: 8,
  },
});
