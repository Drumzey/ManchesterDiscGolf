var currentRoundHistoryIndex = 0;
var nextRoundIndex = 0;
var previousRoundIndex = 0;

function CreateRoundHistory() {        
    
    var shots = rounds[currentRoundHistoryIndex].Total;

    var par = coursePar;
    if (rounds[currentRoundHistoryIndex].CourseType === 'blue') {
        par = courseParBlue;
    }
    var score = rounds[currentRoundHistoryIndex].Total - par.reduce((a, b) => a + b, 0);
    if (score == 0) {
        score = 'Par';
    }
    else if (score > 0) {
        score = "+" + score;
    }
    
    var titleText = rounds[currentRoundHistoryIndex].Date + ' - ' + shots + ' - ' + score;    

    document.getElementById("currentRoundDate").innerText = titleText;
    
    $.mobile.loading('show', {
        theme: 'b',
        text: "Loading...",
        textVisible: "true"
    });
    window.setTimeout(function () { createRoundGraphs(); getNextAndPreviousIndex(); $.mobile.loading('hide'); }, 500);
}

function LoadFirstRound() {
    currentRoundHistoryIndex = 0;
    CreateRoundHistory();
}

function LoadLastRound() {
    var lastRound = 0;
    for (var i = rounds.length - 1; i >= 0; i--) {
        if (rounds[i].FullRound) {
            lastRound = i;
            break;
        }
    }

    currentRoundHistoryIndex = lastRound;
    CreateRoundHistory();
}

function LoadPreviousRound() {
    currentRoundHistoryIndex = previousRoundIndex;
    CreateRoundHistory();
}

function LoadNextRound() {
    currentRoundHistoryIndex = nextRoundIndex;
    CreateRoundHistory();
}

function getNextAndPreviousIndex() {    
    var next = -1;
    var previous = -1;
    nextRoundIndex = 0;
    previousRoundIndex = 0;

    for (var i = currentRoundHistoryIndex + 1; i < rounds.length; i++) {
        if (rounds[i].FullRound) {
            next = i;
            nextRoundIndex = i;
            break;
        }
    }

    for (var i = currentRoundHistoryIndex - 1; i >= 0; i--) {
        if (rounds[i].FullRound) {
            previous = i;
            previousRoundIndex = i;
            break;
        }
    }
    
    if (previous != -1) {
        $('#round_previous').prop('disabled', false).removeClass('ui-disabled');
    }
    else {
        $('#round_previous').prop('disabled', true).addClass('ui-disabled');
    }
    
    if (next != -1) {
        $('#round_next').prop('disabled', false).removeClass('ui-disabled');
    }
    else {
        $('#round_next').prop('disabled', true).addClass('ui-disabled');
    }
}

function createRoundGraphs() {    
    createRoundLineGraph();    
    createRoundBarGraph();    
    createRoundPieChart();        
}

