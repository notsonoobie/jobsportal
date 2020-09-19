const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator/check')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// Route - GET api/profile/me
// DESC  - GET OUR PROFILE DATA
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'email'])

        if (!profile) {
            return res.status(400).json({
                msg: 'No Profile Found'
            })
        }

        return res.status(200).json(profile)

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            msg: "Server Error"
        })
    }
})

// Route - POST api/profile/me
// DESC  - CREATE/UPDATE OUR PROFILE DATA
router.post('/me', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
]], async (req, res) => {

    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({
            errors: err.array()
        })
    }

    const {
        website,
        githubUserName,
        facebook,
        instagram,
        linkedin,
        skills,
        bio,
        location,
        status
    } = req.body

    let profile = {}
    profile.user = req.user.id
    if (website) profile.website = website
    if (githubUserName) profile.githubUserName = githubUserName
    if (facebook) profile.facebook = facebook
    if (instagram) profile.instagram = instagram
    if (bio) profile.bio = bio
    if (location) profile.location = location
    if (linkedin) profile.linkedin = linkedin
    if (status) profile.status = status
    if (skills) profile.skills = skills.split(',').map(i => i.trim())

    try {

        let dbProfile = await Profile.findOne({
            user: req.user.id
        })
        // if profile is found on db, then update profile
        if (dbProfile) {
            let updatedProfile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profile
            }, {
                new: true
            })
            return res.status(200).json(updatedProfile)
        }
        // If profile not found on db, then create the profile
        let newProfile = new Profile(profile)
        await newProfile.save()
        res.status(200).json(newProfile)

    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            msg: 'SERVER ERROR'
        })
    }

})

// Route - DELETE api/profile/me
// DESC  - DELETE OUR ENTIRE PROFILE DATA & USER DATA
router.delete('/me', auth, async (req, res) => {
    try {

        await Profile.findOneAndDelete({
            user: req.user.id
        })
        await User.findOneAndDelete({
            _id: req.user.id
        })
        res.status(200).json({
            msg: "Deleted Successfully"
        })

    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            msg: 'SERVER ERROR'
        })
    }
})

// Route - PUT api/profile/me/exp
// DESC  - ADD EXPERIENCE DATA TO DB
router.put('/me/exp', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty()
]], async (req, res) => {

    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({
            errors: err.array()
        })
    }

    const {
        title,
        company,
        from,
        to,
        current,
        description
    } = req.body

    let newExp = {
        title,
        company,
        from,
        current,
    }
    if (to) newExp.to = to
    if (description) newExp.description = description

    try {

        let profile = await Profile.findOne({
            user: req.user.id
        })
        profile.experience.unshift(newExp)
        await profile.save()

        return res.status(200).json(profile)

    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            msg: 'SERVER ERROR'
        })
    }
})

// Route - DELETE api/profile/me/exp/:exp_id
// DESC  - DELETE PARTICULAR EXPERIENCE DATA FROM PROFILE
router.delete('/me/exp/:exp_id', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({
            user: req.user.id
        })

        const removeIndex = profile.experience.map(i => i.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1)

        await profile.save()
        res.status(200).send(profile)

    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            msg: 'SERVER ERROR'
        })
    }
})


// Route - PUT api/profile/me/edu
// DESC  - ADD EDUCATION DATA TO DB
router.put('/me/edu', [auth, [
    check('institute', 'institute is required').not().isEmpty(),
    check('fieldOfStudy', 'fieldOfStudy is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
]], async (req, res) => {

    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({
            errors: err.array()
        })
    }

    const {
        institute,
        fieldOfStudy,
        degree,
        to,
        from,
        description
    } = req.body

    let newEdu = {
        institute,
        fieldOfStudy,
        from,
        degree,
        description
    }
    if (to) newEdu.to = to

    try {

        let profile = await Profile.findOne({
            user: req.user.id
        })
        profile.education.unshift(newEdu)
        await profile.save()

        return res.status(200).json(profile)

    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            msg: 'SERVER ERROR'
        })
    }
})

// Route - DELETE api/profile/me/edu/:edu_id
// DESC  - DELETE PARTICULAR EDUCATION DATA FROM PROFILE
router.delete('/me/edu/:edu_id', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({
            user: req.user.id
        })

        const removeIndex = profile.education.map(i => i.id).indexOf(req.params.exp_id)
        profile.education.splice(removeIndex, 1)

        await profile.save()
        res.status(200).send(profile)

    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            msg: 'SERVER ERROR'
        })
    }
})

module.exports = router