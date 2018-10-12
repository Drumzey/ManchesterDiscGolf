function SetNamesAndDisableBoxes() {
    
    SetHoleVisibility();    
    SetPar();    
    SetPlayerVisibility();
    //Set the player names and disable the controls that are not relevant

    var turnedOff = false;

    for (i = 0; i < 4; i ++) {
        var value = playerNames[i];

        if (value) {
            if (i == 0) {
                document.getElementById('player' + (i + 1) + 'Name').innerText = value;
                EnableControls(i + 1);
            }
            else {
                for (var f = 0; f < friends.length; f++) {
                    if (friends[f].name === value) {
                        document.getElementById('player' + (i + 1) + 'Name').innerText = friends[f].abbrev;
                        EnableControls(i + 1);
                    }
                }
            }
        }
        else {
            document.getElementById('player' + (i + 1) + 'Name').innerText = '';
            DisableControls(i + 1);                        
            var btn = document.getElementById('player' + (i + 1) + 'Add');
            if (turnedOff) {                
                btn.style.display = 'none';
            }
            else {
                btn.style.display = '';
            }
            turnedOff = true;
        }
        
    }
    
    ClearOrPopulateScores();   
    doTotalling();
}

function ClearOrPopulateScores() {
    
    //Iterate over the inputs getting the current items
    var countI = 0;

    for (j = 1; j <= 4; j++) {
        countI = 0;

        for (i = 1; i <= 18; i++) {
            if (document.getElementById("p" + j.toString() + i.toString())) {
                var item = document.getElementById("p" + j.toString() + i.toString());                
                
                if (playerScores[j - 1][i - 1] != null) {                    
                    item.value = playerScores[j - 1][i - 1];                    
                    changeBackground(item.id);                    
                    updateCurrentRoundStatus(item.id);
                }
                else {
                    item.value = "";
                    item.style.background = "white";

                    var statusItem = document.getElementById("p" + j.toString() + i.toString() + "status");
                    statusItem.value = "";

                    var totalitem = document.getElementById("player" + j.toString() + "Tot");
                    totalitem.value = "";
                }
            }
        }
    }    
}

function SaveTempGame() {

    var currentGame = new TemporaryGame();
    currentGame.playerNames = playerNames;
    currentGame.currentGameType = currentGameType;
    currentGame.currentCourseType = currentCourseType;    
    currentGame.holesPlayed = holesPlayed;
    currentGame.playerScores = playerScores;        
    SetItemInStorage('tempGame', currentGame);
}

function UpdatePlayerScore(id) {
    changeBackground(id);
    doTotalling();    
    updateCurrentRoundStatus(id);
    SaveTempGame();
}

function updateCurrentRoundStatus(id) {
    var hole = id.substring(2);
    var player = id.substring(1, 2);
    var currentTotal = 0;
    var currentPar = 0;

    for (i = 0; i < parseInt(hole, 10); i++) {
        //only if we have played that hole do we consider it in our total
        if (GetHolesPlayed().indexOf(parseInt(hole, 10)) != -1) {
            if (GetPlayerScores(player)[i]) {
                currentTotal += GetPlayerScores(player)[i];
                if (currentCourseType === 'red') {
                    currentPar += coursePar[i];
                }
                else {
                    currentPar += courseParBlue[i];
                }
            }
        }
    }

    var currentPlayerStatus = currentTotal - currentPar;

    if (currentPlayerStatus > 0) {
        currentPlayerStatus = '+' + currentPlayerStatus;
    }
    else if (currentPlayerStatus == 0) {
        currentPlayerStatus = "E";
    }

    document.getElementById(id + 'status').innerText = currentPlayerStatus;

    //What if we have gone back to correct a score?
    //then all scores from this hole onwards need to be considered
    for (i = parseInt(hole, 10) + 1; i <= 18; i++) {
        if (GetHolesPlayed().indexOf(i) != -1) {
            if (GetPlayerScores(player)[i - 1]) {
                //We have got a score for this hole so calculate the total            
                currentTotal += GetPlayerScores(player)[i-1];
                if (currentCourseType === 'red') {
                    currentPar += coursePar[i-1];
                }
                else {
                    currentPar += courseParBlue[i-1];
                }

                currentPlayerStatus = currentTotal - currentPar;
                if (currentPlayerStatus > 0) {
                    currentPlayerStatus = '+' + currentPlayerStatus;
                }
                else if (currentPlayerStatus == 0) {
                    currentPlayerStatus = "E";
                }
                document.getElementById('p' + player + (i) + 'status').innerText = currentPlayerStatus;
            }
        }
    }
}

