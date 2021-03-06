/**
 * Setup and module dependencies
 */

var PORT       = 3001,
    APP_KEY    = 'abc123',
    APP_SECRET = 'ssh-secret',
    STORY_ID   = '52dd6778ff766c4416e83b20';

var express = require('express'),
    exphbs  = require('express3-handlebars'),
    helpers = require('./public/helpers.js')(),
    http    = require('http'),
    path    = require('path'),
    api     = require('./routes/api.js')(APP_KEY, APP_SECRET),
    routes  = require('./routes/routes.js')(api.api, STORY_ID),
    app     = express();


/**
 * Handlebars configuration
 */

var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: {
        timeago: helpers.timeago,
        datetime: helpers.datetime,
        tagattrs: helpers.tagattrs
    }
});


/**
 * Express configuration
 */

app.configure(function() {
    app.set('port', PORT);
    app.set('views', path.join(__dirname, 'views'));

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
app.get('/sam/stories/:storyId/assets/:assetId', api.asset)


/**
 * Initialization
 */

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Socket.io Initialization
 */
var io = require('socket.io').listen(server);
app.post('/webhook', function(req, res) {
    var event = req.body;
    io.sockets.emit('event', event);
});