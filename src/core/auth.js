const jwt = require('jsonwebtoken');

const testToken = (req, res, next) => {
    const token = req.session.token;    
    if (!token) {
        return res.redirect('/login');
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        return next();
    });
}

const tokenCreator = (email) => {
    const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: 300
    });
    return token;
}

module.exports = {
    testToken,
    tokenCreator
}