function changeBackground(id) {

    //Get par
    var hole = id.substring(2);
    var par = 0;
    if (currentCourseType === 'red') {
        par = coursePar[parseInt(hole, 10) - 1]
    }
    else {        
        par = courseParBlue[parseInt(hole, 10) - 1]
    }

    var value = document.getElementById(id).value;

    var x = parseInt(value, 10)
        
    if (value) {
        if ((x == (par - 2)) || (x == (par - 3))) {
            document.getElementById(id).style.background = COLOUR_YELLOW;
            document.getElementById(id).style.color = "black";
        }
        else if (x == (par - 1)) {
            document.getElementById(id).style.background = COLOUR_RED;
            document.getElementById(id).style.color = "black";
        }
        else if (x == par) {
            document.getElementById(id).style.background = COLOUR_GREY;
            document.getElementById(id).style.color = "black";
        }
        else if (x == (par + 1)) {
            document.getElementById(id).style.background = COLOUR_BLACK;
            document.getElementById(id).style.color = "white";
        }
        else {
            document.getElementById(id).style.background = COLOUR_BLUE;
            document.getElementById(id).style.color = "black";
        }
    }
    else {
        document.getElementById(id).style.background = "white";
        document.getElementById(id).style.color = "white";
    }  
}

function AllPlayersHaveFinished() {    
    var status = new Array();

    if (playerNames[0]) { status.push(playerNames[0]); }
    if (playerNames[1]) { status.push(playerNames[1]); }
    if (playerNames[2]) { status.push(playerNames[2]); }
    if (playerNames[3]) { status.push(playerNames[3]); }
    if (playerNames[4]) { status.push(playerNames[4]); }

    for (i = 1; i <= status.length; i++) {
        
        var holes = holesPlayed;
        
        for (j = 0; j < holes.length; j++) {
            var number = holes[j];

            var val = document.getElementById('p' + i.toString() + number.toString()).value;

            if (val) {
                //We have a value, ace
            }
            else {
                //We don't have value in a players score
                return false;
            }
        }
    }

    return true;
}

function OnLeaveGame() {
    ShowPopup("#confirmLeave");   
}

function OnGameEnd() {

    if (AllPlayersHaveFinished()) {

        for (i = 0; i < 4; i++) {
            playerTotals[i] = document.getElementById('player' + (i+1) + 'Tot').value
        }     
       
        SetEndGameScores();
        ResultsClicked();
    }
    else {
        ShowPopup("#confirmFinished");
    }
}

function StorePartialStats() {
    var holes = holesPlayed;
    var holesActuallyPlayed = [];

    for (j = 0; j < holes.length; j++) {
        var number = holes[j];

        var val = document.getElementById('p1' + number.toString()).value;

        if (val) {
            holesActuallyPlayed.push(number);            
        }        
    }

    var round = new Round();

    round.Holes = holesActuallyPlayed;
    round.FullRound = holesActuallyPlayed.length == 18;
    round.Scores = GetScores();
    round.CourseType = currentCourseType;
    round.Total = GetTotal(1);
    round.Date = GetDate();
    rounds.push(round);
    SetItemInStorage("rounds", rounds);
    //reset tempGame as finished
    SetItemInStorage('tempGame', 'false');
    
    for (i = 0; i < 4; i++) {
        playerTotals[i] = document.getElementById('player' + (i + 1) + 'Tot').value
    }

    SetEndGameScores(false);
    ResultsClicked();

    ////Navigate to and refresh the dashboard
    //NavigateToInternalPage("#Dashboard");
    //RefreshDashboard();
}

function doTotalling() {
    
    for (j = 1; j <= 4; j++) {      
        playerScores[j - 1] = [];
        var total = 0;

        for (i = 1; i <= 18; i++) {
            var item = document.getElementById("p" + j.toString() + i.toString());

            if (item) {
                if (item.value) {
                    total += parseInt(item.value, 10);                    
                    playerScores[j - 1][i - 1] = parseInt(item.value, 10);
                }
                else {
                    playerScores[j - 1][i - 1] = null;
                }
            }
        }

        if (total > 0) {
            playerTotals[j - 1] = total;   
            document.getElementById("player" + j.toString() + "Tot").value = total;
        }
    }
}