import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AccountStatements() {
  const navigation = useNavigation();
  const [duration, setDuration] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Top Card */}
      <View style={styles.topCard}>
        <View style={styles.textBox}>
          <Text style={styles.title}>Account Statements</Text>
          <Text style={styles.subtitle}>
            Invoices for reimbursements{'\n'}or record-keeping
          </Text>
        </View>

        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Select Duration */}
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {duration || 'Select Duration'}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </TouchableOpacity>

      {/* Button */}
      <TouchableOpacity style={styles.button} disabled>
        <Text style={styles.buttonText}>Get Report</Text>
      </TouchableOpacity>

      {/* Info Text */}
      <Text style={styles.infoText}>
        You will receive your statement within next 3 hours at{'\n'}
        gollasivakumar1470@gmail.com
      </Text>

      {/* Help Link */}
      <Text style={styles.helpText}>How account statements works?</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
    paddingTop:50,
  },

  headerRow: {
    marginBottom: 10,
  },

  backArrow: {
    fontSize: 22,
  },

  topCard: {
    backgroundColor: '#F7EFE6',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  textBox: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },

  image: {
    width: 100,
    height: 100,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdownText: {
    fontSize: 16,
    color: '#111',
  },

  chevron: {
    fontSize: 16,
    color: '#555',
  },

  button: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '700',
  },

  infoText: {
    fontSize: 13,
    color: '#555',
    marginTop: 18,
    lineHeight: 18,
  },

  helpText: {
    color: '#2563EB',
    fontSize: 14,
    marginTop: 12,
    fontWeight: '600',
  },
});
