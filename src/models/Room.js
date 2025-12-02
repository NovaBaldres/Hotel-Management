const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, 'Room number is required'],
        unique: true,
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Room type is required'],
        enum: ['single', 'double', 'suite', 'deluxe']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'maintenance'],
        default: 'available'
    },
    amenities: [String],
    capacity: {
        type: Number,
        required: true,
        min: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);