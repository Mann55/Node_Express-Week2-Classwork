const { request, response } = require("express");
const express = require("express");
const app = express();


const quotes = require("./quotes.json");

app.use(express.json());


app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

// getting all the quotes here
app.get("/quotes", function(request, response){
  response.json(quotes);
});

// getting a single quote by id
app.get("/quotes/:id", function(request, response){
  const quoteId = request.params.id;
  const result = quotes.find(quote=>quote.id == quoteId);
  //console.log(result);
  if(result){
    response.status(200).json(result);
  }else{
    response.status(400).send("Not Found")
  }
});

// post a code
app.post('/quotes', (request, response)=>{
  //const newQuoteId = quotes.length > o ? [quotes.length-1].id+1:0;
  const newQuote = {
    id: request.params.id,
    //quote  : request.body.quote,
    //author : request.body.author
    ...request.body // suggar syntex
  };
  quotes.push(newQuote);
  response.status(200).json(newQuote);
});

// update quote finding id by index
app.put("/quotes/:id", (request, response)=>{
  const quoteId = request.params.id;
  const quoteIndex = quotes.findIndex(quote=>quote.id == quoteId);
  if(quoteIndex >- 1){
    quotes[quoteIndex] = {
      id: request.params.id,
      ...request.body
    }
    response.status(200).json(quotes[quoteIndex]);
  }else{
    response.status(200).send("Not Found");
  }
})

// delete a quote
app.delete('/quotes/:id', (request, response)=>{
  const quoteId = request.params.id;
  const quoteIndex = quotes.findIndex(quote=>quote.id == quoteId);
  quotes.splice(quoteIndex, 1);
  response.status(201).send(`The id ${quoteId} been deleted`)
})

app.listen(3000, () => console.log("Listening on port 3000"));
