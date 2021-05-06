// main server connection
const routes = require('./controllers');
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const app = express();
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'our team secret secret spirit',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};


const PORT = process.env.PORT || 3001;
// session middleware
app.use(session(sess));
// use public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

app.use(routes);



sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('server listening'));
});

