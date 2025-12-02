const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    idProof: {
        type: {
            type: String,
            enum: ['passport', 'driver-license', 'national-id']
        },
        number: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Guest', guestSchema);