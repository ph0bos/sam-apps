function PublicRoutes(sam, storyId) {

    function sortDate(arr) {
        arr.sort(function(a, b) {
            var keyA = a.postedDate,
                keyB = b.postedDate;

            if(keyA < keyB) return 1;
            if(keyA > keyB) return -1;
            return 0;
        });
    }

    function index(req, res){
        sam.stories.fetch(
            storyId,
            function(err, data) {
                if (err) {
                    res.json('500', { error: err });
                } else {
                    if(data && data.socialAssets) {
                        sortDate(data.socialAssets);
                        res.render('index', data);
                    } else {
                        res.json('500', { error: 'no data received' });
                    }
                }
            }
        );
    }

    return {
        index: index
    }
}

module.exports = PublicRoutes;