require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Room = require('./models/Room');
const Guest = require('./models/Guest');
const Booking = require('./models/Booking');

// Connect to database
connectDB();

// Clear existing data
const clearData = async () => {
    try {
        await Room.deleteMany({});
        await Guest.deleteMany({});
        await Booking.deleteMany({});
        console.log('🗑️  Existing data cleared');
    } catch (error) {
        console.error('Error clearing data:', error);
    }
};

// Seed rooms
const seedRooms = async () => {
    const rooms = [
        {
            number: '101',
            type: 'single',
            price: 100,
            status: 'available',
            amenities: ['WiFi', 'TV', 'AC'],
            capacity: 1
        },
        {
            number: '102',
            type: 'double',
            price: 150,
            status: 'available',
            amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
            capacity: 2
        },
        {
            number: '103',
            type: 'suite',
            price: 250,
            status: 'available',
            amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi'],
            capacity: 3
        },
        {
            number: '104',
            type: 'deluxe',
            price: 350,
            status: 'occupied',
            amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Sea View'],
            capacity: 4
        },
        {
            number: '105',
            type: 'single',
            price: 100,
            status: 'maintenance',
            amenities: ['WiFi', 'TV', 'AC'],
            capacity: 1
        }
    ];

    try {
        await Room.insertMany(rooms);
        console.log('🏨 Rooms seeded successfully');
        return await Room.find();
    } catch (error) {
        console.error('Error seeding rooms:', error);
    }
};

// Seed guests
const seedGuests = async () => {
    const guests = [
        {
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1234567890',
            address: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                zipCode: '10001'
            },
            idProof: {
                type: 'passport',
                number: 'P12345678'
            }
        },
        {
            name: 'Emma Johnson',
            email: 'emma.j@example.com',
            phone: '+1987654321',
            address: {
                street: '456 Oak Ave',
                city: 'Los Angeles',
                state: 'CA',
                country: 'USA',
                zipCode: '90001'
            },
            idProof: {
                type: 'driver-license',
                number: 'DL98765432'
            }
        },
        {
            name: 'Michael Chen',
            email: 'm.chen@example.com',
            phone: '+1122334455',
            address: {
                street: '789 Pine Rd',
                city: 'Chicago',
                state: 'IL',
                country: 'USA',
                zipCode: '60601'
            },
            idProof: {
                type: 'national-id',
                number: 'NID55667788'
            }
        }
    ];

    try {
        await Guest.insertMany(guests);
        console.log('👥 Guests seeded successfully');
        return await Guest.find();
    } catch (error) {
        console.error('Error seeding guests:', error);
    }
};

// Seed bookings
const seedBookings = async (rooms, guests) => {
    const bookings = [
        {
            guestId: guests[0]._id,
            roomId: rooms[0]._id,
            checkIn: new Date('2024-01-15'),
            checkOut: new Date('2024-01-20'),
            status: 'confirmed',
            paymentStatus: 'paid',
            specialRequests: 'Need extra pillows'
        },
        {
            guestId: guests[1]._id,
            roomId: rooms[1]._id,
            checkIn: new Date('2024-01-10'),
            checkOut: new Date('2024-01-15'),
            status: 'checked-in',
            paymentStatus: 'paid',
            specialRequests: 'Late check-in requested'
        },
        {
            guestId: guests[2]._id,
            roomId: rooms[3]._id,
            checkIn: new Date('2024-01-12'),
            checkOut: new Date('2024-01-18'),
            status: 'checked-out',
            paymentStatus: 'paid',
            specialRequests: 'Vegetarian meals'
        }
    ];

    try {
        await Booking.insertMany(bookings);
        console.log('📅 Bookings seeded successfully');
    } catch (error) {
        console.error('Error seeding bookings:', error);
    }
};

// Main seed function
const seedDatabase = async () => {
    try {
        await clearData();
        const rooms = await seedRooms();
        const guests = await seedGuests();
        await seedBookings(rooms, guests);
        
        console.log('✅ Database seeded successfully!');
        console.log('📊 Data Summary:');
        console.log(`   Rooms: ${await Room.countDocuments()}`);
        console.log(`   Guests: ${await Guest.countDocuments()}`);
        console.log(`   Bookings: ${await Booking.countDocuments()}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run seed
seedDatabase();