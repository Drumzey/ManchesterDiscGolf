var playerNames = [];
var playerScores = [];
var playerTotals = [];

var holesPlayed = [];

var currentGameType = 'full';

var currentCourseType = 'red';

var numberOfPlayers = 0;

var clickedFirst = 0;

function SetAllToggles(currentToggleId, value) {

    if (currentToggleId != '#coursetogglestats')
        SetToggle('#coursetogglestats', value);
    if (currentToggleId != '#coursetoggle')
        SetToggle('#coursetoggle', value);
    if (currentToggleId != '#coursetoggleplayers')
        SetToggle('#coursetoggleplayers', value);
    if (currentToggleId != '#coursetogglecustom')
        SetToggle('#coursetogglecustom', value);
}

function SetToggle(toggleid, value) {
    if ($(toggleid).hasClass('ui-flipswitch-input')) {
        $(toggleid).val(value).flipswitch('refresh');
    }
    else {
        $(toggleid).val(value).trigger('create');
    }    
}

function SetCurrentCourseTypeAndRestyle(currentToggleId, value, callback) {
    currentCourseType = value;
    if (value === 'blue')
    {
        if (callback)
            callback();

        $('link[id="coursestyle"]').attr('href', 'css/themes/water/jquery.mobile-1.4.2.css');
    }
    else if (value === 'red') {

        if (callback)
            callback();

        $('link[id="coursestyle"]').attr('href', 'css/themes/candy/jquery.mobile-1.4.2.css');
    }
    SetAllToggles(currentToggleId, value);
}

function SetCurrentCourseTypeStats() {

    clickedFirst += 1;

    if (clickedFirst === 1) {
        if ($("#coursetogglestats").val() === 'blue') {
            SetCurrentCourseTypeAndRestyle("#coursetogglestats", 'blue', RefreshStats);                        
        }
        else {
            SetCurrentCourseTypeAndRestyle("#coursetogglestats", 'red', RefreshStats);                        
        }
        clickedFirst = 0;
    }       
}

function SetCurrentCourseType() {

    clickedFirst += 1;

    if (clickedFirst === 1) {        
        if ($("#coursetoggle").val() === 'blue') {
            SetCurrentCourseTypeAndRestyle("#coursetoggle", 'blue', RefreshDashboard);   
        }
        else {
            SetCurrentCourseTypeAndRestyle("#coursetoggle", 'red', RefreshDashboard);            
        }
        clickedFirst = 0;
    }   
}

function SetCurrentCourseTypePlayers() {

    clickedFirst += 1;

    if (clickedFirst === 1) {
        if ($("#coursetoggleplayers").val() === 'blue') {
            SetCurrentCourseTypeAndRestyle("#coursetoggleplayers", 'blue');           
        }
        else {
            SetCurrentCourseTypeAndRestyle("#coursetoggleplayers", 'red');
        }
        
        clickedFirst = 0;        
    }    
}

function SetCurrentCourseTypeCustom() {
    clickedFirst += 1;

    if (clickedFirst === 1) {
        if ($("#coursetogglecustom").val() === 'blue') {
            SetCurrentCourseTypeAndRestyle("#coursetogglecustom", 'blue');                              
        }
        else {
            SetCurrentCourseTypeAndRestyle("#coursetogglecustom", 'red');   
        }
        
        clickedFirst = 0;        
    }        
}

function GetPlayerName(player) {
    return playerNames[player - 1];
}

function GetPlayerScores(player) {
    //For a custom game we need to mark the other holes scores
    var scores = [];

    for (var loop = 0; loop < 18; loop++) {
        scores[loop] = null;
    }

    for (var hole = 0; hole < holesPlayed.length; hole++)
    {   //     the holes index                                   the holes index
        scores[holesPlayed[hole] - 1] = playerScores[player - 1][holesPlayed[hole] - 1];
    }

    return scores;
}

function GetTotal(player) {
    return playerTotals[player - 1];
}

function DisableControls(i) {
    ChangeControlEnabled(i,true);
}

function EnableControls(i) {
    ChangeControlEnabled(i,false);
}

function ChangeControlEnabled(i,value) {
    for (j = 1; j < 19; j++) {

        var parent = document.getElementById('p' + i.toString() + j.toString() + "cell");
        var parentStatus = document.getElementById('p' + i.toString() + j.toString() + "status");                

        if (parent) {
            parent.disabled = value;
            if (value === true) {
                parent.style.display = 'none';
                parentStatus.innerText = '';
                parentStatus.style.display = 'none';                
            }
            else {
                parent.style.display = '';
                parentStatus.innerText = '';
                parentStatus.style.display = '';                
            }
        }
    }
}

