const { Schema, model } = require("mongoose")
// Destructing Schema and modle from mongoose and setting them to their own vars

// create a new Schema
// This will define the shape of the documents in the collection
// from here: https://mongoosejs.com/docs/models.html
const flightSchema = new Schema( 
    {
      airline: String, 
      flightNo: Number, 
      departs: { type: Date}, 
   }, 
   {
    timestamps: true
   }
)

// Creating Tweet model : We need to convert our schema into a model-- will be stored in 'tweets' collection.  Mongo does this for you automatically
// Model's are fancy constructors compiled from Schema definitions
// An instance of a model is called a document.
// Models are responsible for creating and reading documents from the underlying MongoDB Database
// from here: https://mongoosejs.com/docs/models.html
const Flight = model('Flight', flightSchema);

//make this exportable to be accessed in `app.js`
module.exports = Flight;
