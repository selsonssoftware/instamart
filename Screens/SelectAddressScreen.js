import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions, Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function SelectAddressScreen() {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState('1'); // Default select first address

  const savedAddresses = [
    { id: '1', type: 'Home', address: 'Selsons Software Solutions, Madhapur, Hyderabad, Telangana, 500081', phone: '9876543210', icon: 'home-outline' },
    { id: '2', type: 'Work', address: 'Cyber Towers, HITEC City, Hyderabad, 500081', phone: '9876543210', icon: 'business-outline' },
    { id: '3', type: 'Other', address: 'DLF Cyber City, Gachibowli, Hyderabad, 500032', phone: '9876543210', icon: 'location-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Address</Text>
        <TouchableOpacity style={styles.addNewBtn}>
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 15 }}>
        
        <Text style={styles.sectionHeading}>Saved Addresses</Text>

        {savedAddresses.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.addressCard, selectedId === item.id && styles.selectedCard]}
            onPress={() => setSelectedId(item.id)}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconCircle, selectedId === item.id && styles.selectedIconBg]}>
                <Ionicons 
                  name={item.icon} 
                  size={24} 
                  color={selectedId === item.id ? '#fff' : '#7E22CE'} 
                />
              </View>
            </View>

            <View style={styles.cardRight}>
              <View style={styles.typeRow}>
                <Text style={styles.addressType}>{item.type}</Text>
                {selectedId === item.id && (
                   <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                )}
              </View>
              <Text style={styles.addressText} numberOfLines={2}>{item.address}</Text>
              <Text style={styles.phoneText}>Phone: {item.phone}</Text>
              
              <View style={styles.actionRow}>
                 <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
                 <TouchableOpacity style={styles.editBtn}><Text style={styles.deleteText}>Delete</Text></TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* ADD NEW OPTION */}
        <TouchableOpacity style={styles.dashedAddBtn}>
          <Ionicons name="add-circle-outline" size={24} color="#7E22CE" />
          <Text style={styles.dashedText}>Add New Address</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* FOOTER BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.confirmBtn}
          onPress={() => navigation.navigate('PaymentModes')}
        >
          <Text style={styles.confirmText}>Confirm Address</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    padding: 20, backgroundColor: '#fff', elevation: 3,
    paddingTop: Platform.OS === 'android' ? 50 : 20 
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1B' },
  addNewBtn: { backgroundColor: '#F3F0FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  addNewText: { color: '#7E22CE', fontWeight: 'bold', fontSize: 12 },

  sectionHeading: { fontSize: 14, fontWeight: '700', color: '#666', marginBottom: 15, textTransform: 'uppercase' },

  addressCard: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20,
    padding: 15, marginBottom: 15, borderWidth: 1.5, borderColor: '#fff',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05
  },
  selectedCard: { borderColor: '#7E22CE', backgroundColor: '#FBF9FF' },
  cardLeft: { marginRight: 15 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F3F0FF', justifyContent: 'center', alignItems: 'center' },
  selectedIconBg: { backgroundColor: '#7E22CE' },

  cardRight: { flex: 1 },
  typeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  addressType: { fontSize: 16, fontWeight: '900', color: '#1A1A1B' },
  addressText: { fontSize: 13, color: '#666', lineHeight: 18 },
  phoneText: { fontSize: 12, color: '#999', marginTop: 5, fontWeight: '600' },

  actionRow: { flexDirection: 'row', marginTop: 12, gap: 20 },
  editBtn: { paddingVertical: 5 },
  editText: { color: '#7E22CE', fontWeight: '800', fontSize: 13 },
  deleteText: { color: '#FF5252', fontWeight: '800', fontSize: 13 },

  dashedAddBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 18, borderRadius: 20, borderStyle: 'dashed', borderWidth: 1.5, borderColor: '#7E22CE',
    marginTop: 10, gap: 10
  },
  dashedText: { color: '#7E22CE', fontWeight: '800', fontSize: 15 },

  footer: { 
    position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff',
    padding: 20, borderTopWidth: 1, borderColor: '#eee' 
  },
  confirmBtn: { 
    backgroundColor: '#7E22CE', padding: 18, borderRadius: 15, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
    elevation: 8, shadowColor: '#7E22CE', shadowOpacity: 0.3
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '900' }
});