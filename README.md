<img src="atom.png"  width="200" height="60">

## Country Comparison API

### What is this?

The Country Comparison API will use data from a 3rd party provider, [api.population.io](http://api.population.io)<sup>[1](#footnote1)</sup>, to provide comparisons on population statistics.  Your colleague Joe Coder started the implementation (in Node.js v10 using restify), and now it's your turn to bring it to the next level.  

Our current stack is primarily built in Node.js, Golang, and .NET.  Since this service is just getting off the ground, if you'd rather implement this in a different language, feel free to do so.

### Setup

1. Download the repo
2. Run `npm install` to install dependencies
3. Run `npm test` to run unit tests
4. Set your NODE_ENV to `dev`
5. Run `npm start` to start the server

### Requirements

Joe created one endpoint that retrieves a list of country names, using mock data.

1. Update the endpoint to pull country data from http://api.population.io/1.0/countries.
2. The endpoint http://api.population.io/1.0/population/:country/:date returns the total population for a given country on a given date.  Design and implement an endpoint in our API that will allow a consumer to specify an arbitrary set of countries and an optional sort order, and receive back a list of countries and their population based on the current date.  If a sort order was specified, return the list sorted on population size, according to the consumer's requested sort order.

Funtionalities:

      a. allow a consumer to specify an arbitrary set of countries.
      
      b. optional sort order.
      
      c. receive back a list of countries and their population based on the current date.  
      
      
      d. If a sort order was specified, return the list sorted on population size, according to the consumer's requested sort order.
      
      e. the consumer can send a date and receive back a list of countries and their population based date requested


Try to be consistent with Joe's implementation in terms of:
* unit tests *
* documentation * 
* error handling *
* response codes *
* validation *
* etc.

Zip your solution, upload it somewhere, and send us a link to the zipped file.

### Bonus
1. Some scenarios to consider (leave your thoughts inline in your code or edit the README):
  * How efficient is your code?  What are some ways that you could improve performance?
  ```bash
  I can look for a better way to sort by the results and compare (for example).  
  ```
  * Suppose we expect this API to be hit 1000s of times a second.  How can we handle the load?
  ```
  Use load balancer
  Use multiple availability zones
  Split static (we can create static file for the most frequently requested countries) files to different server/service. (AWS S3 and CloudFront CDN)
  https://www.npmjs.com/package/loadtest used to test hits to the API
  ```
  
  * What if the 3rd party provider is not available?  How resilient is our API?
  ```bash
  if the 3rd party provider is not available, the currend code will return a proper message and the countries in 
  countriesFails
  ```
  * What if the requirement for the new endpoint was to also allow the consumer to compare populations for any given date.  How would you modify your implementation?

  * What if we have a database of users and we wanted to make our API smarter by defaulting comparisons to always include the population of the current user's country.  How could we accomplish this?
  ```bash
  I can use this service http://ip-api.com/json and get the consumer country based on the IP
       const geoLocationService = config.routes.geoLocationService;
       request(geoLocationService, { json: true }, (err, res, body) => {
            if (err) { console.log(err); }
            customerCountry = body.country;
       });
       
       Then after get the customerCountry add it to countries array
       countries.push(customerCountry);

  ```
  ```json
      {
        "as": "AS6128 Cablevision Systems Corp.",
        "city": "Brooklyn",
        "country": "United States",
        "countryCode": "US",
        "isp": "Optimum Online",
        "lat": 40.6877,
        "lon": -73.9267,
        "org": "Optimum Online (Cablevision Systems",
        "query": "69.111.107.120",
        "region": "NY",
        "regionName": "New York",
        "status": "success",
        "timezone": "America/New_York",
        "zip": "11221"
      }

  ```
  * What if we wanted to keep a tally of the most frequently requested countries and have this be available to consumers.  How could we accomplish this? 
  <B>We can store this results in Redis <B>

2. Dockerize the API

```bash
docker-compose up  -d
```

<br>
<i><a name="footnote1"><sup>1</sup></a> Joe says that api.population.io is down, so try https://dyicn1e62j3n1.cloudfront.net as the host instead.<i>
