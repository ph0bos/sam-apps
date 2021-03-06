function ApiRoutes(key, secret) {

    var sam = require('sam')(key, secret);

    function callback(res, err, data) {
        if (err) res.send(500);
        else res.json(data);
    }

    // Get a list of stories
    function stories(req, res) {
        sam.stories.list(function(err, data) { callback(res, err, data); });
    };

    // Get the contents of a story
    function story(req, res) {
        sam.stories.fetch(
            req.param('id'),
            function(err, data) { callback(res, err, data); }
        );
    };

    // Get a recently added asset
    function asset(req, res) {
        sam.assets.fetch(
            req.param('storyId'),
            req.param('assetId'),
            function(err, data) { callback(res, err, data); }
        )
    };

    return {
        stories: stories,
        story: story,
        asset: asset,
        api: sam
    };

};

module.exports = ApiRoutes;