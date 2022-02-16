const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

const secret = "doesntMatter";

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === mockUser.username || password === mockUser.password) {
        
        const token = jwt.sign(mockUser, secret)
        res.json({ accessToken: token });

    } else {
        res.send("The username or password is incorrect.");
    }

});

router.get('/profile', (req, res) => {
    const userToken = req.get("Authorization");

    try {
        const decoded = jwt.verify(userToken, secret);
        res.json(decoded.profile);
    } catch(err) {
        res.send(err)
    }
    
});

module.exports = router;
