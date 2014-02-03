/**
 * Setup and module dependencies
 */

var PORT       = 3001,
    //APP_KEY    = 'abc123',
    APP_KEY    = '1puqINX0vrCYGDL6',
    //APP_SECRET = 'ssh-secret',
    APP_SECRET = 'hfu3s2kvLvfdpU4tV3YINaaqm0Q72N58';

var express = require('express'),
    exphbs  = require('express3-handlebars'),
    helpers = require('./helpers.js')(),
    http    = require('http'),
    path    = require('path'),
    api     = require('./routes/api.js')(APP_KEY, APP_SECRET),
    routes  = require('./routes/routes.js')(api.api, '52dd6778ff766c4416e83b20'),
    app     = express();


/**
 * Handlebars configuration
 */

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        timeago: helpers.timeago,
        datetime: helpers.datetime
    }
});


/**
 * Express configuration
 */

app.configure(function() {
    app.set('port', PORT);

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // For development purposes only
    if (app.get('env') === 'development') {
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    }
});


/**
 * Routes
 */

// Public routes
app.get('/', routes.index);

// Internal API
app.get('/sam/stories', api.stories);
app.get('/sam/stories/:id', api.story);


/**
 * Initialization
 */

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
