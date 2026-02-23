const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

// @route   POST api/chat/message
// @desc    Handle chatbot message
// @access  Public
router.post('/message', async (req, res) => {
    const { message } = req.body;
    const msg = message.toLowerCase().trim();
    let response = '';

    try {
        // ─── Greetings ───
        if (msg.match(/^(hi|hello|hey|good morning|good evening|good afternoon|namaste|hii|hiii)/)) {
            response = "Hello! 👋 Welcome to The Royal Hotels. I'm your personal concierge. How can I assist you today?\n\nYou can ask me about:\n• Room types & prices — try 'room types' or 'room prices'\n• Hotel locations & city info — try 'hotels in Mumbai' or 'how many hotels'\n• Best hotels — try 'best hotel in Delhi'\n• Booking info — try 'how to book'\n• Services & amenities — try 'services'\n• Check-in/out times — try 'check-in time'\n• Contact details — try 'contact'\n• Offers & deals — try 'offers'";
        }
        // ─── Best Hotels in a City ───
        else if (msg.match(/best.*(hotel|property|stay)/) || msg.match(/(top|recommend|popular|famous).*(hotel|property|stay)/)) {
            const hotels = await Hotel.find();
            if (hotels.length > 0) {
                // Check if a specific city is mentioned
                const cities = [...new Set(hotels.map(h => h.city))];
                const mentionedCity = cities.find(c => msg.includes(c.toLowerCase()));

                if (mentionedCity) {
                    const cityHotels = hotels.filter(h => h.city === mentionedCity && h.stars === 5).slice(0, 5);
                    response = `🏆 Best Hotels in ${mentionedCity}:\n\n` +
                        cityHotels.map((h, i) => `${i + 1}. ${h.name} ⭐⭐⭐⭐⭐\n   📍 ${h.address}\n   ${h.description}`).join('\n\n') +
                        `\n\nAll these are 5-star luxury properties! Visit our Hotels page for more details.`;
                } else {
                    // Top 5 across all cities
                    const topHotels = hotels.filter(h => h.stars === 5).slice(0, 8);
                    response = `🏆 Top Luxury Hotels across India:\n\n` +
                        topHotels.map((h, i) => `${i + 1}. ${h.name} — ${h.city} ⭐⭐⭐⭐⭐\n   ${h.description.substring(0, 80)}...`).join('\n\n') +
                        `\n\nWe have ${hotels.filter(h => h.stars === 5).length}+ five-star properties! Ask me about a specific city like 'best hotel in Jaipur'.`;
                }
            } else {
                response = "Our best properties include The Taj Mahal Palace Mumbai, The Imperial New Delhi, Rambagh Palace Jaipur, and Taj Lake Palace Udaipur!";
            }
        }
        // ─── Hotels in a Specific City ───
        else if (msg.match(/hotel.*(in|at)\s+\w+/) || msg.match(/(in|at)\s+\w+.*hotel/) || msg.match(/^(mumbai|delhi|goa|bangalore|jaipur|chennai|kolkata|hyderabad|pune|udaipur|kochi|shimla|mussoorie|agra|varanasi)/)) {
            const hotels = await Hotel.find();
            if (hotels.length > 0) {
                const cities = [...new Set(hotels.map(h => h.city))];
                const mentionedCity = cities.find(c => msg.includes(c.toLowerCase()));

                if (mentionedCity) {
                    const cityHotels = hotels.filter(h => h.city === mentionedCity);
                    response = `🏨 Hotels in ${mentionedCity} (${cityHotels.length} properties):\n\n` +
                        cityHotels.slice(0, 8).map((h, i) => `${i + 1}. ${h.name} ${'⭐'.repeat(h.stars)}\n   📍 ${h.address}`).join('\n\n') +
                        (cityHotels.length > 8 ? `\n\n...and ${cityHotels.length - 8} more! Visit our Hotels page to see all.` : '') +
                        `\n\nAsk 'best hotel in ${mentionedCity}' for top recommendations!`;
                } else {
                    response = `We have hotels in: ${cities.join(', ')}. Ask me about a specific city like 'hotels in Mumbai'!`;
                }
            } else {
                response = "We have luxury hotels in Mumbai, Delhi, Goa, Bangalore, Jaipur, and many more cities!";
            }
        }
        // ─── How Many Hotels / City Count ───
        else if (msg.includes('how many') || msg.includes('kitni') || msg.includes('count') || msg.includes('total')) {
            const hotels = await Hotel.find();
            const rooms = await Room.find();
            if (hotels.length > 0) {
                const cities = [...new Set(hotels.map(h => h.city))];
                response = `📊 The Royal Hotels Network:\n\n` +
                    `🏨 Total Hotels: ${hotels.length}\n` +
                    `🏙️ Cities: ${cities.length}\n` +
                    `🛏️ Total Rooms: ${rooms.length}\n\n` +
                    `City-wise breakdown:\n` +
                    cities.map(c => {
                        const count = hotels.filter(h => h.city === c).length;
                        return `• ${c}: ${count} hotel${count > 1 ? 's' : ''}`;
                    }).join('\n') +
                    `\n\nAsk 'hotels in Mumbai' for specific city details!`;
            } else {
                response = "We have 100+ luxury properties across 15 Indian cities!";
            }
        }
        // ─── Room Prices ───
        else if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('rate') || msg.includes('tariff') || msg.includes('charge') || msg.includes('kitna')) {
            const rooms = await Room.find();
            if (rooms.length > 0) {
                // Get unique room types with min/max prices
                const typeMap = {};
                rooms.forEach(r => {
                    if (!typeMap[r.type]) typeMap[r.type] = { min: r.price, max: r.price };
                    if (r.price < typeMap[r.type].min) typeMap[r.type].min = r.price;
                    if (r.price > typeMap[r.type].max) typeMap[r.type].max = r.price;
                });

                response = "💰 Room Prices (per night):\n\n" +
                    Object.entries(typeMap)
                        .sort((a, b) => a[1].min - b[1].min)
                        .map(([type, prices]) => {
                            if (prices.min === prices.max) {
                                return `• ${type}: ₹${prices.min.toLocaleString()}`;
                            }
                            return `• ${type}: ₹${prices.min.toLocaleString()} – ₹${prices.max.toLocaleString()}`;
                        }).join('\n') +
                    `\n\n📝 Prices vary by city and season. Visit our Rooms page for exact availability!`;
            } else {
                response = "Our room rates start from ₹4,999 per night for Standard rooms up to ₹74,999+ for Penthouse Suites. Contact us for current availability!";
            }
        }
        // ─── Room Types ───
        else if (msg.includes('room') || msg.includes('suite') || msg.includes('accommodation') || msg.includes('kamra') || msg.includes('villa') || msg.includes('penthouse')) {
            const rooms = await Room.find();
            if (rooms.length > 0) {
                const typeMap = {};
                rooms.forEach(r => {
                    if (!typeMap[r.type]) typeMap[r.type] = { count: 0, minPrice: r.price, desc: r.description };
                    typeMap[r.type].count++;
                    if (r.price < typeMap[r.type].minPrice) typeMap[r.type].minPrice = r.price;
                });

                response = `🛏️ We offer ${Object.keys(typeMap).length} room types:\n\n` +
                    Object.entries(typeMap)
                        .sort((a, b) => a[1].minPrice - b[1].minPrice)
                        .map(([type, info]) => `• ${type} (from ₹${info.minPrice.toLocaleString()}/night)\n  ${info.desc.substring(0, 70)}...`).join('\n\n') +
                    `\n\nTotal: ${rooms.length} rooms across all hotels. Ask 'room prices' for detailed pricing!`;
            } else {
                response = "We offer 12 room types: Standard, Deluxe, Superior, Junior Suite, Executive Suite, Family Suite, Ocean View, Garden View, Honeymoon Suite, Presidential Suite, Villa, and Penthouse!";
            }
        }
        // ─── Location / Hotels Overview ───
        else if (msg.includes('location') || msg.includes('where') || msg.includes('address') || msg.includes('city') || msg.includes('branch') || msg.includes('kahan') || msg.includes('jagah')) {
            const hotels = await Hotel.find();
            if (hotels.length > 0) {
                const cities = [...new Set(hotels.map(h => h.city))];
                response = `📍 The Royal Hotels is present in ${cities.length} cities across India:\n\n` +
                    cities.map(c => {
                        const count = hotels.filter(h => h.city === c).length;
                        return `• ${c} — ${count} hotel${count > 1 ? 's' : ''}`;
                    }).join('\n') +
                    `\n\nTotal: ${hotels.length} luxury properties!\n\n💡 Ask 'hotels in Mumbai' or 'best hotel in Jaipur' for specific info!`;
            } else {
                response = "The Royal Hotels has luxury properties in Mumbai, Delhi, Goa, Bangalore, Jaipur, and many more cities!";
            }
        }
        // ─── Booking ───
        else if (msg.includes('book') || msg.includes('reserve') || msg.includes('reservation')) {
            response = "📋 How to Book a Room:\n\n1️⃣ Go to the Hotels page and pick a hotel\n2️⃣ Click 'View Rooms' to see available rooms\n3️⃣ Choose your room type and click 'Book Now'\n4️⃣ Fill in your details, dates, and guest info\n5️⃣ Confirm your reservation!\n\n📞 You can also call +91 1800-ROYAL-00 for instant reservations.\n💡 Ask about 'offers' for discounts!";
        }
        // ─── Check-in / Check-out ───
        else if (msg.includes('check-in') || msg.includes('checkin') || msg.includes('check in') || msg.includes('check-out') || msg.includes('checkout') || msg.includes('check out')) {
            response = "🕐 Check-in / Check-out Timings:\n\n• Check-in: 2:00 PM onwards\n• Check-out: 12:00 PM (Noon)\n• Early check-in: Available from 10 AM (₹2,000 extra)\n• Late checkout: Available till 4 PM (₹2,000 extra)\n• Express check-in for loyalty members\n• 24/7 front desk assistance";
        }
        // ─── Services & Amenities ───
        else if (msg.includes('service') || msg.includes('amenity') || msg.includes('amenities') || msg.includes('facility') || msg.includes('facilities') || msg.includes('suvidha')) {
            const rooms = await Room.find();
            // Collect all unique amenities
            const allAmenities = new Set();
            rooms.forEach(r => r.amenities.forEach(a => allAmenities.add(a)));

            response = "✨ Our World-Class Services:\n\n" +
                "🧖 Luxury Spa & Wellness Centre\n" +
                "🍽️ Multi-Cuisine Fine Dining (3 Restaurants)\n" +
                "🏊 Temperature-Controlled Infinity Pool\n" +
                "💪 24/7 State-of-the-Art Fitness Centre\n" +
                "🅿️ Complimentary Valet Parking\n" +
                "📶 High-Speed WiFi (500 Mbps)\n" +
                "🛎️ 24/7 Concierge & Butler Service\n" +
                "👔 Same-Day Laundry & Dry Cleaning\n" +
                "🚗 Airport Transfer (Mercedes fleet)\n" +
                "🎪 Banquet Hall & Conference Rooms\n" +
                "🎭 Cultural Events & Live Music\n" +
                "🧒 Kids Club & Babysitting\n\n" +
                `Room amenities include: ${[...allAmenities].slice(0, 10).join(', ')}\n\n` +
                "Ask about 'spa', 'dining', 'pool', or 'parking' for more details!";
        }
        // ─── Spa ───
        else if (msg.includes('spa') || msg.includes('massage') || msg.includes('wellness') || msg.includes('relax')) {
            response = "🧖 Royal Spa & Wellness:\n\n• Swedish & Deep Tissue Massage — ₹3,500\n• Ayurvedic Panchakarma — ₹5,000\n• Thai Aromatherapy — ₹4,000\n• Facial & Skin Treatments — ₹2,500\n• Couples Spa Package — ₹8,000\n• Full Day Wellness Package — ₹12,000\n• Yoga & Meditation (Group) — ₹500\n• Private Yoga Session — ₹2,000\n\n🕐 Open: 8:00 AM – 10:00 PM\n📞 Pre-booking recommended!";
        }
        // ─── Dining ───
        else if (msg.includes('restaurant') || msg.includes('dining') || msg.includes('food') || msg.includes('eat') || msg.includes('breakfast') || msg.includes('lunch') || msg.includes('dinner') || msg.includes('menu') || msg.includes('khana')) {
            response = "🍽️ Dining at The Royal Hotels:\n\n• The Royal Kitchen — Multi-cuisine buffet\n  Breakfast ₹999 | Lunch ₹1,499 | Dinner ₹1,999\n\n• Saffron — Authentic Indian Fine Dining\n  Avg. meal: ₹2,500 per person\n\n• Zen Garden — Pan-Asian Delicacies\n  Avg. meal: ₹2,000 per person\n\n• The Terrace Bar — Craft Cocktails & Live Music\n  Drinks from ₹500\n\n• In-Room Dining — 24/7 Service\n  Full menu available\n\n🕐 Timings:\nBreakfast: 7 AM – 10:30 AM\nLunch: 12:30 PM – 3 PM\nDinner: 7 PM – 11 PM\nBar: 5 PM – 1 AM";
        }
        // ─── Contact ───
        else if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('call') || msg.includes('reach') || msg.includes('number')) {
            response = "📞 Contact Us:\n\n• Toll Free: 1800-ROYAL-00 (1800-769-2500)\n• Reservations: +91 22 6666 1234\n• Email: info@theroyalhotels.com\n• Reservations: bookings@theroyalhotels.com\n• WhatsApp: +91 98765 43210\n• Website: www.theroyalhotels.com\n\n🕐 Reservations: 24/7\n📧 Email response: Within 2 hours";
        }
        // ─── Offers ───
        else if (msg.includes('offer') || msg.includes('discount') || msg.includes('deal') || msg.includes('promo') || msg.includes('coupon') || msg.includes('chhut')) {
            response = "🎉 Current Special Offers:\n\n• 🌟 Early Bird — Save 20% (book 30 days ahead)\n• 🌴 Weekend Getaway — 2 nights for price of 1.5\n• 💍 Honeymoon Package — Free spa + candlelight dinner\n• 💼 Corporate Rates — Up to 35% off\n• 👨‍👩‍👧‍👦 Family Package — Kids under 12 stay free\n• 🎂 Birthday Special — Free cake + room upgrade\n• 🔄 Loyalty Program — Earn points on every stay\n\n📅 Seasonal offers updated monthly! Visit our Offers page.";
        }
        // ─── WiFi ───
        else if (msg.includes('wifi') || msg.includes('internet') || msg.includes('wi-fi')) {
            response = "📶 WiFi Information:\n\n• Complimentary 500 Mbps WiFi for all guests\n• Available: Rooms, lobby, restaurants, pool area\n• Network Name: 'RoyalHotel-Guest'\n• No password needed — auto-connects with room number\n• Premium 1 Gbps available at ₹500/day";
        }
        // ─── Parking ───
        else if (msg.includes('parking') || msg.includes('car') || msg.includes('valet')) {
            response = "🅿️ Parking Options:\n\n• Complimentary valet parking for in-house guests\n• Self-parking: ₹200/day\n• EV charging stations: 4 Tesla Superchargers\n• Covered multi-level garage (200+ spots)\n• 24/7 CCTV surveillance\n• Car wash service available (₹500)";
        }
        // ─── Pool ───
        else if (msg.includes('pool') || msg.includes('swim')) {
            response = "🏊 Pool & Beach:\n\n• Temperature-controlled infinity pool (25m)\n• Poolside cabanas with butler service\n• Kids' splash pool with slides\n• Pool bar — cocktails & snacks\n• Towels & sunscreen provided free\n\n🕐 Pool Hours: 6:00 AM – 9:00 PM\n🏖️ Beach access available at coastal properties";
        }
        // ─── Cancel / Refund ───
        else if (msg.includes('cancel') || msg.includes('refund') || msg.includes('cancellation')) {
            response = "📋 Cancellation Policy:\n\n• Free cancellation: 48+ hours before check-in\n• 50% charge: 24-48 hours before check-in\n• Full charge: Same-day / no-show\n• Refund timeline: 5-7 business days\n• Package deals: Non-refundable (but reschedulable)\n\n📞 Call 1800-ROYAL-00 for special cases.";
        }
        // ─── Thank You ───
        else if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx') || msg.includes('dhanyawad') || msg.includes('shukriya')) {
            response = "You're most welcome! 😊 It was my pleasure to assist you. If you need anything else, feel free to ask anytime. We hope to see you at The Royal Hotels soon! 🌟";
        }
        // ─── Bye ───
        else if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('exit') || msg.includes('alvida')) {
            response = "Goodbye! 👋 Thank you for chatting with The Royal Hotels. We look forward to hosting you and making your stay unforgettable. Have a wonderful day! ✨";
        }
        // ─── Help / Fallback ───
        else {
            response = "I'd be happy to help! Here's what I can answer:\n\n" +
                "🏨 Room types — 'room types' or 'what rooms do you have'\n" +
                "💰 Room prices — 'room prices' or 'how much'\n" +
                "📍 Hotel list by city — 'hotels in Mumbai'\n" +
                "🏆 Best hotels — 'best hotel in Delhi'\n" +
                "📊 Hotel count — 'how many hotels'\n" +
                "📋 Booking — 'how to book'\n" +
                "✨ Services — 'services' or 'amenities'\n" +
                "🧖 Spa — 'spa' or 'massage'\n" +
                "🍽️ Dining — 'restaurants' or 'food'\n" +
                "🕐 Check-in/out — 'check-in time'\n" +
                "📞 Contact — 'contact us'\n" +
                "🎉 Offers — 'offers' or 'deals'\n\n" +
                "Just type your question! 😊";
        }

        res.json({ response });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ response: "I'm having some trouble right now. Please try again in a moment! 🙏" });
    }
});

module.exports = router;
