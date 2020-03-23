const db = require('../db');

const getAll = async (req, res) => {
    const contacts = await db.getAll();
    return res.render('index', { contacts });
}

const edit = async (req, res) => {
    const { id } = req.params;
    const contact = await db.getById(id);
    return res.render('form', { contact });
}

const add = async (req, res) => {
    const contact = {};
    return res.render('form', { contact });
}

const postAdd = async (req, res) => {
    const { name, email, phone } = req.body;
    await db.create({ name, email, phone });
    return res.redirect('/');
}

const postEdit = async (req, res) => {
    let { id } = req.params;
    const { name, email, phone } = req.body;
    await db.update(id, { name, email, phone });
    return res.redirect('/');
}

const getDelete = async (req, res) => {
    const { id } = req.params;
    await db.deleteOne(id);
    return res.redirect('/');
}

module.exports = {    
    getAll,
    edit,
    add,
    postAdd,
    postEdit,
    getDelete
}
