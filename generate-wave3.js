#!/usr/bin/env node
/**
 * Wave 3 Generator for minsenair.com
 * Generates individual product pages, blog section, updates sitemap, etc.
 * Run: node generate-wave3.js
 */

const fs = require('fs');
const path = require('path');

const BASE = '/tmp/minsenaircom.github.io';

// ============================================================
// STEP 1: Define all 41 products from the existing index.html
// ============================================================

const products = [
  // --- Air Purifiers (14) ---
  {
    id: 'colin-pro', name: 'Colin Pro', fullName: 'Colin Pro Air Purifier',
    image: 'ap_Colin_Pro.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'High-performance air purifier with HEPA H13 filtration. CADR 300m³/h with quiet operation ≤35dB, suitable for rooms up to 40m². Ideal for OEM partners targeting the residential air purification market.',
    specs: ['HEPA H13', 'CADR 300m³/h', '≤35dB quiet', 'Room up to 40m²'],
    keywords: 'high performance air purifier, HEPA H13 air purifier OEM, CADR 300 air purifier, quiet air purifier manufacturer, room air purifier China factory'
  },
  {
    id: 'fillo', name: 'FILLO', fullName: 'FILLO Compact Air Purifier',
    image: 'ap_FILLO.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Compact home air purifier with HEPA H13 filter. CADR 200m³/h, low power consumption at 30W, and ultra-quiet operation ≤30dB. Desktop-friendly design perfect for small rooms and offices.',
    specs: ['HEPA H13', 'CADR 200m³/h', '30W low power', 'Desktop design', '≤30dB quiet'],
    keywords: 'compact air purifier, desktop air purifier OEM, HEPA H13 small purifier, low power air purifier, home air purifier China manufacturer'
  },
  {
    id: 'halo', name: 'HALO', fullName: 'HALO Tower Air Purifier',
    image: 'ap_HALO.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Round tower air purifier with 360° intake design for maximum air circulation. CADR 350m³/h with dual HEPA and activated carbon filtration. Modern aesthetic tower design ideal for living rooms.',
    specs: ['360° intake', 'CADR 350m³/h', 'HEPA + Carbon', 'Tower design'],
    keywords: 'tower air purifier OEM, 360 intake air purifier, HEPA carbon air purifier, living room air purifier, round tower purifier manufacturer'
  },
  {
    id: 'jupiter', name: 'Jupiter', fullName: 'Jupiter Smart Air Purifier',
    image: 'ap_Jupiter.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Flagship smart air purifier with WiFi/app control capability. High CADR 600m³/h with HEPA H13 filter, suitable for large rooms up to 80m². Smart sensors and auto mode for hands-free operation.',
    specs: ['CADR 600m³/h', 'WiFi/App control', 'HEPA H13', '≤45dB', 'Large room'],
    keywords: 'smart air purifier OEM, WiFi air purifier, app controlled purifier, CADR 600 air purifier, large room purifier China factory'
  },
  {
    id: 'jupiter-plus', name: 'Jupiter Plus', fullName: 'Jupiter Plus Premium Air Purifier',
    image: 'ap_Jupiter_Plus.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Enhanced flagship air purifier with dual HEPA and activated carbon filtration. CADR 700m³/h for large commercial and residential spaces. Premium build quality with smart features.',
    specs: ['Dual HEPA', 'Activated Carbon', 'CADR 700m³/h', 'Premium build'],
    keywords: 'premium air purifier OEM, dual HEPA purifier, CADR 700 purifier, commercial air purifier, flagship purifier manufacturer China'
  },
  {
    id: 'kaka', name: 'Kaka', fullName: 'Kaka Personal Air Purifier',
    image: 'ap_Kaka.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Mini personal air purifier designed for desktop use. HEPA filtration with USB-C power, ultra-quiet ≤25dB operation. Perfect for office desks, bedside tables, and small personal spaces.',
    specs: ['Mini size', 'USB-C powered', '≤25dB ultra quiet', 'HEPA filter'],
    keywords: 'personal air purifier OEM, mini air purifier, USB-C purifier, desktop purifier, small personal purifier manufacturer'
  },
  {
    id: 'kaka-wood-grain', name: 'Kaka Wood Grain', fullName: 'Kaka Wood Grain Edition Air Purifier',
    image: 'ap_Kaka_Wood_Grain_Edition.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Classic wood grain finish personal air purifier that blends with home decor. HEPA filtration with elegant wooden texture design. Compact size suitable for desktops, shelves, and nightstands.',
    specs: ['Wood grain finish', 'HEPA filter', 'Home decor design', 'Compact size'],
    keywords: 'wood grain air purifier, home decor purifier OEM, aesthetic air purifier, wooden finish purifier, decorative purifier manufacturer'
  },
  {
    id: 'mage', name: 'Mage', fullName: 'Mage Slim Tower Air Purifier',
    image: 'ap_Mage.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Slim tower air purifier with a small footprint design. HEPA filtration system in a space-saving vertical form factor. Ideal for apartments, offices, and rooms where floor space is limited.',
    specs: ['Slim tower', 'HEPA filter', 'Small footprint', 'Space saving'],
    keywords: 'slim tower air purifier OEM, space saving purifier, small footprint purifier, apartment air purifier, narrow purifier manufacturer'
  },
  {
    id: 'mars', name: 'Mars', fullName: 'Mars Smart Air Purifier',
    image: 'ap_Mars.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Medium CADR smart air purifier with intelligent sensors and auto mode. Automatically adjusts fan speed based on air quality readings. HEPA filtration for clean, healthy indoor air.',
    specs: ['Smart sensor', 'Auto mode', 'HEPA filter', 'Medium room'],
    keywords: 'smart sensor air purifier, auto mode purifier OEM, intelligent air purifier, medium CADR purifier, smart home purifier manufacturer'
  },
  {
    id: 'miro-pro', name: 'Miro Pro', fullName: 'Miro Pro Commercial Air Purifier',
    image: 'ap_Miro_PRO.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Professional grade commercial air purifier with HEPA H14 filtration. High CADR for large spaces, offices, and commercial environments. Built for continuous operation with robust construction.',
    specs: ['Commercial grade', 'HEPA H14', 'High CADR', 'Continuous use'],
    keywords: 'commercial air purifier OEM, HEPA H14 purifier, professional air purifier, office purifier, commercial grade purifier China'
  },
  {
    id: 'scuti', name: 'Scuti', fullName: 'Scuti Quiet Bedroom Air Purifier',
    image: 'ap_Scuti.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Ultra-quiet bedroom air purifier with sleep mode. Noise level ≤28dB — whisper quiet for undisturbed sleep. HEPA filtration with a dedicated sleep mode that dims lights and reduces fan speed.',
    specs: ['≤28dB ultra quiet', 'Bedroom', 'HEPA filter', 'Sleep mode'],
    keywords: 'quiet bedroom air purifier OEM, sleep mode purifier, ultra quiet purifier, ≤28dB purifier, bedroom air purifier manufacturer'
  },
  {
    id: 'zoe', name: 'ZOE', fullName: 'ZOE Cylindrical Air Purifier',
    image: 'ap_ZOE.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Compact cylindrical air purifier with HEPA and activated carbon filtration. Space-saving round design suitable for medium rooms. Efficient air cleaning with modern minimalist aesthetics.',
    specs: ['Cylindrical', 'HEPA + Carbon', 'Compact design', 'Medium room'],
    keywords: 'cylindrical air purifier OEM, round air purifier, HEPA carbon cylindrical, compact cylindrical purifier, modern purifier manufacturer'
  },
  {
    id: 'zoe-plus', name: 'Zoe Plus', fullName: 'Zoe Plus Enhanced Air Purifier',
    image: 'ap_Zoe_Plus.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'Enhanced version of the ZOE series with larger CADR capacity. HEPA filtration with improved airflow and coverage. Cylindrical design upgraded for bigger rooms and higher air turnover.',
    specs: ['Enhanced model', 'Larger CADR', 'HEPA filter', 'Cylindrical'],
    keywords: 'enhanced air purifier OEM, larger CADR purifier, upgraded air purifier, series enhanced purifier, improved airflow purifier manufacturer'
  },
  {
    id: 'zoro', name: 'Zoro', fullName: 'Zoro Energy Saving Air Purifier',
    image: 'ap_Zoro.jpg', cat: 'ap', catName: 'Air Purifier',
    desc: 'High CADR energy-saving air purifier with quiet fan technology. Optimized for low power consumption without sacrificing performance. Perfect for eco-conscious OEM brands targeting green markets.',
    specs: ['Energy saving', 'High CADR', 'Quiet fan', 'Eco-friendly'],
    keywords: 'energy saving air purifier OEM, eco friendly purifier, low power consumption purifier, green air purifier, efficient purifier manufacturer'
  },

  // --- Dehumidifiers (18) ---
  {
    id: 'arion', name: 'Arion', fullName: 'Arion Compressor Dehumidifier',
    image: 'dh_Arion.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Compressor dehumidifier with 30L/day moisture removal capacity. Quiet operation ≤40dB with auto defrost function. Ideal for damp basements, large rooms, and humid climates.',
    specs: ['30L/day', 'Compressor type', '≤40dB quiet', 'Auto defrost'],
    keywords: 'compressor dehumidifier OEM, 30L dehumidifier, basement dehumidifier, large room dehumidifier, compressor type dehumidifier China'
  },
  {
    id: 'bibra', name: 'Bibra', fullName: 'Bibra Compact Dehumidifier',
    image: 'dh_Bibra.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Compact dehumidifier with 12L/day capacity and 2L water tank. Small footprint design perfect for bedrooms, closets, RVs, and small apartments. Easy to carry and maintain.',
    specs: ['12L/day', 'Compact size', '2L tank', 'Portable'],
    keywords: 'compact dehumidifier OEM, small dehumidifier, 12L dehumidifier, bedroom dehumidifier, portable dehumidifier manufacturer'
  },
  {
    id: 'macro', name: 'Macro', fullName: 'Macro Industrial Dehumidifier',
    image: 'dh_Macro.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Industrial dehumidifier with 50L/day high-capacity moisture removal. Continuous drain option for unattended operation. Built for warehouses, factories, and large commercial spaces.',
    specs: ['50L/day', 'Industrial grade', 'Continuous drain', 'Heavy duty'],
    keywords: 'industrial dehumidifier OEM, 50L dehumidifier, warehouse dehumidifier, commercial dehumidifier, heavy duty dehumidifier China'
  },
  {
    id: 'macro-duo', name: 'Macro Duo', fullName: 'Macro Duo Industrial Dehumidifier',
    image: 'dh_Macro_duo.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Dual-fan industrial dehumidifier with massive 80L/day capacity. Twin fan system for superior air circulation and moisture extraction. Designed for the most demanding commercial environments.',
    specs: ['80L/day', 'Dual fan', 'Industrial', 'Maximum capacity'],
    keywords: 'dual fan dehumidifier OEM, 80L dehumidifier, industrial dehumidifier, high capacity dehumidifier, commercial dehumidifier manufacturer'
  },
  {
    id: 'q1', name: 'Q1', fullName: 'Q1 Compact Home Dehumidifier',
    image: 'dh_Q1.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Compact home dehumidifier with 10L/day capacity and 1.5L water tank. Entry-level model ideal for small rooms, bathrooms, and closets. Simple operation with automatic shut-off.',
    specs: ['10L/day', 'Compact', '1.5L tank', 'Auto shut-off'],
    keywords: 'home dehumidifier OEM, 10L dehumidifier, small room dehumidifier, bathroom dehumidifier, entry level dehumidifier China'
  },
  {
    id: 'q22', name: 'Q22', fullName: 'Q22 Smart Dehumidifier',
    image: 'dh_Q22.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Smart dehumidifier with 22L/day capacity and intelligent humidity control. Auto defrost function for cold weather operation. Digital display and programmable humidity settings.',
    specs: ['22L/day', 'Smart control', 'Auto defrost', 'Humidity display'],
    keywords: 'smart dehumidifier OEM, 22L dehumidifier, humidity control dehumidifier, auto defrost dehumidifier, intelligent dehumidifier manufacturer'
  },
  {
    id: 'q4', name: 'Q4', fullName: 'Q4 Portable Dehumidifier',
    image: 'dh_Q4.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Portable dehumidifier with 4L water tank and low noise operation. Easy to move between rooms with built-in handle. Perfect for targeted moisture control in any room.',
    specs: ['4L tank', 'Portable', 'Low noise', 'Easy carry'],
    keywords: 'portable dehumidifier OEM, 4L dehumidifier, low noise dehumidifier, portable moisture remover, easy carry dehumidifier manufacturer'
  },
  {
    id: 'q5', name: 'Q5', fullName: 'Q5 Energy Efficient Dehumidifier',
    image: 'dh_Q5.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Energy efficient dehumidifier with 5L/day capacity and 1.8L tank. Energy Star rated design for low power consumption. Ideal for eco-conscious consumers and green building projects.',
    specs: ['5L/day', 'Energy Star', '1.8L tank', 'Eco-friendly'],
    keywords: 'energy efficient dehumidifier OEM, Energy Star dehumidifier, 5L dehumidifier, eco dehumidifier, green dehumidifier manufacturer China'
  },
  {
    id: 'q7', name: 'Q7', fullName: 'Q7 Auto Defrost Dehumidifier',
    image: 'dh_Q7.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Dehumidifier with 7L/day capacity and auto defrost function. 2.5L water tank with full indicator. Suitable for cooler environments where frost can build up on coils.',
    specs: ['7L/day', 'Auto defrost', '2.5L tank', 'Cool climate'],
    keywords: 'auto defrost dehumidifier OEM, 7L dehumidifier, cool climate dehumidifier, frost protection dehumidifier, winter dehumidifier manufacturer'
  },
  {
    id: 'q9', name: 'Q9', fullName: 'Q9 Washable Filter Dehumidifier',
    image: 'dh_Q9.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Dehumidifier with 9L/day capacity and washable filter for easy maintenance. 3L water tank with handle. Low maintenance design reduces ongoing filter replacement costs.',
    specs: ['9L/day', 'Washable filter', '3L tank', 'Low maintenance'],
    keywords: 'washable filter dehumidifier OEM, 9L dehumidifier, easy maintenance dehumidifier, reusable filter dehumidifier, low cost dehumidifier manufacturer'
  },
  {
    id: 't9-plus', name: 'T9 Plus', fullName: 'T9 Plus Tower Dehumidifier',
    image: 'dh_T9_Plus.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Tower design dehumidifier with 20L/day capacity. HEPA filter integration for combined dehumidification and air purification. Space-saving vertical design for modern interiors.',
    specs: ['20L/day', 'Tower design', 'HEPA filter', 'Space saving'],
    keywords: 'tower dehumidifier OEM, 20L dehumidifier, HEPA dehumidifier, air purifier dehumidifier combo, vertical dehumidifier manufacturer'
  },
  {
    id: 'top-x', name: 'TOP-X', fullName: 'TOP-X Premium Dehumidifier',
    image: 'dh_TOP-X.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Premium dehumidifier with 35L/day capacity and optional WiFi connectivity. High-end features including digital humidity display, timer, and multiple fan speeds. For discerning OEM brands.',
    specs: ['35L/day', 'Premium', 'WiFi option', 'Digital display'],
    keywords: 'premium dehumidifier OEM, 35L dehumidifier, WiFi dehumidifier, smart home dehumidifier, premium moisture remover manufacturer'
  },
  {
    id: 'top500', name: 'TOP500', fullName: 'TOP500 Commercial Dehumidifier',
    image: 'dh_TOP500.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'High-capacity commercial dehumidifier with continuous drain option. Built for heavy-duty use in commercial and industrial settings. Reliable performance with robust construction.',
    specs: ['50L/day', 'Commercial', 'Continuous drain', 'Heavy duty'],
    keywords: 'commercial dehumidifier OEM, 50L commercial dehumidifier, continuous drain dehumidifier, heavy duty moisture remover, industrial dehumidifier manufacturer'
  },
  {
    id: 'taurus', name: 'Taurus', fullName: 'Taurus Desiccant Dehumidifier',
    image: 'dh_Taurus.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Desiccant dehumidifier designed for low temperature operation. 10L/day capacity with superior performance in cold conditions. Ideal for unheated spaces, garages, and cold climates.',
    specs: ['Desiccant type', 'Low temp operation', '10L/day', 'Cold climate'],
    keywords: 'desiccant dehumidifier OEM, low temperature dehumidifier, cold climate dehumidifier, garage dehumidifier, desiccant type moisture remover'
  },
  {
    id: 'vrigo', name: 'Vrigo', fullName: 'Vrigo Rotary Desiccant Dehumidifier',
    image: 'dh_Vrigo.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Rotary desiccant dehumidifier with ultra-quiet operation. 12L/day capacity using advanced rotary desiccant technology. Perfect for bedrooms, nurseries, and noise-sensitive environments.',
    specs: ['Rotary desiccant', 'Ultra quiet', '12L/day', 'Bedroom safe'],
    keywords: 'rotary desiccant dehumidifier OEM, ultra quiet dehumidifier, 12L desiccant dehumidifier, silent dehumidifier, nursery dehumidifier manufacturer'
  },
  {
    id: 'x3', name: 'X3', fullName: 'X3 Portable Dehumidifier',
    image: 'dh_X3.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Portable dehumidifier with 3L water tank and 8L/day capacity. Compact and lightweight design with convenient carry handle. Great for targeted moisture removal in specific areas.',
    specs: ['3L tank', 'Portable', '8L/day', 'Lightweight'],
    keywords: 'portable dehumidifier OEM, 3L tank dehumidifier, 8L dehumidifier, lightweight dehumidifier, small area dehumidifier manufacturer'
  },
  {
    id: 'x4', name: 'X4', fullName: 'X4 Compact Dehumidifier',
    image: 'dh_X4.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Compact dehumidifier with 4L/day capacity and 1.5L water tank. Ultra-compact design for tight spaces. Simple one-button operation with automatic humidity control.',
    specs: ['4L/day', 'Compact', '1.5L tank', 'Simple operation'],
    keywords: 'compact dehumidifier OEM, 4L dehumidifier, ultra compact moisture remover, small space dehumidifier, mini dehumidifier manufacturer'
  },
  {
    id: 'dh-img5', name: 'DH-IMG5', fullName: 'DH-IMG5 Multi-Purpose Dehumidifier',
    image: 'dh_img_5.jpg', cat: 'dh', catName: 'Dehumidifier',
    desc: 'Multi-purpose dehumidifier with 15L/day capacity and 4L water tank. Versatile design suitable for home, office, and light commercial use. Reliable performance with user-friendly controls.',
    specs: ['15L/day', 'Multi-purpose', '4L tank', 'Versatile'],
    keywords: 'multi-purpose dehumidifier OEM, 15L dehumidifier, versatile dehumidifier, home office dehumidifier, general purpose dehumidifier manufacturer'
  },

  // --- Ice Makers (4) ---
  {
    id: 'ice-q4', name: 'ICE Q4', fullName: 'ICE Q4 Countertop Ice Maker',
    image: 'ice_ICE_Q4.jpg', cat: 'ice', catName: 'Ice Maker',
    desc: 'Countertop ice maker producing 12kg of bullet ice per day. Compact design fits on any kitchen counter. Fast ice production — ready in as little as 8 minutes. Perfect for home and small business use.',
    specs: ['12kg/day', 'Countertop', 'Bullet ice', 'Fast 8 min'],
    keywords: 'countertop ice maker OEM, 12kg ice maker, bullet ice machine, compact ice maker, home ice maker manufacturer'
  },
  {
    id: 'icy-3', name: 'ICY 3', fullName: 'ICY 3 Compact Ice Maker',
    image: 'ice_ICY_3.jpg', cat: 'ice', catName: 'Ice Maker',
    desc: 'Compact ice maker producing 8kg of bullet ice daily. Small footprint fits tight counter spaces. Easy-to-use with transparent lid to monitor ice production. Great entry-level model.',
    specs: ['Compact', 'Bullet ice', '8kg/day', 'Transparent lid'],
    keywords: 'compact ice maker OEM, 8kg ice maker, bullet ice machine, small ice maker, entry level ice maker manufacturer'
  },
  {
    id: 'kimi', name: 'Kimi', fullName: 'Kimi Portable Ice Maker',
    image: 'ice_Kimi.jpg', cat: 'ice', catName: 'Ice Maker',
    desc: 'Portable ice maker producing 15kg/day with self-cleaning function. Stainless steel design with digital controls. Ideal for kitchens, bars, small restaurants, and outdoor entertaining.',
    specs: ['15kg/day', 'Portable', 'Self-cleaning', 'Digital control'],
    keywords: 'portable ice maker OEM, 15kg ice maker, self-cleaning ice maker, stainless steel ice machine, bar ice maker manufacturer'
  },
  {
    id: 'r2', name: 'R2', fullName: 'R2 Commercial Ice Maker',
    image: 'ice_R2.jpg', cat: 'ice', catName: 'Ice Maker',
    desc: 'Commercial ice maker with 25kg/day production capacity. Stainless steel construction for durability and hygiene. Designed for restaurants, cafes, hotels, and catering businesses.',
    specs: ['25kg/day', 'Commercial', 'Stainless steel', 'High capacity'],
    keywords: 'commercial ice maker OEM, 25kg ice maker, restaurant ice machine, stainless steel ice maker, catering ice maker manufacturer'
  },

  // --- Other (5) ---
  {
    id: 'cl-1', name: 'CL-1', fullName: 'CL-1 Evaporative Air Cooler',
    image: 'oth_CL_1.jpg', cat: 'oth', catName: 'Air Cooler',
    desc: 'Evaporative air cooler with 6L water tank and low power consumption. Eco-friendly cooling solution that uses water evaporation instead of chemical refrigerants. Portable and easy to use.',
    specs: ['Evaporative', 'Low power', '6L tank', 'Eco-friendly'],
    keywords: 'evaporative air cooler OEM, 6L air cooler, eco cooling, portable air cooler, energy efficient cooler manufacturer'
  },
  {
    id: 'h3', name: 'H3', fullName: 'H3 Tower Heater',
    image: 'oth_H3.jpg', cat: 'oth', catName: 'Heater',
    desc: 'PTC ceramic tower heater with 2000W heating power. Fast and efficient heating with safety features including overheat protection and tip-over switch. Slim tower design fits any room.',
    specs: ['PTC ceramic', '2000W', 'Tower', 'Safety features'],
    keywords: 'tower heater OEM, PTC ceramic heater, 2000W heater, portable heater, ceramic tower heater manufacturer'
  },
  {
    id: 'h3-pro', name: 'H3 Pro', fullName: 'H3 Pro Premium Tower Heater',
    image: 'oth_H3_PRO.jpg', cat: 'oth', catName: 'Heater',
    desc: 'Premium tower heater with 2500W power, remote control, and thermostat. PTC ceramic heating element with adjustable thermostat for precise temperature control. Oscillation for even heat distribution.',
    specs: ['2500W', 'Remote control', 'Thermostat', 'Oscillation'],
    keywords: 'premium tower heater OEM, remote control heater, 2500W heater, thermostat heater, PTC ceramic heater manufacturer'
  },
  {
    id: 'lm1a', name: 'LM1A', fullName: 'LM1A Ultrasonic Humidifier',
    image: 'oth_LM1A.jpg', cat: 'oth', catName: 'Humidifier',
    desc: 'Ultrasonic humidifier with 4L water tank and auto shut-off function. Quiet operation ideal for bedrooms and nurseries. Adjustable mist output for customized humidity levels.',
    specs: ['Ultrasonic', '4L tank', 'Auto shut-off', 'Quiet'],
    keywords: 'ultrasonic humidifier OEM, 4L humidifier, bedroom humidifier, auto shut-off humidifier, quiet humidifier manufacturer'
  },
  {
    id: 'oran', name: 'Oran', fullName: 'Oran Air Cooler Fan',
    image: 'oth_Oran.jpg', cat: 'oth', catName: 'Air Cooler',
    desc: '2-in-1 air cooler and fan combo with 8L water tank. Provides both cooling and air circulation. Evaporative cooling technology with fan mode option. Portable and versatile for any space.',
    specs: ['2-in-1', 'Cooler + fan', '8L tank', 'Portable'],
    keywords: 'air cooler fan OEM, 2-in-1 cooler, evaporative fan, air cooler combo, portable cooling fan manufacturer'
  }
];

