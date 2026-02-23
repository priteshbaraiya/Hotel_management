const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');
const Hotel = require('./models/Hotel');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/TheRoyalObsidian';

// Room images from Unsplash
const roomImages = [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=800',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800',
    'https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=800',
    'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=800',
    'https://images.unsplash.com/photo-1559599238-308793637427?q=80&w=800',
];

const getImg = (i) => roomImages[i % roomImages.length];

// 12 Room Types with details
const roomTypes = [
    {
        type: 'Standard Room',
        title: 'Standard Twin Room',
        description: 'A comfortable and well-appointed room with twin beds, a work desk, flat-screen TV, and an en-suite bathroom with complimentary toiletries. Perfect for solo travellers or short stays.',
        price: 4999,
        amenities: ['WiFi', 'TV', 'AC', 'Work Desk', 'Tea/Coffee Maker', 'Iron', 'Safe'],
        guests: 2,
        size: 280
    },
    {
        type: 'Deluxe Room',
        title: 'Deluxe King Room',
        description: 'Spacious room with a plush king-sized bed, panoramic city views, a modern marble bathroom with rain shower, and a cozy seating area. Ideal for couples seeking comfort.',
        price: 8499,
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Rain Shower', 'Bathrobes', 'Room Service', 'Safe'],
        guests: 2,
        size: 420
    },
    {
        type: 'Superior Room',
        title: 'Superior Double Room',
        description: 'An upgraded double room featuring a queen bed, enhanced décor, a writing desk, and a marble bathroom with both bathtub and shower. Includes complimentary breakfast.',
        price: 6999,
        amenities: ['WiFi', 'TV', 'AC', 'Breakfast', 'Bathtub', 'Work Desk', 'Mini Bar', 'Safe'],
        guests: 2,
        size: 350
    },
    {
        type: 'Executive Suite',
        title: 'Executive Business Suite',
        description: 'A sophisticated suite with a separate living room, executive lounge access, ergonomic workspace, and premium amenities. Designed for the discerning business traveller.',
        price: 14999,
        amenities: ['WiFi', 'TV', 'AC', 'Lounge Access', 'Mini Bar', 'Separate Living Room', 'Workspace', 'Bathrobe', 'Breakfast'],
        guests: 3,
        size: 650
    },
    {
        type: 'Junior Suite',
        title: 'Junior Suite',
        description: 'A stylish suite with an open-plan living area, king bed, modern bathroom with soaking tub, and elegant furnishings. The perfect blend of comfort and luxury.',
        price: 11999,
        amenities: ['WiFi', 'TV', 'AC', 'Soaking Tub', 'Mini Bar', 'Seating Area', 'Room Service', 'Breakfast'],
        guests: 2,
        size: 520
    },
    {
        type: 'Family Suite',
        title: 'Family Connection Suite',
        description: 'Two connected rooms with a shared living area, bunk beds for children, a play corner, and childproofed amenities. Perfect for families with young kids.',
        price: 16999,
        amenities: ['WiFi', 'TV', 'AC', 'Kids Area', 'Connected Rooms', 'Mini Bar', 'Breakfast', 'Babysitting Available'],
        guests: 5,
        size: 800
    },
    {
        type: 'Ocean View Room',
        title: 'Ocean View Balcony Room',
        description: 'Wake up to breathtaking ocean views from your private balcony. Features a king bed, floor-to-ceiling windows, and a luxury bathroom with ocean-view soaking tub.',
        price: 12999,
        amenities: ['WiFi', 'TV', 'AC', 'Private Balcony', 'Ocean View', 'Soaking Tub', 'Mini Bar', 'Breakfast'],
        guests: 2,
        size: 480
    },
    {
        type: 'Garden View Room',
        title: 'Garden Terrace Room',
        description: 'A tranquil retreat overlooking lush tropical gardens with a private terrace, king bed, and natural stone bathroom. An oasis of calm within the hotel.',
        price: 9499,
        amenities: ['WiFi', 'TV', 'AC', 'Private Terrace', 'Garden View', 'Rain Shower', 'Tea/Coffee Maker', 'Breakfast'],
        guests: 2,
        size: 400
    },
    {
        type: 'Honeymoon Suite',
        title: 'Royal Honeymoon Suite',
        description: 'A romantic haven with a four-poster king bed, jacuzzi bath, champagne on arrival, rose petal turndown service, and a private candlelit dining area.',
        price: 24999,
        amenities: ['WiFi', 'TV', 'AC', 'Jacuzzi', 'Champagne', 'Rose Petals', 'Private Dining', 'Spa Credits', 'Butler Service'],
        guests: 2,
        size: 700
    },
    {
        type: 'Presidential Suite',
        title: 'The Royal Presidential Suite',
        description: 'The pinnacle of luxury — a grand suite with separate bedroom, living room, dining room, study, and a master bathroom with marble jacuzzi. Includes 24/7 butler service.',
        price: 49999,
        amenities: ['WiFi', 'TV', 'AC', 'Butler Service', 'Private Dining', 'Jacuzzi', 'Lounge Access', 'Limo Transfer', 'Spa Access', 'Gym Access'],
        guests: 4,
        size: 1200
    },
    {
        type: 'Villa',
        title: 'Pool Villa with Private Garden',
        description: 'A private villa with a plunge pool, landscaped garden, outdoor shower, spacious bedroom, living area, and a dedicated villa host for personalized service.',
        price: 35999,
        amenities: ['WiFi', 'TV', 'AC', 'Private Pool', 'Garden', 'Outdoor Shower', 'Villa Host', 'Mini Bar', 'Breakfast', 'Dinner'],
        guests: 4,
        size: 1000
    },
    {
        type: 'Penthouse',
        title: 'Skyline Penthouse',
        description: 'A breathtaking top-floor penthouse with 360° panoramic views, a wraparound terrace, private bar, home theatre system, and ultra-premium furnishings.',
        price: 74999,
        amenities: ['WiFi', 'TV', 'AC', 'Panoramic Views', 'Private Bar', 'Home Theatre', 'Terrace', 'Butler Service', 'Limo Transfer', 'All Meals'],
        guests: 6,
        size: 2000
    }
];

