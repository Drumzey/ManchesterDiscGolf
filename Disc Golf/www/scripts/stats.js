var currentStatMode = 'all'
var currentHole = null;

function ChangeStatsMode() {    
    currentStatMode = $("#selectStats").val();

    if (currentStatMode !== 'byhole') {        
        $("#holesPanel").closest('div.ui-select').hide();        
        currentHole = null;
    }
    else {                
        $("#holesPanel").closest('div.ui-select').show();                
        currentHole = 1;
    }

    RefreshStats();    
}

function HoleRadioChanged() {

    var value = $("#holesPanel").val();    
    currentHole = value;
    RefreshStats();
}

function updateStats() {
    HideUnusedStats();
    //Expand Sections    
    $("#hole_averages").collapsible("expand");
    $("#bests_and_worsts").collapsible("expand");
    $("#shot_stats").collapsible("expand");
    $("#general").collapsible("expand");
    $("#in_theory").collapsible("expand");

    createValueStats();
    createGraphStats();

    //Alter font size
    //$("div.fullround").find("text:contains('www')").css("font-size", "6px");
    //$("div.all").find("text:contains('www')").css("font-size", "6px");
    //$("div.byhole").find("text:contains('www')").css("font-size", "6px");

    var graphs = toArray($("div.fullround").find("text:contains('www')"));
    ChangeCollectionText(graphs, true);    
    graphs = toArray($("div.all").find("text:contains('www')"));
    ChangeCollectionText(graphs, true);    
    graphs = toArray($("div.byhole").find("text:contains('www')"));
    ChangeCollectionText(graphs, true);    
}

function RefreshStats() {
    $.mobile.loading('show', {
        theme: 'b',
        text: "Loading...",
        textVisible: "true"
    });
    window.setTimeout(function () { updateStats(); $.mobile.loading('hide'); }, 500);       
}

function HideUnusedStats() {

    //Hide and show all expanders    
    $("#hole_averages").hide();
    $("#bests_and_worsts").hide();
    $("#shot_stats").hide();
    $("#general").hide();
    $("#in_theory").hide();

    if (currentStatMode === 'fullround') {
        $("#hole_averages").toggle();
        $("#bests_and_worsts").toggle();
        $("#general").toggle();
        $("#in_theory").toggle();
    }
    else if (currentStatMode === 'all') {
        $("#hole_averages").toggle();
        $("#bests_and_worsts").toggle();
        $("#shot_stats").toggle();
        $("#general").toggle();
    }
    else { // 'byhole'
        $("#hole_averages").toggle();
        $("#bests_and_worsts").toggle();
        $("#shot_stats").toggle();
        $("#general").toggle();
    }

    //Hide all children in allStats        
    $("#hole_averages").children("div").find("div").hide();
    $("#bests_and_worsts").children("div").find("div").hide();
    $("#shot_stats").children("div").find("div").hide();   
    $("#general").children("div").find("div").hide();       
    $("#in_theory").children("div").find("div").hide();           

    //Find all elements with the class of the current stats mode
    //And make them visible
    var elements = document.getElementsByClassName(currentStatMode);

    for (var e = 0; e < elements.length; e++) {
        elements[e].style.display = '';
    }

   
}

function GetStatsRoundsPlayed() {

    var totalRounds = 0;

    rounds.forEach(function (round) {
        if (round.FullRound && round.CourseType === currentCourseType)
            totalRounds += 1;
    });

    return totalRounds;
}

function GetStatsPartialRoundsPlayed() {
    return rounds.length;
}

function GetStatsHolesPlayed(hole) {

    var holesPlayed = 0;

    rounds.forEach(function (round) {

        if (hole == null) {
            if (round.CourseType === currentCourseType) {
                holesPlayed += round.Holes.length;
            }
        }
        else {
            if (round.CourseType === currentCourseType) {
                var index = round.Holes.indexOf(hole);
                if (index != -1)
                    holesPlayed += 1;
            }
        }
    });

    return holesPlayed;

}

function GetBestRoundPlayed() {

    var lowestRound = 0;
    
    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (round.FullRound) {
                if (lowestRound == 0) {
                    lowestRound = round.Total;
                }
                else if (round.Total < lowestRound) {
                    lowestRound = round.Total;
                }
            }
        }
    });

    if (lowestRound == 0) {
        return '-';
    }

    var returnValue = '';

    if (currentCourseType === 'red')
        returnValue =  lowestRound - coursePar.reduce((a, b) => a + b, 0);
    else
        returnValue = lowestRound - courseParBlue.reduce((a, b) => a + b, 0);    

    if (returnValue > 0)
        returnValue = '+' + returnValue;
    else if (returnValue === 0)
        returnValue = 'Par';

    return returnValue;
}