function createRoundLineGraph() {
    var currentRound = rounds[currentRoundHistoryIndex];

    var sampleData = [];

    var par = coursePar;
    if (currentRound.CourseType === 'blue') {
        par = courseParBlue;
    }

    if (currentRound.length === 0) {
        sampleData = [
            { Key: '1', total: 0, par: 0 },
            { Key: '2', total: 0, par: 0 },
            { Key: '3', total: 0, par: 0 },
            { Key: '4', total: 0, par: 0 },
            { Key: '5', total: 0, par: 0 },
            { Key: '6', total: 0, par: 0 },
            { Key: '7', total: 0, par: 0 },
            { Key: '8', total: 0, par: 0 },
            { Key: '9', total: 0, par: 0 },
            { Key: '10', total: 0, par: 0 },
            { Key: '11', total: 0, par: 0 },
            { Key: '12', total: 0, par: 0 },
            { Key: '13', total: 0, par: 0 },
            { Key: '14', total: 0, par: 0 },
            { Key: '15', total: 0, par: 0 },
            { Key: '16', total: 0, par: 0 },
            { Key: '17', total: 0, par: 0 },
            { Key: '18', total: 0, par: 0 }
        ];
    }
    else {
        sampleData = [
            { Key: '1', total: GetTotalCumulative(currentRound.Scores, 1) - GetTotalCumulative(par, 1), par: 0 },
            { Key: '2', total: GetTotalCumulative(currentRound.Scores, 2) - GetTotalCumulative(par, 2), par: 0 },
            { Key: '3', total: GetTotalCumulative(currentRound.Scores, 3) - GetTotalCumulative(par, 3), par: 0 },
            { Key: '4', total: GetTotalCumulative(currentRound.Scores, 4) - GetTotalCumulative(par, 4), par: 0 },
            { Key: '5', total: GetTotalCumulative(currentRound.Scores, 5) - GetTotalCumulative(par, 5), par: 0 },
            { Key: '6', total: GetTotalCumulative(currentRound.Scores, 6) - GetTotalCumulative(par, 6), par: 0 },
            { Key: '7', total: GetTotalCumulative(currentRound.Scores, 7) - GetTotalCumulative(par, 7), par: 0 },
            { Key: '8', total: GetTotalCumulative(currentRound.Scores, 8) - GetTotalCumulative(par, 8), par: 0 },
            { Key: '9', total: GetTotalCumulative(currentRound.Scores, 9) - GetTotalCumulative(par, 9), par: 0 },
            { Key: '10', total: GetTotalCumulative(currentRound.Scores, 10) - GetTotalCumulative(par, 10), par: 0 },
            { Key: '11', total: GetTotalCumulative(currentRound.Scores, 11) - GetTotalCumulative(par, 11), par: 0 },
            { Key: '12', total: GetTotalCumulative(currentRound.Scores, 12) - GetTotalCumulative(par, 12), par: 0 },
            { Key: '13', total: GetTotalCumulative(currentRound.Scores, 13) - GetTotalCumulative(par, 13), par: 0 },
            { Key: '14', total: GetTotalCumulative(currentRound.Scores, 14) - GetTotalCumulative(par, 14), par: 0 },
            { Key: '15', total: GetTotalCumulative(currentRound.Scores, 15) - GetTotalCumulative(par, 15), par: 0 },
            { Key: '16', total: GetTotalCumulative(currentRound.Scores, 16) - GetTotalCumulative(par, 16), par: 0 },
            { Key: '17', total: GetTotalCumulative(currentRound.Scores, 17) - GetTotalCumulative(par, 17), par: 0 },
            { Key: '18', total: GetTotalCumulative(currentRound.Scores, 18) - GetTotalCumulative(par, 18), par: 0 }
        ];
    }

    var lowestValue = 0;
    var highestValue = 0;

    for (var i = 0; i < sampleData.length; i++) {
        if (sampleData[i].total > highestValue) {
            highestValue = sampleData[i].total;
        }

        if (sampleData[i].total < lowestValue) {
            lowestValue = sampleData[i].total;
        }
    }

    var roundHistorySettings = createRoundHistoryLineGraph(sampleData, "Round cumulative score", null, 1, highestValue + 3, lowestValue - 3);
    $('#current_round_line').jqxChart(roundHistorySettings);
}