function nextField(current, e) {

    var code = e.keyCode;
    switch (code) {
        case 8:            
            break;
        case 46:            
            break;

        default:

            var inputs = $(':input');
            var currentIndex = inputs.index(current);

            var exit = 0;

            while (exit == 0 && currentIndex < inputs.length) {
                var nextInput = inputs.get(currentIndex + 1);

                if (nextInput) {
                    var itemparent = document.getElementById(nextInput.id + "cell");
                    if (itemparent) {
                        if (!itemparent.disabled) {

                            //We know the item isnt disabled but hte table row might be....
                            //Need to extract the hole number from the id and figure out if the table is good or not
                            var holenumber = nextInput.id.substring(2);

                            var holerow = document.getElementById("hole" + holenumber);

                            if (!holerow.disabled) {
                                nextInput.focus();
                                exit = 1;
                            }
                        }
                    }
                }

                if (currentIndex == inputs.length - 1) {
                    exit = -1;
                }
                else {
                    currentIndex = inputs.index(nextInput);
                }
            }

            if (exit == 1) {
                //we have found an element
            }
            else {
                //we havent found anything
                //So are at the end of the game                
                var done = document.getElementById("doneBtn");
                var alignWithTop = true;
                done.tabIndex = "-1";
                done.focus();
                done.scrollIntoView(alignWithTop);
            }
            break;
    }
}

function SetHoleVisibility() {

    for (var i = 0; i < 18; i++) {
        var name = "hole" + (i+1).toString();
        var row = document.getElementById(name);
        if (row) {
            row.disabled = true;
            //Also want to make it invisible.....
            row.style.display = 'none';
        }
    }

    for (var i = 0; i < holesPlayed.length; i++) {
        var name = "hole" + (holesPlayed[i]).toString();
        var row = document.getElementById(name);
        if (row) {
            row.style.display = '';
            row.disabled = false;         
        }
    }
}

function SetPar() {
    var total = 0;
    var par = 0;

    for (i = 0; i < holesPlayed.length; i++) {
        if (currentCourseType === 'red') {
            par = coursePar[(holesPlayed[i] - 1)];
        }
        else {
            par = courseParBlue[(holesPlayed[i] - 1)];
        }

        if (document.getElementById('hole' + holesPlayed[i] + 'Par'))
        {
            document.getElementById('hole' + holesPlayed[i] + 'Par').innerText = par.toString();

            total = total + par;
        }
    }
    
    document.getElementById('parTotal').innerText = total.toString();
}

function SetCustomHoles() {
    var holes = [];

    for (i = 0; i < 18; i++) {
        var input = document.getElementById('checkbox-' + i.toString());
        var checked = input.checked;

        if (checked) {
            holes.push(i + 1);
        }
    }

    holesPlayed = holes;
}

function SetGameType() {
    var choice;

    $("input[id*=radio-course-type-]:checked").each(function () {
        choice = $(this).val();
    });

    currentGameType = choice;
}

function SetMyName() {
    var players = new Array();
    playerNames = [];
    var playerName = document.getElementById('player1').value;

    var playerNameKey2 = $("#select-Player2").val();
    var playerNameKey3 = $("#select-Player3").val();
    var playerNameKey4 = $("#select-Player4").val();    

    if (playerName) { players.push(playerName) }

    for (var f = 0; f < friends.length; f++) {
        if (friends[f].name == playerNameKey2)
            players.push(playerNameKey2);
        if (friends[f].name == playerNameKey3)
            players.push(playerNameKey3);
        if (friends[f].name == playerNameKey4)
            players.push(playerNameKey4);
    }
    
    numberOfPlayers = players.length;

    for (i = 0; i < players.length; i++) {
        playerNames.push(players[i]);
    }

    for (i = players.length; i < 4; i++) {
        playerNames.push('');
    }
}

function AddPlayer() {

    ClosePopup();

    //FIND THE FRIEND WITH THE SAME NAME AS THE CURRENT SELECTION
    var newName = '';
    for (var f = 0; f < friends.length; f++) {
        if (friends[f].name === currentSelect.value) {
            newName = friends[f].abbrev;
            break;
        }
    }
    
    if (!newName) {
        return;
    }

    var value2 = playerNames[1];
    var value3 = playerNames[2];
    var value4 = playerNames[3];    

    for (i = 1; i < 4; i++) {

        if (playerNames[i] == '') {
            //enable controls
            EnableControls(i + 1);

            var btn = document.getElementById('player' + (i + 1) + 'Add');            
            btn.style.display = 'none';
            playerNames[i] = newName;

            document.getElementById('player' + (i + 1) + 'Name').innerText = newName;

            if (i != 3) {
                btn = document.getElementById('player' + (i + 2) + 'Add'); 
                btn.style.display = 'initial';
                btn.disabled = false;
            }

            break;
        }

    }
}

function SetPlayerVisibility() {
    for (i = 2; i <= 4; i++) {
        var btn = document.getElementById('player' + i + 'Add');        
        btn.style.display = 'none';
        btn.disabled = false;
    }
}

function ShowAddPlayerNamePopup() {    
    ShowPopup("#AddPlayer");
    PopulateOptionsForFriendsDropDowns();
}