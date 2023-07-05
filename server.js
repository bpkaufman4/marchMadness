
const express = require('express');
const controller = require('./controller');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(controller);
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
})
app.use(express.static(path.join(__dirname, 'public')));