function createRoundBarGraph() {
    var currentRound = rounds[currentRoundHistoryIndex];

    var par = coursePar;
    if (currentRound.CourseType === 'blue') {
        par = courseParBlue;
    }

    var sampleData = [];

    if (currentRound.length === 0) {
        sampleData = [
            { Hole: '1', score: 0 },
            { Hole: '2', score: 0 },
            { Hole: '3', score: 0 },
            { Hole: '4', score: 0 },
            { Hole: '5', score: 0 },
            { Hole: '6', score: 0 },
            { Hole: '7', score: 0 },
            { Hole: '8', score: 0 },
            { Hole: '9', score: 0 },
            { Hole: '10', score: 0 },
            { Hole: '11', score: 0 },
            { Hole: '12', score: 0 },
            { Hole: '13', score: 0 },
            { Hole: '14', score: 0 },
            { Hole: '15', score: 0 },
            { Hole: '16', score: 0 },
            { Hole: '17', score: 0 },
            { Hole: '18', score: 0 }
        ];
    }
    else {
        sampleData = [
            { Hole: '1', score: currentRound.Scores[0] - par[0] },
            { Hole: '2', score: currentRound.Scores[1] - par[1] },
            { Hole: '3', score: currentRound.Scores[2] - par[2] },
            { Hole: '4', score: currentRound.Scores[3] - par[3] },
            { Hole: '5', score: currentRound.Scores[4] - par[4] },
            { Hole: '6', score: currentRound.Scores[5] - par[5] },
            { Hole: '7', score: currentRound.Scores[6] - par[6] },
            { Hole: '8', score: currentRound.Scores[7] - par[7] },
            { Hole: '9', score: currentRound.Scores[8] - par[8] },
            { Hole: '10', score: currentRound.Scores[9] - par[9] },
            { Hole: '11', score: currentRound.Scores[10] - par[10] },
            { Hole: '12', score: currentRound.Scores[11] - par[11] },
            { Hole: '13', score: currentRound.Scores[12] - par[12] },
            { Hole: '14', score: currentRound.Scores[13] - par[13] },
            { Hole: '15', score: currentRound.Scores[14] - par[14] },
            { Hole: '16', score: currentRound.Scores[15] - par[15] },
            { Hole: '17', score: currentRound.Scores[16] - par[16] },
            { Hole: '18', score: currentRound.Scores[17] - par[17] }
        ];
    }

    var settings = createConditionalColourGraph(sampleData, 'Holes in round', null);
    $('#current_round_bar').jqxChart(settings);
}

var assigned = false;

function createRoundPieChart() {
        
    var aces = 0;
    var eagles = 0;
    var birdies = 0;
    var pars = 0;
    var bogies = 0;
    var doublebogies = 0;
    var doublebogiesplus = 0;
    
    var currentRound = rounds[currentRoundHistoryIndex];
    var par = coursePar;
    if (currentRound.CourseType === 'blue') {
        par = courseParBlue;
    }

    for (var i = 0; i < 18; i++) {
        if (currentRound.Scores[i] == 1)
            aces++
        else if (currentRound.Scores[i] == (par[i] - 2))
            eagles++;
        else if (currentRound.Scores[i] == (par[i] - 1))
            birdies++;
        else if (currentRound.Scores[i] == par[i])
            pars++
        else if (currentRound.Scores[i] == (par[i] + 1))
            bogies++;
        else if (currentRound.Scores[i] == (par[i] + 2))
            doublebogies++;
        else
            doublebogiesplus++;
    }
    
    var totalShots = 18;

    var acePerc = percentage(aces, totalShots);
    var eaglePerc = percentage(eagles, totalShots);
    var birdiePerc = percentage(birdies, totalShots);
    var parPerc = percentage(pars, totalShots);
    var bogiePerc = percentage(bogies, totalShots);
    var dbogiePerc = percentage(doublebogies, totalShots);
    var dbogieplusPerc = percentage(doublebogiesplus, totalShots);   

    var sampleData = [];

    if (rounds.length !== 0) {
        //Maybe only add the percentage if its not 0
        //but then you only add colours in the ledgend if theyve been seen
        sampleData = [
            { Score: 'Ace', Value: acePerc },
            { Score: 'Eagle', Value: eaglePerc },
            { Score: 'Birdie', Value: birdiePerc },
            { Score: 'Par', Value: parPerc },
            { Score: 'Bogie', Value: bogiePerc },
            { Score: 'D-Bogie', Value: dbogiePerc },
            { Score: 'D-Bogie+', Value: dbogieplusPerc }
        ]
    }
    
    var settings = createPieChart(sampleData, '% Shot type', null);
    $('#current_round_pie').jqxChart(settings);
    if (assigned == false) {
        $('#current_round_pie').jqxChart('addColorScheme', 'myScheme2',
            [DETAIL_ACE, DETAIL_EAGLE, DETAIL_BIRDIE, DETAIL_PAR, DETAIL_BOGIE, DETAIL_DOUBLEBOGIE, DETAIL_DOUBLEBOGIEPLUS]);
        $('#current_round_pie').jqxChart('colorScheme', 'myScheme2');
        assigned = true;
    }

    $('#current_round_pie').jqxChart('refresh');    
}