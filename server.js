require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const db = require("./config/database");
const Flight = require("./models/Flight");
const { connect, connection } = require("mongoose");
const methodOverride = require("method-override");


//Database connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
connection.once("open", () => {
  console.log("connected to mongo");
});


// View Engine Middleware Configure
const reactViewsEngine = require('jsx-view-engine').createEngine();
app.engine('jsx', reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set('views', './views');


// Middleware
app.use(express.urlencoded({ extended: false }));
//after app has been defined

// Custom Middleware
app.use((req, res, next) => {
    console.log('Middleware running...');
    next();
  });

//Index
app.get('/', async (req, res) => {
  console.log('Index Controller Func. running...');
  //res.render('/flight/Index', { flights });
try {
    const foundFlight = await Flight.find({});
    res.render('flight/Index', { flight: foundFlight });
  } catch (err) {
    res.status(400).send(err);
  }
});

//New 
app.get('/flight/new', (req, res) => {
  res.render('flight/new');
});

//Delete
app.delete('/flight/:id', async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id)
    res.redirect('/flight');
  } catch (err) {
     res.status(400).send(err);
  }
});

//Update/PUT
app.put('/flight/:id', async (req, res) => {
  try {
   const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true});
   console.log(updatedFlight);
   res.redirect(`/flight/${req.params.id}`)
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create // recieves info from new route to then create a new fruit w/ it
app.post('/flight', async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body);
    console.log(newFlight)
    //console.log(fruits);
    // redirect is making a GET request to whatever path you specify
    res.redirect('/flight');
  } catch (err) {
    res.status(400).send(err);
  }
});

//Edit 
/*app.get("/flight/:id/edit", async (req, res) => {
  try {
    //finding the document that we are about to edit, giving the Edit.jsx the document found through props
   const foundFlight = await Flight.findById(req.params.id);
   res.render("flight/Edit", {
     flight: foundFlight
   });
  } catch (err) {
    res.status(400).send(err)
  }
});*/

//Show
app.get("/flight", (req,res,) => {
    res.send(`<h1>Welcome to Our Flight Search Tool!</h1>,
    <a href="/flight/show">"Click here to book your next flight!</a>`)
});

// Show
/*app.get('flights/show/:id', async (req, res) => {
  try {
    const foundFlight = await Fruit.findById(req.params.id);
  res.render('flights/Show', {
    //second param must be an object
    flight: foundFlight,
    //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
} catch (err) {
  res.status(400).send(err);
}
});*/
/*app.get("/flight/show", (req,res) => {
  res.send()
})*/


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });





