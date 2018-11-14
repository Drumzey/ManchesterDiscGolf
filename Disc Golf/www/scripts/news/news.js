var receivedNews = false;
var newsURL = 'https://manchesterdiscgolf.azurewebsites.net/news/get';

function News() {

    if (!receivedNews) {
        CallMDGOnline(newsURL, 'GET',        
            function () {
                SuccessfulGetNews();
            },
            function () {
                UnsuccessfulGetNews();
            },
            function () {
                $.mobile.loading('hide');
            },
            "Getting latest news....");
    }
    else {
        NavigateToInternalPage("#News");
    }
}

function SuccessfulGetNews() {
    
    if (latestXHTTP.status == "200") {
        receivedNews = true;

        var response = JSON.parse(latestXHTTP.responseText);

        var output = [];

        var newsnode = document.getElementById("newsfeed");
        while (newsnode.firstChild) {
            newsnode.removeChild(newsnode.firstChild);
        };

        if (response.length == 0) {
            output.push('<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">No news</li>');
            output.push('<li style="white-space: normal;text-overflow: clip;font-size: 70%" class="ui-li ui-li-static ui-btn-up-c">We have no news or upcoming events. Check back later.</li>');
        }

        for (var i = 0; i < response.length; i++) {
            var newsItem = response[i];
            var title = newsItem.title;
            var body = newsItem.body;            
            //Populate the news feed
            output.push('<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">' + title + '</li>');
            output.push('<li style="white-space: normal;text-overflow: clip;font-size: 70%" class="ui-li ui-li-static ui-btn-up-c">' + body + '</li>');
        }

        $('#newsfeed').append(output.join('')).listview().listview('refresh');
        $('#newsfeed').listview().listview('refresh');
        $('#newsfeed').listview('refresh');
        NavigateToInternalPage("#News");        
    }
    else {
        UnsuccessfulGetNews();
    }    
}

function UnsuccessfulGetNews() {
    alert('Unable to get news feed. Try again later');
}