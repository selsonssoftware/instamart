import React, { useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Animated,
    Platform,
    TextInput,
    RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CATEGORIES_DATA = [
    {
        id: 'section1',
        title: 'Fresh Items',
        icon: 'leaf-outline',
        data: [
            { id: '1', name: 'Vegetables', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329865.png', screen: 'vegetables' },
            { id: '2', name: 'Fresh Fruits', img: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png', screen: 'fruits' },
            { id: '3', name: 'Dairy & Bread', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png', screen: 'dairy' },
            { id: '4', name: 'Meat & Seafood', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046761.png', screen: 'meat' },
            { id: 'f5', name: 'Organic Greens', img: 'https://cdn-icons-png.flaticon.com/512/2917/2917633.png', screen: 'vegetables' },
            { id: 'f6', name: 'Exotic Fruits', img: 'https://cdn-icons-png.flaticon.com/512/1625/1625099.png', screen: 'fruits' },
            { id: 'f7', name: 'Fresh Milk', img: 'https://cdn-icons-png.flaticon.com/512/372/372971.png', screen: 'dairy' },
            { id: 'f8', name: 'Farm Eggs', img: 'https://cdn-icons-png.flaticon.com/512/2713/2713499.png', screen: 'dairy' },
            { id: 'f9', name: 'Curd & Yogurt', img: 'https://cdn-icons-png.flaticon.com/512/2304/2304882.png', screen: 'dairy' },
            { id: 'f10', name: 'Paneer & Tofu', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553655.png', screen: 'dairy' },
            { id: 'f11', name: 'Butter & Ghee', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553641.png', screen: 'oils' },
            { id: 'f12', name: 'Frozen Veg', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329891.png', screen: 'vegetables' },
            { id: 'f13', name: 'Chicken', img: 'https://cdn-icons-png.flaticon.com/512/3144/3144865.png', screen: 'meat' },
            { id: 'f14', name: 'Fish', img: 'https://cdn-icons-png.flaticon.com/512/1915/1915295.png', screen: 'meat' },
            { id: 'f15', name: 'Mutton', img: 'https://cdn-icons-png.flaticon.com/512/3144/3144877.png', screen: 'meat' },
            { id: 'f16', name: 'Prawns', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553664.png', screen: 'meat' },
            { id: 'f17', name: 'Brown Bread', img: 'https://cdn-icons-png.flaticon.com/512/992/992743.png', screen: 'dairy' },
            { id: 'f18', name: 'Sandwich Bread', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329903.png', screen: 'dairy' },
            { id: 'f19', name: 'Soya Chunks', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329880.png', screen: 'riceAndDal' },
            { id: 'f20', name: 'Dosa Batter', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553658.png', screen: 'dairy' },
        ],
    },
    {
        id: 'section2',
        title: 'Grocery',
        icon: 'basket-outline',
        data: [
            { id: '5', name: 'Rice and Dal', img: 'https://cdn-icons-png.flaticon.com/512/3504/3504155.png', screen: 'riceAndDal' },
            { id: '6', name: 'Masalas', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046750.png', screen: 'masalas' },
            { id: '7', name: 'Oils and Ghee', img: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png', screen: 'oils' },
            { id: '8', name: 'Dry Fruits', img: 'https://cdn-icons-png.flaticon.com/512/2965/2965611.png', screen: 'dryFruits' },
            { id: 'g9', name: 'Atta & Flour', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329900.png', screen: 'riceAndDal' },
            { id: 'g10', name: 'Sugar & Salt', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329889.png', screen: 'riceAndDal' },
            { id: 'g11', name: 'Cooking Paste', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046782.png', screen: 'masalas' },
            { id: 'g12', name: 'Pickles', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553663.png', screen: 'masalas' },
            { id: 'g13', name: 'Spices', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046774.png', screen: 'masalas' },
            { id: 'g14', name: 'Pulses', img: 'https://cdn-icons-png.flaticon.com/512/3504/3504144.png', screen: 'riceAndDal' },
            { id: 'g15', name: 'Healthy Oils', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046811.png', screen: 'oils' },
            { id: 'g16', name: 'Basmati Rice', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553657.png', screen: 'riceAndDal' },
            { id: 'g17', name: 'Toor Dal', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553653.png', screen: 'riceAndDal' },
            { id: 'g18', name: 'Honey', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329875.png', screen: 'riceAndDal' },
            { id: 'g19', name: 'Vinegar', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046808.png', screen: 'masalas' },
            { id: 'g20', name: 'Baking Soda', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553650.png', screen: 'masalas' },
            { id: 'g21', name: 'Cashews', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553644.png', screen: 'dryFruits' },
            { id: 'g22', name: 'Almonds', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329868.png', screen: 'dryFruits' },
            { id: 'g23', name: 'Dates', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553654.png', screen: 'dryFruits' },
            { id: 'g24', name: 'Pappad', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553662.png', screen: 'riceAndDal' },
        ],
    },
    {
        id: 'section3',
        title: 'Snacks',
        icon: 'ice-cream-outline',
        data: [
            { id: '13', name: 'Tea & Coffee', img: 'https://cdn-icons-png.flaticon.com/512/3124/3124210.png', screen: 'beverages' },
            { id: '14', name: 'Cold Drinks', img: 'https://cdn-icons-png.flaticon.com/512/2405/2405479.png', screen: 'coldDrinks' },
            { id: '15', name: 'Chips', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png', screen: 'snacks' },
            { id: '16', name: 'Biscuits', img: 'https://cdn-icons-png.flaticon.com/512/2965/2965568.png', screen: 'biscuits' },
            { id: 's17', name: 'Chocolates', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553645.png', screen: 'snacks' },
            { id: 's18', name: 'Namkeen', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553661.png', screen: 'snacks' },
            { id: 's19', name: 'Fruit Juices', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329878.png', screen: 'beverages' },
            { id: 's20', name: 'Energy Drinks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553693.png', screen: 'beverages' },
            { id: 's21', name: 'Cookies', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553648.png', screen: 'biscuits' },
            { id: 's22', name: 'Popcorn', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553665.png', screen: 'snacks' },
            { id: 's23', name: 'Noodles', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553660.png', screen: 'snacks' },
            { id: 's24', name: 'Pasta', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553662.png', screen: 'snacks' },
            { id: 's25', name: 'Ketchup', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553659.png', screen: 'snacks' },
            { id: 's26', name: 'Spreads', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553658.png', screen: 'snacks' },
            { id: 's27', name: 'Cakes', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553643.png', screen: 'snacks' },
            { id: 's28', name: 'Munchies', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553690.png', screen: 'snacks' },
            { id: 's29', name: 'Ice Cream', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553656.png', screen: 'snacks' },
            { id: 's30', name: 'Sweets', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553646.png', screen: 'snacks' },
            { id: 's31', name: 'Frozen Snacks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553689.png', screen: 'snacks' },
            { id: 's32', name: 'Sparkling Water', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553694.png', screen: 'beverages' },
        ],
    },
    {
        id: 'section4',
        title: 'Household',
        icon: 'home-outline',
        data: [
            { id: '17', name: 'Bath & Body', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553642.png', screen: 'personalCare' },
            { id: '18', name: 'Cleaning', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553677.png', screen: 'cleaning' },
            { id: '19', name: 'Oral Care', img: 'https://cdn-icons-png.flaticon.com/512/3465/3465057.png', screen: 'oralCare' },
            { id: '20', name: 'Pooja Needs', img: 'https://cdn-icons-png.flaticon.com/512/5354/5354508.png', screen: 'pooja' },
            { id: 'h21', name: 'Dishwash', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553678.png', screen: 'cleaning' },
            { id: 'h22', name: 'Floor Cleaners', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553679.png', screen: 'cleaning' },
            { id: 'h23', name: 'Repellents', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553680.png', screen: 'cleaning' },
            { id: 'h24', name: 'Tissue Paper', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'cleaning' },
            { id: 'h25', name: 'Air Freshners', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553682.png', screen: 'cleaning' },
            { id: 'h26', name: 'Garbage Bags', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553683.png', screen: 'cleaning' },
            { id: 'h27', name: 'Pet Care', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553684.png', screen: 'dogFood' },
            { id: 'h28', name: 'Kitchen Tools', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553685.png', screen: 'cleaning' },
            { id: 'h29', name: 'Batteries', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553686.png', screen: 'batteries' },
            { id: 'h30', name: 'Stationery', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553687.png', screen: 'cleaning' },
            { id: 'h31', name: 'Electricals', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553688.png', screen: 'lights' },
            { id: 'h32', name: 'Hair Care', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553647.png', screen: 'personalCare' },
            { id: 'h33', name: 'Sanitary Pads', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553649.png', screen: 'personalCare' },
            { id: 'h34', name: 'Shaving Needs', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553651.png', screen: 'personalCare' },
            { id: 'h35', name: 'Handwash', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553652.png', screen: 'personalCare' },
            { id: 'h36', name: 'Face Care', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553654.png', screen: 'personalCare' },
        ],
    },
    {
        id: 'section5',
        title: 'Baby Care',
        icon: 'heart-outline',
        data: [
            { id: 'b1', name: 'Diapers', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491921.png', screen: 'babyCare' },
            { id: 'b2', name: 'Baby Wipes', img: 'https://cdn-icons-png.flaticon.com/512/2913/2913501.png', screen: 'babyCare' },
            { id: 'b3', name: 'Baby Food', img: 'https://cdn-icons-png.flaticon.com/512/2713/2713474.png', screen: 'babyFood' },
            { id: 'b4', name: 'Baby Lotion', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046820.png', screen: 'babyCare' },
            { id: 'b5', name: 'Cerelac', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329900.png', screen: 'babyFood' },
            { id: 'b6', name: 'Baby Shampoo', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553647.png', screen: 'babyCare' },
            { id: 'b7', name: 'Baby Soap', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553642.png', screen: 'babyCare' },
            { id: 'b8', name: 'Feeding Bottles', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png', screen: 'babyCare' },
            { id: 'b9', name: 'Baby Oil', img: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png', screen: 'babyCare' },
            { id: 'b10', name: 'Baby Powder', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046822.png', screen: 'babyCare' },
            { id: 'b11', name: 'Pacifiers', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046825.png', screen: 'babyCare' },
            { id: 'b12', name: 'Baby Towels', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'babyCare' },
            { id: 'b13', name: 'Baby Laundry', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553677.png', screen: 'cleaning' },
            { id: 'b14', name: 'Strollers', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491932.png', screen: 'babyCare' },
            { id: 'b15', name: 'Teethers', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046828.png', screen: 'babyCare' },
            { id: 'b16', name: 'Baby Clothes', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553643.png', screen: 'babyCare' },
            { id: 'b17', name: 'Diaper Bags', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553684.png', screen: 'babyCare' },
            { id: 'b18', name: 'Baby Carriers', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491940.png', screen: 'babyCare' },
            { id: 'b19', name: 'Baby Toys', img: 'https://cdn-icons-png.flaticon.com/512/5267/5267154.png', screen: 'babyCare' },
            { id: 'b20', name: 'Nursing Pillows', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'babyCare' },
        ],
    },
    {
        id: 'section6',
        title: 'Pet Supplies',
        icon: 'paw-outline',
        data: [
            { id: 'p1', name: 'Dog Food', img: 'https://cdn-icons-png.flaticon.com/512/824/824368.png', screen: 'dogFood' },
            { id: 'p2', name: 'Cat Food', img: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png', screen: 'catFood' },
            { id: 'p3', name: 'Pet Toys', img: 'https://cdn-icons-png.flaticon.com/512/5267/5267154.png', screen: 'petToys' },
            { id: 'p4', name: 'Pet Grooming', img: 'https://cdn-icons-png.flaticon.com/512/2913/2913495.png', screen: 'petGroom' },
            { id: 'p5', name: 'Bird Food', img: 'https://cdn-icons-png.flaticon.com/512/3022/3022567.png', screen: 'petToys' },
            { id: 'p6', name: 'Fish Food', img: 'https://cdn-icons-png.flaticon.com/512/1915/1915295.png', screen: 'petToys' },
            { id: 'p7', name: 'Pet Shampoos', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553647.png', screen: 'petGroom' },
            { id: 'p8', name: 'Leashes', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553680.png', screen: 'dogFood' },
            { id: 'p9', name: 'Pet Beds', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'dogFood' },
            { id: 'p10', name: 'Litter Box', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553683.png', screen: 'catFood' },
            { id: 'p11', name: 'Dog Bowls', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553655.png', screen: 'dogFood' },
            { id: 'p12', name: 'Pet Treats', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553654.png', screen: 'dogFood' },
            { id: 'p13', name: 'Flea Control', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553680.png', screen: 'petGroom' },
            { id: 'p14', name: 'Pet Brushes', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553685.png', screen: 'petGroom' },
            { id: 'p15', name: 'Pet Collars', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553680.png', screen: 'dogFood' },
            { id: 'p16', name: 'Chew Toys', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046828.png', screen: 'petToys' },
            { id: 'p17', name: 'Cat Grass', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329865.png', screen: 'catFood' },
            { id: 'p18', name: 'Aquarium Kits', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553688.png', screen: 'petToys' },
            { id: 'p19', name: 'Pet Odor', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553682.png', screen: 'cleaning' },
            { id: 'p20', name: 'Pet Medicines', img: 'https://cdn-icons-png.flaticon.com/512/3022/3022567.png', screen: 'pharma' },
        ],
    },
    {
        id: 'section7',
        title: 'Pharma & Wellness',
        icon: 'medkit-outline',
        data: [
            { id: 'ph1', name: 'Wellness', img: 'https://cdn-icons-png.flaticon.com/512/3022/3022567.png', screen: 'wellness' },
            { id: 'ph2', name: 'First Aid', img: 'https://cdn-icons-png.flaticon.com/512/2966/2966334.png', screen: 'firstAid' },
            { id: 'ph3', name: 'Pain Relief', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046830.png', screen: 'pharma' },
            { id: 'ph4', name: 'Ayurveda', img: 'https://cdn-icons-png.flaticon.com/512/3081/3081640.png', screen: 'ayurveda' },
            { id: 'ph5', name: 'Supplements', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329889.png', screen: 'wellness' },
            { id: 'ph6', name: 'Hand Wash', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553652.png', screen: 'personalCare' },
            { id: 'ph7', name: 'Masks', img: 'https://cdn-icons-png.flaticon.com/512/3465/3465057.png', screen: 'oralCare' },
            { id: 'ph8', name: 'Digestive', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046782.png', screen: 'pharma' },
            { id: 'ph9', name: 'Protein', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553657.png', screen: 'wellness' },
            { id: 'ph10', name: 'Herbal Tea', img: 'https://cdn-icons-png.flaticon.com/512/3124/3124210.png', screen: 'beverages' },
            { id: 'ph11', name: 'Cough Care', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046750.png', screen: 'pharma' },
            { id: 'ph12', name: 'Diabetes', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046777.png', screen: 'pharma' },
            { id: 'ph13', name: 'Thermometers', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050160.png', screen: 'firstAid' },
            { id: 'ph14', name: 'Antiseptic', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553678.png', screen: 'cleaning' },
            { id: 'ph15', name: 'Cotton Wool', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'firstAid' },
            { id: 'ph16', name: 'Weight Care', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046811.png', screen: 'wellness' },
            { id: 'ph17', name: 'Eye Care', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553654.png', screen: 'personalCare' },
            { id: 'ph18', name: 'Chyawanprash', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553663.png', screen: 'ayurveda' },
            { id: 'ph19', name: 'Glucose', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329889.png', screen: 'wellness' },
            { id: 'ph20', name: 'Knee Support', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553680.png', screen: 'firstAid' },
        ],
    },
    {
        id: 'section8',
        title: 'Electronics & Tools',
        icon: 'bulb-outline',
        data: [
            { id: 'e1', name: 'Batteries', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046777.png', screen: 'batteries' },
            { id: 'e2', name: 'Cables', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050160.png', screen: 'cables' },
            { id: 'e3', name: 'Gadgets', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553702.png', screen: 'gadgets' },
            { id: 'e4', name: 'Lights', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046780.png', screen: 'lights' },
            { id: 'e5', name: 'Chargers', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050155.png', screen: 'cables' },
            { id: 'e6', name: 'Smart Plugs', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553688.png', screen: 'lights' },
            { id: 'e7', name: 'Memory Cards', img: 'https://cdn-icons-png.flaticon.com/512/3504/3504155.png', screen: 'gadgets' },
            { id: 'e8', name: 'Extension Cord', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png', screen: 'lights' },
            { id: 'e9', name: 'Headphones', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046782.png', screen: 'gadgets' },
            { id: 'e10', name: 'Trimmers', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553651.png', screen: 'personalCare' },
            { id: 'e11', name: 'Hair Dryers', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553647.png', screen: 'personalCare' },
            { id: 'e12', name: 'OTG Adapters', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050162.png', screen: 'cables' },
            { id: 'e13', name: 'Power Banks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553686.png', screen: 'gadgets' },
            { id: 'e14', name: 'Mouse & Kybd', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553685.png', screen: 'gadgets' },
            { id: 'e15', name: 'LED Strips', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046781.png', screen: 'lights' },
            { id: 'e16', name: 'Pens', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553687.png', screen: 'cleaning' },
            { id: 'e17', name: 'Notebooks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553682.png', screen: 'cleaning' },
            { id: 'e18', name: 'Glue & Tape', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553678.png', screen: 'cleaning' },
            { id: 'e19', name: 'Scissors', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046785.png', screen: 'cleaning' },
            { id: 'e20', name: 'Calc & Scales', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553650.png', screen: 'gadgets' },
        ],
    },
    {
        id: 'section9',
        title: 'Stationery & Games',
        icon: 'pencil-outline',
        data: [
            { id: 'st1', name: 'Notebooks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553682.png', screen: 'cleaning' },
            { id: 'st2', name: 'Pens & Pencils', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553687.png', screen: 'cleaning' },
            { id: 'st3', name: 'Art Supplies', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046781.png', screen: 'cleaning' },
            { id: 'st4', name: 'Glue & Tape', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553678.png', screen: 'cleaning' },
            { id: 'st5', name: 'Calculators', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553650.png', screen: 'gadgets' },
            { id: 'st6', name: 'Party Games', img: 'https://cdn-icons-png.flaticon.com/512/5267/5267154.png', screen: 'petToys' },
            { id: 'st7', name: 'Board Games', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553688.png', screen: 'petToys' },
            { id: 'st8', name: 'Scissors', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046785.png', screen: 'cleaning' },
            { id: 'st9', name: 'Markers', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046750.png', screen: 'cleaning' },
            { id: 'st10', name: 'Gift Wraps', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553684.png', screen: 'cleaning' },
            { id: 'st11', name: 'Geometry Box', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050160.png', screen: 'cleaning' },
            { id: 'st12', name: 'Stickers', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553661.png', screen: 'cleaning' },
            { id: 'st13', name: 'Files & Folders', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'cleaning' },
            { id: 'st14', name: 'Envelopes', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553683.png', screen: 'cleaning' },
            { id: 'st15', name: 'Staplers', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553677.png', screen: 'cleaning' },
            { id: 'st16', name: 'Highlighters', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046811.png', screen: 'cleaning' },
            { id: 'st17', name: 'Sketch Pens', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553654.png', screen: 'cleaning' },
            { id: 'st18', name: 'Desk Organizers', img: 'https://cdn-icons-png.flaticon.com/512/3050/3050155.png', screen: 'cleaning' },
            { id: 'st19', name: 'Whiteboards', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553686.png', screen: 'cleaning' },
            { id: 'st20', name: 'Craft Paper', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329878.png', screen: 'cleaning' },
        ],
    },
    {
        id: 'section10',
        title: 'Frozen Food',
        icon: 'snow-outline',
        data: [
            { id: 'ff1', name: 'Frozen Peas', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329891.png', screen: 'vegetables' },
            { id: 'ff2', name: 'French Fries', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png', screen: 'snacks' },
            { id: 'ff3', name: 'Frozen Corn', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329865.png', screen: 'vegetables' },
            { id: 'ff4', name: 'Veg Nuggets', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553689.png', screen: 'snacks' },
            { id: 'ff5', name: 'Frozen Paneer', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553655.png', screen: 'dairy' },
            { id: 'ff6', name: 'Frozen Parathas', img: 'https://cdn-icons-png.flaticon.com/512/992/992743.png', screen: 'dairy' },
            { id: 'ff7', name: 'Frozen Momos', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553662.png', screen: 'snacks' },
            { id: 'ff8', name: 'Frozen Pizza', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046774.png', screen: 'snacks' },
            { id: 'ff9', name: 'Ice Cubes', img: 'https://cdn-icons-png.flaticon.com/512/2304/2304882.png', screen: 'beverages' },
            { id: 'ff10', name: 'Chicken Seekh', img: 'https://cdn-icons-png.flaticon.com/512/3144/3144865.png', screen: 'meat' },
            { id: 'ff11', name: 'Frozen Burger', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553660.png', screen: 'snacks' },
            { id: 'ff12', name: 'Samosas', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553661.png', screen: 'snacks' },
            { id: 'ff13', name: 'Potato Wedges', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046750.png', screen: 'snacks' },
            { id: 'ff14', name: 'Frozen Berries', img: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png', screen: 'fruits' },
            { id: 'ff15', name: 'Mixed Veggie', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329880.png', screen: 'vegetables' },
            { id: 'ff16', name: 'Spring Rolls', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553646.png', screen: 'snacks' },
            { id: 'ff17', name: 'Frozen Desserts', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553656.png', screen: 'snacks' },
            { id: 'ff18', name: 'Prawns Frozen', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553664.png', screen: 'meat' },
            { id: 'ff19', name: 'Frozen Snacks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553690.png', screen: 'snacks' },
            { id: 'ff20', name: 'Cold Cuts', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046761.png', screen: 'meat' },
        ],
    },
    {
        id: 'section11',
        title: 'Festive Needs',
        icon: 'star-outline',
        data: [
            { id: 'fn1', name: 'Pooja Diya', img: 'https://cdn-icons-png.flaticon.com/512/5354/5354508.png', screen: 'pooja' },
            { id: 'fn2', name: 'Agarbatti', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553682.png', screen: 'pooja' },
            { id: 'fn3', name: 'Camphor', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553654.png', screen: 'pooja' },
            { id: 'fn4', name: 'Pooja Oil', img: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png', screen: 'oils' },
            { id: 'fn5', name: 'Decorative Lights', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046781.png', screen: 'lights' },
            { id: 'fn6', name: 'Matchsticks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553678.png', screen: 'pooja' },
            { id: 'fn7', name: 'Flowers', img: 'https://cdn-icons-png.flaticon.com/512/2917/2917633.png', screen: 'vegetables' },
            { id: 'fn8', name: 'Coconuts', img: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png', screen: 'fruits' },
            { id: 'fn9', name: 'Betel Leaves', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329865.png', screen: 'vegetables' },
            { id: 'fn10', name: 'Cotton Wicks', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'pooja' },
            { id: 'fn11', name: 'Rangoli Color', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046782.png', screen: 'pooja' },
            { id: 'fn12', name: 'Torans', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046811.png', screen: 'pooja' },
            { id: 'fn13', name: 'Sweet Boxes', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553646.png', screen: 'snacks' },
            { id: 'fn14', name: 'Gift Hampers', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553684.png', screen: 'snacks' },
            { id: 'fn15', name: 'Puja Plate', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553650.png', screen: 'pooja' },
            { id: 'fn16', name: 'Honey Small', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329875.png', screen: 'riceAndDal' },
            { id: 'fn17', name: 'Sandalwood', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046774.png', screen: 'pooja' },
            { id: 'fn18', name: 'Bangles', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553643.png', screen: 'personalCare' },
            { id: 'fn19', name: 'Kumkum', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553651.png', screen: 'pooja' },
            { id: 'fn20', name: 'Lanterns', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046780.png', screen: 'lights' },
        ],
    },
    {
        id: 'section12',
        title: 'Personal Grooming',
        icon: 'cut-outline',
        data: [
            { id: 'pg1', name: 'Trimmers', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553651.png', screen: 'personalCare' },
            { id: 'pg2', name: 'Hair Dryers', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553647.png', screen: 'personalCare' },
            { id: 'pg3', name: 'Razors', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046830.png', screen: 'personalCare' },
            { id: 'pg4', name: 'Shaving Gel', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553642.png', screen: 'personalCare' },
            { id: 'pg5', name: 'Deodorants', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046820.png', screen: 'personalCare' },
            { id: 'pg6', name: 'Hair Brushes', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553685.png', screen: 'personalCare' },
            { id: 'pg7', name: 'Nail Cutters', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553650.png', screen: 'personalCare' },
            { id: 'pg8', name: 'Face Massager', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046822.png', screen: 'personalCare' },
            { id: 'pg9', name: 'Eyelash Curler', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046825.png', screen: 'personalCare' },
            { id: 'pg10', name: 'Beauty Blender', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046828.png', screen: 'personalCare' },
            { id: 'pg11', name: 'Tweezers', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046785.png', screen: 'personalCare' },
            { id: 'pg12', name: 'Hair Wax', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553654.png', screen: 'personalCare' },
            { id: 'pg13', name: 'Face Wash', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553652.png', screen: 'personalCare' },
            { id: 'pg14', name: 'Body Sprays', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553682.png', screen: 'personalCare' },
            { id: 'pg15', name: 'Hair Color', img: 'https://cdn-icons-png.flaticon.com/512/1046/1046811.png', screen: 'personalCare' },
            { id: 'pg16', name: 'Talcum Powder', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553653.png', screen: 'personalCare' },
            { id: 'pg17', name: 'Cotton Pads', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553681.png', screen: 'personalCare' },
            { id: 'pg18', name: 'Ear Buds', img: 'https://cdn-icons-png.flaticon.com/512/3465/3465057.png', screen: 'personalCare' },
            { id: 'pg19', name: 'Lip Care', img: 'https://cdn-icons-png.flaticon.com/512/2553/2553658.png', screen: 'personalCare' },
            { id: 'pg20', name: 'Moisturizers', img: 'https://cdn-icons-png.flaticon.com/512/3022/3022567.png', screen: 'personalCare' },
        ],
    },
];

export default function CategoriesScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSection, setSelectedSection] = useState(CATEGORIES_DATA[0].id);
    
    // --- REFRESH STATE ---
    const [refreshing, setRefreshing] = useState(false);

    // Animation refs
    const scrollX = useRef(new Animated.Value(0)).current;

    // --- REFRESH LOGIC ---
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Buffering simulator (1.5 seconds)
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);

    const filteredData = CATEGORIES_DATA.filter(section =>
        section.data.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const activeSectionData = CATEGORIES_DATA.find(s => s.id === selectedSection)?.data || [];

    const renderGridItem = ({ item }) => (
        <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.8}
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: item.img }} style={styles.categoryImg} />
            </View>
            <Text style={styles.categoryLabel} numberOfLines={2}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

            {/* --- ULTRA PRO HEADER --- */}
            <View style={styles.headerGlass}>
                <View style={styles.headerTopRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
                        <Ionicons name="chevron-back" size={24} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.headerMainTitle}>Shop by Category</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#666" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search groceries, snacks..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#CCC" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.mainContent}>
                {/* --- PRO SIDEBAR (No Refresh Here) --- */}
                {!searchQuery && (
                    <View style={styles.sidebar}>
                        <FlatList
                            data={CATEGORIES_DATA}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            // REMOVED REFRESH CONTROL FROM HERE TO FIX DOUBLE BUFFERING
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.sidebarItem,
                                        selectedSection === item.id && styles.sidebarItemActive
                                    ]}
                                    onPress={() => setSelectedSection(item.id)}
                                >
                                    {selectedSection === item.id && <View style={styles.activeIndicator} />}
                                    <Ionicons
                                        name={item.icon}
                                        size={22}
                                        color={selectedSection === item.id ? '#6D28D9' : '#666'}
                                    />
                                    <Text style={[
                                        styles.sidebarLabel,
                                        selectedSection === item.id && styles.sidebarLabelActive
                                    ]}>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                {/* --- PRO CONTENT GRID (With Refresh) --- */}
                <View style={styles.contentArea}>
                    <FlatList
                        data={searchQuery ? filteredData.flatMap(s => s.data.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))) : activeSectionData}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        renderItem={renderGridItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.gridPadding}
                        // RETAINED REFRESH CONTROL HERE
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6D28D9" colors={['#6D28D9']} />
                        }
                        ListHeaderComponent={() => (
                            <Text style={styles.gridTitle}>
                                {searchQuery ? 'Search Results' : CATEGORIES_DATA.find(s => s.id === selectedSection).title}
                            </Text>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },

    // Header Styles
    headerGlass: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingTop: Platform.OS === 'android' ? 40 : 10,
    },
    headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
    backCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
    headerMainTitle: { fontSize: 18, fontWeight: '900', color: '#111', letterSpacing: -0.5 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        paddingHorizontal: 15,
        height: 50,
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#000', fontWeight: '500' },

    mainContent: { flex: 1, flexDirection: 'row' },

    // Sidebar Styles
    sidebar: {
        width: width * 0.22,
        backgroundColor: '#F9FAFB',
        borderRightWidth: 1,
        borderRightColor: '#F3F4F6',
    },
    sidebarItem: {
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    sidebarItemActive: { backgroundColor: '#FFF' },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        height: 30,
        width: 4,
        backgroundColor: '#6D28D9',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        top: '40%',
    },
    sidebarLabel: { fontSize: 10, fontWeight: '700', color: '#666', marginTop: 8, textAlign: 'center' },
    sidebarLabelActive: { color: '#6D28D9' },

    // Content Grid Styles
    contentArea: { flex: 1, backgroundColor: '#FFF' },
    gridPadding: { paddingBottom: 100, paddingHorizontal: 10 },
    gridTitle: { fontSize: 20, fontWeight: '900', color: '#111', marginVertical: 20, marginLeft: 5 },
    gridCard: {
        width: (width * 0.78) / 3 - 10,
        alignItems: 'center',
        marginBottom: 25,
    },
    imageWrapper: {
        width: 75,
        height: 75,
        backgroundColor: '#F8FAFC',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    categoryImg: { width: '65%', height: '65%', resizeMode: 'contain' },
    categoryLabel: {
        fontSize: 11,
        textAlign: 'center',
        marginTop: 10,
        color: '#334155',
        fontWeight: '800',
        paddingHorizontal: 2,
        lineHeight: 14,
    },
});












