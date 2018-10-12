var rounds = [];

function LoadRounds() {

    $.mobile.loading('show', {
        theme: 'b',
        text: "Loading...",
        textVisible: "true"
    });
    GetItemFromStorageWithCallBack("rounds", function (value) {
        rounds = value;
        window.setTimeout(function () { updateDashboard(); $.mobile.loading('hide'); }, 500);        
    });    
}

function SaveRound() {
    
    var round = new Round();

    round.Holes = GetHolesPlayed();
    round.FullRound = GetHolesPlayed().length == 18;
    round.Scores = GetScores();
    round.CourseType = currentCourseType;       
    round.Total = GetTotal(1);
    round.Date = GetDate();
    
    rounds.push(round);

    SetItemInStorage("rounds", rounds);
}

function GetHolesPlayed() {
    return holesPlayed;
}

function GetScores() {
    return GetPlayerScores(1);
}

function GetAces() {

    var holes = [];

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] == 1) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetAlbatrosses() {
    
    var holes = [];

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] < (par[i - 1] - 2)) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetEagles() {
    var holes = [];

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] == (par[i - 1] - 2)) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetBirdies() {
    var holes = [];

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] == (par[i - 1] - 1)) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetPars() {
    var holes = [];

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] == (par[i - 1])) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetBogies() {
    var holes = [];

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] == (par[i - 1] + 1)) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetDoubleBogies() {
    var holes = [];

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] == (par[i - 1] + 2)) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetDoubleBogiesPlus() {
    var holes = [];

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 1; i <= GetPlayerScores(1).length; i++) {
        if (GetPlayerScores(1)[i - 1] != 0) {
            if (GetPlayerScores(1)[i - 1] > (par[i - 1] + 2)) {
                holes.push(i);
            }
        }
    }

    return holes;
}

function GetDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}