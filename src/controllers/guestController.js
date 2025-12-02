const Guest = require('../models/Guest');

const getGuests = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const guests = await Guest.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        
        const total = await Guest.countDocuments();
        
        res.json({
            success: true,
            count: guests.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: guests
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

const getGuest = async (req, res) => {
    try {
        const guest = await Guest.findById(req.params.id);
        
        if (!guest) {
            return res.status(404).json({ 
                success: false, 
                error: 'Guest not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: guest 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

const createGuest = async (req, res) => {
    try {
        const guest = await Guest.create(req.body);
        res.status(201).json({ 
            success: true, 
            data: guest 
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
                error: 'Email already exists' 
            });
        }
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

const updateGuest = async (req, res) => {
    try {
        const guest = await Guest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!guest) {
            return res.status(404).json({ 
                success: false, 
                error: 'Guest not found' 
            });
        }
        
        res.json({ 
            success: true, 
            data: guest 
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

const deleteGuest = async (req, res) => {
    try {
        const guest = await Guest.findByIdAndDelete(req.params.id);
        
        if (!guest) {
            return res.status(404).json({ 
                success: false, 
                error: 'Guest not found' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Guest deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = {
    getGuests,
    getGuest,
    createGuest,
    updateGuest,
    deleteGuest
};