function GetWorstRoundPlayed() {

    var highestRound = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (round.FullRound) {
                if (highestRound == 0) {
                    highestRound = round.Total;
                }
                else if (round.Total > highestRound) {
                    highestRound = round.Total;
                }
            }
        }
    });

    if (highestRound == 0) {
        return '-';
    }

    var returnValue = '';

    if (currentCourseType === 'red')
        returnValue = highestRound - coursePar.reduce((a, b) => a + b, 0);
    else
        returnValue = highestRound - courseParBlue.reduce((a, b) => a + b, 0);

    if (returnValue > 0)
        returnValue = '+' + returnValue;
    else if (returnValue === 0)
        returnValue = 'Par';

    return returnValue;
}

function GetBestRoundArray() {

    var bestRound = [];

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (round.FullRound) {
                if (bestRound.length == 0) {
                    bestRound = round;
                }
                else if (round.Total < bestRound.Total) {
                    bestRound = round;
                }
            }
        }
    });

    return bestRound;
}

function GetLowestScoreForHole(hole) {

    var lowestScore = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            var index = round.Holes.indexOf(hole);
            if (index != -1) {
                if (lowestScore == 0) {
                    lowestScore = round.Scores[index];
                }
                else if (round.Scores[index] < lowestScore) {
                    lowestScore = round.Scores[index];
                }
            }
        }
    });

    if (lowestScore == 0)
        return null;

    return lowestScore;
}

function GetHighestScoreForHole(hole) {

    var highestScore = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            var index = round.Holes.indexOf(hole);
            if (index != -1) {
                if (highestScore == 0) {
                    highestScore = round.Scores[index];
                }
                else if (round.Scores[index] > highestScore) {
                    highestScore = round.Scores[index];
                }
            }
        }
    });

    return highestScore;
}

function GetLastXRounds(number, holeNumber) {

    var totals = [];
    var numberOfRounds = number;

    for (var i = rounds.length - 1; i >= 0; i--) {
        if (rounds[i].CourseType === currentCourseType) {

            if (holeNumber == null) {
                if (rounds[i].FullRound) {
                    totals[numberOfRounds - 1] = parseInt(rounds[i].Total, 10);
                    numberOfRounds -= 1;
                }                
            }
            else {
                if (rounds[i].Holes.indexOf(holeNumber) != -1) {
                    totals[numberOfRounds - 1] = parseInt(rounds[i].Scores[holeNumber - 1], 10);
                    numberOfRounds -= 1;
                }
            }

            if (numberOfRounds == 0) {
                break;
            }
        }
    }

    return totals;
}

function GetBestRoundInTheory() {

    var hole1 = GetLowestScoreForHole(1);
    var hole2 = GetLowestScoreForHole(2);
    var hole3 = GetLowestScoreForHole(3);
    var hole4 = GetLowestScoreForHole(4);
    var hole5 = GetLowestScoreForHole(5);
    var hole6 = GetLowestScoreForHole(6);
    var hole7 = GetLowestScoreForHole(7);
    var hole8 = GetLowestScoreForHole(8);
    var hole9 = GetLowestScoreForHole(9);
    var hole10 = GetLowestScoreForHole(10);
    var hole11 = GetLowestScoreForHole(11);
    var hole12 = GetLowestScoreForHole(12);
    var hole13 = GetLowestScoreForHole(13);
    var hole14 = GetLowestScoreForHole(14);
    var hole15 = GetLowestScoreForHole(15);
    var hole16 = GetLowestScoreForHole(16);
    var hole17 = GetLowestScoreForHole(17);
    var hole18 = GetLowestScoreForHole(18);

    var frontNine = hole1 + hole2 + hole3 + hole4 + hole5 + hole6 + hole7 + hole8 + hole9;
    var backNine = hole10 + hole11 + hole12 + hole13 + hole14 + hole15 + hole16 + hole17 + hole18;

    var returnValue = '';

    if (isNaN(frontNine + backNine)) {
        return '-';
    }
    else {
        returnValue = frontNine + backNine;        
    }    
    
    if (currentCourseType === 'red')
        returnValue = returnValue - coursePar.reduce((a, b) => a + b, 0);
    else
        returnValue = returnValue - courseParBlue.reduce((a, b) => a + b, 0);

    if (returnValue > 0)
        returnValue = '+' + returnValue;
    else if (returnValue === 0)
        returnValue = 'Par';

    return returnValue;


}

