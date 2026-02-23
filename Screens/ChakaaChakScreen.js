import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ChakaaChakScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6A5ACD" />
      
      {/* Background Pattern / Lines */}
      <View style={styles.backgroundLines}>
        <View style={styles.curvedLine} />
      </View>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Product Image Section */}
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../assets/images/f.jpg')} // Chakaa Chak main mop image ikkada pettandi
            style={styles.mainProductImage}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Logo Section */}
        <View style={styles.footer}>
          <Image 
            source={require('../assets/images/f.jpg')} // Chakaa Chak Logo ikkada pettandi
            style={styles.bottomLogo}
            resizeMode="contain"
          />
          
         
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A5ACD', // Purple background based on image
    paddingTop:30,
  },
  backgroundLines: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.3,
  },
  // Curved grid effect lines
  curvedLine: {
    position: 'absolute',
    width: width * 1.5,
    height: height,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 500,
    top: -height * 0.2,
    left: -width * 0.2,
  },
  backButton: {
    padding: 15,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainProductImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    width: width,
    alignItems: 'center',
    paddingBottom: 40,
  },
  bottomLogo: {
    width: width * 0.6,
    height: 100,
    marginBottom: 20,
  },
  shopNowBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
  },
  shopNowText: {
    color: '#E91E63',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
});