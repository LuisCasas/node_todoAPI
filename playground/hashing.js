const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'test123!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashPass = '$2a$10$bgDMHC77/f5ANqSivRWAruCcloNxPgkzqwUbFXQm7120IvTrUxp.q';

bcrypt.compare(password, hashPass, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 6
// };

// var token = jwt.sign(data, 'jvsdikncs');
// // console.log(token);

// var decoded = jwt.verify(token, 'jvsdikncs');

// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'thissecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'thissecret').toString();

// if(resultHash === token.hash){
//     console.log('data not manipulated');
// } else {
//     console.log('Dont trust this data');
// }