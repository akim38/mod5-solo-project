const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { Event } = db;
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//validate event
const validateEvent = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name for your event.')
        .isLength({ max: 55})
        .withMessage('Event Name is too long.'),
    check('date')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a date for your event.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description for your event.'),
    check('location')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a location for your event.'),
    check('region')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a region for your event.')
        .isLength({ max: 600})
        .withMessage('Sorry! The URL is too long.'),
    handleValidationErrors
];

//get all events
router.get('/', asyncHandler(async (req, res) => {
    const events = await Event.findAll();

    // console.log(events);
    return res.json({ events });
}));

//get specific event
router.get('/:id', asyncHandler(async (req, res) => {
    const eventId = parseInt(req.params.id);

    const event = await Event.findByPk(eventId, {
        include: [
            {
                model: db.User
            }
        ]
    });

    const user = event.Users

    if (event) {
        return res.json({ event, user })
    }
    return res.json({ message: 'Event not found.'});
}));

//post new event
router.post('/', requireAuth, validateEvent, asyncHandler(async (req, res) => {
    const { userId, groupId, name, date, description, location, city, region, imageUrl  } = req.body;

    const newEvent = await Event.create({
        userId,
        groupId,
        name,
        date,
        description,
        location,
        city,
        region,
        imageUrl
    });

    return res.json({ newEvent });
}));

//edit event
router.put('/:id', requireAuth, validateEvent, asyncHandler(async (req, res) => {

    const { id, userId, groupId, name, date, description, location, city, region, imageUrl  } = req.body;

    const event = await Event.findByPk(id, {
        include: [
            {
                model: db.User
            }
        ]
    });

    const user = event.Users

    if (event) {
        await event.update({
            userId,
            groupId,
            name,
            date,
            description,
            location,
            city,
            region,
            imageUrl
        });

        return res.json({ event, user })
    }

}));

//delete event
router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const eventId = parseInt(req.params.id);
    console.log( 'i think this is the issue', eventId);

    const event = await Event.findByPk(eventId);

    if (event) {
        event.destroy();

        res.json({ message: 'Event deleted.'})
    }
}));



module.exports = router;