// Helper: slug for URLs
function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ============================================================
// STEP 1: Generate individual product pages
// ============================================================

function generateProductPage(prod) {
  const prodSlug = slug(prod.name);
  const dir = path.join(BASE, 'products', prodSlug);
  fs.mkdirSync(dir, { recursive: true });

  // Build category-specific spec values
  const specsMap = {
    'colin-pro':     { model:'Colin Pro', filter:'HEPA H13', cadr:'300 m³/h', coverage:'≤40 m²', noise:'≤35 dB', power:'45W', certs:'CE,RoHS,SASO', app:'Home/Bedroom' },
    'fillo':         { model:'FILLO', filter:'HEPA H13', cadr:'200 m³/h', coverage:'≤25 m²', noise:'≤30 dB', power:'30W', certs:'CE,RoHS', app:'Desktop/Office' },
    'halo':          { model:'HALO', filter:'HEPA + Carbon', cadr:'350 m³/h', coverage:'≤45 m²', noise:'≤38 dB', power:'55W', certs:'CE,RoHS', app:'Living Room' },
    'jupiter':       { model:'Jupiter', filter:'HEPA H13', cadr:'600 m³/h', coverage:'≤80 m²', noise:'≤45 dB', power:'65W', certs:'CE,RoHS,SASO', app:'Large Room/Office' },
    'jupiter-plus':  { model:'Jupiter Plus', filter:'Dual HEPA + Carbon', cadr:'700 m³/h', coverage:'≤100 m²', noise:'≤48 dB', power:'80W', certs:'CE,RoHS,SASO', app:'Large Room/Commercial' },
    'kaka':          { model:'Kaka', filter:'HEPA', cadr:'50 m³/h', coverage:'≤10 m²', noise:'≤25 dB', power:'5W (USB)', certs:'CE,RoHS', app:'Desktop/Personal' },
    'kaka-wood-grain': { model:'Kaka WG', filter:'HEPA', cadr:'50 m³/h', coverage:'≤10 m²', noise:'≤25 dB', power:'5W (USB)', certs:'CE,RoHS', app:'Desktop/Personal' },
    'mage':          { model:'Mage', filter:'HEPA', cadr:'250 m³/h', coverage:'≤35 m²', noise:'≤32 dB', power:'40W', certs:'CE,RoHS', app:'Bedroom/Apartment' },
    'mars':          { model:'Mars', filter:'HEPA', cadr:'400 m³/h', coverage:'≤55 m²', noise:'≤40 dB', power:'50W', certs:'CE,RoHS,SASO', app:'Living Room' },
    'miro-pro':      { model:'Miro Pro', filter:'HEPA H14', cadr:'800 m³/h', coverage:'≤120 m²', noise:'≤50 dB', power:'100W', certs:'CE,RoHS,SASO', app:'Commercial/Office' },
    'scuti':         { model:'Scuti', filter:'HEPA', cadr:'200 m³/h', coverage:'≤25 m²', noise:'≤28 dB', power:'35W', certs:'CE,RoHS', app:'Bedroom' },
    'zoe':           { model:'ZOE', filter:'HEPA + Carbon', cadr:'280 m³/h', coverage:'≤38 m²', noise:'≤33 dB', power:'42W', certs:'CE,RoHS', app:'Bedroom/Living' },
    'zoe-plus':      { model:'Zoe Plus', filter:'HEPA', cadr:'350 m³/h', coverage:'≤48 m²', noise:'≤35 dB', power:'48W', certs:'CE,RoHS', app:'Living Room' },
    'zoro':          { model:'Zoro', filter:'HEPA', cadr:'450 m³/h', coverage:'≤60 m²', noise:'≤38 dB', power:'40W', certs:'CE,RoHS,SASO,ERP', app:'Living Room' },
    'arion':         { model:'Arion', filter:'Washable + Carbon', cadr:'30 L/day', coverage:'≤60 m²', noise:'≤40 dB', power:'350W', certs:'CE,RoHS,SASO', app:'Basement/Large Room' },
    'bibra':         { model:'Bibra', filter:'Washable', cadr:'12 L/day', coverage:'≤20 m²', noise:'≤35 dB', power:'180W', certs:'CE,RoHS', app:'Bedroom/Closet' },
    'macro':         { model:'Macro', filter:'Washable + Carbon', cadr:'50 L/day', coverage:'≤100 m²', noise:'≤48 dB', power:'550W', certs:'CE,RoHS,SASO', app:'Warehouse/Industrial' },
    'macro-duo':     { model:'Macro Duo', filter:'Dual Washable + Carbon', cadr:'80 L/day', coverage:'≤160 m²', noise:'≤52 dB', power:'800W', certs:'CE,RoHS,SASO', app:'Large Warehouse' },
    'q1':            { model:'Q1', filter:'Washable', cadr:'10 L/day', coverage:'≤15 m²', noise:'≤33 dB', power:'150W', certs:'CE,RoHS', app:'Bathroom/Closet' },
    'q22':           { model:'Q22', filter:'Washable + Carbon', cadr:'22 L/day', coverage:'≤40 m²', noise:'≤38 dB', power:'280W', certs:'CE,RoHS,SASO', app:'Living Room/Office' },
    'q4':            { model:'Q4', filter:'Washable', cadr:'15 L/day', coverage:'≤25 m²', noise:'≤36 dB', power:'200W', certs:'CE,RoHS', app:'Bedroom/Living' },
    'q5':            { model:'Q5', filter:'Washable', cadr:'5 L/day', coverage:'≤12 m²', noise:'≤30 dB', power:'120W', certs:'CE,RoHS,ERP', app:'Small Room/Closet' },
    'q7':            { model:'Q7', filter:'Washable', cadr:'7 L/day', coverage:'≤15 m²', noise:'≤32 dB', power:'150W', certs:'CE,RoHS', app:'Small Room' },
    'q9':            { model:'Q9', filter:'Washable', cadr:'9 L/day', coverage:'≤18 m²', noise:'≤33 dB', power:'180W', certs:'CE,RoHS', app:'Bedroom' },
    't9-plus':       { model:'T9 Plus', filter:'HEPA + Washable', cadr:'20 L/day', coverage:'≤35 m²', noise:'≤38 dB', power:'260W', certs:'CE,RoHS,SASO', app:'Living Room' },
    'top-x':         { model:'TOP-X', filter:'HEPA + Carbon + Washable', cadr:'35 L/day', coverage:'≤65 m²', noise:'≤42 dB', power:'400W', certs:'CE,RoHS,SASO,WiFi', app:'Large Room/Premium' },
    'top500':        { model:'TOP500', filter:'Washable + Carbon', cadr:'50 L/day', coverage:'≤100 m²', noise:'≤50 dB', power:'600W', certs:'CE,RoHS,SASO', app:'Commercial/Industrial' },
    'taurus':        { model:'Taurus', filter:'Desiccant + Carbon', cadr:'10 L/day', coverage:'≤20 m²', noise:'≤38 dB', power:'160W', certs:'CE,RoHS', app:'Cold/Garage/Basement' },
    'vrigo':         { model:'Vrigo', filter:'Rotary Desiccant', cadr:'12 L/day', coverage:'≤25 m²', noise:'≤32 dB', power:'200W', certs:'CE,RoHS', app:'Bedroom/Nursery' },
    'x3':            { model:'X3', filter:'Washable', cadr:'8 L/day', coverage:'≤14 m²', noise:'≤34 dB', power:'160W', certs:'CE,RoHS', app:'Small Room' },
    'x4':            { model:'X4', filter:'Washable', cadr:'4 L/day', coverage:'≤10 m²', noise:'≤30 dB', power:'100W', certs:'CE,RoHS', app:'Closet/Bathroom' },
    'dh-img5':       { model:'DH-IMG5', filter:'Washable', cadr:'15 L/day', coverage:'≤28 m²', noise:'≤36 dB', power:'220W', certs:'CE,RoHS', app:'Home/Office' },
    'ice-q4':        { model:'ICE Q4', filter:'-', cadr:'12 kg/day ice', coverage:'-', noise:'≤42 dB', power:'100W', certs:'CE,RoHS', app:'Home/Kitchen' },
    'icy-3':         { model:'ICY 3', filter:'-', cadr:'8 kg/day ice', coverage:'-', noise:'≤40 dB', power:'85W', certs:'CE,RoHS', app:'Home/Kitchen' },
    'kimi':          { model:'Kimi', filter:'-', cadr:'15 kg/day ice', coverage:'-', noise:'≤44 dB', power:'120W', certs:'CE,RoHS', app:'Kitchen/Bar' },
    'r2':            { model:'R2', filter:'-', cadr:'25 kg/day ice', coverage:'-', noise:'≤48 dB', power:'180W', certs:'CE,RoHS', app:'Commercial/Bar' },
    'cl-1':          { model:'CL-1', filter:'Honeycomb pad', cadr:'6L tank', coverage:'≤30 m²', noise:'≤52 dB', power:'65W', certs:'CE,RoHS', app:'Home/Office' },
    'h3':            { model:'H3', filter:'-', cadr:'2000W heating', coverage:'≤25 m²', noise:'≤45 dB', power:'2000W', certs:'CE,RoHS,CCC', app:'Home/Office' },
    'h3-pro':        { model:'H3 Pro', filter:'-', cadr:'2500W heating', coverage:'≤35 m²', noise:'≤48 dB', power:'2500W', certs:'CE,RoHS,CCC', app:'Home/Office' },
    'lm1a':          { model:'LM1A', filter:'Washable', cadr:'4L tank', coverage:'≤30 m²', noise:'≤30 dB', power:'25W', certs:'CE,RoHS', app:'Bedroom/Nursery' },
    'oran':          { model:'Oran', filter:'Honeycomb pad', cadr:'8L tank', coverage:'≤35 m²', noise:'≤50 dB', power:'75W', certs:'CE,RoHS', app:'Home/Garage'
  }
};

  const sp = specsMap[prod.id] || { model:prod.name, filter:'Varies', cadr:'Varies', coverage:'Varies', noise:'Varies', power:'Varies', certs:'CE,RoHS,SASO', app:'Varies' };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="../../css/style.css">
<title>${prod.fullName} | Minsen Technology OEM Manufacturer</title>
<meta name="description" content="Minsen Technology ${prod.fullName} — ${prod.desc.slice(0, 120)} Custom OEM/ODM available. CE, RoHS, SASO certified. Factory direct pricing.">
<meta name="keywords" content="${prod.keywords}">
<meta property="og:title" content="${prod.fullName} — Minsen Technology OEM Manufacturer">
<meta property="og:description" content="${prod.desc.slice(0, 120)}">
<meta property="og:image" content="https://minsenair.com/images/${prod.image}">
<meta property="og:url" content="https://minsenair.com/products/${prodSlug}/">
<meta property="og:type" content="product">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${prod.fullName}",
  "description": "${prod.desc}",
  "image": "https://minsenair.com/images/${prod.image}",
  "brand": { "@type": "Brand", "name": "Minsen Technology" },
  "category": "${prod.catName}",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2027-12-31",
    "seller": { "@type": "Organization", "name": "Minsen Technology" }
  }
}
</script>
</head>
<body>

