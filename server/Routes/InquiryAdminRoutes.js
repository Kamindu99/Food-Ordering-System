const express = require('express');
const inquiryadmin = require('../models/InquiryAdminModel');

const router = express.Router();

router.post('/add', (req, res) => {
    let newRep = new inquiryadmin(req.body);

    newRep.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Reply Added Successfully"
        });
    });
});

router.get("/", async (req, res) => {
    try {
        const inqsadmin = await inquiryadmin.find()
        res.send(inqsadmin)

    } catch (err) {
        res.send(err)
    }
})


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const inqadmin = await inquiryadmin.findById(id)
        res.send(inqadmin)

    } catch (err) {
        res.send(err)
    }
})

router.delete('/:id', (req, res) => {
    inquiryadmin.findByIdAndRemove(req.params.id).exec((err, deletedInquiry) => {
        if (err) return res.status(400).json({
            message: "Reply Deleted unsuccesfull", err
        });
        return res.json({
            message: "Reply Deleted succesfully", deletedInquiry
        });
    });
});


router.put('/:id', (req, res) => {
    inquiryadmin.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, inquiry) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({
                success: "Reply Updated Successfully"
            });
        }
    );
});




module.exports = router;