const Board = require('./board.model');
const Cheese = require('./cheese.model');
const User = require('./user.model');

/****** Here, we are setting up our connections/relationships between tables *******/


//ONE-TO-ONE - The target belongs to the source, and the source has the target



//ONE-TO-MANY - The targets belong to the source, and the soruce has many targets


//MANY-TO-MANY - Both the target belong to many sources and the source belongs to many targets, which are connected through the junction/through table (by thier ID's).


module.exports = { Board, Cheese, User }