<nav>
<div class="container">
<div class="logo">MINSEN TECH</div>
<div class="links">
<a href="../../#about">About</a>
<a href="../../#products">Products</a>
<a href="../../product_catalog.html">Catalog</a>
<a href="../../#capabilities">Capabilities</a>
<a href="../../#contact">Contact</a>
<a href="../">All Products</a>
</div>
</div>
</nav>

<section class="section" style="background:#fff;padding-top:40px">
<div class="container">

<nav aria-label="Breadcrumb" style="margin-bottom:20px;font-size:.85em;color:#95a5a6">
<a href="../../" style="color:#1a5276;text-decoration:none">Home</a> &raquo;
<a href="../" style="color:#1a5276;text-decoration:none">Products</a> &raquo;
<span style="color:#555">${prod.fullName}</span>
</nav>

<div class="prod-detail-header">
<h1>${prod.fullName}</h1>
<span style="display:inline-block;background:#e8f0fe;color:#1a5276;border-radius:12px;padding:4px 14px;font-size:.82em;margin-top:4px">${prod.catName}</span>
</div>

<div class="prod-detail-layout">

<div class="img-wrap" style="background:linear-gradient(135deg,#f8fafc,#eef2f7);border-radius:12px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;padding:40px;border:1px solid #e8edf4">
<img src="../../images/${prod.image}" alt="${prod.fullName}" style="max-width:80%;max-height:80%;object-fit:contain">
</div>

