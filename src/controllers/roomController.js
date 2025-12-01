const Room = require('../models/Room');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, type, minPrice, maxPrice } = req.query;
        
        const query = {};
        if (status) query.status = status;
        if (type) query.type = type;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        
        const rooms = await Room.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ number: 1 });
        
        const total = await Room.countDocuments(query);
        
        res.json({
            success: true,
            count: rooms.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        
        if (!room) {
            return res.status(404).json({ 
                success: false, 
                error: 'Room not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: room 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// @desc    Create new room
// @route   POST /api/rooms
// @access  Public
const createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json({ 
            success: true, 
            data: room 
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
                success: false, 
                error: messages 
            });
        }
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                error: 'Room number already exists' 
            });
        }
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Public
const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!room) {
            return res.status(404).json({ 
                success: false, 
                error: 'Room not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: room 
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

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Public
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        
        if (!room) {
            return res.status(404).json({ 
                success: false, 
                error: 'Room not found' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Room deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
};
