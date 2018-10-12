function GoToFacebook() {
    window.open('https://www.facebook.com/416772128397905', '_system');
}

function GoToTwitter() {
    window.open('https://mobile.twitter.com/mcrdiscgolf', '_system');
}

function GoToWebsite() {    
    window.open('http://www.manchesterdiscgolf.co.uk', '_system', '')    
}

function GoToMaps() {
    window.open('http://google.com/maps?q=M21+9LF', '_system', '')
}

function Email(body) {

    window.plugins.socialsharing.shareViaEmail(
        body,
        'Feedback - Disc Golf',        
        ['mcrdgapp@gmail.com'],
        null,
        null,
        null, // FILES: can be null, a string, or an array
        ShareSuccess,
        ShareFail
    );    
}

function GoToEmail() {
    Email("");
}