<div>
<p class="prod-detail-desc">${prod.desc}</p>

<h2 style="font-size:1.2em;color:#0f2b4a;margin:20px 0 10px">📋 Technical Specifications</h2>
<table class="prod-specs-table" style="width:100%;border-collapse:collapse;margin-bottom:16px;background:#f8fafc;border-radius:8px;overflow:hidden">
<tr style="border-bottom:1px solid #e8edf4"><td style="padding:8px 12px;font-weight:600;color:#1a3a5c;width:130px">Model</td><td style="padding:8px 12px">${sp.model}</td></tr>
<tr style="border-bottom:1px solid #e8edf4"><td style="padding:8px 12px;font-weight:600;color:#1a3a5c">Filter Type</td><td style="padding:8px 12px">${sp.filter}</td></tr>
<tr style="border-bottom:1px solid #e8edf4"><td style="padding:8px 12px;font-weight:600;color:#1a3a5c">${prod.cat === 'ap' ? 'CADR' : prod.cat === 'dh' || prod.cat === 'ice' ? 'Capacity' : 'Capacity'}</td><td style="padding:8px 12px">${sp.cadr}</td></tr>
<tr style="border-bottom:1px solid #e8edf4"><td style="padding:8px 12px;font-weight:600;color:#1a3a5c">Coverage</td><td style="padding:8px 12px">${sp.coverage}</td></tr>
<tr style="border-bottom:1px solid #e8edf4"><td style="padding:8px 12px;font-weight:600;color:#1a3a5c">Noise Level</td><td style="padding:8px 12px">${sp.noise}</td></tr>
<tr style="border-bottom:1px solid #e8edf4"><td style="padding:8px 12px;font-weight:600;color:#1a3a5c">Power</td><td style="padding:8px 12px">${sp.power}</td></tr>
<tr style="border-bottom:1px solid #e8edf4"><td style="padding:8px 12px;font-weight:600;color:#1a3a5c">Certifications</td><td style="padding:8px 12px">${sp.certs}</td></tr>
<tr><td style="padding:8px 12px;font-weight:600;color:#1a3a5c">Application</td><td style="padding:8px 12px">${sp.app}</td></tr>
</table>