function GetBestRoundInTheoryArray() {

    var bestRound = [];
    bestRound.push(GetLowestScoreForHole(1));
    bestRound.push(GetLowestScoreForHole(2));
    bestRound.push(GetLowestScoreForHole(3));
    bestRound.push(GetLowestScoreForHole(4));
    bestRound.push(GetLowestScoreForHole(5));
    bestRound.push(GetLowestScoreForHole(6));
    bestRound.push(GetLowestScoreForHole(7));
    bestRound.push(GetLowestScoreForHole(8));
    bestRound.push(GetLowestScoreForHole(9));
    bestRound.push(GetLowestScoreForHole(10));
    bestRound.push(GetLowestScoreForHole(11));
    bestRound.push(GetLowestScoreForHole(12));
    bestRound.push(GetLowestScoreForHole(13));
    bestRound.push(GetLowestScoreForHole(14));
    bestRound.push(GetLowestScoreForHole(15));
    bestRound.push(GetLowestScoreForHole(16));
    bestRound.push(GetLowestScoreForHole(17));
    bestRound.push(GetLowestScoreForHole(18));
    return bestRound;
}

function GetAverageFullRound() {

    var totalRounds = 0;
    var totalShots = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (round.FullRound) {
                totalRounds += 1;
                totalShots += round.Scores.reduce((a, b) => a + b, 0);
            }
        }
    });

    var returnValue = '';

    if (totalShots == 0 || totalRounds == 0) {
        return '-';
    } else {
        returnValue = (totalShots / totalRounds).toFixed(0);        
    }
    
    if (currentCourseType === 'red')
        returnValue = returnValue - coursePar.reduce((a, b) => a + b, 0);
    else
        returnValue = returnValue - courseParBlue.reduce((a, b) => a + b, 0);

    if (returnValue > 0)
        returnValue = '+' + returnValue;
    else if (returnValue === 0)
        returnValue = 'Par';

    return returnValue;
}

function GetHoleAverage(hole) {
    var totalRounds = 0;
    var totalShots = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (round.Holes.indexOf(hole) != -1) {
                totalRounds += 1;
                totalShots += round.Scores[hole - 1]; // The scores collection is not the right size to work with custom games yet
            }
        }
    });

    var result = (totalShots / totalRounds).toFixed(1);
    return result;
}

function GetStatsTotalShots(hole) {

    var shotsPlayed = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                shotsPlayed += round.Scores.reduce((a, b) => a + b, 0);
            }
            else {
                var index = round.Holes.indexOf(hole);
                if (index != -1)
                    shotsPlayed += round.Scores[index];
            }
        }
    });

    return shotsPlayed;

}

function GetStatsAces(hole) {
    var aces = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {
                    if (round.Scores[i] === 1)
                        aces += 1;
                }                
            }
            else {
                if(round.Scores[hole - 1] === 1)
                    aces += 1;                
            }
        }
    });

    return aces;
}

function GetStatsAlbatrosses(hole) {
    var albatrosses = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {

                    //assume red
                    var par = coursePar[i];
                    if (currentCourseType === 'blue') //could be blue
                        par = courseParBlue[i];

                    if (round.Scores[i] < (par - 2))
                        albatrosses += 1;
                }
            }
            else {

                var par = coursePar[hole - 1];
                if (currentCourseType === 'blue') //could be blue
                    par = courseParBlue[hole - 1];

                if (round.Scores[hole - 1] < (par - 2))
                    albatrosses += 1;                
            }
        }
    });

    return albatrosses;
}

function GetStatsEagles(hole) {
    var eagles = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {

                    //assume red
                    var par = coursePar[i];
                    if (currentCourseType === 'blue') //could be blue
                        par = courseParBlue[i];

                    if (round.Scores[i] === (par - 2) && round.Scores[i] != 1)
                        eagles += 1;
                }
            }
            else {

                var par = coursePar[hole - 1];
                if (currentCourseType === 'blue') //could be blue
                    par = courseParBlue[hole - 1];

                if (round.Scores[hole - 1] === (par - 2) && round.Scores[i] != 1)
                    eagles += 1;                
            }
        }
    });

    return eagles;
}

