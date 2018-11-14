//GET
function CallMDGOnline(url, type, successCallback, failureCallback, completeCallBack, message) {
    if (message === '') {
        message = "Getting Data...";
    }

    $.mobile.loading('show', { text: message, textVisible: "true" });

    var jqxhr = $.ajax({
        url: url,
        type: type,
        contentType: 'application/json',
        success: function () {
            latestXHTTP = jqxhr;
            successCallback();
        },
        error: function () {
            latestXHTTP = jqxhr;
            failureCallback();
        },
        complete: function () {
            completeCallBack();
        }
    });
}

function CallACOnlineWithBodyAndWait(url, type, body, successCallback, failureCallback, completeCallBack, message) {
    if (message == '') {
        message = "Loading...";
    }

    $.mobile.loading('show', { text: message, textVisible: "true" });

    var jqxhr = $.ajax({
        url: url,
        type: type,
        contentType: 'application/json',
        data: JSON.stringify(body),
        success: function () {
            latestXHTTP = jqxhr;
            successCallback();
        },
        error: function () {
            latestXHTTP = jqxhr;
            failureCallback();
        },
        complete: function () {
            completeCallBack();
        }
    });
}