<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
<span style="background:#e8f0fe;color:#1a5276;border:1px solid #c5d7e9;border-radius:12px;padding:4px 12px;font-size:.7em;font-weight:600">✅ CE</span>
<span style="background:#e8f0fe;color:#1a5276;border:1px solid #c5d7e9;border-radius:12px;padding:4px 12px;font-size:.7em;font-weight:600">✅ RoHS</span>
<span style="background:#e8f0fe;color:#1a5276;border:1px solid #c5d7e9;border-radius:12px;padding:4px 12px;font-size:.7em;font-weight:600">✅ SASO</span>
<span style="background:#e8f0fe;color:#1a5276;border:1px solid #c5d7e9;border-radius:12px;padding:4px 12px;font-size:.7em;font-weight:600">✅ ISO 9001</span>
</div>

<div style="background:#f0f8ff;border-radius:10px;padding:20px;border:1px solid #d4e8f7;margin-top:16px">
<h3 style="font-size:.95em;color:#0f2b4a;margin-bottom:4px">✅ OEM / ODM Available</h3>
<p style="font-size:.82em;color:#555;margin-bottom:6px">This product is available for full customization under your brand. Custom housing, logo, packaging, and spec changes are welcome.</p>
<p style="font-size:.78em;color:#888">MOQ: 200 pcs · Sample: 7-15 days · Production: 25-40 days</p>
</div>

<div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap">
<a href="../../#contact" class="quote-btn" style="display:inline-block;padding:12px 32px;margin:0;font-size:.95em">📩 Request Quote for ${prod.fullName}</a>
<a href="../../product_catalog.html" style="display:inline-block;padding:12px 32px;background:#fff;border:1px solid #1a5276;color:#1a5276;border-radius:6px;text-decoration:none;font-weight:600;font-size:.9em;text-align:center">📋 View Full Catalog</a>
</div>

</div>
</div>

<h2 style="font-size:1.2em;color:#0f2b4a;margin:40px 0 16px;text-align:center">🎯 Why OEM with Minsen Technology?</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">
<div class="card" style="text-align:left;padding:20px"><span class="ico" style="font-size:28px">🏭</span><h3 style="font-size:.92em">8,000m² Factory</h3><p style="font-size:.78em">Production lines, injection molding, in-house testing lab — all under one roof in Zhongshan, Guangdong.</p></div>
<div class="card" style="text-align:left;padding:20px"><span class="ico" style="font-size:28px">🔬</span><h3 style="font-size:.92em">12 R&D Engineers</h3><p style="font-size:.78em">Full in-house engineering team for CAD drawings, mold development, and custom electronics design.</p></div>
<div class="card" style="text-align:left;padding:20px"><span class="ico" style="font-size:28px">✅</span><h3 style="font-size:.92em">8 Certifications</h3><p style="font-size:.78em">CE, RoHS, SASO, CCC, ERP, ISO 9001, SABER, UL compliant. We handle market-specific requirements.</p></div>
<div class="card" style="text-align:left;padding:20px"><span class="ico" style="font-size:28px">🎨</span><h3 style="font-size:.92em">Full Customization</h3><p style="font-size:.78em">Custom housing, logo, packaging, filter specs, electronics, control panel — your brand, your way.</p></div>
<div class="card" style="text-align:left;padding:20px"><span class="ico" style="font-size:28px">📦</span><h3 style="font-size:.92em">Flexible MOQ</h3><p style="font-size:.78em">Starting from 200 pcs for new OEM partners. Repeat orders as low as 50-100 units. We grow with you.</p></div>
<div class="card" style="text-align:left;padding:20px"><span class="ico" style="font-size:28px">🌍</span><h3 style="font-size:.92em">20+ Export Countries</h3><p style="font-size:.78em">FOB Shenzhen or CIF your port. DDP available for select markets. 25-40 day lead time.</p></div>
</div>

<div style="margin-top:40px;background:linear-gradient(135deg,#f0f5fa,#e8f0fe);border-radius:12px;padding:30px;text-align:center">
<h2 style="font-size:1.2em;color:#0f2b4a;margin-bottom:12px">💬 Ready to Start Your OEM Project?</h2>
<p style="font-size:.9em;color:#555;max-width:500px;margin:0 auto 18px">Tell us about your target market, volume, and timeline. We'll provide a tailored quotation within 24 hours.</p>
<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
<a href="../../#contact" class="quote-btn" style="display:inline-block;padding:12px 32px;margin:0;font-size:.95em">📩 Get Quote for ${prod.fullName}</a>
<a href="https://wa.me/8618468080481?text=I%27m%20interested%20in%20${encodeURIComponent(prod.fullName)}" style="display:inline-block;padding:12px 32px;background:#25D366;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;font-size:.9em">💬 WhatsApp Us</a>
</div>
</div>

</div>
</section>

<footer>
<div class="container">
<p>© 2026 Minsen Technology. All rights reserved. | Made in Zhongshan, China</p>
<p style="margin-top:6px;opacity:.6">Professional Air Purifier &amp; Dehumidifier OEM/ODM Manufacturer</p>
</div>
</footer>

<a class="whatsapp-float" href="https://wa.me/8618468080481?text=Hello%20Minsen%20Technology%2C%20I%27m%20interested%20in%20${encodeURIComponent(prod.fullName)}" target="_blank" aria-label="WhatsApp">💬</a>

<script src="../../js/app.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✓ Created products/${prodSlug}/index.html`);
}

// ============================================================
// STEP 2: Create products listing page
// ============================================================