const seedRooms = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for Room seeding...');

        // Get all hotels to link rooms
        const hotels = await Hotel.find();
        if (hotels.length === 0) {
            console.error('❌ No hotels found! Run seedHotels.js first.');
            process.exit(1);
        }

        await Room.deleteMany({});
        console.log('Cleared existing rooms.');

        const roomsToInsert = [];

        // For each hotel, assign 3-5 random room types
        for (const hotel of hotels) {
            // Shuffle room types and pick 3-5
            const shuffled = [...roomTypes].sort(() => 0.5 - Math.random());
            const count = 3 + Math.floor(Math.random() * 3); // 3 to 5 rooms per hotel
            const selected = shuffled.slice(0, count);

            for (const r of selected) {
                // Add some price variation per city
                const cityMultiplier = {
                    'Mumbai': 1.3, 'Delhi': 1.2, 'Goa': 1.1, 'Bangalore': 1.15,
                    'Jaipur': 1.0, 'Chennai': 1.05, 'Kolkata': 0.95, 'Hyderabad': 1.1,
                    'Pune': 1.05, 'Udaipur': 1.25, 'Kochi': 1.0, 'Shimla': 1.1,
                    'Mussoorie': 1.1, 'Agra': 1.0, 'Varanasi': 0.95
                };
                const multiplier = cityMultiplier[hotel.city] || 1.0;
                const adjustedPrice = Math.round(r.price * multiplier / 100) * 100; // Round to nearest 100

                roomsToInsert.push({
                    title: r.title,
                    type: r.type,
                    description: r.description,
                    price: adjustedPrice,
                    amenities: r.amenities,
                    imagePath: getImg(roomTypes.indexOf(r)),
                    isBooked: Math.random() < 0.15, // 15% booked
                    hotel: hotel._id
                });
            }
        }

        await Room.insertMany(roomsToInsert);
        console.log(`✅ Successfully seeded ${roomsToInsert.length} rooms across ${hotels.length} hotels!`);
        console.log(`Room types: ${roomTypes.length}`);

        // Summary by type
        const typeSummary = {};
        roomsToInsert.forEach(r => {
            typeSummary[r.type] = (typeSummary[r.type] || 0) + 1;
        });
        console.log('\nRoom type distribution:');
        Object.entries(typeSummary).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
            console.log(`  ${type}: ${count}`);
        });

        process.exit();
    } catch (err) {
        console.error('❌ Room seeding error:', err);
        process.exit(1);
    }
};

seedRooms();
