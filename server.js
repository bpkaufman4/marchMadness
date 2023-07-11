
const express = require('express');
const controller = require('./controller');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(controller);
sequelize.sync({ alter: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
})
// app.use(express.static(path.join(__dirname, 'public')));