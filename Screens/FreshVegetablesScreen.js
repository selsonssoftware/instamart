    import React, { useState, useMemo } from 'react';
    import {
        StyleSheet,
        Text,
        View,
        ScrollView,
        TouchableOpacity,
        Image,
        SafeAreaView,
        StatusBar,
        Dimensions,
        Platform,
        Alert,
        TextInput,
    } from 'react-native';

    import Ionicons from 'react-native-vector-icons/Ionicons';
    import { useNavigation } from '@react-navigation/native';

    import { useCart } from './CartContext'; 

    const { width } = Dimensions.get('window');

    // --- MOCK DATA -
    const sidebarCategories = [
        { id: 'cat1', name: 'Fresh Fruits', image: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png' },
        { id: 'cat2', name: 'Exotic Fruits', image: 'https://cdn-icons-png.flaticon.com/512/6864/6864147.png' },
        { id: 'cat3', name: 'Seasonal Fruits', image: 'https://cdn-icons-png.flaticon.com/512/1652/1652093.png' },
        { id: 'cat4', name: 'Cut Fruits and Juices', image: 'https://cdn-icons-png.flaticon.com/512/2451/2451528.png' },
    ];

    const allProductsData = [
        // Fresh Fruits
        { id: 'p1', category: 'Fresh Fruits', name: 'Mandarin Orange (Aranju)', desc: 'Tender intensely sweet...', qty: '3 Pieces', time: '14 MINS', discount: '50% OFF', price: 59, strike: 119, image: 'https://cdn.pixabay.com/photo/2016/01/02/02/03/oranges-1117628_1280.jpg', isAd: true },
        { id: 'p2', category: 'Fresh Fruits', name: 'Mahabaleshwar Strawberry', desc: 'Sweet-Tart Balance...', qty: '165 g', time: '14 MINS', discount: '35% OFF', price: 69, strike: 107, pricePerWeight: '₹41.8/100 g', image: 'https://cdn.pixabay.com/photo/2015/03/26/09/41/strawberry-690066_1280.jpg', isAd: true, isBlueQty: true },
        { id: 'p3', category: 'Fresh Fruits', name: 'Yelakki Banana', qty: '10 Pieces', time: '14 MINS', price: 60, image: 'https://cdn.pixabay.com/photo/2016/01/03/17/59/bananas-1119790_1280.jpg' },
        { id: 'p4', category: 'Fresh Fruits', name: 'Green Apple', qty: '4 Pieces', time: '20 MINS', price: 120, discount: '10% OFF', strike: 140, image: 'https://cdn.pixabay.com/photo/2016/10/07/14/12/green-apples-1721758_1280.jpg' },
        { id: 'p5', category: 'Fresh Fruits', name: 'Pomegranate (Anaar)', qty: '3 Pieces', time: '15 MINS', price: 150, image: 'https://cdn.pixabay.com/photo/2017/06/02/12/13/pomegranate-2366487_1280.jpg' },

        // Exotic Fruits
        { id: 'e1', category: 'Exotic Fruits', name: 'Dragon Fruit (Pitaya)', qty: '1 Piece', time: '25 MINS', price: 90, discount: '20% OFF', strike: 115, image: 'https://cdn.pixabay.com/photo/2017/06/13/12/57/dragon-fruit-2398853_1280.jpg', isImported: true },
        { id: 'e2', category: 'Exotic Fruits', name: 'Avocado (Imported)', qty: '1 Piece', time: '30 MINS', price: 180, image: 'https://cdn.pixabay.com/photo/2016/11/18/16/09/avocado-1835477_1280.jpg', isImported: true },
        { id: 'e3', category: 'Exotic Fruits', name: 'Blueberries Box', qty: '125 g', time: '25 MINS', price: 250, discount: '15% OFF', strike: 299, image: 'https://cdn.pixabay.com/photo/2010/12/13/10/05/berries-2277_1280.jpg', isBlueQty: true },
        { id: 'e4', category: 'Exotic Fruits', name: 'Kiwi Green', qty: '3 Pieces', time: '20 MINS', price: 75, image: 'https://cdn.pixabay.com/photo/2016/03/27/17/25/kiwi-1283041_1280.jpg' },

        // Seasonal Fruits
        { id: 's1', category: 'Seasonal Fruits', name: 'Mango Alphonso', qty: '6 Pieces', time: 'Next Day', price: 450, discount: '10% OFF', strike: 500, image: 'https://cdn.pixabay.com/photo/2015/05/13/12/57/mango-765327_1280.jpg' },
        { id: 's2', category: 'Seasonal Fruits', name: 'Watermelon Kiran', qty: '1 Pc (2-3kg)', time: '1 hour', price: 99, image: 'https://cdn.pixabay.com/photo/2014/07/10/17/04/watermelon-389549_1280.jpg' },
        { id: 's3', category: 'Seasonal Fruits', name: 'Sweet Melon (Kharbuja)', qty: '1 Pc', time: '1 hour', price: 60, discount: '30% OFF', strike: 90, image: 'https://cdn.pixabay.com/photo/2015/04/25/20/59/melon-739625_1280.jpg' },

        // Cut Fruits
        { id: 'c1', category: 'Cut Fruits and Juices', name: 'Pineapple Slices', qty: '200 g', time: '14 MINS', price: 55, image: 'https://cdn.pixabay.com/photo/2017/08/30/22/12/pineapple-2699067_1280.jpg', isBlueQty: true },
        { id: 'c2', category: 'Cut Fruits and Juices', name: 'Pomegranate Peeled', qty: '150 g', time: '14 MINS', price: 80, image: 'https://cdn.pixabay.com/photo/2017/06/02/12/13/pomegranate-2366486_1280.jpg' },
    ];


    export default function FreshFruitsScreen() {

        // const addToCart = (item) => Alert.alert('Added to cart', item.name);
        const { addToCart } = useCart(); // Context 
        const navigation = useNavigation();
        
        // --- STATES ---
        const [activeCategory, setActiveCategory] = useState('Fresh Fruits');
        const [searchQuery, setSearchQuery] = useState('');
        const [isSearchActive, setIsSearchActive] = useState(false);
        const [wishlist, setWishlist] = useState(new Set()); // To store wishlisted IDs
        
        // Filter States
        const [sortByPriceLow, setSortByPriceLow] = useState(false);
        const [filterPriceDrop, setFilterPriceDrop] = useState(false);
        const [filterImported, setFilterImported] = useState(false);


        // --- HANDLERS ---

        const handleAddToCart = (item) => {
            addToCart(item);
            // Feedback without Alert for smoother experience usually, but keeping alert as per previous req.
            Alert.alert("Success", `${item.name} added!`);
        };

        // Wishlist Toggle (High Cheyyandi)
        const toggleWishlist = (id) => {
            setWishlist((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(id)) newSet.delete(id);
                else newSet.add(id);
                return newSet;
            });
        };


        // --- CORE FILTERING LOGIC ---
      
        const filteredProducts = useMemo(() => {
            let result = allProductsData;

            // 1. Category Filter (Sidebar Tabs)
            result = result.filter(item => item.category === activeCategory);

            // 2. Search Filter
            if (searchQuery) {
                result = result.filter(item => 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // 3. Price Drop Filter
            if (filterPriceDrop) {
                result = result.filter(item => item.discount);
            }

            // 4. Imported Filter (Example of "Type")
            if (filterImported) {
                result = result.filter(item => item.isImported);
            }

            // 5. Sort By Price (Low to High toggle)
            if (sortByPriceLow) {
                // Create a copy before sorting to avoid mutating original data
                result = [...result].sort((a, b) => a.price - b.price);
            }

            return result;
        }, [activeCategory, searchQuery, filterPriceDrop, filterImported, sortByPriceLow]);


        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />

                {/* HEADER & SEARCH */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color="#1A1A1B" />
                        </TouchableOpacity>
                        
                        {isSearchActive ? (
                            <TextInput 
                                style={styles.searchInput}
                                placeholder="Search fruits..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus
                            />
                        ) : (
                            <Text style={styles.headerTitle}>{activeCategory}</Text>
                        )}
                    </View>
                    <TouchableOpacity style={styles.searchIcon} onPress={() => setIsSearchActive(!isSearchActive)}>
                        <Ionicons name={isSearchActive ? "close" : "search-outline"} size={24} color="#1A1A1B" />
                    </TouchableOpacity>
                </View>

                {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
                <View style={styles.mainContent}>
                    
                    {/* LEFT SIDEBAR (Tabs changing works) */}
                    <View style={styles.sidebar}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {sidebarCategories.map((item) => (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={[styles.sidebarItem, activeCategory === item.name && styles.sidebarItemActive]}
                                    onPress={() => {
                                        setActiveCategory(item.name);
                                        setSearchQuery(''); // Reset search on category change
                                    }}
                                >
                                    <View style={[styles.sidebarIconBg, activeCategory === item.name && styles.sidebarIconBgActive]}>
                                        <Image source={{ uri: item.image }} style={styles.sidebarIcon} />
                                    </View>
                                    <Text style={[styles.sidebarText, activeCategory === item.name && styles.sidebarTextActive]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* RIGHT CONTENT AREA */}
                    <View style={styles.rightContent}>
                        
                        {/* FILTERS (Working toggles) */}
                        <View style={styles.filterSection}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                                
                                {/* Sort Toggle */}
                                <TouchableOpacity 
                                    style={[styles.dropdownBtn, sortByPriceLow && styles.activeFilterBtn]}
                                    onPress={() => setSortByPriceLow(!sortByPriceLow)}
                                >
                                    <Text style={[styles.dropdownText, sortByPriceLow && styles.activeFilterText]}>
                                        {sortByPriceLow ? "Price: Low to High" : "Sort By"}
                                    </Text>
                                    <Ionicons name={sortByPriceLow ? "checkmark" : "chevron-down"} size={16} color={sortByPriceLow ? "#fff" : "#4B5563"} />
                                </TouchableOpacity>
                                
                                {/* Price Drop Toggle */}
                                <TouchableOpacity 
                                    style={[styles.pillBtn, filterPriceDrop && styles.activePillBtn]}
                                    onPress={() => setFilterPriceDrop(!filterPriceDrop)}
                                >
                                    <Ionicons name="trending-down" size={16} color={filterPriceDrop ? "#fff" : "#EF4444"} style={{marginRight: 4}}/>
                                    <Text style={[styles.pillText, filterPriceDrop && styles.activePillText]}>Price Drop</Text>
                                </TouchableOpacity>

                                {/* Imported Type Toggle */}
                                <TouchableOpacity 
                                    style={[styles.pillBtn, filterImported && styles.activePillBtn]}
                                    onPress={() => setFilterImported(!filterImported)}
                                >
                                    <Text style={[styles.pillText, filterImported && styles.activePillText]}>Imported</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.pillBtn}><Text style={styles.pillText}>Organic</Text></TouchableOpacity>
                            </ScrollView>
                        </View>

                        {/* PRODUCT GRID (Results based on filters) */}
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridContainer}>
                            {filteredProducts.length === 0 ? (
                                <View style={styles.noResult}>
                                    <Text style={styles.noResultText}>No products found.</Text>
                                </View>
                            ) : (
                            filteredProducts.map((item) => {
                                const isWishlisted = wishlist.has(item.id);
                                return (
                                <View key={item.id} style={styles.card}>
                                    
                                    {/* Image Box */}
                                    <View style={styles.imageBox}>
                                        <Image source={{ uri: item.image }} style={styles.productImage} />
                                        
                                        {/* Wishlist Icon (High Cheyyandi Logic) */}
                                        <TouchableOpacity style={styles.bookmarkBtn} onPress={() => toggleWishlist(item.id)}>
                                            <Ionicons 
                                                name={isWishlisted ? "bookmark" : "bookmark-outline"} 
                                                size={22} 
                                                color={isWishlisted ? "#EF4444" : "#D1D5DB"} // Red if highlighted
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.plusBtn} onPress={() => handleAddToCart(item)}>
                                            <Ionicons name="add" size={22} color="#2563EB" />
                                        </TouchableOpacity>
                                        <View style={styles.vegTag}>
                                            <View style={styles.vegDot} />
                                        </View>
                                        {item.isAd && <View style={styles.adTag}><Text style={styles.adText}>AD</Text></View>}
                                    </View>

                                    {/* Quantity Bar */}
                                    <View style={[styles.qtyBar, item.isBlueQty && styles.qtyBarBlue]}>
                                        <Text style={[styles.qtyText, item.isBlueQty && styles.qtyTextBlue]}>{item.qty}</Text>
                                        {item.isBlueQty && <Ionicons name="chevron-down" size={14} color="#1D4ED8" style={{marginLeft: 5}}/>}
                                    </View>

                                    {/* Product Details */}
                                    <View style={styles.detailsBox}>
                                        <Text style={styles.timeText}>{item.time}</Text>
                                        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                                        {item.desc ? <Text style={styles.productDesc} numberOfLines={1}>{item.desc}</Text> : null}
                                        
                                        {item.discount ? <Text style={styles.discountText}>{item.discount}</Text> : null}
                                        {item.pricePerWeight ? <Text style={styles.perWeightText}>{item.pricePerWeight}</Text> : null}

                                        <View style={styles.priceRow}>
                                            <Text style={styles.currentPrice}>₹{item.price}</Text>
                                            {item.strike ? <Text style={styles.strikePrice}>₹{item.strike}</Text> : null}
                                        </View>
                                    </View>
                                </View>
                            )})
                            )}
                        </ScrollView>
                    </View>
                </View>

                {/* BOTTOM FREE DELIVERY BANNER */}
                <View style={styles.bottomBanner}>
                    <Text style={styles.bottomBannerText}>
                        <Text style={{fontWeight: 'bold'}}>FREE DELIVERY</Text> on orders above ₹99
                    </Text>
                </View>

            </SafeAreaView>
        );
    }

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: '#fff' },
        
        // Header
        header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderColor: '#F3F4F6', paddingTop: Platform.OS === 'android' ? 40 : 15 },
        headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
        backBtn: { marginRight: 15 },
        headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1B' },
        searchInput: { flex: 1, height: 40, backgroundColor: '#F3F4F6', borderRadius: 8, paddingHorizontal: 10, marginRight: 10, fontSize: 16 },
        searchIcon: { padding: 5 },

        // Main Layout
        mainContent: { flex: 1, flexDirection: 'row' },

        // Left Sidebar
        sidebar: { width: 85, borderRightWidth: 1, borderColor: '#F3F4F6', backgroundColor: '#fff' },
        sidebarItem: { alignItems: 'center', paddingVertical: 15, borderLeftWidth: 3, borderColor: 'transparent' },
        sidebarItemActive: { borderColor: '#1A1A1B', backgroundColor: '#F9FAFB' },
        sidebarIconBg: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
        sidebarIconBgActive: { backgroundColor: '#E0E7FF' },
        sidebarIcon: { width: 30, height: 30 },
        sidebarText: { fontSize: 10, color: '#6B7280', textAlign: 'center', paddingHorizontal: 5 },
        sidebarTextActive: { color: '#1A1A1B', fontWeight: 'bold' },

        // Right Content Area
        rightContent: { flex: 1, backgroundColor: '#fff' },

        // Filters
        filterSection: { borderBottomWidth: 1, borderColor: '#F3F4F6', paddingVertical: 10 },
        filterScroll: { paddingHorizontal: 10, alignItems: 'center' },
        
        dropdownBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginRight: 8 },
        dropdownText: { fontSize: 13, color: '#374151', marginRight: 4 },
        activeFilterBtn: { backgroundColor: '#1A1A1B', borderColor: '#1A1A1B' },
        activeFilterText: { color: '#fff' },

        pillBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, backgroundColor: '#fff' },
        pillText: { fontSize: 13, color: '#374151' },
        activePillBtn: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
        activePillText: { color: '#fff' },


        // Grid Container
        gridContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between', paddingBottom: 60 },
        noResult: { flex: 1, alignItems: 'center', marginTop: 50 },
        noResultText: { fontSize: 16, color: '#9CA3AF' },
        
        // Product Card
        card: { width: '48%', marginBottom: 20, backgroundColor: '#fff' },
        imageBox: { height: 130, backgroundColor: '#F9FAFB', borderRadius: 12, position: 'relative', overflow: 'hidden' },
        productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
        bookmarkBtn: { position: 'absolute', top: 5, left: 5, padding: 4 },
        plusBtn: { position: 'absolute', top: 8, right: 8, backgroundColor: '#fff', borderRadius: 8, padding: 4, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
        vegTag: { position: 'absolute', bottom: 8, left: 8, width: 14, height: 14, borderWidth: 1, borderColor: '#22C55E', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 2 },
        vegDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E' },
        adTag: { position: 'absolute', bottom: 8, left: 26, backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 4, borderRadius: 4 },
        adText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },

        // Quantity Bar below image
        qtyBar: { backgroundColor: '#F3F4F6', paddingVertical: 6, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, alignItems: 'center', marginTop: -10, zIndex: -1, paddingTop: 14 },
        qtyText: { fontSize: 12, color: '#4B5563', fontWeight: '500' },
        qtyBarBlue: { backgroundColor: '#DBEAFE', flexDirection: 'row', justifyContent: 'center' },
        qtyTextBlue: { color: '#1D4ED8', fontWeight: 'bold' },

        // Details Text
        detailsBox: { paddingTop: 8, paddingHorizontal: 4 },
        timeText: { fontSize: 10, color: '#6B7280', fontWeight: '600', marginBottom: 2 },
        productName: { fontSize: 14, fontWeight: 'bold', color: '#1F2937', lineHeight: 18, height: 36 },
        productDesc: { fontSize: 11, color: '#9CA3AF', marginTop: 2, lineHeight: 14 },
        discountText: { fontSize: 11, color: '#059669', fontWeight: 'bold', marginTop: 6 },
        perWeightText: { fontSize: 10, color: '#9CA3AF', marginTop: 2 },
        
        priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
        currentPrice: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1B', marginRight: 6 },
        strikePrice: { fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through' },

        // Bottom Banner
        bottomBanner: { backgroundColor: '#E0F2FE', paddingVertical: 12, alignItems: 'center', position: 'absolute', bottom: 0, width: '100%' },
        bottomBannerText: { color: '#0369A1', fontSize: 13 },
    });