function GetStatsBirdies(hole) {
    var birdies = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {
                    
                    var par = coursePar[i];
                    if (currentCourseType === 'blue') //could be blue
                        par = courseParBlue[i];

                    if (round.Scores[i] === (par - 1))
                        birdies += 1;
                }
            }
            else {

                var par = coursePar[hole - 1];
                if (currentCourseType === 'blue') //could be blue
                    par = courseParBlue[hole - 1];

                if (round.Scores[hole - 1] === (par - 1))
                    birdies += 1;
            }
        }
    });

    return birdies;
}

function GetStatsPars(hole) {
    var pars = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {

                    //assume red
                    var par = coursePar[i];
                    if (currentCourseType === 'blue') //could be blue
                        par = courseParBlue[i];

                    if (round.Scores[i] === par)
                        pars += 1;
                }
            }
            else {

                var par = coursePar[hole - 1];
                if (currentCourseType === 'blue') //could be blue
                    par = courseParBlue[hole - 1];

                if (round.Scores[hole - 1] === par)
                    pars += 1;
            }
        }
    });

    return pars;
}

function GetStatsBogies(hole) {
    var bogies = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {

                    //assume red
                    var par = coursePar[i];
                    if (currentCourseType === 'blue') //could be blue
                        par = courseParBlue[i];

                    if (round.Scores[i] === (par + 1))
                        bogies += 1;
                }
            }
            else {

                var par = coursePar[hole - 1];
                if (currentCourseType === 'blue') //could be blue
                    par = courseParBlue[hole - 1];

                if (round.Scores[hole - 1] === (par + 1))
                    bogies += 1;
            }
        }
    });

    return bogies;
}

function GetStatsDoubleBogies(hole) {
    var doubleBogies = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {

                    //assume red
                    var par = coursePar[i];
                    if (currentCourseType === 'blue') //could be blue
                        par = courseParBlue[i];

                    if (round.Scores[i] === (par + 2))
                        doubleBogies += 1;
                }
            }
            else {

                var par = coursePar[hole - 1];
                if (currentCourseType === 'blue') //could be blue
                    par = courseParBlue[hole - 1];

                if (round.Scores[hole - 1] === (par + 2))
                    doubleBogies += 1;
            }
        }
    });

    return doubleBogies;
}

function GetStatsDoubleBogiesPlus(hole) {
    var doubleBogiesPlus = 0;

    rounds.forEach(function (round) {
        if (round.CourseType === currentCourseType) {
            if (hole == null) {
                for (i = 0; i < 18; i++) {

                    //assume red
                    var par = coursePar[i];
                    if (currentCourseType === 'blue') //could be blue
                        par = courseParBlue[i];

                    if (round.Scores[i] > (par + 2))
                        doubleBogiesPlus += 1;
                }
            }
            else {

                var par = coursePar[hole - 1];
                if (currentCourseType === 'blue') //could be blue
                    par = courseParBlue[hole - 1];

                if (round.Scores[hole - 1] > (par + 2))
                    doubleBogiesPlus += 1;
            }
        }
    });

    return doubleBogiesPlus;
}

function GetStatsBestHole() {    
    
    var averagesMinusPar = getAveragesMinusPar('min');
    var minimumValue = Math.min.apply(null, averagesMinusPar);
    if (minimumValue < 9000) {
        return averagesMinusPar.indexOf(minimumValue) + 1;
    }

    return '-';
}

function GetStatsWorstHole() {
    var averagesMinusPar = getAveragesMinusPar('max');
    var maximumValue = Math.max.apply(null, averagesMinusPar);
    
    if (maximumValue > -9000) {
        return averagesMinusPar.indexOf(maximumValue) + 1;
    }

    return '-';
}

function getAveragesMinusPar(mode) {    
    var averageMinusPar = [];    

    var par = coursePar;
    if (currentCourseType === 'blue') {
        par = courseParBlue;
    }

    for (i = 0; i < 18; i++)
    {
        var hole = GetHoleAverage(i + 1);
        if (mode == 'max' && isNaN(hole)) {
            hole = -10000;
        }
        else if (mode == 'min' && isNaN(hole)) {
            hole = 10000;
        }
        
        averageMinusPar[i] = hole - par[i];
        
    }

    return averageMinusPar;
}

function GetTotalCumulative(array, index) {

    var total = 0;

    for (var i = 0; i < index; i++) {
        total += array[i];
    }

    return total;
}
