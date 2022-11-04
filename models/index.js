const Board = require('./board.model');
const Cheese = require('./cheese.model');
const User = require('./user.model');

/****** Here, we are setting up our connections/relationships between tables *******/

//ONE-TO-MANY - The targets belong to the source, and the soruce has many targets

User.hasMany(Board);
Board.belongsTo(User);


//MANY-TO-MANY - Both the target belong to many sources and the source belongs to many targets, which are connected through the junction/through table (by thier ID's).

Cheese.belongsToMany(Board, { through: 'Board_Cheese' });
Board.belongsToMany(Cheese, { through: 'Board_Cheese' });


module.exports = { Board, Cheese, User }