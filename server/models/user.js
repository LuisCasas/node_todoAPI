var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User};

/*
var newUser = new User({
   email: 'john@ran.com'
});

newUser.save().then((doc) => {
    console.log('User saved', doc);
}, (e) => {
    console.log('error');
});
*/