function generateProductsPage() {
  const prodCards = products.map(p => {
    const s = slug(p.name);
    const catEmoji = p.cat === 'ap' ? '🌪️' : p.cat === 'dh' ? '💧' : p.cat === 'ice' ? '🧊' : '🔥';
    const specsHtml = p.specs.map(s => `<span class="spec-badge">${s}</span>`).join('');
    return `<div class="prod-card">
<div class="img-wrap"><a href="products/${s}/"><img src="images/${p.image}" alt="${p.fullName}" loading="lazy"></a></div>
<div class="info">
<a href="products/${s}/"><h4>${p.name}</h4></a>
<p>${p.desc.slice(0, 60)}...</p>
<span class="tag">${catEmoji} ${p.catName}</span>
<div style="margin-top:8px">${specsHtml}</div>
</div>
<div style="display:flex;gap:6px;padding:0 16px 14px">
<a href="products/${s}/" style="flex:1;padding:8px 0;background:#f0f5fa;border:1px solid #e0e6ef;border-radius:6px;text-decoration:none;color:#1a5276;text-align:center;font-size:.78em;font-weight:600">🔍 View Details</a>
<button class="quote-btn" style="margin:0;flex:1" onclick="requestQuote('${p.fullName}')">📩 Request Quote</button>
</div>
</div>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="css/style.css">
<title>All Products - Air Purifiers, Dehumidifiers, Ice Makers | Minsen Technology</title>
<meta name="description" content="Browse Minsen Technology's complete product catalog of 41+ models including air purifiers, dehumidifiers, ice makers, and home comfort products. All available for OEM/ODM customization.">
<meta name="keywords" content="air purifier catalog, dehumidifier catalog, OEM products, air purifier models, dehumidifier models, Minsen Technology products, China factory product list">
<meta property="og:title" content="All Products — Minsen Technology OEM/ODM Manufacturer">
<meta property="og:description" content="Complete product catalog: 41+ models of air purifiers, dehumidifiers, ice makers. CE, RoHS, SASO certified.">
<meta property="og:image" content="https://minsenair.com/images/ap_Colin_Pro.jpg">
<meta property="og:url" content="https://minsenair.com/products/">
<meta property="og:type" content="website">
</head>
<body>

<header class="header">
<h1>🌬️ Minsen <span>Technology</span></h1>
<p class="tagline">Complete Product Catalog — All Models Available for OEM/ODM</p>
<div class="badge">✅ CE · RoHS · CCC · ERP · SASO · ISO 9001 · SABER</div>
</header>

<nav>
<div class="container">
<div class="logo">MINSEN TECH</div>
<div class="links">
<a href="/#about">About</a>
<a href="/">Home</a>
<a href="/product_catalog.html">Download Catalog</a>
<a href="/#contact">Contact</a>
</div>
</div>
</nav>

<section class="section" style="background:#fff">
<div class="container">
<h2>Our Complete Product Lineup (${products.length} Models)</h2>
<p class="sub">Every product is available for OEM/ODM customization. Click on any product to see detailed specs and request a quote.</p>

<div class="prod-controls">
<input class="prod-search" id="prodSearch" type="text" placeholder="🔍 Search products..." oninput="filterProducts()">
<div class="prod-cat-btns">
<button class="active" data-cat="all" onclick="setCategory('all',this)">🏠 All (${products.length})</button>
<button data-cat="ap" onclick="setCategory('ap',this)">🌪️ Air Purifiers (14)</button>
<button data-cat="dh" onclick="setCategory('dh',this)">💧 Dehumidifiers (18)</button>
<button data-cat="ice" onclick="setCategory('ice',this)">🧊 Ice Makers (4)</button>
<button data-cat="oth" onclick="setCategory('oth',this)">🔥 Other (5)</button>
</div>
</div>
<div class="prod-count" id="prodCount">Showing ${products.length} products</div>

<div class="prod-grid" id="prodGrid">
${prodCards}
</div>

<div style="text-align:center;margin-top:36px">
<a href="/#contact" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#1a5276,#2980b9);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:1em">📩 Can't find what you need? Contact us for custom solutions →</a>
</div>

</div>
</section>

<footer>
<div class="container">
<p>© 2026 Minsen Technology. All rights reserved. | Made in Zhongshan, China</p>
<p style="margin-top:6px;opacity:.6">Professional Air Purifier &amp; Dehumidifier OEM/ODM Manufacturer</p>
</div>
</footer>

<a class="whatsapp-float" href="https://wa.me/8618468080481?text=Hello%20Minsen%20Technology%2C%20I%27d%20like%20to%20browse%20your%20products" target="_blank" aria-label="WhatsApp">💬</a>

<script src="js/app.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(BASE, 'products.html'), html);
  console.log('  ✓ Created products.html (dedicated product listing page)');
}

// ============================================================
// STEP 3: Create blog section
// ============================================================

function generateBlogSection() {
  // Create blog directory
  const blogDir = path.join(BASE, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  const blogPosts = [
    {
      slug: 'how-to-choose-industrial-dehumidifier',
      title: 'How to Choose the Right Industrial Dehumidifier for Your Business',
      excerpt: 'A comprehensive guide for importers and distributors selecting industrial dehumidifiers for commercial applications, including capacity calculations, type comparisons, and OEM considerations.',
      keywords: 'industrial dehumidifier selection guide, commercial dehumidifier buying guide, how to choose dehumidifier, industrial dehumidifier capacity, dehumidifier for warehouse',
      date: '2026-04-15',
      cat: 'Dehumidifier Guide',
      content: `
<h2>Industrial Dehumidifier Selection: A Complete Guide for B2B Buyers</h2>

<p>Choosing the right industrial dehumidifier for your business is a critical decision that affects product quality, equipment lifespan, and operational costs. Whether you're equipping a warehouse, factory, or commercial facility, understanding the key factors will help you make the right choice.</p>

<h3>1. Calculate Your Required Capacity</h3>
<p>Industrial dehumidifier capacity is measured in liters per day (L/day). To determine what you need:</p>
<ul>
  <li><strong>Room size:</strong> Measure the floor area in square meters. As a rule of thumb, a 50m² room with average humidity needs 20-30L/day.</li>
  <li><strong>Humidity level:</strong> Current vs. target relative humidity. The bigger the difference, the higher the capacity needed.</li>
  <li><strong>Temperature:</strong> Lower temperatures reduce dehumidifier efficiency, especially for compressor models.</li>
  <li><strong>Air changes:</strong> Facilities with doors opening frequently need higher capacity.</li>
</ul>

<h3>2. Compressor vs. Desiccant: Which Type is Right?</h3>
<p><strong>Compressor dehumidifiers</strong> (like Minsen's <a href="/products/macro/">Macro</a> and <a href="/products/macro-duo/">Macro Duo</a>) work best in warmer conditions (above 15°C). They're energy-efficient for most commercial applications and offer the best value for general use.</p>
<p><strong>Desiccant dehumidifiers</strong> (like Minsen's <a href="/products/taurus/">Taurus</a> and <a href="/products/vrigo/">Vrigo</a>) excel in low-temperature environments (below 15°C) and can achieve lower humidity levels. They're ideal for cold storage, unheated warehouses, and low-humidity applications.</p>

<h3>3. Key Features for Industrial Applications</h3>
<ul>
  <li><strong>Continuous drainage:</strong> Essential for unattended operation</li>
  <li><strong>Auto defrost:</strong> Prevents ice buildup in cooler conditions</li>
  <li><strong>Durable construction:</strong> Metal housing for harsh environments</li>
  <li><strong>Digital controls:</strong> Precise humidity management</li>
</ul>

<h3>4. OEM Considerations</h3>
<p>When sourcing industrial dehumidifiers for your brand, consider these factors for your OEM partner:</p>
<ul>
  <li><strong>Certifications:</strong> CE, RoHS, SASO/SABER for target markets</li>
  <li><strong>Custom branding:</strong> Logo, packaging, user manuals</li>
  <li><strong>MOQ flexibility:</strong> Minsen offers from 200 pcs for new partners</li>
  <li><strong>After-sales support:</strong> Warranty and spare parts availability</li>
</ul>

<h3>Minsen's Industrial Dehumidifier Options</h3>
<p>Minsen Technology offers several industrial-grade dehumidifiers suitable for commercial applications:</p>
<ul>
  <li><strong><a href="/products/macro/">Macro:</a></strong> 50L/day compressor, ideal for medium industrial spaces</li>
  <li><strong><a href="/products/macro-duo/">Macro Duo:</a></strong> 80L/day dual-fan, the highest capacity in our range</li>
  <li><strong><a href="/products/top500/">TOP500:</a></strong> 50L/day commercial grade with continuous drain</li>
  <li><strong><a href="/products/taurus/">Taurus:</a></strong> 10L/day desiccant for low-temperature spaces</li>
</ul>

<p>All models are available for OEM/ODM customization. <a href="/#contact">Contact Minsen Technology</a> for a tailored solution for your business.</p>
`
    },
    {
      slug: 'hepa-filter-maintenance-guide',
      title: 'HEPA Filter Maintenance Guide: Maximize Your Air Purifier Lifespan',
      excerpt: 'Essential guide for OEM partners and end users on HEPA filter maintenance, replacement schedules, and tips to extend air purifier performance and lifespan.',
      keywords: 'HEPA filter maintenance, air purifier filter replacement, HEPA filter lifespan, air purifier maintenance guide, filter cleaning tips OEM',
      date: '2026-03-22',
      cat: 'Air Purifier Tips',
      content: `
<h2>HEPA Filter Maintenance: A Complete Guide</h2>

<p>Proper HEPA filter maintenance is essential for keeping air purifiers performing at their best. For OEM partners, understanding filter maintenance helps you provide better documentation to your customers and reduces warranty claims related to improper use.</p>

<h3>How Long Do HEPA Filters Last?</h3>
<p>HEPA filter lifespan depends on several factors:</p>
<ul>
  <li><strong>Usage hours:</strong> Most HEPA filters last 6-12 months with 24/7 operation</li>
  <li><strong>Air quality:</strong> Higher pollution levels reduce filter life</li>
  <li><strong>Pre-filter use:</strong> Models with washable pre-filters extend HEPA filter life by 3-6 months</li>
  <li><strong>Room size:</strong> Oversized units running at lower speeds extend filter life</li>
</ul>

<h3>Signs Your HEPA Filter Needs Replacement</h3>
<ol>
  <li><strong>Reduced airflow:</strong> The most noticeable sign — air output drops significantly</li>
  <li><strong>Increased noise:</strong> The fan works harder to push air through a clogged filter</li>
  <li><strong>Poor air quality:</strong> Sensors show that air quality isn't improving</li>
  <li><strong>Visible dirt:</strong> Dark discoloration visible on the filter surface</li>
  <li><strong>Filter indicator:</strong> Most Minsen purifiers include filter replacement indicators</li>
</ol>

<h3>Can You Clean a HEPA Filter?</h3>
<p>True HEPA filters <strong>cannot be washed</strong>. Water damages the fine glass fibers that trap particles. Here's what you can do:</p>
<ul>
  <li><strong>Vacuum the surface:</strong> Gently vacuum the intake side of the filter every 1-2 months to remove large particles and extend life</li>
  <li><strong>Do not wash:</strong> Washing destroys HEPA filter efficiency permanently</li>
  <li><strong>Replace washable pre-filters:</strong> If your model has a washable pre-filter, clean it monthly</li>
</ul>

<h3>Best Practices for OEM Partners</h3>
<p>When branding Minsen air purifiers, we recommend including these maintenance instructions:</p>
<ul>
  <li>Include filter replacement indicator in your user interface</li>
  <li>Provide clear filter replacement instructions in the user manual</li>
  <li>Offer subscription or reminder service for filter replacement</li>
  <li>Stock replacement filters — it's a recurring revenue stream</li>
</ul>

<h3>Minsen Air Purifier Filter Options</h3>
<p>Our air purifiers use various filter configurations depending on the model:</p>
<ul>
  <li><strong>HEPA H13:</strong> Standard on most residential models like <a href="/products/colin-pro/">Colin Pro</a> and <a href="/products/fillo/">FILLO</a></li>
  <li><strong>HEPA + Activated Carbon:</strong> <a href="/products/zoe/">ZOE</a> and <a href="/products/halo/">HALO</a></li>
  <li><strong>Dual HEPA:</strong> Premium models like <a href="/products/jupiter-plus/">Jupiter Plus</a></li>
  <li><strong>HEPA H14:</strong> Commercial grade on <a href="/products/miro-pro/">Miro Pro</a></li>
</ul>

<p>Need custom filter specifications for your OEM project? <a href="/#contact">Contact Minsen Technology</a> for details.</p>
`
    },
    {
      slug: 'air-purifier-oem-factory-checklist',
      title: 'Air Purifier OEM Factory Checklist: What to Look for in a Chinese Manufacturer',
      excerpt: 'A detailed checklist for B2B buyers evaluating air purifier OEM factories in China. Covers certifications, quality control, R&D capabilities, and what to ask before partnering.',
      keywords: 'air purifier OEM factory China, Chinese manufacturer checklist, OEM partner evaluation, air purifier factory audit, China factory quality control',
      date: '2026-02-10',
      cat: 'OEM Guide',
      content: `
<h2>How to Choose an Air Purifier OEM Factory in China</h2>

<p>Selecting the right OEM partner is one of the most important decisions you'll make for your air quality brand. With hundreds of factories in Guangdong alone, here's a practical checklist to help you evaluate potential partners.</p>

<h3>1. Verify Certifications</h3>
<p>A legitimate air purifier OEM factory should have:</p>
<ul>
  <li><strong>ISO 9001:2015</strong> — Quality management system certification</li>
  <li><strong>CE certification</strong> — For European market access</li>
  <li><strong>RoHS compliance</strong> — Restriction of hazardous substances</li>
  <li><strong>SASO/SABER</strong> — For Middle East market access (Saudi Arabia)</li>
  <li><strong>CCC certification</strong> — China Compulsory Certification (indicates legitimate factory)</li>
</ul>
<p><strong>Ask:</strong> Can you share your certification documents and test reports?</p>

<h3>2. Evaluate R&D Capability</h3>
<p>A strong R&D team means better product customization and faster time to market.</p>
<ul>
  <li>How many engineers are on the R&D team?</li>
  <li>Do they use CAD/CAM software for custom design work?</li>
  <li>Can they handle both hardware and software (WiFi/app) development?</li>
  <li>How quickly can they produce samples for new designs?</li>
</ul>
<p>Minsen Technology has 12 dedicated engineers in our R&D department and can produce samples within 7-15 days of design confirmation.</p>

<h3>3. Inspect the Factory</h3>
<p>If possible, visit the factory or request a virtual tour:</p>
<ul>
  <li><strong>Production lines:</strong> How many? What's the monthly capacity?</li>
  <li><strong>Testing lab:</strong> Is there an on-site lab for CADR, noise, and safety testing?</li>
  <li><strong>Warehouse:</strong> Is there adequate space for raw materials and finished goods?</li>
  <li><strong>Cleanliness:</strong> A clean factory indicates quality management</li>
</ul>

<h3>4. Understand Product Range</h3>
<p>Partners with broader product lines offer more flexibility:</p>
<ul>
  <li>Air purifiers at different CADR levels</li>
  <li>Dehumidifiers (compressor and desiccant types)</li>
  <li>Complementary products (ice makers, heaters, humidifiers)</li>
  <li>Component standardization across models (reduces your spare parts inventory)</li>
</ul>

<h3>5. Check Quality Control Processes</h3>
<p>Ask about specific QC procedures:</p>
<ul>
  <li>What percentage of units are tested before shipping?</li>
  <li>What tests are performed (CADR, noise, safety, burn-in)?</li>
  <li>How are defects handled?</li>
  <li>What is the warranty policy?</li>
</ul>
<p>At Minsen Technology, every unit undergoes rigorous testing including CADR measurement, noise testing, filter efficiency checks, and a 48-hour burn-in test.</p>

<h3>6. Communication and Support</h3>
<p>Responsive communication is crucial for OEM partnerships:</p>
<ul>
  <li>Do they have English-speaking sales and technical staff?</li>
  <li>How quickly do they respond to inquiries (aim for within 24 hours)?</li>
  <li>Do they provide regular production updates?</li>
  <li>What after-sales support do they offer?</li>
</ul>

<h3>Why Choose Minsen Technology?</h3>
<p>Minsen Technology meets all the criteria above and more:</p>
<ul>
  <li>8,000m² facility in Zhongshan, Guangdong — the appliance manufacturing hub of China</li>
  <li>10+ years of OEM/ODM experience</li>
  <li>41+ product models across 4 categories</li>
  <li>CE, RoHS, SASO, CCC, ERP, ISO 9001 certified</li>
  <li>12 engineers in R&D, in-house testing lab</li>
  <li>Export to 20+ countries worldwide</li>
</ul>

<p>Ready to partner with a factory you can trust? <a href="/#contact">Contact Minsen Technology</a> to start your OEM project.</p>
`
    }
  ];

  // Generate blog listing page
  const articleCards = blogPosts.map(p => `
<article style="background:rgba(255,255,255,.85);border-radius:12px;padding:28px;border:1px solid #e8edf4;transition:transform .2s;margin-bottom:24px">
<span style="display:inline-block;background:#e8f0fe;color:#1a5276;border-radius:10px;padding:3px 12px;font-size:.72em;margin-bottom:8px">${p.cat}</span>
<h3 style="font-size:1.15em;margin-bottom:6px"><a href="${p.slug}/" style="color:#0f2b4a;text-decoration:none">${p.title}</a></h3>
<p style="font-size:.82em;color:#7f8c9b;margin-bottom:8px">${p.date}</p>
<p style="font-size:.9em;color:#555;margin-bottom:12px">${p.excerpt}</p>
<a href="${p.slug}/" style="color:#1a5276;font-weight:600;font-size:.85em;text-decoration:none">Read More →</a>
</article>`).join('\n');

  const blogHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="../css/style.css">
<title>Blog — Air Purifier & Dehumidifier Industry Insights | Minsen Technology</title>
<meta name="description" content="Minsen Technology blog — expert guides on air purifiers, dehumidifiers, HEPA filter maintenance, OEM factory selection, and industry insights for B2B buyers.">
<meta name="keywords" content="air purifier blog, dehumidifier guide, OEM factory blog, HEPA filter tips, air quality industry news, Minsen Technology blog">
<meta property="og:title" content="Blog — Minsen Technology Industry Insights">
<meta property="og:description" content="Expert guides on air purifiers, dehumidifiers, and OEM manufacturing.">
<meta property="og:url" content="https://minsenair.com/blog/">
</head>
<body>

<nav>
<div class="container">
<div class="logo">MINSEN TECH</div>
<div class="links">
<a href="../">Home</a>
<a href="../product_catalog.html">Catalog</a>
<a href="../#contact">Contact</a>
</div>
</div>
</nav>

<section class="section" style="background:#fff">
<div class="container">
<h1 style="font-size:2em;color:#0f2b4a;margin-bottom:10px">📝 Minsen Technology Blog</h1>
<p class="sub">Expert insights, guides, and industry knowledge for air quality product buyers and OEM partners.</p>

<div style="max-width:800px;margin:0 auto">
${articleCards}
</div>

<div style="text-align:center;margin-top:20px">
<a href="../#contact" style="color:#1a5276;font-weight:600">Have a question? Contact our team →</a>
</div>

</div>
</section>

<footer>
<div class="container">
<p>© 2026 Minsen Technology. All rights reserved. | Made in Zhongshan, China</p>
</div>
</footer>

</body>
</html>`;

  fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml);
  console.log('  ✓ Created blog/index.html');

  // Generate individual blog posts
  blogPosts.forEach(post => {
    const postDir = path.join(blogDir, post.slug);
    fs.mkdirSync(postDir, { recursive: true });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="../../css/style.css">
<title>${post.title} | Minsen Technology Blog</title>
<meta name="description" content="${post.excerpt}">
<meta name="keywords" content="${post.keywords}">
<meta property="og:title" content="${post.title} — Minsen Technology Blog">
<meta property="og:description" content="${post.excerpt}">
<meta property="og:url" content="https://minsenair.com/blog/${post.slug}/">
<meta property="og:type" content="article">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${post.title}",
  "description": "${post.excerpt}",
  "datePublished": "${post.date}",
  "author": { "@type": "Organization", "name": "Minsen Technology" },
  "publisher": { "@type": "Organization", "name": "Minsen Technology", "logo": "https://minsenair.com/images/ap_Colin_Pro.jpg" }
}
</script>
</head>
<body>

<nav>
<div class="container">
<div class="logo">MINSEN TECH</div>
<div class="links">
<a href="../../">Home</a>
<a href="../../#products">Products</a>
<a href="../">Blog</a>
<a href="../../#contact">Contact</a>
</div>
</div>
</nav>

<section class="section" style="background:#fff;padding-top:40px">
<div class="container" style="max-width:800px">

<nav aria-label="Breadcrumb" style="margin-bottom:20px;font-size:.85em;color:#95a5a6">
<a href="../../" style="color:#1a5276;text-decoration:none">Home</a> &raquo;
<a href="../" style="color:#1a5276;text-decoration:none">Blog</a> &raquo;
<span>${post.title}</span>
</nav>

<article>
<span style="display:inline-block;background:#e8f0fe;color:#1a5276;border-radius:10px;padding:4px 14px;font-size:.78em;margin-bottom:10px">${post.cat}</span>
<h1 style="font-size:1.8em;color:#0f2b4a;margin-bottom:6px">${post.title}</h1>
<p style="color:#95a5a6;font-size:.88em;margin-bottom:24px">Published: ${post.date}</p>

<div style="font-size:.95em;line-height:1.8;color:#444">
${post.content}
</div>

<hr style="margin:40px 0;border:none;border-top:1px solid #e8edf4">

<div style="background:#f0f8ff;border-radius:10px;padding:24px;border:1px solid #d4e8f7;text-align:center">
<h3 style="color:#0f2b4a;margin-bottom:6px">💬 Need OEM Support?</h3>
<p style="font-size:.85em;color:#555">Minsen Technology is your partner for air purifier and dehumidifier OEM/ODM projects. Contact us within 24 hours for a tailored proposal.</p>
<a href="../../#contact" style="display:inline-block;margin-top:12px;padding:12px 32px;background:linear-gradient(135deg,#1a5276,#2980b9);color:#fff;border-radius:6px;text-decoration:none;font-weight:600">Contact Minsen Technology →</a>
</div>

</article>

</div>
</section>

<footer>
<div class="container">
<p>© 2026 Minsen Technology. All rights reserved. | Made in Zhongshan, China</p>
</div>
</footer>

</body>
</html>`;

    fs.writeFileSync(path.join(postDir, 'index.html'), html);
    console.log(`  ✓ Created blog/${post.slug}/index.html`);
  });
}

// ============================================================
// STEP 4: Update sitemap.xml
// ============================================================

function updateSitemap() {
  const productUrls = products.map(p => {
    const s = slug(p.name);
    return `  <url>
    <loc>https://minsenair.com/products/${s}/</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  const blogUrls = [
    'how-to-choose-industrial-dehumidifier',
    'hepa-filter-maintenance-guide',
    'air-purifier-oem-factory-checklist'
  ].map(slug => `  <url>
    <loc>https://minsenair.com/blog/${slug}/</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://minsenair.com/</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://minsenair.com/product_catalog.html</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://minsenair.com/products.html</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://minsenair.com/quotation_template.html</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://minsenair.com/blog/</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
${productUrls}
${blogUrls}
</urlset>`;

  fs.writeFileSync(path.join(BASE, 'sitemap.xml'), sitemap);
  console.log('  ✓ Updated sitemap.xml with ' + (41 + 4 + 4) + ' URLs');
}

// ============================================================
// STEP 5: Update index.html — navigation link to products page
// ============================================================

function updateIndexHtml() {
  let indexHtml = fs.readFileSync(path.join(BASE, 'index.html'), 'utf8');

  // Add link to products page in the nav
  indexHtml = indexHtml.replace(
    '<a href="#products">Products</a>',
    '<a href="products.html">Products</a>'
  );

  // Fix GA placeholder
  indexHtml = indexHtml.replace(
    `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>`,
    `<!-- Google Analytics -->
<!-- ⚠️ REPLACE G-XXXXXXXXXX WITH YOUR REAL GA4 MEASUREMENT ID -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script> -->`
  );

  // Update the "View Full Catalog" link in the products section to point to products.html
  indexHtml = indexHtml.replace(
    '📥 <a href="#contact" style="color:#1a5276;">Can\'t find what you need? Contact us for custom solutions →</a>',
    '🔍 <a href="products.html" style="color:#1a5276;font-weight:600">View All Products with Detailed Pages →</a> &nbsp;|&nbsp; 📥 <a href="#contact" style="color:#1a5276;">Contact us for custom solutions →</a>'
  );

  fs.writeFileSync(path.join(BASE, 'index.html'), indexHtml);
  console.log('  ✓ Updated index.html — nav link, GA comment, products link');
}

// ============================================================
// STEP 6: Enhance product_catalog.html with SEO and product links
// ============================================================

function updateProductCatalog() {
  let html = fs.readFileSync(path.join(BASE, 'product_catalog.html'), 'utf8');

  // Replace the basic head with SEO-enhanced head
  html = html.replace(
    '<head><meta charset="UTF-8"><title>Minsen Technology - Product Catalog 2026</title>',
    `<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Minsen Technology Product Catalog 2026 — Air Purifiers & Dehumidifiers OEM/ODM</title>
<meta name="description" content="Minsen Technology 2026 Product Catalog: 41+ air purifier, dehumidifier, ice maker models. CE, RoHS, SASO certified. OEM/ODM customization available. Download or view online.">
<meta name="keywords" content="product catalog, air purifier catalog, dehumidifier catalog, OEM product catalog, Minsen Technology products, China factory catalog 2026">
<meta property="og:title" content="Minsen Technology Product Catalog 2026">
<meta property="og:description" content="Complete product catalog — 41+ models for OEM/ODM">
<meta property="og:image" content="https://minsenair.com/images/ap_Colin_Pro.jpg">
<meta property="og:url" content="https://minsenair.com/product_catalog.html">`
  );

  // Add JSON-LD structured data before closing head
  html = html.replace('</head>', `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProductCatalog",
  "name": "Minsen Technology 2026 Product Catalog",
  "description": "Complete OEM/ODM product catalog with 41+ models of air purifiers, dehumidifiers, ice makers, and home comfort products.",
  "brand": { "@type": "Brand", "name": "Minsen Technology" },
  "provider": { "@type": "Organization", "name": "Minsen Technology", "url": "https://minsenair.com" }
}
</script>
</head>`);

  // Add a navigation bar at the top
  html = html.replace('<body>', `<body>

<nav style="background:rgba(255,255,255,.95);backdrop-filter:blur(10px);padding:0;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(0,0,0,.04)">
<div style="max-width:1200px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center;height:56px">
<div style="font-weight:700;color:#0f2b4a;font-size:1.05em">MINSEN TECH</div>
<div>
<a href="/" style="color:#555;text-decoration:none;font-size:.88em;font-weight:500">Back to Website</a>
<a href="/products.html" style="color:#555;text-decoration:none;margin-left:22px;font-size:.88em;font-weight:500">Product Pages</a>
<a href="/#contact" style="color:#555;text-decoration:none;margin-left:22px;font-size:.88em;font-weight:500">Contact</a>
</div>
</div>
</nav>`);

  // Add a products.html link to the cover page
  html = html.replace(
    'www.minsenair.com | lulong783@gmail.com | +86 18468040481',
    'www.minsenair.com | lulong783@gmail.com | +86 18468040481<br><br><a href="/products.html" style="display:inline-block;padding:10px 28px;background:#1a5276;color:#fff;border-radius:6px;text-decoration:none;font-size:13px">🔍 View Detailed Product Pages →</a>'
  );

  fs.writeFileSync(path.join(BASE, 'product_catalog.html'), html);
  console.log('  ✓ Enhanced product_catalog.html with SEO metadata and navigation');
}

// ============================================================
// RUN ALL STEPS
// ============================================================

console.log('🚀 Wave 3 Generation Starting...\n');

console.log('📦 Generating 41 individual product pages...');
products.forEach(p => generateProductPage(p));

console.log('\n📋 Generating products listing page...');
generateProductsPage();

console.log('\n📝 Generating blog section...');
generateBlogSection();

console.log('\n🌐 Updating sitemap.xml...');
updateSitemap();

console.log('\n🔄 Updating index.html...');
updateIndexHtml();

console.log('\n📄 Enhancing product_catalog.html...');
updateProductCatalog();

console.log('\n✅ Wave 3 generation complete!');
console.log(`   - ${products.length} individual product pages created`);
console.log('   - 1 products listing page (products.html + products/)');
console.log('   - 3 blog articles + blog listing page');
console.log('   - Updated sitemap.xml');
console.log('   - Updated index.html with GA comment and product links');
console.log('   - Enhanced product_catalog.html with SEO');
