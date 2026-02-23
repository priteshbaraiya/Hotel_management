const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/Hotel');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/TheRoyalObsidian';

// Unsplash hotel images pool
const hotelImages = [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800',
    'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=800',
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800',
    'https://images.unsplash.com/photo-1587213811864-46e59f6873b1?q=80&w=800',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800',
    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?q=80&w=800',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=800',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800',
    'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=800',
    'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=800'
];

const getImg = (i) => hotelImages[i % hotelImages.length];

const hotels = [
    // ═══════════════ MUMBAI (15) ═══════════════
    { name: 'The Taj Mahal Palace', city: 'Mumbai', address: 'Apollo Bunder, Colaba', description: 'An iconic luxury hotel with breathtaking views of the Arabian Sea and the Gateway of India.', stars: 5 },
    { name: 'The Oberoi Mumbai', city: 'Mumbai', address: 'Nariman Point', description: 'A contemporary luxury hotel perched on the edge of Marine Drive, offering panoramic ocean views.', stars: 5 },
    { name: 'Trident Nariman Point', city: 'Mumbai', address: 'Nariman Point', description: 'An elegant five-star hotel overlooking the Queen\'s Necklace and Marine Drive.', stars: 5 },
    { name: 'ITC Grand Central', city: 'Mumbai', address: 'Parel, Mumbai', description: 'A luxury hotel blending Italian Renaissance architecture with warm Indian hospitality.', stars: 5 },
    { name: 'Four Seasons Hotel Mumbai', city: 'Mumbai', address: 'Worli, Mumbai', description: 'Ultra-modern tower with stunning city views, world-class dining, and a rooftop infinity pool.', stars: 5 },
    { name: 'The St. Regis Mumbai', city: 'Mumbai', address: 'Lower Parel', description: 'A beacon of luxury in the heart of Mumbai, with impeccable service and palatial suites.', stars: 5 },
    { name: 'JW Marriott Mumbai Juhu', city: 'Mumbai', address: 'Juhu Beach', description: 'An award-winning hotel on the famous Juhu Beach with stunning sunset views.', stars: 5 },
    { name: 'Hotel Marine Plaza', city: 'Mumbai', address: 'Marine Drive', description: 'An Art Deco hotel on Marine Drive with a glass-bottom swimming pool.', stars: 4 },
    { name: 'The Leela Mumbai', city: 'Mumbai', address: 'Andheri East', description: 'Near the international airport, offering regal luxury inspired by the Royal Portuguese Palace.', stars: 5 },
    { name: 'ITC Maratha', city: 'Mumbai', address: 'Andheri East', description: 'A Maratha warrior-inspired hotel with grand architecture and LEED Platinum certification.', stars: 5 },
    { name: 'Sofitel Mumbai BKC', city: 'Mumbai', address: 'Bandra Kurla Complex', description: 'French luxury meets Indian elegance in the commercial heart of Mumbai.', stars: 5 },
    { name: 'Sahara Star Mumbai', city: 'Mumbai', address: 'Near Airport', description: 'A futuristic hotel with an indoor rainforest and starlit ceiling in the lobby.', stars: 5 },
    { name: 'Grand Hyatt Mumbai', city: 'Mumbai', address: 'Santacruz East', description: 'An urban retreat spanning 12 acres with world-class restaurants and an expansive spa.', stars: 5 },
    { name: 'Novotel Mumbai Juhu Beach', city: 'Mumbai', address: 'Juhu Beach', description: 'A contemporary hotel offering direct access to Juhu Beach and premium comfort.', stars: 4 },
    { name: 'Renaissance Mumbai Convention Centre', city: 'Mumbai', address: 'Powai', description: 'A striking hotel by Powai Lake with a stunning lobby and excellent conference facilities.', stars: 5 },

    // ═══════════════ DELHI (15) ═══════════════
    { name: 'The Imperial New Delhi', city: 'Delhi', address: 'Janpath, Connaught Place', description: 'A grand heritage hotel from the 1930s with Art Deco charm and museum-quality art.', stars: 5 },
    { name: 'The Leela Palace New Delhi', city: 'Delhi', address: 'Chanakyapuri', description: 'An opulent modern palace with Lutyens-inspired architecture and lavish interiors.', stars: 5 },
    { name: 'ITC Maurya Delhi', city: 'Delhi', address: 'Chanakyapuri', description: 'Home to the legendary Bukhara restaurant and presidential-level hospitality.', stars: 5 },
    { name: 'The Oberoi New Delhi', city: 'Delhi', address: 'Dr. Zakir Husain Marg', description: 'A sleek luxury hotel overlooking the Delhi Golf Club greens.', stars: 5 },
    { name: 'Taj Palace New Delhi', city: 'Delhi', address: 'Sardar Patel Marg', description: 'Set amidst six acres of lush gardens with views of the Mughal Gardens.', stars: 5 },
    { name: 'The Lodhi New Delhi', city: 'Delhi', address: 'Lodhi Road', description: 'India\'s first all-suite luxury hotel with private plunge pools in every room.', stars: 5 },
    { name: 'Shangri-La Eros New Delhi', city: 'Delhi', address: 'Connaught Place', description: 'A sophisticated retreat with panoramic views of the city skyline and Lutyens\' Delhi.', stars: 5 },
    { name: 'Le Meridien New Delhi', city: 'Delhi', address: 'Windsor Place', description: 'An iconic cylindrical tower in the heart of diplomatic Delhi.', stars: 5 },
    { name: 'JW Marriott New Delhi Aerocity', city: 'Delhi', address: 'Aerocity', description: 'A luxurious modern hotel near the airport with stunning infinity pool and spa.', stars: 5 },
    { name: 'Hyatt Regency Delhi', city: 'Delhi', address: 'Ring Road, Bhikaji Cama', description: 'A landmark hotel with timeless elegance and the famous La Piazza restaurant.', stars: 5 },
    { name: 'Pullman New Delhi Aerocity', city: 'Delhi', address: 'Aerocity', description: 'A contemporary French hospitality hotel with vibrant dining and chic design.', stars: 5 },
    { name: 'Andaz Delhi', city: 'Delhi', address: 'Aerocity', description: 'A design-forward hotel blending Delhi\'s rich culture with modern luxury.', stars: 5 },
    { name: 'The Claridges New Delhi', city: 'Delhi', address: 'Aurangzeb Road', description: 'A heritage property from 1952 with colonial charm and lush lawns.', stars: 5 },
    { name: 'Radisson Blu Plaza Delhi', city: 'Delhi', address: 'Mahipalpur', description: 'A modern luxury hotel near the airport with excellent business amenities.', stars: 5 },
    { name: 'The Suryaa New Delhi', city: 'Delhi', address: 'New Friends Colony', description: 'An eco-friendly luxury hotel in South Delhi with a beautiful rooftop pool.', stars: 5 },

    // ═══════════════ GOA (10) ═══════════════
    { name: 'Taj Exotica Resort & Spa Goa', city: 'Goa', address: 'Benaulim, South Goa', description: 'A Mediterranean-style resort set on 56 acres along the pristine Benaulim Beach.', stars: 5 },
    { name: 'The Leela Goa', city: 'Goa', address: 'Cavelossim Beach', description: 'A serene beachfront resort with lagoons, a golf course, and Balinese-style villas.', stars: 5 },
    { name: 'W Goa', city: 'Goa', address: 'Vagator Beach', description: 'A vibrant party-chic resort perched on a cliff overlooking the Chapora River.', stars: 5 },
    { name: 'Grand Hyatt Goa', city: 'Goa', address: 'Bambolim Bay', description: 'A vast Indo-Portuguese estate with a 350-meter private beach and water sports.', stars: 5 },
    { name: 'ITC Grand Goa Resort', city: 'Goa', address: 'Arossim Beach', description: 'A luxury resort inspired by 16th-century Portuguese architecture along Arossim Beach.', stars: 5 },
    { name: 'Alila Diwa Goa', city: 'Goa', address: 'Majorda, South Goa', description: 'A contemporary luxury resort amid lush paddy fields near Majorda Beach.', stars: 5 },
    { name: 'Park Hyatt Goa Resort', city: 'Goa', address: 'Cansaulim, South Goa', description: 'An Indo-Portuguese style resort with a stunning 100-meter lagoon pool.', stars: 5 },
    { name: 'Novotel Goa Shrem Resort', city: 'Goa', address: 'Candolim Beach', description: 'A family-friendly resort a short walk from the vibrant Candolim Beach.', stars: 4 },
    { name: 'Cidade de Goa', city: 'Goa', address: 'Vainguinim Beach', description: 'An iconic Charles Correa-designed resort cascading down a hillside to a private beach.', stars: 5 },
    { name: 'Marriott Resort & Spa Goa', city: 'Goa', address: 'Miramar Beach, Panaji', description: 'A beachfront resort in the capital city with a stunning infinity pool.', stars: 5 },

    // ═══════════════ BANGALORE (8) ═══════════════
    { name: 'The Leela Palace Bengaluru', city: 'Bangalore', address: 'Old Airport Road', description: 'A royal Victorian hotel with Vijayanagara-inspired architecture and a stunning rooftop bar.', stars: 5 },
    { name: 'ITC Gardenia Bengaluru', city: 'Bangalore', address: 'Residency Road', description: 'A LEED Platinum-certified luxury hotel with a vertical garden facade.', stars: 5 },
    { name: 'Taj West End Bengaluru', city: 'Bangalore', address: 'Race Course Road', description: 'A heritage property from 1887 set amid 20 acres of tropical gardens.', stars: 5 },
    { name: 'The Oberoi Bengaluru', city: 'Bangalore', address: 'MG Road', description: 'A sleek luxury hotel in the heart of the city\'s business and entertainment district.', stars: 5 },
    { name: 'Shangri-La Bengaluru', city: 'Bangalore', address: 'Palace Road', description: 'Asian hospitality at its finest with stunning views of the Bangalore Palace grounds.', stars: 5 },
    { name: 'JW Marriott Bengaluru', city: 'Bangalore', address: 'Lavelle Road', description: 'A stylish urban retreat in the prestigious Lavelle Road neighbourhood.', stars: 5 },
    { name: 'Conrad Bengaluru', city: 'Bangalore', address: 'Kensington Road', description: 'A contemporary luxury hotel offering a seamless blend of style and substance.', stars: 5 },
    { name: 'Ritz-Carlton Bengaluru', city: 'Bangalore', address: 'Residency Road', description: 'European elegance combined with warm Indian hospitality in the Garden City.', stars: 5 },

    // ═══════════════ JAIPUR (8) ═══════════════
    { name: 'Rambagh Palace Jaipur', city: 'Jaipur', address: 'Bhawani Singh Road', description: 'A former royal residence transformed into a jewel of Rajputana hospitality.', stars: 5 },
    { name: 'The Oberoi Rajvilas Jaipur', city: 'Jaipur', address: 'Goner Road', description: 'A resort set amid 32 acres of gardens with a restored 280-year-old Shiva temple.', stars: 5 },
    { name: 'Taj Jai Mahal Palace', city: 'Jaipur', address: 'Jacob Road, Civil Lines', description: 'An 18-acre heritage palace hotel from 1745 with Mughal and Rajput architecture.', stars: 5 },
    { name: 'ITC Rajputana Jaipur', city: 'Jaipur', address: 'Palace Road', description: 'A Rajput haveli-inspired hotel with traditional Jaipuri hospitality and decor.', stars: 5 },
    { name: 'Fairmont Jaipur', city: 'Jaipur', address: 'Kukas', description: 'A palatial Mughal-inspired resort with expansive grounds and royal ambiance.', stars: 5 },
    { name: 'The Lalit Jaipur', city: 'Jaipur', address: 'Jagatpura Road', description: 'A grand hotel with Rajasthani architecture and a sprawling pool complex.', stars: 5 },
    { name: 'Samode Haveli Jaipur', city: 'Jaipur', address: 'Gangapole', description: 'A restored 175-year-old haveli within the old walled city, rich in Rajput heritage.', stars: 4 },
    { name: 'Hilton Jaipur', city: 'Jaipur', address: 'Amer Road', description: 'A modern luxury hotel with views of the Nahargarh Fort and Aravalli Hills.', stars: 5 },

    // ═══════════════ CHENNAI (7) ═══════════════
    { name: 'ITC Grand Chola Chennai', city: 'Chennai', address: 'Guindy', description: 'A monumental hotel inspired by the great Chola dynasty with 600 rooms and 10 restaurants.', stars: 5 },
    { name: 'The Leela Palace Chennai', city: 'Chennai', address: 'Adyar Seaface', description: 'An art-filled beachfront palace overlooking the Bay of Bengal.', stars: 5 },
    { name: 'Taj Coromandel Chennai', city: 'Chennai', address: 'Nungambakkam', description: 'A landmark luxury hotel in the heart of Chennai\'s cultural and business hub.', stars: 5 },
    { name: 'Park Hyatt Chennai', city: 'Chennai', address: 'Velachery Road, Guindy', description: 'A luxury hotel with residential-style living spaces and exquisite dining options.', stars: 5 },
    { name: 'The Raintree Hotel Chennai', city: 'Chennai', address: 'St. Mary\'s Road', description: 'An ecologically sensitive luxury hotel in the heart of the city.', stars: 4 },
    { name: 'Hyatt Regency Chennai', city: 'Chennai', address: 'Teynampet', description: 'A contemporary luxury hotel with a rooftop bar and stunning city views.', stars: 5 },
    { name: 'Crowne Plaza Chennai Adyar Park', city: 'Chennai', address: 'TTK Road, Alwarpet', description: 'A business-class hotel offering comfort and convenience in South Chennai.', stars: 4 },

    // ═══════════════ KOLKATA (7) ═══════════════
    { name: 'The Oberoi Grand Kolkata', city: 'Kolkata', address: 'Chowringhee', description: 'A Victorian-era grand dame with a sparkling white facade, a true Kolkata icon.', stars: 5 },
    { name: 'ITC Royal Bengal Kolkata', city: 'Kolkata', address: 'New Town', description: 'A modern luxury hotel inspired by Bengal\'s royal heritage with cutting-edge facilities.', stars: 5 },
    { name: 'Taj Bengal Kolkata', city: 'Kolkata', address: 'Alipore', description: 'A luxury hotel set in lush gardens in the upscale Alipore neighbourhood.', stars: 5 },
    { name: 'JW Marriott Kolkata', city: 'Kolkata', address: 'EM Bypass', description: 'A gleaming glass tower offering modern luxury on the Eastern Metropolitan Bypass.', stars: 5 },
    { name: 'The Park Kolkata', city: 'Kolkata', address: 'Park Street', description: 'A boutique design hotel on the legendary Park Street with a stylish rooftop bar.', stars: 5 },
    { name: 'Hyatt Regency Kolkata', city: 'Kolkata', address: 'Salt Lake City', description: 'A luxury hotel in the IT hub of Kolkata with excellent business amenities.', stars: 5 },
    { name: 'Swissotel Kolkata', city: 'Kolkata', address: 'Rajarhat New Town', description: 'Swiss precision meets Bengali warmth in this contemporary glass tower hotel.', stars: 5 },

    // ═══════════════ HYDERABAD (7) ═══════════════
    { name: 'Taj Falaknuma Palace', city: 'Hyderabad', address: 'Falaknuma', description: 'A Nizam\'s 19th-century Italian marble palace perched above Hyderabad with unmatched opulence.', stars: 5 },
    { name: 'ITC Kohenur Hyderabad', city: 'Hyderabad', address: 'Madhapur, HITEC City', description: 'A stunning LEED Platinum building shaped like a diamond in the tech hub.', stars: 5 },
    { name: 'Park Hyatt Hyderabad', city: 'Hyderabad', address: 'Banjara Hills', description: 'A modern masterpiece with museum-quality art and a signature sake bar.', stars: 5 },
    { name: 'Novotel Hyderabad Convention Centre', city: 'Hyderabad', address: 'HITEC City', description: 'An expansive hotel with the largest convention centre in South India.', stars: 4 },
    { name: 'Taj Krishna Hyderabad', city: 'Hyderabad', address: 'Banjara Hills', description: 'A heritage luxury hotel in the tony Banjara Hills with beautiful gardens.', stars: 5 },
    { name: 'The Westin Hyderabad Mindspace', city: 'Hyderabad', address: 'HITEC City', description: 'A haven of wellness in the bustling tech corridor of Hyderabad.', stars: 5 },
    { name: 'Marriott Executive Apartments Hyderabad', city: 'Hyderabad', address: 'Lakdi-ka-pul', description: 'Premium serviced apartments in the heart of Hyderabad\'s commercial district.', stars: 4 },

    // ═══════════════ PUNE (5) ═══════════════
    { name: 'Conrad Pune', city: 'Pune', address: 'Mangaldas Road, Koregaon Park', description: 'A smart luxury hotel in the vibrant Koregaon Park neighbourhood.', stars: 5 },
    { name: 'JW Marriott Pune', city: 'Pune', address: 'Senapati Bapat Road', description: 'An upscale hotel with an award-winning spa and craft cocktail bar.', stars: 5 },
    { name: 'The Ritz-Carlton Pune', city: 'Pune', address: 'Golf Course Square', description: 'Refined luxury overlooking the Pune Golf Course with impeccable service.', stars: 5 },
    { name: 'Taj Blue Diamond', city: 'Pune', address: 'Koregaon Park', description: 'A luxury oasis in the heart of Pune\'s trendiest neighbourhood.', stars: 5 },
    { name: 'The Westin Pune', city: 'Pune', address: 'Koregaon Park Annexe', description: 'A rejuvenating hotel focused on wellness with a Heavenly Spa.', stars: 5 },

    // ═══════════════ UDAIPUR (5) ═══════════════
    { name: 'Taj Lake Palace Udaipur', city: 'Udaipur', address: 'Pichola Lake', description: 'A floating white marble palace in the middle of Lake Pichola, a dream destination.', stars: 5 },
    { name: 'The Oberoi Udaivilas', city: 'Udaipur', address: 'Haridasji Ki Magri', description: 'A palatial resort on the banks of Lake Pichola with private pools and courtyards.', stars: 5 },
    { name: 'The Leela Palace Udaipur', city: 'Udaipur', address: 'Lake Pichola', description: 'A grand palace hotel with stunning lake and Aravalli mountain views.', stars: 5 },
    { name: 'Fateh Prakash Palace', city: 'Udaipur', address: 'City Palace Complex', description: 'A heritage hotel within the City Palace complex with original royal furnishings.', stars: 5 },
    { name: 'Trident Udaipur', city: 'Udaipur', address: 'Haridasji Ki Magri', description: 'A beautiful lakeside resort with Mewari architecture and tranquil gardens.', stars: 5 },

    // ═══════════════ KOCHI (4) ═══════════════
    { name: 'Taj Malabar Resort & Spa', city: 'Kochi', address: 'Willingdon Island', description: 'A heritage waterfront resort overlooking Kochi harbour with colonial charm.', stars: 5 },
    { name: 'Grand Hyatt Kochi Bolgatty', city: 'Kochi', address: 'Bolgatty Island', description: 'A luxury island resort with marina, lagoon pool, and spectacular backwater views.', stars: 5 },
    { name: 'The Brunton Boatyard', city: 'Kochi', address: 'Fort Kochi', description: 'A heritage boutique hotel built on the site of a Victorian-era boat yard.', stars: 5 },
    { name: 'Le Meridien Kochi', city: 'Kochi', address: 'Maradu', description: 'A waterfront luxury hotel with panoramic views of the backwaters.', stars: 5 },

    // ═══════════════ SHIMLA (4) ═══════════════
    { name: 'Wildflower Hall Shimla', city: 'Shimla', address: 'Chharabra', description: 'An Oberoi resort at 8,250 feet with cedar forests and Himalayan panoramas.', stars: 5 },
    { name: 'The Oberoi Cecil Shimla', city: 'Shimla', address: 'The Mall', description: 'A heritage hotel from 1884 on the famous Mall Road with valley views.', stars: 5 },
    { name: 'Radisson Hotel Shimla', city: 'Shimla', address: 'Kufri Road', description: 'A modern hillside retreat with stunning views of the valley and mountains.', stars: 4 },
    { name: 'Taj Theog Resort & Spa', city: 'Shimla', address: 'Theog, Near Shimla', description: 'A mountainside retreat surrounded by apple orchards and pine forests.', stars: 5 },

    // ═══════════════ MUSSOORIE (3) ═══════════════
    { name: 'JW Marriott Mussoorie Walnut Grove', city: 'Mussoorie', address: 'Village Sher-Ka-Danda', description: 'A luxury hill resort with walnut groves and stunning Doon Valley views.', stars: 5 },
    { name: 'The Savoy Mussoorie', city: 'Mussoorie', address: 'Library Road', description: 'An ITC heritage hotel from 1902 perched on a hilltop with Gothic architecture.', stars: 5 },
    { name: 'Jaypee Residency Manor Mussoorie', city: 'Mussoorie', address: 'The Mall', description: 'A grand manor on Mall Road offering panoramic Himalayan views.', stars: 4 },

    // ═══════════════ AGRA (4) ═══════════════
    { name: 'The Oberoi Amarvilas Agra', city: 'Agra', address: 'Taj East Gate Road', description: 'Every room offers uninterrupted views of the Taj Mahal, just 600m away.', stars: 5 },
    { name: 'ITC Mughal Agra', city: 'Agra', address: 'Fatehabad Road', description: 'A Mughal garden-inspired luxury hotel with award-winning Kaya Kalp Spa.', stars: 5 },
    { name: 'Taj Hotel & Convention Centre Agra', city: 'Agra', address: 'Fatehabad Road', description: 'A modern hotel with rooftop dining offering spectacular Taj Mahal views.', stars: 5 },
    { name: 'Radisson Hotel Agra', city: 'Agra', address: 'Fatehabad Road', description: 'A contemporary hotel close to the Taj Mahal with tasteful Mughal-inspired decor.', stars: 4 },

    // ═══════════════ VARANASI (4) ═══════════════
    { name: 'Taj Nadesar Palace Varanasi', city: 'Varanasi', address: 'Nadesar Palace Grounds', description: 'A private palace from 1835 set amidst mango and jasmine gardens.', stars: 5 },
    { name: 'BrijRama Palace Varanasi', city: 'Varanasi', address: 'Darbhanga Ghat', description: 'A restored 200-year-old palace on the ghats of the sacred Ganges.', stars: 5 },
    { name: 'Radisson Hotel Varanasi', city: 'Varanasi', address: 'The Mall, Cantt', description: 'A modern luxury hotel blending contemporary comfort with Varanasi\'s spiritual energy.', stars: 5 },
    { name: 'Ramada Plaza by Wyndham Varanasi', city: 'Varanasi', address: 'The Mall Road', description: 'A vibrant upscale hotel near the ghats, perfect for spiritual and leisure travellers.', stars: 4 },
];

const seedHotels = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for Hotel seeding...');

        await Hotel.deleteMany({});
        console.log('Cleared existing hotels.');

        const hotelsToInsert = hotels.map((h, i) => ({
            ...h,
            imagePath: getImg(i),
            photos: [getImg(i), getImg(i + 3), getImg(i + 7)]
        }));

        await Hotel.insertMany(hotelsToInsert);
        console.log(`✅ Successfully seeded ${hotelsToInsert.length} hotels across ${new Set(hotels.map(h => h.city)).size} cities!`);

        process.exit();
    } catch (err) {
        console.error('❌ Hotel seeding error:', err);
        process.exit(1);
    }
};

seedHotels();
