const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = express.Router(); // Correct usage of express router

router.get('/',ensureAuthenticated, (req,res)=>{
    console.log('---user detaisl---',req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:"53000"
        },
        {
            name:"home",
            price:"50L"
        }
    ])
});


module.exports = router;
