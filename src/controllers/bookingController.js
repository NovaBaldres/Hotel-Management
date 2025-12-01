const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Guest = require('../models/Guest');

const getBookings = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, guestId, startDate, endDate } = req.query;
        
        const query = {};
        if (status) query.status = status;
        if (guestId) query.guestId = guestId;
        
        if (startDate || endDate) {
            query.checkIn = {};
            if (startDate) query.checkIn.$gte = new Date(startDate);
            if (endDate) query.checkIn.$lte = new Date(endDate);
        }
        
        const bookings = await Booking.find(query)
            .populate('guestId', 'name email phone')
            .populate('roomId', 'number type price')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ checkIn: 1 });
        
        const total = await Booking.countDocuments(query);
        
        res.json({
            success: true,
            count: bookings.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('guestId', 'name email phone')
            .populate('roomId', 'number type price');
        
        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                error: 'Booking not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: booking 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

const createBooking = async (req, res) => {
    try {
        // Check if room exists and is available
        const room = await Room.findById(req.body.roomId);
        if (!room) {
            return res.status(404).json({ 
                success: false, 
                error: 'Room not found' 
            });
        }
        
        if (room.status !== 'available') {
            return res.status(400).json({ 
                success: false, 
                error: 'Room is not available' 
            });
        }
        
        // Check if guest exists
        const guest = await Guest.findById(req.body.guestId);
        if (!guest) {
            return res.status(404).json({ 
                success: false, 
                error: 'Guest not found' 
            });
        }
        
        // Check for overlapping bookings
        const overlappingBooking = await Booking.findOne({
            roomId: req.body.roomId,
            $or: [
                {
                    checkIn: { $lt: new Date(req.body.checkOut) },
                    checkOut: { $gt: new Date(req.body.checkIn) }
                }
            ],
            status: { $in: ['confirmed', 'checked-in'] }
        });
        
        if (overlappingBooking) {
            return res.status(400).json({ 
                success: false, 
                error: 'Room is already booked for these dates' 
            });
        }
        
        const booking = await Booking.create(req.body);
        
        // Update room status
        room.status = 'occupied';
        await room.save();
        
        const populatedBooking = await Booking.findById(booking._id)
            .populate('guestId', 'name email phone')
            .populate('roomId', 'number type price');
        
        res.status(201).json({ 
            success: true, 
            data: populatedBooking 
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
                success: false, 
                error: messages 
            });
        }
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('guestId', 'name email phone')
         .populate('roomId', 'number type price');
        
        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                error: 'Booking not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: booking 
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
                success: false, 
                error: messages 
            });
        }
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                error: 'Booking not found' 
            });
        }
        
        // Update room status back to available if booking is active
        if (booking.status === 'confirmed' || booking.status === 'checked-in') {
            await Room.findByIdAndUpdate(booking.roomId, { status: 'available' });
        }
        
        await booking.deleteOne();
        
        res.json({ 
            success: true, 
            message: 'Booking deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// Get bookings by guest ID
const getGuestBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ guestId: req.params.guestId })
            .populate('roomId', 'number type price')
            .sort({ createdAt: -1 });
        
        res.json({ 
            success: true, 
            count: bookings.length,
            data: bookings 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    getGuestBookings
};
