const contact = require('./contact')
const autn = require('../core/auth');

const login = async (req, res) => {
    const login = {};
    return res.render('login', { login });
}

const logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}

const postLogin = (req, res) => {
    const { email, pass } = req.body;
    if (email === 'rodrigo' && pass === '123') {
        const token = autn.tokenCreator(email);
        req.session.token = token;
        return contact.getAll(req, res);
    }
    return res.redirect('/login');
}

module.exports = {
    login,
    logout,
    postLogin
}