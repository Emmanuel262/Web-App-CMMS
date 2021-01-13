const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine
app.set('view engine', 'ejs');


const dbURI = 'mongodb+srv://CoalMine:VicentVsAlice@cluster0.qicsd.mongodb.net/Authentication';

  mongoose.connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }).then(() => {
    console.log('DB Connected Successfully...');
  }).catch((err) => console.log(err));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
  });

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use('/monitoring', requireAuth, checkUser, dataRoutes);
app.get('/dashboard', requireAuth, checkUser, (req, res) => res.render('dashboard'));
app.use(authRoutes);


