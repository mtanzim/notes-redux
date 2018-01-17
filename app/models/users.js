'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var Schema = mongoose.Schema;

var path = process.cwd();
var Recipes=require(path + '/app/models/recipes.js');

var User = new Schema({
  github: {
  	id: String,
  	displayName: String,
  	username: String,
    publicRepos: Number
  },
  //Facebook login db schema
  //taken from: https://scotch.io/tutorials/easy-node-authentication-facebook#configuring-passports-facebook-strategy-configpassportjs
  facebook         : {
      id           : String,
      token        : String,
      name         : String
  },
  local             :{
    email           :String,
    password        :String
    
  },
  nbrClicks: {
    clicks: Number
  },
  recipes: { type: [Recipes.schema], default: [] }
});


// generating a hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
