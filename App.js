import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens Imports
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import ProfileScreen from './Screens/ProfileScreen';
import CategoriesScreen from './Screens/CategoriesScreen';
import CreditCard from './Screens/CreditCard';
import CorporateRewards from './Screens/CorporateRewards';
import StudentRewards from './Screens/StudentRewards';
import MyWishlist from './Screens/MyWishlist';
import PartnerRewards from './Screens/PartnerRewards';
import SavedAddressScreen from './Screens/SavedAddressScreen';
import HelpSupportScreen from './Screens/HelpSupportScreen';
import PaymentModesScreen from './Screens/PaymentModesScreen';
import MyRefundsScreen from './Screens/MyRefundsScreen';
import FlashScreen from './Screens/FlashScreen';
import SwiggyMoneyScreen from './Screens/SwiggyMoneyScreen';
import MainAddressScreen from './Screens/MainAddressScreen';
import AccountStatementsScreen from './Screens/AccountStatementsScreen';
import ApiScreen from './Screens/ApiScreen';
import FreshVegetablesScreen from './Screens/FreshVegetablesScreen';
import FreshFruitsScreen from './Screens/FreshFruitsScreen';
import DairyBreadEggScreen from './Screens/DairyBreadEggScreen';
import MeatAndSeafoodScreen from './Screens/MeatAndSeafoodScreen';
import RiceAndDalScreen from './Screens/RiceAndDalScreen';
import MasalaSpicesScreen from './Screens/MasalaSpicesScreen';
import OilsAndGheeScreen from './Screens/OilsAndGheeScreen';
import CerealsAndBreakfastScreen from './Screens/CerealsAndBreakfastScreen';
import TeaAndCoffeeScreen from './Screens/TeaAndCoffeeScreen';
import ColdDrinksScreen from './Screens/ColdDrinksScreen';
import ChipsNamkeenScreen from './Screens/ChipsNamkeenScreen';
import BiscuitsScreen from './Screens/BiscuitsScreen';
import BathBodyScreen from './Screens/BathBodyScreen';
import DetergentsScreen from './Screens/DetergentsScreen';
import OralCareScreen from './Screens/OralCareScreen';
import PoojaNeedsScreen from './Screens/PoojaNeedsScreen';
import WishlistScreen from './Screens/WishlistScreen';
import ProductDetails from './Screens/ProductDetails';
import ChakaaChakScreen from './Screens/ChakaaChakScreen';
import PaymentSuccessScreen from './Screens/PaymentSuccessScreen';
import SelectAddressScreen from './Screens/SelectAddressScreen';
// CartProvider Import
import { CartProvider } from './Screens/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // 1. CartProvider ni anni screens ki andhela ikkada wrap cheyyali
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Flash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Flash" component={FlashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
          <Stack.Screen name="SavedAddress" component={SavedAddressScreen} />
          <Stack.Screen name="PaymentModes" component={PaymentModesScreen} />
          <Stack.Screen name="MyRefunds" component={MyRefundsScreen} />
          <Stack.Screen name="SwiggyMoney" component={SwiggyMoneyScreen} />
          <Stack.Screen name="MainAddress" component={MainAddressScreen} />
          <Stack.Screen name="AccountStatements" component={AccountStatementsScreen} />
          <Stack.Screen name="Api" component={ApiScreen} />
          <Stack.Screen name="CreditCard" component={CreditCard} />
          <Stack.Screen name="CorporateRewards" component={CorporateRewards} />
          <Stack.Screen name="StudentRewards" component={StudentRewards} />
          <Stack.Screen name="MyWishlist" component={MyWishlist} />
          <Stack.Screen name="PartnerRewards" component={PartnerRewards} />
          <Stack.Screen name="vegetables" component={FreshVegetablesScreen} />
          <Stack.Screen name="fruits" component={FreshFruitsScreen} />
          <Stack.Screen name="dairy" component={DairyBreadEggScreen} />
          <Stack.Screen name="meat" component={MeatAndSeafoodScreen} />
          <Stack.Screen name="riceAndDal" component={RiceAndDalScreen} />
          <Stack.Screen name="masalas" component={MasalaSpicesScreen} />
          <Stack.Screen name="oils" component={OilsAndGheeScreen} />
          <Stack.Screen name="breakfast" component={CerealsAndBreakfastScreen} />
          <Stack.Screen name="beverages" component={TeaAndCoffeeScreen} />
          <Stack.Screen name="coldDrinks" component={ColdDrinksScreen} />
          <Stack.Screen name="biscuits" component={BiscuitsScreen} />
          <Stack.Screen name="personalCare" component={BathBodyScreen} />
          <Stack.Screen name="cleaning" component={DetergentsScreen} />
          <Stack.Screen name="oralCare" component={OralCareScreen} />
          <Stack.Screen name="pooja" component={PoojaNeedsScreen} />
          <Stack.Screen name="wish" component={WishlistScreen} />
          <Stack.Screen name="ChakaaChak" component={ChakaaChakScreen} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
          <Stack.Screen name="SelectAddress" component={SelectAddressScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="snacks"
            component={ChipsNamkeenScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}