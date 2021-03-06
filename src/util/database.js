//* Importing dependencies
const mongoose = require('mongoose')
const connection = mongoose.connection

//* If an error occurs, it will log in the console
connection.on('error', console.error.bind(console, 'connection error:'))

/**
 * Database callback
 * @param {Error} err callback parameter of Mongoose Connection callback
 */
function _callback (err) {
  //* If an error occurs
  if (err) {
    //* Logs the error
    console.log('Ocurred an error while trying to log into the database.')
    console.error(err)
  } else {
    //* Logs that the connection was successful
    console.log('The database connection was successful.')
  }
}

//* Exporting the init database function to able others modules to use it
/**
 * Connects to the database
 * @param {String} DB_NAME the name of the database that will be used
 */
module.exports.connect = (callback = _callback, DB_NAME = process.env.DB_NAME) => {
  //* URL used to connect to MongoDB
  const connectionURL = `${process.env.DB_AUTH}/${DB_NAME}?retryWrites=true`
  //* Options used with MongoDB
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: 'majority'
  }

  //* Tries to connect to MongoDB
  return mongoose.connect(connectionURL, options, callback)
}
