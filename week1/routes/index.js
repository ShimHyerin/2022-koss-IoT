const express = require('express');
const Contacts = require('../schemas/contacts');

const router = express.Router();

console.log('index routes');

router.get('/', async(req, res, next) => {
    try {
        const contacts = await Contacts.find({});
        res.render('main', { contacts });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;