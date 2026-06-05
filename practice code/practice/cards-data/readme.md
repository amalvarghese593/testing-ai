# Interview Questions

## Data Filter Exercise
* Clone this repo
* Using `readFile` method of the fs module, create a function in the `index.js` file that asynchronously reads the cardsdata.json file.
* Create a function called `cardsFilter` that:
  1. calls the function you created
  2. reduces the number of attributes per item to only what's in the  `requiredFields` array
* Create a node server and expose a route that returns the result of the `cardsFilter` method
