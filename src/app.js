const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shivam Gupta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shivam Gupta",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contact: "shivamgupta1623@gmail.com",
    title: "Contact",
    name: "Shivam Gupta",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an location" });
  }

  geocode(
    req.query.address,
    (error, { lattitude, longatuide, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(lattitude, longatuide, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }

        res.send({
          lattitude,
          longatuide,
          forecast: forecastData.forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search query",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("page-404", {
    title: "404 Page",
    name: "Shivam Gupta",
    errorMassage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("page-404", {
    title: "Hmmmm.... Error 404 ",
    name: "Shivam Gupta",
    errorMassage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
