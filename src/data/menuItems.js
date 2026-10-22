export const menuItems = [
  // ==========================================
  // --- Dawat-e-Khaas Royal Biryani (rest-1) ---
  // ==========================================
  {
    id: 'item-101',
    restaurantId: 'rest-1',
    name: 'Royal Hyderabadi Mutton Dum Biryani',
    description: 'Fragrant aged basmati rice cooked on slow dum with tender goat meat, saffron, brown onions, and royal spices. Served with Mirchi Ka Salan and creamy Burani Raita.',
    price: 380,
    originalPrice: 420,
    category: 'Dum Biryanis',
    isVeg: false,
    isPopular: true,
    rating: 4.95,
    calories: '750 kcal',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/49231/49231-720.mp4',
    customizationOptions: {
      sizes: [
        { name: 'Regular Handi (1 person)', price: 0 },
        { name: 'Large Matka (Serves 2-3)', price: 290 },
      ],
      spiceLevels: ['Medium Spiced', 'Hyderabadi Teekha 🌶️', 'Andhra Extra Spicy 🔥🔥'],
      addOns: [
        { id: 'extra-salan', name: 'Extra Mirchi Ka Salan Bowl', price: 40 },
        { id: 'boiled-egg', name: 'Fried Masala Boiled Egg (2 pcs)', price: 35 },
        { id: 'extra-raita', name: 'Chilled Cucumber Boondi Raita', price: 30 },
        { id: 'gulab-jamun-side', name: 'Hot Gulab Jamun (1 pc)', price: 35 },
      ],
    },
  },
  {
    id: 'item-102',
    restaurantId: 'rest-1',
    name: 'Dum Zaffrani Chicken Biryani',
    description: 'Succulent chicken pieces marinated in yogurt and aromatic spices, layered with long grain basmati rice, mint, coriander, and pure saffron milk.',
    price: 290,
    originalPrice: 330,
    category: 'Dum Biryanis',
    isVeg: false,
    isPopular: true,
    rating: 4.9,
    calories: '680 kcal',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: 'Regular Portion (1 person)', price: 0 },
        { name: 'Jumbo Handi (Serves 2-3)', price: 220 },
      ],
      spiceLevels: ['Mild Desi', 'Medium Spicy 🌶️', 'Extra Spicy 🔥'],
      addOns: [
        { id: 'extra-chicken-piece', name: 'Extra Juicy Chicken Piece', price: 70 },
        { id: 'burani-raita', name: 'Garlic Burani Raita', price: 35 },
      ],
    },
  },
  {
    id: 'item-103',
    restaurantId: 'rest-1',
    name: 'Melt-in-Mouth Lucknowi Galouti Kebabs (4 pcs)',
    description: 'Fine minced lamb infused with 16 royal Awadhi spices, pan-grilled in desi ghee to velvety tenderness. Served with Ulte Tawe Ka Paratha and green mint chutney.',
    price: 320,
    category: 'Royal Kebabs',
    isVeg: false,
    isPopular: true,
    rating: 4.92,
    calories: '520 kcal',
    image: '/images/galouti-kebab.jpg',
    customizationOptions: {
      sizes: [
        { name: '4 Pieces + 1 Paratha', price: 0 },
        { name: '8 Pieces + 2 Parathas', price: 280 },
      ],
      addOns: [
        { id: 'extra-paratha', name: 'Extra Ulte Tawe Ka Paratha', price: 40 },
        { id: 'sirka-pyaz', name: 'Sirka Pickled Shallot Onions', price: 20 },
      ],
    },
  },
  {
    id: 'item-104',
    restaurantId: 'rest-1',
    name: 'Shahi Subz Paneer Dum Biryani',
    description: 'Fresh malai paneer cubes, garden vegetables, and baby potatoes slow cooked with golden basmati rice, dry fruits, and kewra water.',
    price: 240,
    category: 'Dum Biryanis',
    isVeg: true,
    isPopular: false,
    rating: 4.82,
    calories: '580 kcal',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Mild', 'Medium 🌶️', 'Spicy 🔥'],
      addOns: [
        { id: 'extra-paneer', name: 'Extra Paneer Cubes (+100g)', price: 60 },
        { id: 'roasted-papad', name: 'Crispy Roasted Urad Papad (2 pcs)', price: 25 },
      ],
    },
  },

  // ==========================================
  // --- Punjab Grill Dhaba & Kitchen (rest-2) ---
  // ==========================================
  {
    id: 'item-201',
    restaurantId: 'rest-2',
    name: 'Dhaba Style Murgh Makhani (Butter Chicken)',
    description: 'Charcoal-smoked tandoori chicken simmered in a velvety, rich tomato, cashew nut, and Amul butter gravy, flavored with aromatic kasuri methi.',
    price: 340,
    originalPrice: 380,
    category: 'North Indian Curries',
    isVeg: false,
    isPopular: true,
    rating: 4.96,
    calories: '710 kcal',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/3806/3806-720.mp4',
    customizationOptions: {
      sizes: [
        { name: 'Half Bowl (2-3 pieces)', price: 0 },
        { name: 'Full Handi (4-5 pieces)', price: 240 },
      ],
      spiceLevels: ['Mild Creamy (Sweet-Savory)', 'Desi Spicy 🌶️', 'Highway Dhaba Teekha 🔥🔥'],
      addOns: [
        { id: 'butter-naan', name: 'Crisp Garlic Butter Naan (1 pc)', price: 50 },
        { id: 'extra-makhan', name: 'Dollop of Extra White Amul Butter', price: 30 },
      ],
    },
  },
  {
    id: 'item-202',
    restaurantId: 'rest-2',
    name: 'Slow-Cooked Dal Makhani with Desi Makhan',
    description: 'Black whole urad lentils simmered overnight over slow tandoor charcoal fire, enriched with fresh dairy cream and home-churned white butter.',
    price: 240,
    category: 'North Indian Curries',
    isVeg: true,
    isPopular: true,
    rating: 4.94,
    calories: '490 kcal',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: 'Regular Handi', price: 0 },
        { name: 'Family Bowl', price: 160 },
      ],
      addOns: [
        { id: 'laccha-paratha', name: 'Multi-Layered Butter Laccha Paratha', price: 45 },
        { id: 'jeera-rice', name: 'Fragrant Ghee Jeera Rice', price: 110 },
      ],
    },
  },
  {
    id: 'item-203',
    restaurantId: 'rest-2',
    name: 'Paneer Butter Masala (Amritsari Style)',
    description: 'Soft cottage cheese cubes cooked in a tangy spiced onion tomato gravy, cream, and freshly ground garam masala.',
    price: 280,
    category: 'North Indian Curries',
    isVeg: true,
    isPopular: true,
    rating: 4.88,
    calories: '560 kcal',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Mild', 'Medium 🌶️', 'Spicy 🔥'],
      addOns: [
        { id: 'tandoori-roti', name: 'Whole Wheat Tandoori Roti (2 pcs)', price: 40 },
      ],
    },
  },
  {
    id: 'item-204',
    restaurantId: 'rest-2',
    name: 'Garlic Butter Naan Basket (2 pcs)',
    description: 'Traditional refined flour flatbread slapped on the inside of hot clay tandoor, topped with minced garlic and melted Amul butter.',
    price: 90,
    category: 'Tandoori Breads',
    isVeg: true,
    isPopular: false,
    rating: 4.85,
    calories: '320 kcal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'cheese-stuffing', name: 'Stuffed with Melted Mozzarella & Chilies', price: 50 },
      ],
    },
  },
  {
    id: 'item-205',
    restaurantId: 'rest-2',
    name: 'Patiala Shahi Mango Malai Lassi (400ml)',
    description: 'Thick creamy Punjabi yogurt whipped with sweet Alphonso mango pulp, topped with malai cream and slivered pistachios.',
    price: 95,
    category: 'Beverages & Lassi',
    isVeg: true,
    isPopular: true,
    rating: 4.95,
    calories: '260 kcal',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: 'Regular Glass (400ml)', price: 0 },
        { name: 'Patiala Jumbo Clay Kulhad (600ml)', price: 45 },
      ],
    },
  },

  // ==========================================
  // --- Dakshin Tiffin Bhavan (rest-3) ---
  // ==========================================
  {
    id: 'item-301',
    restaurantId: 'rest-3',
    name: 'Davanagere Benne Masala Dosa',
    description: 'Crisp golden fermented rice crepe roasted in generous dollops of pure white butter (benne), smeared with spicy red garlic chutney, filled with potato sagu. Served with piping hot drumstick sambar and fresh coconut chutney.',
    price: 120,
    originalPrice: 140,
    category: 'South Indian Tiffins',
    isVeg: true,
    isPopular: true,
    rating: 4.98,
    calories: '420 kcal',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/42910/42910-1080.mp4',
    customizationOptions: {
      spiceLevels: ['Regular Chutney', 'Extra Spicy Red Chutney 🌶️'],
      addOns: [
        { id: 'extra-benne', name: 'Extra Dollop of Pure White Butter', price: 25 },
        { id: 'extra-sambar', name: 'Hot Madras Sambar Cup', price: 20 },
        { id: 'gunpowder-side', name: 'Spicy Podi Gunpowder with Ghee', price: 30 },
      ],
    },
  },
  {
    id: 'item-302',
    restaurantId: 'rest-3',
    name: 'Steamy Ghee Podi Thatte Idli (2 pcs)',
    description: 'Soft, melt-in-mouth oversized Karnataka Thatte idlis bathed in warm fragrant desi ghee and coated with spicy roasted lentil podi gunpowder.',
    price: 95,
    category: 'South Indian Tiffins',
    isVeg: true,
    isPopular: true,
    rating: 4.92,
    calories: '310 kcal',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: '2 Big Thatte Idlis', price: 0 },
        { name: '3 Big Thatte Idlis', price: 40 },
      ],
      addOns: [
        { id: 'vada-combo', name: 'Add 1 Crispy Medu Vada', price: 35 },
      ],
    },
  },
  {
    id: 'item-303',
    restaurantId: 'rest-3',
    name: 'Crispy Golden Medu Vada (2 pcs)',
    description: 'Crisp on the outside, fluffy inside lentil fritters spiced with ginger, black peppercorns, and curry leaves. Served with coconut chutney and tangy tomato rasam.',
    price: 75,
    category: 'South Indian Tiffins',
    isVeg: true,
    isPopular: false,
    rating: 4.8,
    calories: '280 kcal',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'sambar-dip', name: 'Drowned in Hot Sambar (Sambar Vada)', price: 20 },
      ],
    },
  },
  {
    id: 'item-304',
    restaurantId: 'rest-3',
    name: 'Authentic Kumbakonam Degree Filter Kaapi',
    description: 'Freshly decocted chicory blend Arabica coffee frothed with boiling thick whole milk in a traditional brass dabarah and tumbler.',
    price: 45,
    category: 'Hot Beverages',
    isVeg: true,
    isPopular: true,
    rating: 4.96,
    calories: '90 kcal',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: 'Single Cup (150ml)', price: 0 },
        { name: 'Double Kaapi (300ml)', price: 35 },
      ],
    },
  },

  // ==========================================
  // --- Chaat Chatori & Street Delights (rest-4) ---
  // ==========================================
  {
    id: 'item-401',
    restaurantId: 'rest-4',
    name: 'Delhi Style Golgappe / Pani Puri (8 pcs)',
    description: 'Crispy semolina puris stuffed with spiced boiled potatoes and black chickpeas. Served with chilled mint-coriander teekha pani and sweet tamarind sonth.',
    price: 70,
    category: 'Street Chaats',
    isVeg: true,
    isPopular: true,
    rating: 4.9,
    calories: '220 kcal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Medium Chilled Pani', 'Teekha Hing Masala 🌶️', 'Super Spicy Kolkata Jhal 🔥🔥'],
      addOns: [
        { id: 'extra-puris', name: 'Extra 4 Crispy Puris', price: 25 },
        { id: 'boondi', name: 'Crunchy Salted Boondi in Pani', price: 15 },
      ],
    },
  },
  {
    id: 'item-402',
    restaurantId: 'rest-4',
    name: 'Amritsari Chole Bhature (2 jumbo bhatures)',
    description: 'Puffy golden fermented bhatures served with dark spiced kabuli chana cooked with pomegranate seeds and anardana, accompanied by pickled carrots and green chilies.',
    price: 160,
    originalPrice: 190,
    category: 'Street Mains',
    isVeg: true,
    isPopular: true,
    rating: 4.94,
    calories: '680 kcal',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/4672/4672-360.mp4',
    customizationOptions: {
      sizes: [
        { name: '2 Bhatures + Chole', price: 0 },
        { name: '3 Bhatures + Chole Extra', price: 65 },
      ],
      addOns: [
        { id: 'paneer-bhature', name: 'Paneer Stuffed Bhature Upgrade', price: 40 },
        { id: 'sweet-lassi-combo', name: 'Mini Sweet Lassi Cup (200ml)', price: 45 },
      ],
    },
  },
  {
    id: 'item-403',
    restaurantId: 'rest-4',
    name: 'Special Mumbai Amul Butter Pav Bhaji',
    description: 'Slow-mashed spiced vegetable curry topped with a golden lake of melted Amul butter, fresh coriander, diced red onions, and lemon. Served with 2 soft grilled butter pavs.',
    price: 140,
    category: 'Street Mains',
    isVeg: true,
    isPopular: true,
    rating: 4.88,
    calories: '540 kcal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Medium Spiced', 'Kolhapuri Spicy Pav Bhaji 🌶️'],
      addOns: [
        { id: 'extra-pav-pair', name: 'Pair of Extra Butter Pavs (2 pcs)', price: 30 },
        { id: 'cheese-topping', name: 'Grated Amul Cheese Mountain', price: 40 },
      ],
    },
  },
  {
    id: 'item-404',
    restaurantId: 'rest-4',
    name: 'Dahi Papdi Chaat with Pomegranate Pearls',
    description: 'Crisp fried flour crackers layered with boiled potatoes, sweet yogurt, spicy mint chutney, zesty tamarind sauce, sev, and fresh pomegranate.',
    price: 90,
    category: 'Street Chaats',
    isVeg: true,
    isPopular: false,
    rating: 4.85,
    calories: '310 kcal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'extra-dahi', name: 'Extra Sweetened Whisked Curd', price: 20 },
      ],
    },
  },

  // ==========================================
  // --- Kolkata Kathi & Kebab Junction (rest-5) ---
  // ==========================================
  {
    id: 'item-501',
    restaurantId: 'rest-5',
    name: 'Double Egg Double Chicken Kathi Roll',
    description: 'Flaky pan-tossed paratha coated with two eggs, filled with tender spiced tandoori chicken chunks, sliced red onions, green chilies, and a squeeze of lime.',
    price: 170,
    originalPrice: 195,
    category: 'Kolkata Rolls',
    isVeg: false,
    isPopular: true,
    rating: 4.95,
    calories: '580 kcal',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/43063/43063-360.mp4',
    customizationOptions: {
      spiceLevels: ['Regular Chaat Masala', 'Extra Teekha Green Chilies 🌶️'],
      addOns: [
        { id: 'extra-cheese-slice', name: 'Melted Cheese Slice', price: 30 },
        { id: 'kasundi-mustard', name: 'Kolkata Spicy Kasundi Mustard Spread', price: 15 },
      ],
    },
  },
  {
    id: 'item-502',
    restaurantId: 'rest-5',
    name: 'Paneer Tikka Masala Kathi Roll',
    description: 'Golden tandoori roasted malai paneer cubes tossed in spicy bell pepper relish, wrapped inside a buttery crisp lachha paratha.',
    price: 140,
    category: 'Kolkata Rolls',
    isVeg: true,
    isPopular: true,
    rating: 4.82,
    calories: '490 kcal',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'egg-coating', name: 'Add Egg Layer to Paratha', price: 20 },
      ],
    },
  },
  {
    id: 'item-503',
    restaurantId: 'rest-5',
    name: 'Charcoal Mutton Seekh Kebab (4 skewers)',
    description: 'Minced goat meat delicately seasoned with brown onions, crushed coriander, and roasted cumin, skewered on hot coals until juicy.',
    price: 280,
    category: 'Tandoori Kebabs',
    isVeg: false,
    isPopular: true,
    rating: 4.9,
    calories: '510 kcal',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'rumali-roti', name: 'Soft Thin Rumali Roti (2 pcs)', price: 40 },
      ],
    },
  },

  // ==========================================
  // --- Anand Sweets & Royal Mithai (rest-6) ---
  // ==========================================
  {
    id: 'item-601',
    restaurantId: 'rest-6',
    name: 'Hot Desi Ghee Gulab Jamun (2 pcs)',
    description: 'Piping hot fried khoya dumplings soaked in fragrant cardamom and saffron rose sugar syrup. Made in 100% pure cow ghee.',
    price: 80,
    category: 'Indian Sweets',
    isVeg: true,
    isPopular: true,
    rating: 4.98,
    calories: '340 kcal',
    image: '/images/gulab-jamun.jpg',
    customizationOptions: {
      sizes: [
        { name: '2 Pieces (Regular)', price: 0 },
        { name: '4 Pieces (Sharing)', price: 70 },
      ],
      addOns: [
        { id: 'vanilla-icecream', name: 'Scoop of Vanilla Ice Cream', price: 40 },
      ],
    },
  },
  {
    id: 'item-602',
    restaurantId: 'rest-6',
    name: 'Royal Kesar Pista Rasmalai (2 pcs)',
    description: 'Delicate flattened cottage cheese discs soaked in chilled thickened saffron milk, garnished with toasted pistachios and almonds.',
    price: 110,
    originalPrice: 130,
    category: 'Indian Sweets',
    isVeg: true,
    isPopular: true,
    rating: 4.96,
    calories: '310 kcal',
    image: '/images/kesar-rasmalai.jpg',
    customizationOptions: {
      sizes: [
        { name: '2 Pieces Cup', price: 0 },
        { name: '4 Pieces Family Tub', price: 100 },
      ],
    },
  },
  {
    id: 'item-603',
    restaurantId: 'rest-6',
    name: 'Crispy Saffron Jalebi with Creamy Rabdi (200g)',
    description: 'Hot spiral jalebis soaked in saffron syrup, served with rich slow-cooked reduced milk rabdi.',
    price: 130,
    category: 'Indian Sweets',
    isVeg: true,
    isPopular: true,
    rating: 4.92,
    calories: '480 kcal',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/10424/10424-360.mp4',
    customizationOptions: {
      addOns: [
        { id: 'extra-rabdi', name: 'Extra Cup of Chilled Malai Rabdi', price: 45 },
      ],
    },
  },

  // ==========================================
  // --- The Chai Tapri & Bun Maska (rest-7) ---
  // ==========================================
  {
    id: 'item-701',
    restaurantId: 'rest-7',
    name: 'Kulhad Adrak Elaichi Chai (Flask for 2)',
    description: 'Freshly brewed aromatic tea with crushed ginger root, green cardamom pods, and buffalo milk. Delivered in insulated heat-retaining flask with 2 clay kulhads.',
    price: 70,
    category: 'Hot Beverages',
    isVeg: true,
    isPopular: true,
    rating: 4.95,
    calories: '120 kcal',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/43941/43941-360.mp4',
    customizationOptions: {
      sizes: [
        { name: 'Flask for 2 (300ml)', price: 0 },
        { name: 'Jumbo Flask for 4 (600ml)', price: 60 },
      ],
      spiceLevels: ['Regular Sweet', 'Kadak (Strong & Less Sugar)', 'Extra Ginger Adrak Kick 🔥'],
    },
  },
  {
    id: 'item-702',
    restaurantId: 'rest-7',
    name: 'Mumbai Vada Pav with Dry Garlic Chutney (2 pcs)',
    description: 'Deep-fried spicy potato dumplings encased in gram flour batter, sandwiched in soft pav smeared with fiery dry garlic coconut chutney and fried green chili.',
    price: 60,
    category: 'Street Snacks',
    isVeg: true,
    isPopular: true,
    rating: 4.9,
    calories: '360 kcal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'fried-chili-extra', name: 'Extra Salted Fried Green Chilies', price: 10 },
        { id: 'cheese-vada-pav', name: 'Cheese Slice in Pav', price: 25 },
      ],
    },
  },
  {
    id: 'item-703',
    restaurantId: 'rest-7',
    name: 'Irani Cafe Warm Bun Maska with Tutti Frutti',
    description: 'Pillow-soft bakery bun sliced and generously slathered with salted Amul butter, perfect for dipping directly into hot cutting chai.',
    price: 50,
    category: 'Street Snacks',
    isVeg: true,
    isPopular: false,
    rating: 4.75,
    calories: '290 kcal',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'jam-maska', name: 'Add Mixed Fruit Jam layer', price: 15 },
      ],
    },
  },

  // ==========================================
  // --- Desi Tadka Pizza & Burger (rest-8) ---
  // ==========================================
  {
    id: 'item-801',
    restaurantId: 'rest-8',
    name: 'Paneer Makhani Cheese Burst Pizza (10")',
    description: 'Handcrafted pizza base smothered in rich makhani gravy, mozzarella, marinated tandoori paneer tikka, capsicum, red onions, and chaat herbs.',
    price: 320,
    originalPrice: 360,
    category: 'Desi Fusion',
    isVeg: true,
    isPopular: true,
    rating: 4.88,
    calories: '860 kcal',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/44001/44001-360.mp4',
    customizationOptions: {
      sizes: [
        { name: 'Medium (10")', price: 0 },
        { name: 'Large (14")', price: 180 },
      ],
      crusts: [
        { name: 'Classic Hand Tossed', price: 0 },
        { name: 'Desi Cheese Burst Stuffed Crust', price: 75 },
      ],
      spiceLevels: ['Makhani Mild', 'Spicy Tandoori 🌶️'],
      addOns: [
        { id: 'extra-cheese', name: 'Extra Liquid Mozzarella Cheese', price: 50 },
      ],
    },
  },
  {
    id: 'item-802',
    restaurantId: 'rest-8',
    name: 'Tandoori Chicken Zinger Crunch Burger',
    description: 'Crispy fried chicken fillet coated in smoky tandoori marinade, topped with mint mayo, sliced red onions, and crisp lettuce on toasted sesame bun.',
    price: 180,
    category: 'Desi Fusion',
    isVeg: false,
    isPopular: true,
    rating: 4.9,
    calories: '610 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Medium Tandoori', 'Extra Hot Tikka 🌶️'],
      addOns: [
        { id: 'cheese-slice-burger', name: 'Amul Cheese Slice', price: 25 },
        { id: 'masala-fries-combo', name: 'Add Small Masala Fries', price: 50 },
      ],
    },
  },
  {
    id: 'item-803',
    restaurantId: 'rest-8',
    name: 'Crispy Masala Peri Peri Crinkle Fries',
    description: 'Hot crinkle cut fries dusted with homemade chaat masala and spicy peri peri seasoning. Served with garlic mint dip.',
    price: 99,
    category: 'Desi Fusion',
    isVeg: true,
    isPopular: false,
    rating: 4.78,
    calories: '340 kcal',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: 'Regular Tub', price: 0 },
        { name: 'Large Share Box', price: 50 },
      ],
      addOns: [
        { id: 'cheesy-dip', name: 'Warm Liquid Cheese Dip Cup', price: 30 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-1 BIRYANI ---
  // ==========================================
  {
    id: 'item-105',
    restaurantId: 'rest-1',
    name: 'Peshawari Chicken Tikka Dum Biryani',
    description: 'Boneless charcoal grilled chicken tikka cubes tossed in robust spiced gravy, layered under saffron infused basmati rice, crispy shallots, and fresh mint.',
    price: 330,
    originalPrice: 370,
    category: 'Dum Biryanis',
    isVeg: false,
    isPopular: true,
    rating: 4.93,
    calories: '690 kcal',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/49231/49231-720.mp4',
    customizationOptions: {
      sizes: [
        { name: 'Regular Bowl (Serves 1)', price: 0 },
        { name: 'Jumbo Matka (Serves 2-3)', price: 240 },
      ],
      spiceLevels: ['Medium Spiced', 'Peshawari Spicy 🌶️', 'Extra Teekha 🔥🔥'],
      addOns: [
        { id: 'extra-chicken-tikka', name: 'Extra Charred Chicken Tikka (4 pcs)', price: 80 },
        { id: 'burani-raita', name: 'Burani Garlic Raita', price: 35 },
      ],
    },
  },
  {
    id: 'item-106',
    restaurantId: 'rest-1',
    name: 'Awadhi Murgh Tangdi Kebab (3 pcs)',
    description: 'Plump chicken drumsticks stuffed with spiced minced meat, marinated in cashew paste and royal spices, slow roasted in tandoor.',
    price: 290,
    category: 'Royal Kebabs',
    isVeg: false,
    isPopular: true,
    rating: 4.90,
    calories: '480 kcal',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'rumali-roti', name: 'Rumali Roti (2 pcs)', price: 40 },
        { id: 'mint-chutney', name: 'Extra Spicy Pudina Chutney', price: 20 },
      ],
    },
  },
  {
    id: 'item-107',
    restaurantId: 'rest-1',
    name: 'Old Delhi Gosht Nihari with Roghani Kulcha',
    description: 'Slow-simmered goat shanks cooked overnight in aromatic marrow gravy flavored with pipli, saffron, and ginger juliennes. Served with warm buttered roghani kulcha.',
    price: 410,
    category: 'Royal Curries',
    isVeg: false,
    isPopular: true,
    rating: 4.97,
    calories: '720 kcal',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Traditional Nihari Teekha', 'Mild Shahi Spiced'],
      addOns: [
        { id: 'extra-kulcha', name: 'Extra Butter Roghani Kulcha', price: 45 },
        { id: 'ginger-chili-tadka', name: 'Extra Ginger-Chili Brown Onion Garnish', price: 25 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-2 PUNJAB GRILL ---
  // ==========================================
  {
    id: 'item-206',
    restaurantId: 'rest-2',
    name: 'Amritsari Chur Chur Naan Thali with Pindi Chole',
    description: 'Crushed flaky tandoori naan stuffed with spiced potatoes and paneer, served with dark spiced kabuli pindi chole, boondi raita, and tamarind-onion relish.',
    price: 220,
    originalPrice: 250,
    category: 'North Indian Curries',
    isVeg: true,
    isPopular: true,
    rating: 4.92,
    calories: '610 kcal',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/3806/3806-720.mp4',
    customizationOptions: {
      sizes: [
        { name: '1 Big Chur Chur Naan Thali', price: 0 },
        { name: '2 Chur Chur Naans Mega Thali', price: 80 },
      ],
      addOns: [
        { id: 'sweet-lassi', name: 'Sweet Malai Lassi Cup', price: 50 },
      ],
    },
  },
  {
    id: 'item-207',
    restaurantId: 'rest-2',
    name: 'Highway Murgh Malai Tikka Sizzler (6 pcs)',
    description: 'Juicy boneless chicken thighs marinated in clotted cream, green cardamom, roasted gram flour, and melted butter, broiled to a smoky golden char.',
    price: 330,
    category: 'Tandoori Kebabs',
    isVeg: false,
    isPopular: true,
    rating: 4.94,
    calories: '530 kcal',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'garlic-butter-naan', name: 'Hot Garlic Naan', price: 45 },
      ],
    },
  },
  {
    id: 'item-208',
    restaurantId: 'rest-2',
    name: 'Kadai Paneer Dhaba Masala',
    description: 'Fresh malai paneer cubes, crunchy capsicum, and whole red chilies tossed in a freshly pounded coriander and cumin kadai masala gravy.',
    price: 270,
    category: 'North Indian Curries',
    isVeg: true,
    isPopular: false,
    rating: 4.87,
    calories: '520 kcal',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Medium Kadai', 'Extra Spicy Dhaba Style 🌶️'],
      addOns: [
        { id: 'laccha-paratha', name: 'Laccha Paratha', price: 40 },
      ],
    },
  },
  {
    id: 'item-209',
    restaurantId: 'rest-2',
    name: 'Sarson Ka Saag with Makki Di Roti & Desi Ghee (Seasonal Special)',
    description: 'Traditional Punjabi mustard greens slow cooked in copper degchi, served with 2 hot cornmeal flatbreads, homemade white butter, and gur (jaggery).',
    price: 240,
    category: 'North Indian Curries',
    isVeg: true,
    isPopular: true,
    rating: 4.96,
    calories: '490 kcal',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'extra-makki-roti', name: 'Extra Makki Di Roti', price: 35 },
        { id: 'extra-white-butter', name: 'Extra White Amul Butter Dollop', price: 25 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-3 DAKSHIN TIFFIN ---
  // ==========================================
  {
    id: 'item-305',
    restaurantId: 'rest-3',
    name: 'Mysore Butter Masala Ghee Roast Dosa',
    description: 'Crisp roasted dosa coated with fiery red Mysore chili-garlic paste, filled with mashed potato sagu, roasted in pure aromatic desi ghee.',
    price: 135,
    originalPrice: 155,
    category: 'South Indian Tiffins',
    isVeg: true,
    isPopular: true,
    rating: 4.96,
    calories: '440 kcal',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/42910/42910-1080.mp4',
    customizationOptions: {
      spiceLevels: ['Medium Mysore Chutney', 'Fiery Teekha Red Chutney 🔥'],
      addOns: [
        { id: 'extra-ghee', name: 'Extra Ghee Drizzle', price: 25 },
        { id: 'extra-podi', name: 'Gunpowder Podi Cup', price: 20 },
      ],
    },
  },
  {
    id: 'item-306',
    restaurantId: 'rest-3',
    name: 'Chettinad Pepper Paneer Masala Gravy',
    description: 'Cottage cheese cubes tossed in freshly roasted whole black peppercorns, fennel, star anise, curry leaves, and grated coconut masala.',
    price: 240,
    category: 'South Indian Tiffins',
    isVeg: true,
    isPopular: false,
    rating: 4.88,
    calories: '460 kcal',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Chettinad Peppery 🔥', 'Medium Pepper'],
      addOns: [
        { id: 'malabar-parotta', name: 'Flaky Malabar Parotta (2 pcs)', price: 50 },
      ],
    },
  },
  {
    id: 'item-307',
    restaurantId: 'rest-3',
    name: 'Karnataka Bisi Bele Bath with Spiced Boondi & Pure Ghee',
    description: 'Wholesome rice, toor dal, and vegetable pot simmered with authentic 14-spice Bisi Bele powder, topped with crunchy spiced boondi and cashew tadka.',
    price: 110,
    category: 'South Indian Tiffins',
    isVeg: true,
    isPopular: true,
    rating: 4.91,
    calories: '390 kcal',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'crispy-papad', name: 'Crisp Papad & Boondi Extra', price: 20 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-4 CHAAT CHATORI ---
  // ==========================================
  {
    id: 'item-405',
    restaurantId: 'rest-4',
    name: 'Royal Shahi Raj Kachori Chaat',
    description: 'King-sized crisp golden kachori stuffed with diced potatoes, sprouts, soft dahi bhalla, smothered with whipped yogurt, sweet and tangy chutneys, sev, and fresh pomegranate.',
    price: 130,
    originalPrice: 150,
    category: 'Street Chaats',
    isVeg: true,
    isPopular: true,
    rating: 4.94,
    calories: '410 kcal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/4672/4672-360.mp4',
    customizationOptions: {
      addOns: [
        { id: 'extra-chutney-bowl', name: 'Extra Mint & Sonth Chutneys', price: 20 },
      ],
    },
  },
  {
    id: 'item-406',
    restaurantId: 'rest-4',
    name: 'Crispy Dahi Puri Sev Puri Combo (DSPDP 6 pcs)',
    description: 'Crisp puris stuffed with potato mash and chickpeas, filled with sweet whipped yogurt, spicy coriander water, sonth, and crowned with mountain of nylon sev.',
    price: 95,
    category: 'Street Chaats',
    isVeg: true,
    isPopular: true,
    rating: 4.89,
    calories: '280 kcal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Mild Sweet-Savory', 'Teekha Chaat Masala 🌶️'],
    },
  },
  {
    id: 'item-407',
    restaurantId: 'rest-4',
    name: 'Delhi 6 Matar Kulcha with Tangy Imli Chutney',
    description: 'White dried peas cooked street-style in brass pot with ginger, tomato, lemon, and chaat herbs, paired with 2 soft griddle-toasted butter kulchas.',
    price: 115,
    category: 'Street Mains',
    isVeg: true,
    isPopular: false,
    rating: 4.86,
    calories: '380 kcal',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'extra-kulcha-pair', name: 'Extra 2 Butter Kulchas', price: 35 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-5 KOLKATA KATHI ---
  // ==========================================
  {
    id: 'item-504',
    restaurantId: 'rest-5',
    name: 'Kolkata Special Mughlai Chicken Paratha',
    description: 'Deep-fried rectangular egg-coated envelope paratha stuffed with spicy minced chicken, diced green chilies, and onions. Served with spiced potato aloo dum and cucumber salad.',
    price: 210,
    originalPrice: 240,
    category: 'Kolkata Rolls',
    isVeg: false,
    isPopular: true,
    rating: 4.93,
    calories: '640 kcal',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/43063/43063-360.mp4',
    customizationOptions: {
      spiceLevels: ['Regular Kolkata Style', 'Extra Green Chilies 🌶️'],
      addOns: [
        { id: 'extra-kasundi', name: 'Extra Kasundi Mustard Dip', price: 15 },
      ],
    },
  },
  {
    id: 'item-505',
    restaurantId: 'rest-5',
    name: 'Spicy Egg Mutton Seekh Kathi Roll',
    description: 'Egg-layered crisp paratha wrapped around char-grilled minced mutton seekh kebab, sliced onions, chaat lime seasoning, and green chutney.',
    price: 220,
    category: 'Kolkata Rolls',
    isVeg: false,
    isPopular: true,
    rating: 4.91,
    calories: '590 kcal',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'cheese-slice-roll', name: 'Add Melted Cheese Slice', price: 30 },
      ],
    },
  },
  {
    id: 'item-506',
    restaurantId: 'rest-5',
    name: 'Crispy Kolkata Fish Fry with Kasundi (2 pcs)',
    description: 'Fresh Bhetki fish fillets marinated in green chili, coriander, and onion paste, crumbed with biscuit powder and fried golden. Served with authentic pungent Kasundi mustard.',
    price: 240,
    category: 'Quick Bites',
    isVeg: false,
    isPopular: true,
    rating: 4.95,
    calories: '420 kcal',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'salad-chips', name: 'Add Masala French Fries side', price: 45 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-6 ANAND SWEETS ---
  // ==========================================
  {
    id: 'item-604',
    restaurantId: 'rest-6',
    name: 'Royal Kesar Pista Matka Kulfi Falooda',
    description: 'Traditional slow-reduced dense saffron pistachio kulfi served with rose vermicelli falooda, sabja basil seeds, and pure rose syrup.',
    price: 120,
    category: 'Indian Sweets',
    isVeg: true,
    isPopular: true,
    rating: 4.94,
    calories: '290 kcal',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'extra-rabdi-topping', name: 'Top with Malai Rabdi', price: 35 },
      ],
    },
  },
  {
    id: 'item-605',
    restaurantId: 'rest-6',
    name: 'Warm Desi Ghee Moong Dal Halwa (200g)',
    description: 'Yellow split moong dal roasted in generous cow ghee for hours until nutty golden brown, simmered in whole milk, khoya, saffron, and roasted cashews.',
    price: 145,
    category: 'Indian Sweets',
    isVeg: true,
    isPopular: true,
    rating: 4.91,
    calories: '510 kcal',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: '200g Bowl', price: 0 },
        { name: '400g Family Pack', price: 130 },
      ],
    },
  },
  {
    id: 'item-606',
    restaurantId: 'rest-6',
    name: 'Motichoor Ladoo Gift Box (Pure Cow Ghee 250g)',
    description: 'Tiny gram flour droplets fried in pure desi ghee, soaked in saffron syrup, laced with green cardamom and melon seeds. Melts on the tongue.',
    price: 160,
    category: 'Indian Sweets',
    isVeg: true,
    isPopular: false,
    rating: 4.88,
    calories: '430 kcal',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: '250g Box (approx 6-8 pcs)', price: 0 },
        { name: '500g Box (approx 14-16 pcs)', price: 150 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-7 THE CHAI TAPRI ---
  // ==========================================
  {
    id: 'item-704',
    restaurantId: 'rest-7',
    name: 'Mumbai Street Masala Omelette Pav (2 eggs)',
    description: 'Fluffy 2-egg omelette beaten with green chilies, onions, tomatoes, and spices, fried on hot tawa and folded inside 2 butter-toasted ladi pavs with mint dip.',
    price: 85,
    category: 'Street Snacks',
    isVeg: false,
    isPopular: true,
    rating: 4.89,
    calories: '340 kcal',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      spiceLevels: ['Medium Spiced', 'Extra Teekha Green Chilies 🌶️'],
      addOns: [
        { id: 'cheese-in-omelette', name: 'Grated Amul Cheese Inside', price: 30 },
      ],
    },
  },
  {
    id: 'item-705',
    restaurantId: 'rest-7',
    name: 'Kesar Badam Milk Chilled (300ml Glass Bottle)',
    description: 'Rich buffalo milk slow boiled with Kashmiri saffron threads, crushed Californian almonds, cardamom, and rose water, chilled to perfection.',
    price: 90,
    category: 'Cold Beverages',
    isVeg: true,
    isPopular: true,
    rating: 4.93,
    calories: '220 kcal',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      sizes: [
        { name: 'Single Bottle (300ml)', price: 0 },
        { name: 'Twin Bottle Pack (600ml)', price: 80 },
      ],
    },
  },
  {
    id: 'item-706',
    restaurantId: 'rest-7',
    name: 'Spicy Keema Pav Sizzler Plate',
    description: 'Tender spiced minced goat meat braised with green peas, whole garam masala, and brown onion gravy. Served with 2 hot butter pavs and sliced red shallots.',
    price: 180,
    category: 'Street Snacks',
    isVeg: false,
    isPopular: true,
    rating: 4.91,
    calories: '490 kcal',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'extra-pav-keema', name: 'Extra Butter Pav Pair', price: 30 },
        { id: 'sunny-side-egg', name: 'Top with Fried Egg (Half Fry)', price: 25 },
      ],
    },
  },

  // ==========================================
  // --- ADDITIONAL DISHES: REST-8 DESI TADKA ---
  // ==========================================
  {
    id: 'item-804',
    restaurantId: 'rest-8',
    name: 'Butter Chicken Loaded Deep Dish Pizza (10")',
    description: 'Thick pizza crust smothered in rich makhani gravy, topped with shredded tandoori chicken tikka, mozzarella, red bell peppers, and fresh cilantro drizzle.',
    price: 360,
    originalPrice: 410,
    category: 'Desi Fusion',
    isVeg: false,
    isPopular: true,
    rating: 4.92,
    calories: '920 kcal',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/44001/44001-360.mp4',
    customizationOptions: {
      sizes: [
        { name: 'Medium (10")', price: 0 },
        { name: 'Large (14")', price: 190 },
      ],
      crusts: [
        { name: 'Deep Dish Classic', price: 0 },
        { name: 'Cheese Burst Crust', price: 80 },
      ],
      addOns: [
        { id: 'extra-tikka', name: 'Extra Chicken Tikka Chunks', price: 60 },
      ],
    },
  },
  {
    id: 'item-805',
    restaurantId: 'rest-8',
    name: 'Crispy Aloo Tikki Desi Crunch Burger',
    description: 'Golden fried spiced potato patty topped with mint mayonnaise, tomato slices, crunchy cabbage slaw, and sweet tamarind drizzle in a toasted brioche bun.',
    price: 110,
    category: 'Desi Fusion',
    isVeg: true,
    isPopular: true,
    rating: 4.84,
    calories: '450 kcal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'amul-cheese-burger', name: 'Amul Cheese Slice', price: 25 },
        { id: 'fries-drink-combo', name: 'Make it a Meal (+ Fries & Soft Drink)', price: 79 },
      ],
    },
  },
  {
    id: 'item-806',
    restaurantId: 'rest-8',
    name: 'Tandoori Masala Paneer Loaded Nachos',
    description: 'Crispy tortilla nachos smothered with warm melted cheese sauce, salsa, diced tandoori paneer tikka, spicy jalapeños, and tangy sour cream.',
    price: 150,
    category: 'Desi Fusion',
    isVeg: true,
    isPopular: false,
    rating: 4.86,
    calories: '510 kcal',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    customizationOptions: {
      addOns: [
        { id: 'guacamole-scoop', name: 'Fresh Guacamole Scoop', price: 40 },
        { id: 'extra-jalapenos', name: 'Extra Pickled Jalapeños', price: 20 },
      ],
    },
  },
];

