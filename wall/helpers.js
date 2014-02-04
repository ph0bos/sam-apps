function Helpers() {

    function timeago(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + 'y';
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + 'm';
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + 'd';
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + 'h';
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + 'm';
        }
        return Math.floor(seconds) + 's';
    }

    function datetime(date) {
        var months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        var d = new Date(date);

        var hours = d.getHours();
        if(hours<10) hours = '0' + hours;

        var minutes = d.getMinutes();
        if(minutes<10) minutes = '0' + minutes;

        var month = months[d.getMonth()];
        var day = d.getDate();

        return month+' '+day+', '+hours+':'+minutes;
    }

    function tagattrs(srctags) {
        var tag, tags = '';

        for(var i = 0; i < srctags.length; i++) {
            tag = srctags[i];
            tag = tag.replace(/\W/g, '').toLowerCase();
            tags += tag+(i===srctags.length-1?'':' ');
        }

        return tags;
    }

    return {
        timeago: timeago,
        datetime: datetime,
        tagattrs: tagattrs
    }
}

module.exports = Helpers;