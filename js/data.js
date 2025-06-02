// Product Data
const products = [
  {
    id: 'p1',
    title: 'iPhone 15 Pro Max',
    category: 'smartphones',
    brand: 'Apple',
    price: 1199.99,
    originalPrice: 1299.99,
    image: 'https://images.pexels.com/photos/14666017/pexels-photo-14666017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/14666017/pexels-photo-14666017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/13936366/pexels-photo-13936366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/14666011/pexels-photo-14666011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/14666040/pexels-photo-14666040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Experience the ultimate iPhone with the Pro Max model featuring a stunning display, powerful A17 Pro chip, and professional-grade camera system.',
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    isNew: true,
    isBestSeller: true,
    variants: [
      { name: '256GB', price: 1199.99 },
      { name: '512GB', price: 1399.99 },
      { name: '1TB', price: 1599.99 }
    ],
    specifications: {
      'Display': '6.7" Super Retina XDR display with ProMotion',
      'Processor': 'A17 Pro chip with 6-core CPU',
      'Camera': 'Pro camera system (48MP main, 12MP ultra wide, 12MP telephoto)',
      'Video': '4K video recording at 24 fps, 30 fps, or 60 fps',
      'Battery': 'Up to 29 hours video playback',
      'Water Resistance': 'IP68 (maximum depth of 6 meters up to 30 minutes)',
      'Storage': '256GB, 512GB, 1TB',
      'OS': 'iOS 17',
      'Connectivity': '5G capable, Wi-Fi 6E, Bluetooth 5.3'
    },
    features: [
      'Titanium design, the strongest material ever used in an iPhone',
      'A17 Pro chip, the fastest chip ever in a smartphone',
      'Pro camera system with 48MP main camera and 5x telephoto',
      'Action button for custom shortcuts',
      'All-day battery life and USB-C connector',
      'Crash Detection and Emergency SOS'
    ]
  },
  {
    id: 'p2',
    title: 'Samsung Galaxy S24 Ultra',
    category: 'smartphones',
    brand: 'Samsung',
    price: 1199.99,
    originalPrice: 1299.99,
    image: 'https://images.pexels.com/photos/10808628/pexels-photo-10808628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/10808628/pexels-photo-10808628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/9811867/pexels-photo-9811867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'The Galaxy S24 Ultra featuring Galaxy AI, built with titanium for greater durability, and equipped with a powerful 200MP camera for incredible detail in every shot.',
    rating: 4.7,
    reviewCount: 92,
    stock: 20,
    isNew: true,
    isFeatured: true,
    variants: [
      { name: '256GB', price: 1199.99 },
      { name: '512GB', price: 1319.99 },
      { name: '1TB', price: 1539.99 }
    ],
    specifications: {
      'Display': '6.8" QHD+ Dynamic AMOLED 2X, Adaptive 120Hz',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Camera': '200MP main, 12MP ultra-wide, 10MP telephoto, 50MP telephoto',
      'Video': '8K video recording at 30 fps',
      'Battery': '5,000 mAh with 45W fast charging',
      'Water Resistance': 'IP68',
      'Storage': '256GB, 512GB, 1TB',
      'OS': 'Android 14, One UI 6.1',
      'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3'
    },
    features: [
      'Built with titanium for durability and a premium look',
      'Galaxy AI built in for enhanced productivity and creativity',
      'Pro-grade camera system with 200MP main camera',
      'S Pen included with near-zero latency',
      'Powerful processor for smooth gaming and multitasking',
      'Advanced nightography for great low-light photos'
    ]
  },
  {
    id: 'p3',
    title: 'MacBook Pro 16" M3 Max',
    category: 'laptops',
    brand: 'Apple',
    price: 3499.99,
    originalPrice: 3699.99,
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'The most powerful MacBook Pro ever, featuring the lightning-fast M3 Max chip, stunning Liquid Retina XDR display, and incredible battery life.',
    rating: 4.9,
    reviewCount: 78,
    stock: 8,
    isNew: true,
    isFeatured: true,
    variants: [
      { name: '32GB / 1TB', price: 3499.99 },
      { name: '64GB / 2TB', price: 4299.99 },
      { name: '128GB / 4TB', price: 5699.99 }
    ],
    specifications: {
      'Display': '16.2" Liquid Retina XDR display (3456 x 2234)',
      'Processor': 'Apple M3 Max chip',
      'Memory': 'Up to 128GB unified memory',
      'Storage': 'Up to 8TB SSD',
      'Battery': 'Up to 22 hours of battery life',
      'Ports': '3 Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3 port',
      'Keyboard': 'Magic Keyboard with Touch ID',
      'Camera': '1080p FaceTime HD camera',
      'Audio': 'Six-speaker sound system with force-cancelling woofers',
      'OS': 'macOS Sonoma'
    },
    features: [
      'Groundbreaking M3 Max chip for unprecedented performance',
      'Stunning Liquid Retina XDR display with extreme dynamic range',
      'Advanced thermal system for sustained performance',
      'Industry-leading battery life up to 22 hours',
      'Professional connectivity with Thunderbolt 4, HDMI, and SD card slot',
      'Studio-quality mic array for crystal-clear calls'
    ]
  },
  {
    id: 'p4',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'audio',
    brand: 'Sony',
    price: 349.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/819012/pexels-photo-819012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Experience industry-leading noise cancellation with the Sony WH-1000XM5 headphones, featuring exceptional sound quality and up to 30 hours of battery life.',
    rating: 4.8,
    reviewCount: 156,
    stock: 25,
    isBestSeller: true,
    variants: [
      { name: 'Black', price: 349.99 },
      { name: 'Silver', price: 349.99 }
    ],
    specifications: {
      'Driver Unit': '30mm, dome type (CCAW Voice coil)',
      'Frequency Response': '4Hz-40,000Hz',
      'Battery Life': 'Up to 30 hours (NC ON), up to 40 hours (NC OFF)',
      'Charging Time': 'Approx. 3.5 hours (full charge)',
      'Quick Charging': '3 hours playback with 3 min charge',
      'Bluetooth': 'Version 5.2',
      'Audio Formats': 'SBC, AAC, LDAC',
      'Weight': 'Approx. 250g'
    },
    features: [
      'Industry-leading noise cancellation with eight microphones and Auto NC Optimizer',
      'Exceptional sound quality with newly developed drivers',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Speak-to-Chat automatically pauses playback when you speak',
      'Multipoint connection allows connection to two Bluetooth devices simultaneously',
      'Premium design with soft fit leather and noiseless joints'
    ]
  },
  {
    id: 'p5',
    title: 'iPad Pro 12.9" M2',
    category: 'tablets',
    brand: 'Apple',
    price: 1099.99,
    originalPrice: 1199.99,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/13858631/pexels-photo-13858631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7195856/pexels-photo-7195856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'The ultimate iPad experience with the blazing-fast M2 chip, stunning Liquid Retina XDR display, and versatile features for creative professionals.',
    rating: 4.7,
    reviewCount: 112,
    stock: 10,
    isFeatured: true,
    variants: [
      { name: '256GB Wi-Fi', price: 1099.99 },
      { name: '256GB Wi-Fi + Cellular', price: 1299.99 },
      { name: '512GB Wi-Fi', price: 1299.99 },
      { name: '1TB Wi-Fi', price: 1699.99 }
    ],
    specifications: {
      'Display': '12.9" Liquid Retina XDR display',
      'Processor': 'Apple M2 chip with 8-core CPU, 10-core GPU',
      'Memory': '8GB or 16GB unified memory',
      'Storage': '256GB, 512GB, 1TB, or 2TB',
      'Camera': '12MP Wide camera, 10MP Ultra Wide camera, LiDAR Scanner',
      'Front Camera': '12MP Ultra Wide front camera with Center Stage',
      'Audio': 'Four speaker audio, five studio-quality microphones',
      'Battery': 'Up to 10 hours of surfing the web on Wi-Fi',
      'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3, 5G (cellular models)'
    },
    features: [
      'Breakthrough M2 chip for next-level performance',
      'Stunning 12.9-inch Liquid Retina XDR display for extreme brightness and contrast',
      'ProMotion technology for ultra-smooth scrolling and responsiveness',
      'Ultra Wide front camera with Center Stage automatically keeps you in view',
      'Thunderbolt / USB 4 port for high-speed accessories and displays',
      'Works with Apple Pencil, Magic Keyboard, and Smart Keyboard Folio'
    ]
  },
  {
    id: 'p6',
    title: 'Dell XPS 15 (2023)',
    category: 'laptops',
    brand: 'Dell',
    price: 2499.99,
    originalPrice: 2699.99,
    image: 'https://images.pexels.com/photos/5082586/pexels-photo-5082586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/5082586/pexels-photo-5082586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6770792/pexels-photo-6770792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Experience exceptional performance and stunning visuals with the Dell XPS 15, featuring a gorgeous OLED display, powerful Intel processor, and premium design.',
    rating: 4.6,
    reviewCount: 85,
    stock: 12,
    isNew: true,
    variants: [
      { name: 'i7/16GB/512GB/RTX 4060', price: 2499.99 },
      { name: 'i9/32GB/1TB/RTX 4070', price: 2999.99 }
    ],
    specifications: {
      'Display': '15.6" OLED 3.5K (3456 x 2160) InfinityEdge Touch',
      'Processor': 'Intel Core i7-13700H or i9-13900H',
      'Graphics': 'NVIDIA GeForce RTX 4060 or RTX 4070',
      'Memory': 'Up to 64GB DDR5',
      'Storage': 'Up to 4TB PCIe SSD',
      'Battery': '86Whr battery',
      'Ports': '2x Thunderbolt 4, 1x USB-C 3.2, SD card reader, headphone jack',
      'Keyboard': 'Backlit keyboard',
      'Audio': 'Quad-speaker design with Waves MaxxAudio Pro',
      'OS': 'Windows 11 Pro'
    },
    features: [
      'InfinityEdge display with stunning OLED technology',
      'Advanced thermal design for optimal performance',
      'CNC machined aluminum and carbon fiber construction',
      'Immersive quad-speaker design tuned with Waves MaxxAudio Pro',
      'Large precision trackpad with glass surface',
      'Integrated fingerprint reader in power button'
    ]
  },
  {
    id: 'p7',
    title: 'Google Pixel 8 Pro',
    category: 'smartphones',
    brand: 'Google',
    price: 999.99,
    originalPrice: 1099.99,
    image: 'https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/238480/pexels-photo-238480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1279365/pexels-photo-1279365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'The Google Pixel 8 Pro featuring the powerful Google Tensor G3 chip, AI-enhanced camera system, and the purest Android experience with 7 years of updates.',
    rating: 4.7,
    reviewCount: 94,
    stock: 18,
    isNew: true,
    variants: [
      { name: '128GB', price: 999.99 },
      { name: '256GB', price: 1099.99 },
      { name: '512GB', price: 1199.99 }
    ],
    specifications: {
      'Display': '6.7" Super Actua display (1344 x 2992)',
      'Processor': 'Google Tensor G3 with Titan M2 security',
      'Camera': '50MP main, 48MP ultrawide, 48MP telephoto (5x optical zoom)',
      'Front Camera': '10.5MP',
      'Video': '4K video at up to 60 fps',
      'Battery': '5,050 mAh with fast charging',
      'Water Resistance': 'IP68',
      'Storage': '128GB, 256GB, 512GB',
      'OS': 'Android 14 with 7 years of OS updates',
      'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3'
    },
    features: [
      'Google Tensor G3 chip designed with Google AI',
      'Pro-level camera system with advanced computational photography',
      'Super Actua display with 120Hz refresh rate and 2000 nits peak brightness',
      'Seven years of OS and security updates',
      'AI-powered features like Best Take, Magic Editor, and Audio Magic Eraser',
      'Temperature sensor for measuring object temperatures'
    ]
  },
  {
    id: 'p8',
    title: 'Apple Watch Ultra 2',
    category: 'wearables',
    brand: 'Apple',
    price: 799.99,
    originalPrice: 849.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'The most rugged and capable Apple Watch, designed for exploration, adventure, and endurance with the brightest Apple Watch display ever.',
    rating: 4.8,
    reviewCount: 68,
    stock: 15,
    isNew: true,
    isBestSeller: true,
    variants: [
      { name: 'Titanium Case / Trail Loop', price: 799.99 },
      { name: 'Titanium Case / Alpine Loop', price: 799.99 },
      { name: 'Titanium Case / Ocean Band', price: 799.99 }
    ],
    specifications: {
      'Display': '49mm Always-On Retina LTPO OLED display (3000 nits)',
      'Processor': 'S9 SiP with 64-bit dual-core processor',
      'Storage': '64GB',
      'Water Resistance': '100m water resistance (EN13319 certification)',
      'Battery': 'Up to 36 hours (up to 72 hours in Low Power Mode)',
      'Connectivity': 'LTE and UMTS, Wi-Fi, Bluetooth 5.3',
      'Sensors': 'Blood oxygen, ECG, heart rate, temperature, depth gauge, water temperature',
      'Navigation': 'Precision dual-frequency GPS (L1 and L5)',
      'Durability': 'Titanium case, sapphire front crystal'
    },
    features: [
      'The brightest Apple Watch display ever (3000 nits)',
      'Titanium case for optimal strength-to-weight ratio',
      'Customizable Action button for instant access to features',
      'Advanced metrics for endurance sports and deep water activities',
      'Precision dual-frequency GPS for accurate location tracking',
      'Up to 36 hours of battery life (72 hours in Low Power Mode)'
    ]
  },
  {
    id: 'p9',
    title: 'Bose QuietComfort Ultra Earbuds',
    category: 'audio',
    brand: 'Bose',
    price: 299.99,
    originalPrice: 329.99,
    image: 'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3756943/pexels-photo-3756943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Experience world-class noise cancellation and immersive audio with the Bose QuietComfort Ultra Earbuds, featuring Spatial Audio technology and all-day comfort.',
    rating: 4.6,
    reviewCount: 87,
    stock: 22,
    isNew: true,
    variants: [
      { name: 'Black', price: 299.99 },
      { name: 'White Smoke', price: 299.99 },
      { name: 'Moonstone Blue', price: 299.99 }
    ],
    specifications: {
      'Earbud Dimensions': '1.7" H x 1.0" W x 0.9" D',
      'Earbud Weight': '0.3 oz each (8.5 g)',
      'Case Dimensions': '1.2" H x 3.5" W x 2.0" D',
      'Case Weight': '2.0 oz (58 g)',
      'Battery Life': 'Up to 6 hours (earbuds), 24 hours total with case',
      'Charging Time': '1 hour for earbuds, 3 hours for case',
      'Fast Charge': '20 minutes for 2 hours of play time',
      'Bluetooth': 'Bluetooth 5.3, range up to 30 ft (9 m)',
      'Connectivity': 'Bluetooth, Bose Music app'
    },
    features: [
      'World-class noise cancellation with CustomTune technology',
      'Bose Immersive Audio for realistic spatial audio experience',
      'Advanced microphone system for clear calls in any environment',
      'IPX4 water resistance for protection against sweat and weather',
      'Touch controls with customizable settings',
      'Secure and comfortable fit with StayHear Max tips'
    ]
  },
  {
    id: 'p10',
    title: 'Samsung Galaxy Tab S9 Ultra',
    category: 'tablets',
    brand: 'Samsung',
    price: 1199.99,
    originalPrice: 1299.99,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1476132/pexels-photo-1476132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3371153/pexels-photo-3371153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5081923/pexels-photo-5081923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'The ultimate Android tablet experience with a massive 14.6" Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 processor, and included S Pen for creative professionals.',
    rating: 4.7,
    reviewCount: 63,
    stock: 8,
    isNew: true,
    variants: [
      { name: '256GB Wi-Fi', price: 1199.99 },
      { name: '512GB Wi-Fi', price: 1319.99 },
      { name: '1TB Wi-Fi', price: 1539.99 },
      { name: '256GB 5G', price: 1349.99 }
    ],
    specifications: {
      'Display': '14.6" Dynamic AMOLED 2X, 120Hz',
      'Resolution': '2960 x 1848 (WQXGA+)',
      'Processor': 'Snapdragon 8 Gen 2 for Galaxy',
      'Memory': '12GB or 16GB RAM',
      'Storage': '256GB, 512GB, or 1TB (expandable via microSD up to 1TB)',
      'Rear Camera': '13MP wide + 8MP ultra-wide',
      'Front Camera': '12MP wide + 12MP ultra-wide',
      'Battery': '11,200mAh with 45W super fast charging',
      'OS': 'Android 13 with One UI 5.1',
      'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3, 5G (optional)'
    },
    features: [
      'Stunning 14.6" Dynamic AMOLED 2X display for immersive viewing',
      'Included S Pen with ultra-low latency for natural writing and drawing',
      'DeX mode for desktop-like productivity',
      'Snapdragon 8 Gen 2 for powerful performance',
      'Quad speakers tuned by AKG with Dolby Atmos',
      'IP68 rating for water and dust resistance'
    ]
  },
  {
    id: 'p11',
    title: 'Sony PlayStation 5 Pro',
    category: 'gaming',
    brand: 'Sony',
    price: 699.99,
    originalPrice: 749.99,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Experience the next generation of gaming with the PlayStation 5 Pro, featuring enhanced ray tracing, faster loading times, and 8K support for the ultimate gaming experience.',
    rating: 4.9,
    reviewCount: 182,
    stock: 5,
    isNew: true,
    isBestSeller: true,
    variants: [
      { name: 'Digital Edition', price: 699.99 },
      { name: 'Disc Edition', price: 799.99 }
    ],
    specifications: {
      'CPU': 'Custom 8-core AMD Zen 2 (Enhanced)',
      'GPU': 'Custom RDNA 3 AMD Radeon (Enhanced)',
      'Memory': '16GB GDDR6',
      'Storage': '2TB SSD',
      'Optical Drive': 'Ultra HD Blu-ray (Disc Edition only)',
      'Video Output': 'Support for 8K HDR',
      'Audio': 'Tempest 3D AudioTech',
      'Ports': '3x USB-A, 1x USB-C, Ethernet, HDMI 2.1',
      'Networking': 'Wi-Fi 6E, Bluetooth 5.2',
      'Dimensions': '390mm x 104mm x 260mm'
    },
    features: [
      'Enhanced ray tracing performance for more realistic lighting',
      'PlayStation AI for improved upscaling and frame generation',
      'Support for 8K resolution gaming',
      'Ultra-high speed SSD virtually eliminates loading times',
      'Haptic feedback and adaptive triggers with DualSense controller',
      'Backward compatibility with PS4 and PS5 games'
    ]
  },
  {
    id: 'p12',
    title: 'DJI Air 3 Drone',
    category: 'accessories',
    brand: 'DJI',
    price: 1099.99,
    originalPrice: 1199.99,
    image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/9472053/pexels-photo-9472053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    description: 'Capture stunning aerial photography and videography with the DJI Air 3 drone, featuring dual cameras, obstacle sensing, and up to 46 minutes of flight time.',
    rating: 4.7,
    reviewCount: 54,
    stock: 15,
    isNew: true,
    variants: [
      { name: 'Standard Package', price: 1099.99 },
      { name: 'Fly More Combo', price: 1349.99 }
    ],
    specifications: {
      'Weight': '720g',
      'Max Flight Time': '46 minutes',
      'Max Transmission Distance': '20km (FCC), 10km (CE)',
      'Main Camera': '1-inch CMOS, 50MP',
      'Telephoto Camera': '1/1.3-inch CMOS, 48MP (3x optical zoom)',
      'Video Resolution': 'Up to 4K/60fps HDR, 4K/100fps',
      'Internal Storage': '8GB',
      'Max Wind Resistance': 'Level 5',
      'Operating Temperature': '-10°C to 40°C',
      'Battery': '5000mAh LiPo 3S'
    },
    features: [
      'Dual camera system with wide and telephoto lenses',
      'APAS 5.0 omnidirectional obstacle sensing',
      'Intelligent flight modes including MasterShots and FocusTrack',
      'Enhanced transmission with O4 video transmission',
      'Industry-leading 46-minute max flight time',
      'Advanced stabilization with 3-axis gimbal'
    ]
  }
];

// User Reviews Data
const reviews = [
  {
    id: 'r1',
    productId: 'p1',
    user: {
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 5,
    title: 'Best iPhone ever!',
    content: 'I upgraded from an iPhone 12 Pro and the difference is noticeable. The display is brighter, the camera system is incredible, and the battery life has been amazing. The titanium frame feels premium and makes the phone lighter than previous Pro Max models.',
    date: '2023-11-15',
    helpful: 24,
    verified: true
  },
  {
    id: 'r2',
    productId: 'p1',
    user: {
      name: 'Emily Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 4,
    title: 'Great upgrade with a few quirks',
    content: 'The iPhone 15 Pro Max is definitely a step up from my previous iPhone. The camera system is phenomenal, and I love the new Action button. My only complaint is that it heats up a bit more than I expected during intensive tasks. Otherwise, it\'s an excellent device.',
    date: '2023-11-02',
    helpful: 18,
    verified: true
  },
  {
    id: 'r3',
    productId: 'p1',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 5,
    title: 'The camera is unbelievable',
    content: 'As a photography enthusiast, I'm absolutely blown away by the camera capabilities of the iPhone 15 Pro Max. The 48MP main camera captures incredible detail, and the 5x telephoto lens is a game-changer for me. Portrait mode has also improved