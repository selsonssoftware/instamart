import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]); // 1. Wishlist state add chesam

  // --- CART LOGIC ---
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = type === 'inc' ? (item.quantity || 1) + 1 : (item.quantity || 1) - 1;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- WISHLIST LOGIC (Add/Remove Toggle) ---
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Un-bookmark: List nundi teeyadam
        return prev.filter((item) => item.id !== product.id);
      }
      // Bookmark: List ki add cheyadam
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, updateQuantity, deleteItem, 
      wishlist, toggleWishlist // 2. Eevi export cheyandi
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

















  const tabContent = {
    All: {
      products: [
       {
          id: 'a1',
          name: 'Rice Bag ',
          weight: '1 Kg',
          image: require('../assets/images/rice.jpg'),
          price: '120',
          strikePrice: '150',
          discount: '18% OFF',
         
          options: [
            { label: '1 Kg', price: '120', image: require('../assets/images/rice.jpg') },
            { label: '3 Kg', price: '360', image: require('../assets/images/rice.jpg') },
            { label: '5 Kg', price: '600', image: require('../assets/images/rice.jpg') },
            { label: '10 Kg', price: '1200', image: require('../assets/images/rice.jpg') },
          ]
        },

        {
          id: 'a2',
          name: 'Fortune Oil',
          weight: '1 L',
          image: require('../assets/images/oil.jpg'),
          price: '140',
          strikePrice: '180',
          discount: '22% OFF',
         
          options: [
            { label: '1 Ltr', price: '145', image: require('../assets/images/oil.jpg') },
            { label: '3 Ltr', price: '420', image: require('../assets/images/oil.jpg') },
            { label: '5 Ltr', price: '690', image: require('../assets/images/oil.jpg') },
            { label: '10 Ltr', price: '1350', image: require('../assets/images/oil.jpg') },
          ]
        },
          { id: 'win7', name: 'Socks', weight: '3 pairs', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'win8', name: 'Thermal Wear', weight: 'M', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'win9', name: 'Room Heater', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'win10', name: 'Moisturizer', weight: '200 ml', image: require('../assets/images/f.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'win11', name: 'Lip Balm', weight: '10 g', image: require('../assets/images/f.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'win12', name: 'Winter Jacket', weight: 'XL', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 'a3', name: 'Sugar', weight: '1 kg', image: require('../assets/images/sugar.jpg'), price: '50', strikePrice: '65', discount: '23% OFF' },
        { id: 'a4', name: 'Salt', weight: '1 kg', image: require('../assets/images/salt.jpg'), price: '25', strikePrice: '30', discount: '16% OFF' },
        { id: 'a5', name: 'Tea Powder', weight: '250 g', image: require('../assets/images/tea.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'a6', name: 'Biscuits', weight: '200 g', image: require('../assets/images/biscut.jpg'), price: '30', strikePrice: '40', discount: '25% OFF' },
        { id: 'a7', name: 'Cold Drink', weight: '2 L', image: require('../assets/images/coco.jpg'), price: '90', strikePrice: '120', discount: '25% OFF' },
        { id: 'a8', name: 'Soap', weight: '125 g', image: require('../assets/images/soap.jpg'), price: '45', strikePrice: '60', discount: '25% OFF' },
        { id: 'a9', name: 'Detergent', weight: '1 kg', image: require('../assets/images/Detergent.jpg'), price: '110', strikePrice: '150', discount: '26% OFF' },
        { id: 'a10', name: 'Jam', weight: '500 g', image: require('../assets/images/jam.jpg'), price: '160', strikePrice: '200', discount: '20% OFF' },
        { id: 'a11', name: 'Chocolate', weight: '100 g', image: require('../assets/images/chocolate.jpg'), price: '95', strikePrice: '120', discount: '20% OFF' },
        { id: 'a12', name: 'Spices Pack', weight: '200 g', image: require('../assets/images/spaice.jpg'), price: '140', strikePrice: '180', discount: '22% OFF' },
      ]
    },

    Winter: {
      products: [
        { id: 'win1', name: 'Cold Cream', weight: '100 g', image: require('../assets/images/f.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'win2', name: 'Woolen Cap', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '250', strikePrice: '320', discount: '22% OFF' },
        { id: 'win3', name: 'Hand Gloves', weight: '1 pair', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'win4', name: 'Blanket', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'win5', name: 'Hot Water Bag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'win6', name: 'Sweater', weight: 'L', image: require('../assets/images/bag.jpg'), price: '899', strikePrice: '1199', discount: '25% OFF' },
        { id: 'win7', name: 'Socks', weight: '3 pairs', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'win8', name: 'Thermal Wear', weight: 'M', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'win9', name: 'Room Heater', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'win10', name: 'Moisturizer', weight: '200 ml', image: require('../assets/images/f.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'win11', name: 'Lip Balm', weight: '10 g', image: require('../assets/images/f.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'win12', name: 'Winter Jacket', weight: 'XL', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
      ]
    },

    Maxxsaver: {
      products: [
        { id: 'm1', name: 'Rice Combo Pack', weight: '5 kg', image: require('../assets/images/atta.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'm2', name: 'Oil Combo', weight: '3 L', image: require('../assets/images/oil.jpg'), price: '399', strikePrice: '520', discount: '23% OFF' },
        { id: 'm3', name: 'Soap Pack', weight: '4 pcs', image: require('../assets/images/dettol.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'm4', name: 'Detergent Pack', weight: '2 kg', image: require('../assets/images/surf.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'm5', name: 'Sugar Pack', weight: '3 kg', image: require('../assets/images/d.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'm6', name: 'Tea Combo', weight: '500 g', image: require('../assets/images/d.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'm7', name: 'Snack Box', weight: '1 kg', image: require('../assets/images/biscut.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'm8', name: 'Grocery Kit', weight: '1 set', image: require('../assets/images/d.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'm9', name: 'Cleaning Kit', weight: '1 set', image: require('../assets/images/surf.jpg'), price: '399', strikePrice: '520', discount: '23% OFF' },
        { id: 'm10', name: 'Spice Combo', weight: '500 g', image: require('../assets/images/d.jpg'), price: '180', strikePrice: '240', discount: '25% OFF' },
        { id: 'm11', name: 'Breakfast Pack', weight: '1 kg', image: require('../assets/images/biscut.jpg'), price: '249', strikePrice: '320', discount: '22% OFF' },
        { id: 'm12', name: 'Festival Combo', weight: '1 set', image: require('../assets/images/d.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
      ]
    },

    "Free Gifts": {
      products: [
        { id: 'g1', name: 'Key Chain', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '50', discount: 'FREE' },
        { id: 'g2', name: 'Sticker Pack', weight: '1 set', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '40', discount: 'FREE' },
        { id: 'g3', name: 'Pen', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '20', discount: 'FREE' },
        { id: 'g4', name: 'Notebook', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '60', discount: 'FREE' },
        { id: 'g5', name: 'Coffee Mug', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '150', discount: 'FREE' },
        { id: 'g6', name: 'Toy Car', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '120', discount: 'FREE' },
        { id: 'g7', name: 'Wall Poster', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '80', discount: 'FREE' },
        { id: 'g8', name: 'Badge', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '30', discount: 'FREE' },
        { id: 'g9', name: 'Bookmark', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '25', discount: 'FREE' },
        { id: 'g10', name: 'Diary', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '100', discount: 'FREE' },
        { id: 'g11', name: 'Ball', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '90', discount: 'FREE' },
        { id: 'g12', name: 'Gift Card', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '0', strikePrice: '200', discount: 'FREE' },
      ]
    },

    T20: {
      products: [
        { id: 't1', name: 'Cricket Bat', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 't2', name: 'Cricket Ball', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 't3', name: 'Jersey', weight: 'L', image: require('../assets/images/bag.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 't4', name: 'Cap', weight: 'Free size', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 't5', name: 'Sports Shoes', weight: '9', image: require('../assets/images/bag.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 't6', name: 'Wrist Band', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 't7', name: 'Helmet', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 't8', name: 'Cricket Gloves', weight: '1 pair', image: require('../assets/images/bag.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 't9', name: 'Thigh Guard', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 't10', name: 'Kit Bag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 't11', name: 'Cricket Pads', weight: '1 pair', image: require('../assets/images/bag.jpg'), price: '1199', strikePrice: '1499', discount: '20% OFF' },
        { id: 't12', name: 'Water Bottle', weight: '1 L', image: require('../assets/images/bag.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
      ]
    },

    Premium: {
      products: [
        { id: 'pr1', name: 'Luxury Perfume', weight: '100 ml', image: require('../assets/images/f.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'pr2', name: 'Gold Plated Watch', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '4999', strikePrice: '5999', discount: '16% OFF' },
        { id: 'pr3', name: 'Premium Chocolate Box', weight: '500 g', image: require('../assets/images/can.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'pr4', name: 'Designer Handbag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '2999', strikePrice: '3999', discount: '25% OFF' },
        { id: 'pr5', name: 'Leather Wallet', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1899', discount: '21% OFF' },
        { id: 'pr6', name: 'Premium Shoes', weight: '9', image: require('../assets/images/bag.jpg'), price: '3999', strikePrice: '4999', discount: '20% OFF' },
        { id: 'pr7', name: 'Smart Watch', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '2999', strikePrice: '3599', discount: '16% OFF' },
        { id: 'pr8', name: 'Bluetooth Speaker', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '2499', strikePrice: '2999', discount: '16% OFF' },
        { id: 'pr9', name: 'Luxury Candle', weight: '1 unit', image: require('../assets/images/f.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'pr10', name: 'Premium Tea Set', weight: '1 set', image: require('../assets/images/d.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'pr11', name: 'Designer Sunglasses', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1599', strikePrice: '1999', discount: '20% OFF' },
        { id: 'pr12', name: 'Luxury Gift Box', weight: '1 set', image: require('../assets/images/d.jpg'), price: '3499', strikePrice: '3999', discount: '12% OFF' },
      ]
    },

    Ramzan: {
      products: [
        { id: 'r1', name: 'Dates Pack', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'r2', name: 'Dry Fruits Mix', weight: '500 g', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'r3', name: 'Vermicelli', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'r4', name: 'Sugar Syrup', weight: '1 L', image: require('../assets/images/d.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'r5', name: 'Rose Water', weight: '500 ml', image: require('../assets/images/d.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'r6', name: 'Falooda Mix', weight: '200 g', image: require('../assets/images/d.jpg'), price: '120', strikePrice: '160', discount: '25% OFF' },
        { id: 'r7', name: 'Milk Powder', weight: '500 g', image: require('../assets/images/d.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'r8', name: 'Honey', weight: '500 g', image: require('../assets/images/d.jpg'), price: '350', strikePrice: '450', discount: '22% OFF' },
        { id: 'r9', name: 'Juice Pack', weight: '1 L', image: require('../assets/images/coco.jpg'), price: '120', strikePrice: '160', discount: '25% OFF' },
        { id: 'r10', name: 'Sweet Box', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'r11', name: 'Rooh Afza', weight: '1 L', image: require('../assets/images/coco.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'r12', name: 'Gift Hamper', weight: '1 set', image: require('../assets/images/d.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
      ]
    },
    Wedding: {
      products: [
        { id: 'w1', name: 'Dry Fruits Pack', weight: '500 g', image: require('../assets/images/d.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'w2', name: 'Decor Lights', weight: '1 set', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 'w3', name: 'Gift Box', weight: '5 pcs', image: require('../assets/images/d.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'w4', name: 'Flower Garland', weight: '1 set', image: require('../assets/images/d.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'w5', name: 'Invitation Cards', weight: '50 pcs', image: require('../assets/images/d.jpg'), price: '599', strikePrice: '799', discount: '25% OFF' },
        { id: 'w6', name: 'Chocolate Box', weight: '500 g', image: require('../assets/images/d.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 'w7', name: 'Sweets Pack', weight: '1 kg', image: require('../assets/images/d.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'w8', name: 'Decor Candles', weight: '10 pcs', image: require('../assets/images/d.jpg'), price: '199', strikePrice: '260', discount: '23% OFF' },
        { id: 'w9', name: 'Photo Frame', weight: '1 unit', image: require('../assets/images/d.jpg'), price: '399', strikePrice: '499', discount: '20% OFF' },
        { id: 'w10', name: 'Return Gifts', weight: '10 pcs', image: require('../assets/images/d.jpg'), price: '899', strikePrice: '1199', discount: '25% OFF' },
        { id: 'w11', name: 'Wedding Album', weight: '1 unit', image: require('../assets/images/d.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 'w12', name: 'Stage Decoration', weight: '1 set', image: require('../assets/images/d.jpg'), price: '2999', strikePrice: '3499', discount: '14% OFF' },
      ]
    },

    Beauty: {
      products: [
        { id: 'b1', name: 'Face Wash', weight: '100 ml', image: require('../assets/images/f.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'b2', name: 'Body Lotion', weight: '200 ml', image: require('../assets/images/f.jpg'), price: '220', strikePrice: '280', discount: '21% OFF' },
        { id: 'b3', name: 'Shampoo', weight: '180 ml', image: require('../assets/images/f.jpg'), price: '250', strikePrice: '300', discount: '16% OFF' },
        { id: 'b4', name: 'Hair Oil', weight: '150 ml', image: require('../assets/images/f.jpg'), price: '160', strikePrice: '200', discount: '20% OFF' },
        { id: 'b5', name: 'Face Cream', weight: '50 g', image: require('../assets/images/f.jpg'), price: '199', strikePrice: '250', discount: '20% OFF' },
        { id: 'b6', name: 'Lip Balm', weight: '10 g', image: require('../assets/images/f.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'b7', name: 'Sunscreen', weight: '100 ml', image: require('../assets/images/f.jpg'), price: '299', strikePrice: '360', discount: '17% OFF' },
        { id: 'b8', name: 'Perfume', weight: '50 ml', image: require('../assets/images/f.jpg'), price: '499', strikePrice: '599', discount: '16% OFF' },
        { id: 'b9', name: 'Makeup Kit', weight: '1 set', image: require('../assets/images/f.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'b10', name: 'Nail Polish', weight: '10 ml', image: require('../assets/images/f.jpg'), price: '99', strikePrice: '130', discount: '24% OFF' },
        { id: 'b11', name: 'Hair Serum', weight: '50 ml', image: require('../assets/images/f.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'b12', name: 'Face Mask', weight: '100 g', image: require('../assets/images/f.jpg'), price: '150', strikePrice: '190', discount: '21% OFF' },
      ]
    },

    Electronics: {
      products: [
        { id: 'e1', name: 'Power Bank', weight: '10000 mAh', image: require('../assets/images/can.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'e2', name: 'USB Cable', weight: '1 m', image: require('../assets/images/can.jpg'), price: '199', strikePrice: '299', discount: '33% OFF' },
        { id: 'e3', name: 'Bluetooth Earphones', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1299', strikePrice: '1599', discount: '18% OFF' },
        { id: 'e4', name: 'LED Bulb', weight: '9 W', image: require('../assets/images/can.jpg'), price: '120', strikePrice: '150', discount: '20% OFF' },
        { id: 'e5', name: 'Extension Box', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'e6', name: 'Smart Watch', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'e7', name: 'Mobile Charger', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 'e8', name: 'Wireless Mouse', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 'e9', name: 'Keyboard', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'e10', name: 'Torch Light', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'e11', name: 'Headphones', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1499', strikePrice: '1899', discount: '21% OFF' },
        { id: 'e12', name: 'Router', weight: '1 unit', image: require('../assets/images/can.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
      ]
    },

    Fashion: {
      products: [
        { id: 'f1', name: 'T-Shirt', weight: 'L', image: require('../assets/images/bag.jpg'), price: '499', strikePrice: '699', discount: '28% OFF' },
        { id: 'f2', name: 'Jeans', weight: '32', image: require('../assets/images/bag.jpg'), price: '999', strikePrice: '1299', discount: '23% OFF' },
        { id: 'f3', name: 'Cap', weight: 'Free size', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'f4', name: 'Jacket', weight: 'M', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1999', discount: '25% OFF' },
        { id: 'f5', name: 'Shoes', weight: '9', image: require('../assets/images/bag.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },

        { id: 'f6', name: 'Sunglasses', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '699', strikePrice: '899', discount: '22% OFF' },
        { id: 'f7', name: 'Belt', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '399', strikePrice: '499', discount: '20% OFF' },
        { id: 'f8', name: 'Wallet', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
        { id: 'f9', name: 'Kurta', weight: 'XL', image: require('../assets/images/bag.jpg'), price: '899', strikePrice: '1199', discount: '25% OFF' },
        { id: 'f10', name: 'Track Pant', weight: 'L', image: require('../assets/images/bag.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'f11', name: 'Scarf', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '299', strikePrice: '399', discount: '25% OFF' },
        { id: 'f12', name: 'Handbag', weight: '1 unit', image: require('../assets/images/bag.jpg'), price: '1499', strikePrice: '1899', discount: '21% OFF' },
      ]
    },

    Pharmacy: {
      products: [
        { id: 'p1', name: 'Hand Sanitizer', weight: '500 ml', image: require('../assets/images/dettol.jpg'), price: '150', strikePrice: '200', discount: '25% OFF' },
        { id: 'p2', name: 'Thermometer', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '250', strikePrice: '300', discount: '16% OFF' },
        { id: 'p3', name: 'Face Mask', weight: '10 pcs', image: require('../assets/images/dettol.jpg'), price: '120', strikePrice: '160', discount: '25% OFF' },
        { id: 'p4', name: 'Pain Relief Spray', weight: '50 ml', image: require('../assets/images/dettol.jpg'), price: '180', strikePrice: '220', discount: '18% OFF' },
        { id: 'p5', name: 'Vitamin Tablets', weight: '30 tabs', image: require('../assets/images/dettol.jpg'), price: '300', strikePrice: '360', discount: '16% OFF' },
        { id: 'p6', name: 'Cough Syrup', weight: '100 ml', image: require('../assets/images/dettol.jpg'), price: '140', strikePrice: '180', discount: '22% OFF' },
        { id: 'p7', name: 'Antiseptic Liquid', weight: '250 ml', image: require('../assets/images/dettol.jpg'), price: '110', strikePrice: '150', discount: '26% OFF' },
        { id: 'p8', name: 'Glucometer', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '799', strikePrice: '999', discount: '20% OFF' },
        { id: 'p9', name: 'Bandage Roll', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '60', strikePrice: '90', discount: '33% OFF' },
        { id: 'p10', name: 'Digital BP Monitor', weight: '1 unit', image: require('../assets/images/dettol.jpg'), price: '1999', strikePrice: '2499', discount: '20% OFF' },
        { id: 'p11', name: 'ORS Pack', weight: '200 ml', image: require('../assets/images/dettol.jpg'), price: '40', strikePrice: '60', discount: '33% OFF' },
        { id: 'p12', name: 'First Aid Kit', weight: '1 set', image: require('../assets/images/dettol.jpg'), price: '499', strikePrice: '650', discount: '23% OFF' },
      ]
    }
  };