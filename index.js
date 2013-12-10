// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice = window.UserVoice || [];
(function () {
    var uv = document.createElement('script');
    uv.type = 'text/javascript';
    uv.async = true;
    uv.src = '//widget.uservoice.com/yprmU4gNZhVrvP2N9ks2cQ.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(uv, s)
})();
//
// UserVoice Javascript SDK developer documentation:
// https://www.uservoice.com/o/javascript-sdk
//
// Set colors
UserVoice.push(['set', {
    accent_color: '#448dd6',
    trigger_color: 'white',
    trigger_background_color: '#448dd6'
}]);
// Identify the user and pass traits
// To enable, replace sample data with actual user traits and uncomment the line
UserVoice.push(['identify', {
    //email: 'john.doe@example.com', // User’s email address
    //name: 'John Doe', // User’s real name
    //created_at: 1364406966, // Unix timestamp for the date the user signed up
    //id: 123, // Optional: Unique id of the user (if set, this should not change)
    //type: 'Owner', // Optional: segment your users by type
    //account: {
    // id: 123, // Optional: associate multiple users with a single account
    // name: 'Acme, Co.', // Account name
    // created_at: 1364406966, // Unix timestamp for the date the account was created
    // monthly_rate: 9.99, // Decimal; monthly rate of the account
    // ltv: 1495.00, // Decimal; lifetime value of the account
    // plan: 'Enhanced' // Plan name for the account
    //}
}]);
// Add default trigger to the bottom-right corner of the window:
UserVoice.push(['addTrigger', {
    mode: 'smartvote',
    trigger_position: 'bottom-right'
}]);
// Or, use your own custom trigger:
//UserVoice.push(['addTrigger', '#id', { mode: 'smartvote' }]);
// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);

$(document).ready(function () {
        $('.carousel').carousel({
            interval: 5000
        })
        //GLOBAL VARIABLES HERE//
        var apiKey = "2975b6e4c43147824522959761677",
            meetupGroupUrl = "Code-for-Miami";
        var memberList = new Array();
        //get the next event
        $.getJSON("http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=Code-For-Miami&desc=false&offset=0&format=json&page=20&fields=&sig_id=14485765&sig=ee64791e1ab7c9e6f82c5f5e47c85118fa698fd6&callback=?", function (upcomingData) {
                eventTime = upcomingData.results[0].time;
                //currentTime = eventTime + 1 //testing value
                currentTime = new Date().getTime();
                eventEndTime = eventTime + 60000 * 60 * 3;
                //eventEndTime = eventTime + upcomingData.results[0].duration;
                //the above line only works if a specific end time is set.
                //console.log("Current Time is " + currentTime)
                //console.log("Event End Time is " + eventEndTime);
                eventId = upcomingData.results[0].id;
                if (currentTime >= eventTime && currentTime < eventEndTime) { //console.log("Time to rock!");
                    var memberbox = "<div class='memberbox'></div>";
                    $(".carousel-caption").append(memberbox);
                    //$(".memberbox").hide();
                    //testing value for eventId
                    //eventId = "113850802";
                    function showThumbnails() {
                        //get the checkin data for the next event
                        $.getJSON("https://api.meetup.com/2/checkins?key=" + apiKey + "&sign=true&event_id=" + eventId + "&page=20&callback=?", function (checkinData) {
                            howMany = checkinData.meta.count;
                            //if there's nobody checked in, there's nothing to see here. if (howMany === 0) {
                            console.log("Nobody is checked in yet.");
                            $(".memberbox").html("<h2>Nobody has checked in yet.</h2>");
                            $(".memberbox").slideDown();
                            //else, let's get those thumbnails up and running. } else if (howMany >= 1) {
                            $.each(checkinData.results, function (i, checkinData) {
                                //console.log(checkinData.member_id);
                                $.getJSON("https://api.meetup.com/2/member/" + checkinData.member_id + "?key=" + apiKey + "&&sign=true&page=20&callback=?", function (memberData) {
                                    var memberName = memberData.name,
                                        toolTips = "<a class='tip' href='#' data-toggle='tooltip' data-placement='bottom' data-original-title='" + memberData.name + "'>",
                                        memberPix = memberData.photo.thumb_link,
                                        memberThumb = toolTips + "<img class='pix-thumb' src='" + memberPix + "' alt='" + memberData.name + "'/></a>";
                                    if (memberList.indexOf(memberName) === -1) {
                                        memberList.push(memberName);
                                        $(memberThumb).appendTo($(".memberbox"));
                                    } else {
                                        //do nothing
                                    }
                                    $('.tip').tooltip();
                                });
                            });
                            //event information $.getJSON("https://api.meetup.com/2/events?key="+apiKey+"&sign=true&event_id="+eventId+"&page=20&callback=?", function(eventData) { var eventName = eventData.results[0].name,
                            eventLocation = eventData.results[0].venue.name,
                            eventStAddress = eventData.results[0].venue.address_1,
                            eventCity = eventData.results[0].venue.city,
                            eventState = eventData.results[0].venue.state,
                            eventURL = eventData.results[0].event_url,
                            memberCount = memberList.length,
                            eventCheckin = "<p id='checkins'>" + memberCount + " Civic Hackers are checked in at <a href='http://maps.google.com/maps?q=" + eventStAddress + " " + eventCity + " " + eventState + "'>" + eventLocation + "</a> for <a href='" + eventURL + "'>" + eventName + "</a>.</p>";
                            console.log(memberCount);
                            $(window).load(function () {
                                $(eventCheckin).appendTo($(".memberbox"));
                                $(".memberbox").slideDown();
                            });
                        });
                    }
                });
        }
        showThumbnails();
    } else {
        console.log("Nothing to see here.");
    }
});
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21118166-4']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();