'use strict';
console.log('Facebook Messenger content script 2');

var fb_dtsg = $('input[name="fb_dtsg"]').val();
var fbid = $.cookie('c_user');

function send(msg, to) {
    function serialize(obj) {
        var str = [];
        for(var p in obj){
            str.push(p + '=' + encodeURIComponent(obj[p]));
        }

        return str.join('&');
    }
    function random(len) {
        var min = Math.pow(10, len-1);
        var max = Math.pow(10, len);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function generatePhstamp(qs, dtsg) {
        var input_len = qs.length;
        var numeric_csrf_value = '';

        for(var ii=0;ii<dtsg.length;ii++) {
            numeric_csrf_value+=dtsg.charCodeAt(ii);
        }
        return '1' + numeric_csrf_value + input_len;
    }
    var d = new Date();
    var data = {
        'message_batch[0][timestamp_relative]': '' + ('0'+d.getHours()).slice(-2) + ':' + ('0'+d.getMinutes()).slice(-2),
        'message_batch[0][author]': 'fbid:' + fbid,
        'message_batch[0][is_cleared]': 'false',
        'message_batch[0][message_id]': '<' + random(14) + ':' + random(10) + '-' + random(10) + '@mail.projektitan.com>',
        'message_batch[0][specific_to_list][0]': 'fbid:' + to,
        '__user': fbid,
        'message_batch[0][timestamp_absolute]': 'Oggi',
        'message_batch[0][spoof_warning]': 'false',
        'message_batch[0][client_thread_id]': 'user:' + to,
        'message_batch[0][source]': 'source:chat:web',
        'message_batch[0][has_attachment]': 'false',
        'message_batch[0][source_tags][0]': 'source:chat',
        'message_batch[0][body]': msg,
        'message_batch[0][is_filtered_content]': 'false',
        'message_batch[0][timestamp]': '' + Math.round(new Date().getTime() / 1000),
        'message_batch[0][is_unread]': 'false',
        'message_batch[0][action_type]': 'ma-type:user-generated-message',
        '__a': '1',
        'message_batch[0][specific_to_list][1]': 'fbid:' + fbid,
        'message_batch[0][html_body]': 'false',
        'message_batch[0][status]': '0',
        'client': 'mercury',
        'message_batch[0][is_forward]': 'false',
        'fb_dtsg': fb_dtsg
    };
    var req = serialize(data);
    // Thanks http://pastebin.com/VJAhUw30
    req += '&phstamp=' + generatePhstamp(req, data.fb_dtsg);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/ajax/mercury/send_messages.php');
    xmlhttp.send(req);
}

send('hi', '100007600443930');
