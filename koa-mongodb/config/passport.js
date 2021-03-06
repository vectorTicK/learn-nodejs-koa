const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const tokenKey = require("./key");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenKey.secretKey;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
const mongoose = require("mongoose");
const User = mongoose.model('users');

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        console.log(jwt_payload);
        const user = await User.findById(jwt_payload.id);
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
};