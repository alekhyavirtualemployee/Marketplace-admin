const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const Admin = require('../../models/Admin');
const saltRounds = 10;
const bcrypt = require("bcrypt");


/*
@route: /api/admins/login
@description: create a new student
@access: public
*/
router.post('/login', (req, res) => {

    const adminsData = {};
    adminsData.username = req.body.username;
    adminsData.password = req.body.password;
    Admin.findOne({username: adminsData.username})
        .then((result) => {
            if(result === null) { 
                // username not found
                return res.status(404).json({notFound: 'Username doesn\'t exsist'});
            }
            else {
                
                if(bcrypt.compare(adminsData.password, result.password)) {
                    // success
                    const payload = {
                        id: result._id,
                        full_name: result.full_name,
                        national_id: result.national_id,
                        username: result.username
                    }
                    
                    jwt.sign(payload, keys.JWTSecret, {expiresIn: '12h'}, (err, token) => {
                        if(err) {
                            return res.status(400).json(err);
                        }
                        else {
                            return res.status(200).json({token: `Bearer ${token}`});
                        }
                    });

                } else {
                    // password not correct
                    return res.status(400).json({passwordNotCorrect: 'Password is not correct'});
                }
            }
        })
        .catch(err => res.status(400).json(err))
    
});

router.post('/getusers', (req, res) => {
    Admin.find()
        .then((result) => {
                return res.status(200).json(result);
        })
        .catch(err => res.status(400).json(err))
});


router.post('/createuser', async (req, res) => {
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        const insertResult = await Admin.create({
          username: req.body.username,
          password: hashedPwd,
        });
        return res.status(200).json(insertResult);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured"); 
    }
    });

module.exports = router