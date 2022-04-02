const express = require('express');
const Contacts = require('../schemas/contacts');

const router = express.Router();

console.log('contacts routes');

router.get('/', async(req, res, next) => {
    try {
        const contacts = await Contacts.find({});
        res.render('contacts', { contacts });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// New
router.get('/new', function(req, res) {
    res.render('new');
});

// create
router.post('/', function(req, res) {
    const contacts = Contacts.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    }, function(err, post) {
        if (err) return res.json(err);
        res.redirect('/');
    });
});


router.get('/:id', async(req, res, next) => {
    try {
        const personal = await Contacts.find({ _id: req.params.id })
            .populate('contacts_id');

        res.render('personal', { personal });

        console.log('s', personal);
        // res.json(contacts_id);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// edit
// router.get('/:id/edit', function(req, res) {
//     const edit = Contacts.find({ _id: req.params.id }).populate('contacts_id');
//     // ,function(err) {
//     // res.json(err);
//     res.render('edit', { edit });
//     console.log(req.params);
//     // }
// });

router.get('/:id/edit', async(req, res, next) => {
    try {
        const edit = await Contacts.find({ _id: req.params.id })
            .populate('contacts_id');
        res.render('edit', { edit });

        // res.json(contacts_id);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// update
router.put('/:id', function(req, res) {
    Contacts.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
        res.json(err);
        //   if(err) return res.json(err);
        //   res.redirect("/posts/"+req.params.id);
    });
});


// delete
router.delete('/:id', function(req, res) {
    Contacts.deleteOne({ _id: req.params.id }, function(err) {
        res.json(err);
    });
});

module.exports = router;