const mongoose = require('mongoose');
const Contact = require('./models/contact');

mongoose.connect('mongodb://localhost/contacts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', err => console.log('Error ', err));
db.once('open', async () => {
    console.log('conected');
});

const create = (contact) => Contact.create(contact);
const update = (_id, contact) => Contact.findOneAndUpdate({ _id }, { $set: contact });
const getAll = () => Contact.find();
const getById = (id) => Contact.findById(id);
const deleteOne = (_id) => Contact.deleteOne({ _id });

module.exports = {
    create,
    getAll,
    getById,
    deleteOne,
    update
}
