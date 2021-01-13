const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// handle errors
const handleErrors = (err) => {`    `
    console.log(err.message, err.code);

    let errors = { email: '', password: ''};

    // incorrect email
    if(err.message === 'Incorrect Email') {
        errors.email = 'incorrect email. try again';
        console.log(errors.email);
    }
    // incorrect password
    if(err.message === 'Incorrect Password') {
        errors.password = 'incorrect password, try again';
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    //Validation erros
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'we the best music as we are programmer', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.getAllDataPage = (req, res) => {
    res.redirect('/')
}

module.exports.signup_post = async(req, res) => {
    const { email, password, name, occupation } = req.body;

    try {
        const user = await User.create({ name, occupation, email, password }); // this line return promises.
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({
            status: 'success',
            user: user._id
        });

    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({
            status: 'fail',
            errors 
        });
    }
    
}
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id});
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({
            status: 'fail',
            errors 
        });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}