function Share() {
    ShowPopup("#SharePop");
}

function ShareOnEmail()
{
    var players = 0;
    var starthole = 1;
    var endhole = 18;
    var names = [];    
    var holesUsed = [];
    var emails = [];
    
    if (currentGameType == 'front') {        
        endhole = 9;
    }
    else if (currentGameType == 'back') {
        starthole = 10;     
    }    

    var name1 = GetPlayerName(1);
    var name2 = GetPlayerName(2);
    var name3 = GetPlayerName(3);
    var name4 = GetPlayerName(4);    
    
    if (name1)
    {
        players = players + 1;             
        names.push(name1)
    }
    if (name2)
    {
        players = players + 1;     
        names.push(name2)
        for (var f = 0; f < friends.length; f++) {
            if (friends[f].name === name2) {
                emails.push(friends[f].email);
                break;
            }
        }
    }
    if (name3)
    {
        players = players + 1;    
        names.push(name3)
        for (var f = 0; f < friends.length; f++) {
            if (friends[f].name === name3) {
                emails.push(friends[f].email);
                break;
            }
        }
    }
    if (name4)
    {
        players = players + 1;    
        names.push(name4)
        for (var f = 0; f < friends.length; f++) {
            if (friends[f].name === name4) {
                emails.push(friends[f].email);
                break;
            }
        }
    }   

    var body = "Hi,\r\n\r\nHere are the scores for our recent round\r\n\r\n";

    var date = new Date().toLocaleDateString();    
    date = date.replace(/\//g, "-");
    body = body + "\r\n\r\nCome back and play again soon!";
    
    var fileContents = CreateResultsFileContents(players, starthole, endhole, holesPlayed, names);    
    CreateAttachmentFileAndEmail('Disc golf round ' + date, body, fileContents, emails);        
}

function CreateResultsFileContents(players, starthole, endhole, holesUsed, names) {
    
    var body = ',';

    //Put the hole numbers in here
    if (currentGameType == 'custom') {   
        for (p = 0; p < holesUsed.length; p++) {
            var holeNumber = holesUsed[p];
            body = body + holeNumber
            if (p != (holesUsed.length-1)) {
                body = body + ',';
            }
        }
    }
    else {
        for (p = starthole; p <= endhole; p++) {
            body = body + p
            if (p != endhole) {
                body = body + ',';
            }
        }
        body = body + "\r\n\r\n";
    }
    
    //Put the pars here
    body = body + ',';    

    //Par holes
    var parTotal = 0;
    if (currentGameType == 'custom') {

        var par = coursePar;
        if (currentCourseType === 'blue') {
            par = courseParBlue;
        }

        for (p = 0; p < holesUsed.length; p++) {
            var holeNumber = holesUsed[p];   
            parTotal += parseInt(par[holeNumber], 10);
            body = body + par[holeNumber];            
            body = body + ',';            
        }              
    }
    else {        
        var par = coursePar;
        if (currentCourseType === 'blue') {
            par = courseParBlue;
        }

        for (p = starthole; p <= endhole; p++) {     
            parTotal += parseInt(par[p - 1], 10);
            body = body + par[p - 1];              
            body = body + ',';            
        }
    }    

    //Add the total Par here
    body = body + parTotal;
    body = body + "\r\n\r\n";

    for (j = 1; j <= players; j++) {        
        body = body + names[j - 1] + ":,";
        
        var runningtotal = 0;
        
        if (currentGameType == 'custom') {
            //Needs to switch if custom game
        }
        else {            
            for (i = starthole; i <= endhole; i++) {              
                var item = document.getElementById("p" + j.toString() + i.toString());

                if (item) {
                    body = body + item.value + ",";
                    runningtotal = runningtotal + parseInt(item.value, 10);
                }              
            }
        }
                
        body = body + runningtotal.toString();
        body = body + "\r\n";
    }    
    return body;
}

function ShareOnFaceBook() {    
    var message = "I've just played disc golf at Longford Park, Stretford, Manchester.";
    if (holesPlayed.length == 18) {
        message += " I played a full round from the " + currentCourseType + " tees and scored " + GetPlayerScores(1).reduce((a, b) => a + b, 0) + ", which is ";
        var par = 0;
        var score = 0;
        if (currentCourseType === 'red') {
            par = coursePar.reduce((a, b) => a + b, 0);
        }
        else {
            par = courseParBlue.reduce((a, b) => a + b, 0);
        }
        score = GetPlayerScores(1).reduce((a, b) => a + b, 0) - par;

        if (score < 0) {
            message += score + ".";
        }
        else if (score == 0) {
            message += "par.";
        }
        else {
            message += "+" + score + ".";
        }
    }    

    //window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint
    //    (message,
    //    null /* img */,
    //    null /* url */,
    //    '',
    //    function () { console.log('share ok') },
    //    function (errormsg) { alert(errormsg) });
        
    window.plugins.socialsharing.shareViaFacebook(message,
                 null,
                 "http://www.manchesterdiscgolf.co.uk",                 
                 console.log('share ok'),
                 function (errormsg) { alert(errormsg) });
}

function ShareOnTwitter() {
    var message = "I've just played disc golf at Longford Park, Stretford, Manchester (@MCRDiscGolf).";
    if (holesPlayed.length == 18) {
        message += " I played a full round from the " + currentCourseType + " tees and scored " + GetPlayerScores(1).reduce((a, b) => a + b, 0) + ", which is ";
        var par = 0;
        var score = 0;
        if (currentCourseType === 'red') {
            par = coursePar.reduce((a, b) => a + b, 0);
        }
        else {
            par = courseParBlue.reduce((a, b) => a + b, 0);
        }
        score = GetPlayerScores(1).reduce((a, b) => a + b, 0) - par;

        if (score < 0) {
            message += score + ".";
        }
        else if (score == 0) {
            message += "par.";
        }
        else {
            message += "+" + score + ".";
        }
    }    

    window.plugins.socialsharing.shareViaTwitter(message, null, "http://www.manchesterdiscgolf.co.uk");
}


function ShareOnOther() {
    var message = "I've just played disc golf at Longford Park, Stretford, Manchester.";
    if (holesPlayed.length == 18) {        
        message += " I played a full round from the " + currentCourseType + " tees and scored " + GetPlayerScores(1).reduce((a, b) => a + b, 0) + ", which is ";
        var par = 0;
        var score = 0;
        if (currentCourseType === 'red') {
            par = coursePar.reduce((a, b) => a + b, 0);            
        }
        else {
            par = courseParBlue.reduce((a, b) => a + b, 0);
        }
        score = GetPlayerScores(1).reduce((a, b) => a + b, 0) - par;

        if (score < 0) {
            message += score + ".";
        }
        else if (score == 0) {
            message += "par.";
        }
        else {
            message += "+" + score + ".";
        }
    }    

    window.plugins.socialsharing.share(message, null, null, "http://www.manchesterdiscgolf.co.uk")
}

function ShareOnText() {
    var message = "I've just played disc golf at Longford Park, Stretford, Manchester.";
    var textLink = document.getElementById("textlink");

    if (holesPlayed.length == 18) {
        message += " I played a full round from the " + currentCourseType + " tees and scored " + GetPlayerScores(1).reduce((a, b) => a + b, 0) + ", which is ";
        var par = 0;
        var score = 0;
        if (currentCourseType === 'red') {
            par = coursePar.reduce((a, b) => a + b, 0);
        }
        else {
            par = courseParBlue.reduce((a, b) => a + b, 0);
        }
        score = GetPlayerScores(1).reduce((a, b) => a + b, 0) - par;

        if (score < 0) {
            message += score + ".";
        }
        else if (score == 0) {
            message += "par.";
        }
        else {
            message += "+" + score + ".";
        }
    }    
    alert(message);    
    textLink.href = "sms:?body=" + message;
}

function ShareSuccess() {
}

function ShareFail() {
    alert('Unable to share via email, please check you have an email client set');
}