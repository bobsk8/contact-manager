const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('../routes');
const session = require('express-session');
const auth = require('../core/auth')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../../views`);

app.use(session({
    secret: 'aulanodejs',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));
app.use(express.static(`${__dirname}/../../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/login', router.auth.login);
app.get('/logout', router.auth.logout)
app.post('/login', router.auth.postLogin);
app.get('/', auth.testToken, router.contact.getAll);
app.get('/:id/edit', auth.testToken, router.contact.edit);
app.get('/add', auth.testToken, router.contact.add);
app.get('/:id/delete', auth.testToken, router.contact.getDelete);
app.post('/add', auth.testToken, router.contact.postAdd);
app.post('/:id/edit', auth.testToken, router.contact.postEdit);

app.listen(port, () => console.log(`Started at http://localhost:${port}`));
