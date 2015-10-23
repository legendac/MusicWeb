var express = require('express')
var app = express();
app.use(require('connect-livereload')());

var request = require('request');

var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/images/favicon.ico'));

var stardog = require("stardog");

var exec = require('child_process').exec;
var startCmd = 'stardog-admin server start';
var stopCmd = 'stardog-admin stop';
/**
Restart Stardog Server
**/

exec(stopCmd, function(error, stdout, stderr) {
  // command output is in stdout
  console.log(stdout);
  exec(startCmd, function(error, stdout, stderr) {
    // command output is in stdout
    console.log(stdout);
  });
});


// just setting them here, could be in a config file
var dbuser = "anonymous";
var dbpass = "anonymous";

var sdconn = new stardog.Connection();
  sdconn.setEndpoint("http://localhost:5820/");
  //sdconn.setEndpoint("http://music-web.herokuapp.com/");
  sdconn.setCredentials(dbuser, dbpass);


app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));

app.listen(process.env.PORT || 5000), function(){ 
  console.log('now listening on port ' + app.get('port'));
}

app.get('/sparql/', function(req, res) {
  res.type('text/plain');
  res.send('i am a beautiful butterfly');
});


app.get('/all', function(req, res) {
  
  var instanceQuery = "select ?composer ?pageView WHERE {?composer <http://www.semanticweb.org/adamctj/ontologies/MusicWeb#pageView> ?pageView.} ORDER BY DESC(?pageView) LIMIT 20";
  
  console.log(instanceQuery);
  sdconn.query({
    database: "MusicWeb",
    query: instanceQuery,
    format: "json",
    //mimetype: "application/ld+json",
    reasoning: true
  },
  function (data) {     // callback
    // just take the first element, URIs must be unique
    res.send(data);
  });
});

app.get('/category', function(req, res) {
  
  var category = req.query.category//req.params.cat;
  var instanceQuery = "select ?composer ?pageView WHERE {?composer rdf:type <http://www.semanticweb.org/adamctj/ontologies/MusicWeb#xxxxxxxx>.?composer <http://www.semanticweb.org/adamctj/ontologies/MusicWeb#pageView> ?pageView.} ORDER BY DESC(?pageView)";
  console.log(category);
  var instanceQuery = instanceQuery.replace("xxxxxxxx", category);
  console.log(instanceQuery);
  sdconn.query({
    database: "MusicWeb",
    query: instanceQuery,
    format: "json",
    //mimetype: "application/ld+json",
    reasoning: true
  },
  function (data) {     // callback
    // just take the first element, URIs must be unique
    res.send(data);
  });
});
/*app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/public/index.html'));
});

*/
//Stardog
/*
sdconn.query({
        database: "MusicWeb",
        query: "select distinct ?s where { ?s ?p ?o }",  
        limit: 10,
        offset: 0
    },
    function (data) {
        console.log(data.results.bindings);
});
*/

// Very sample resource GET, no URI validations or anything fancy
app.get("/testing", function (req, res) {
  "use strict";

  var instanceQuery = "select distinct ?s where { ?s ?p ?o }";

  console.log("Requested id: "+ req.params.id);

  sdconn.query({
    database: "MusicWeb",
    query: instanceQuery,
    mimetype: "application/ld+json",
    reasoning: true
  },
  function (data) {     // callback
    // just take the first element, URIs must be unique
    if (data.length > 0) {
      console.log(data.results.bindings);
    }
    response = sparql.query().convert()
  });
});

/**
 * Assume everything is working under our app DB (MusicWeb),
 * but it could be a parameter too!
 */

// Very simple resource GET, no URI validations or anything fancy
app.get("/article/:id", function (req, res) {
  "use strict";

  var instanceQuery = "construct where { <"+ req.params.id +"> ?p ?o }";

  console.log("Requested id: "+ req.params.id);

  connection().query({
    database: "MusicWeb",
    query: instanceQuery,
    mimetype: "application/ld+json"
  },
  function (data) {     // callback
    // just take the first element, URIs must be unique
    if (data.length > 0) {
      res.send(data[0]);
    }
  });
});

// Something can be done here for POST to create a new article
// ...

// Redirect query
  app.get("/query", function (req, res) {
  "use strict";

  console.log("Executing query "+ req.query.query);

  connection().query({
    database: "MusicWeb",
    query: req.query.query
  },
  function (data) {     // callback
    res.send(data);
  });
});


function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

app.get('/wiki', function (req, res) {
  var composerWiki = req.query.wiki;

  console.log(composerWiki);

  var composerWikiHost = 'http://en.wikipedia.org';
  var composerWikiPath = '/w/index.php?printable=yes&title=' + composerWiki;
  var composerWikiPage = composerWikiHost + composerWikiPath; //'https://en.m.wikipedia.org/wiki/' + composerWiki;
  // var options = {
  //   host: composerWikiHost,
  //   path: composerWikiPath
  // };

  request(composerWikiPage, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  })

});




/*
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
*/