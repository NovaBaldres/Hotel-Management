const express = require('express');
const router = express.Router();
const {
    getGuests,
    getGuest,
    createGuest,
    updateGuest,
    deleteGuest
} = require('../controllers/guestController');

const { getGuestBookings } = require('../controllers/bookingController');

router.route('/')
    .get(getGuests)
    .post(createGuest);

router.route('/:id')
    .get(getGuest)
    .put(updateGuest)
    .delete(deleteGuest);

router.route('/:guestId/bookings')
    .get(getGuestBookings);

module.exports = router;