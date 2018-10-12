function createGraphStats() {

    if ($("#last_20_graph_stats").hasClass(currentStatMode)) {
        var lastRounds = [];
        if (currentHole == null)
        {
            var lastRounds = GetLastXRounds(20);
        }
        else {
            var lastRounds = GetLastXRounds(20, parseInt(currentHole, 10));
        }

        var courseParTotal = 0;
        var interval = 0;
        var max = 0;

        if (currentHole == null) {
            interval = 20;
            max = 100;

            if (currentCourseType === 'red') {
                courseParTotal = coursePar.reduce((a, b) => a + b, 0);
            }
            else {
                courseParTotal = courseParBlue.reduce((a, b) => a + b, 0);
            }
        }
        else {
            interval = 1;
            max = 9;

            if (currentCourseType === 'red') {
                courseParTotal = coursePar[currentHole -1];
            }
            else {
                courseParTotal = courseParBlue[currentHole - 1];
            }
        }

        var sampleData = [];

        for (var i = 19; i >= 0; i--) {
            var data = {
                Key: i, total: lastRounds[i], par: courseParTotal
            }
            sampleData.push(data);
        }

        var graphSettings = createRoundHistoryLineGraph(sampleData, "Last 20 Rounds", null, interval, max, 0);

        $('#last_20_graph_stats').jqxChart(graphSettings);
        $('#last_20_graph_stats').jqxChart('refresh');        
    }

    if ($("#best_round_graph_stats").hasClass(currentStatMode)) {
        var bestRound = GetBestRoundArray();

        var par = coursePar;
        if (currentCourseType === 'blue') {
            par = courseParBlue;
        }

        var sampleData = [];

        if (bestRound.length === 0) {
            sampleData = [             
            ];
        }
        else {
            sampleData = [
                { Hole: '1', score: bestRound.Scores[0] - par[0] },
                { Hole: '2', score: bestRound.Scores[1] - par[1] },
                { Hole: '3', score: bestRound.Scores[2] - par[2] },
                { Hole: '4', score: bestRound.Scores[3] - par[3] },
                { Hole: '5', score: bestRound.Scores[4] - par[4] },
                { Hole: '6', score: bestRound.Scores[5] - par[5] },
                { Hole: '7', score: bestRound.Scores[6] - par[6] },
                { Hole: '8', score: bestRound.Scores[7] - par[7] },
                { Hole: '9', score: bestRound.Scores[8] - par[8] },
                { Hole: '10', score: bestRound.Scores[9] - par[9] },
                { Hole: '11', score: bestRound.Scores[10] - par[10] },
                { Hole: '12', score: bestRound.Scores[11] - par[11] },
                { Hole: '13', score: bestRound.Scores[12] - par[12] },
                { Hole: '14', score: bestRound.Scores[13] - par[13] },
                { Hole: '15', score: bestRound.Scores[14] - par[14] },
                { Hole: '16', score: bestRound.Scores[15] - par[15] },
                { Hole: '17', score: bestRound.Scores[16] - par[16] },
                { Hole: '18', score: bestRound.Scores[17] - par[17] }
            ];
        }

        var settings = createConditionalColourGraph(sampleData, 'Holes in best round', null);
        $('#best_round_graph_stats').jqxChart(settings);
        $('#best_round_graph_stats').jqxChart('refresh');  
    }
    
    if ($("#best_round_progress_graph_stats").hasClass(currentStatMode)) {
        var bestRound = GetBestRoundArray();

        var sampleData = [];

        var par = coursePar;
        if (currentCourseType === 'blue') {
            par = courseParBlue;
        }

        if (bestRound.length === 0) {
            sampleData = [               
            ];
        }
        else {
            sampleData = [
                { Key: '1', total: (GetTotalCumulative(bestRound.Scores, 1) - GetTotalCumulative(par, 1)), par: 0 },
                { Key: '2', total: (GetTotalCumulative(bestRound.Scores, 2) - GetTotalCumulative(par, 2)), par: 0  },
                { Key: '3', total: (GetTotalCumulative(bestRound.Scores, 3) - GetTotalCumulative(par, 3)), par: 0  },
                { Key: '4', total: (GetTotalCumulative(bestRound.Scores, 4) - GetTotalCumulative(par, 4)), par: 0 },
                { Key: '5', total: (GetTotalCumulative(bestRound.Scores, 5) - GetTotalCumulative(par, 5)), par: 0 },
                { Key: '6', total: (GetTotalCumulative(bestRound.Scores, 6) - GetTotalCumulative(par, 6)), par: 0 },
                { Key: '7', total: (GetTotalCumulative(bestRound.Scores, 7) - GetTotalCumulative(par, 7)), par: 0 },
                { Key: '8', total: (GetTotalCumulative(bestRound.Scores, 8) - GetTotalCumulative(par, 8)), par: 0 },
                { Key: '9', total: (GetTotalCumulative(bestRound.Scores, 9) - GetTotalCumulative(par, 9)), par: 0 },
                { Key: '10', total: (GetTotalCumulative(bestRound.Scores, 10) - GetTotalCumulative(par, 10)), par: 0 },
                { Key: '11', total: (GetTotalCumulative(bestRound.Scores, 11) - GetTotalCumulative(par, 11)), par: 0 },
                { Key: '12', total: (GetTotalCumulative(bestRound.Scores, 12) - GetTotalCumulative(par, 12)), par: 0 },
                { Key: '13', total: (GetTotalCumulative(bestRound.Scores, 13) - GetTotalCumulative(par, 13)), par: 0 },
                { Key: '14', total: (GetTotalCumulative(bestRound.Scores, 14) - GetTotalCumulative(par, 14)), par: 0 },
                { Key: '15', total: (GetTotalCumulative(bestRound.Scores, 15) - GetTotalCumulative(par, 15)), par: 0 },
                { Key: '16', total: (GetTotalCumulative(bestRound.Scores, 16) - GetTotalCumulative(par, 16)), par: 0 },
                { Key: '17', total: (GetTotalCumulative(bestRound.Scores, 17) - GetTotalCumulative(par, 17)), par: 0 },
                { Key: '18', total: (GetTotalCumulative(bestRound.Scores, 18) - GetTotalCumulative(par, 18)), par: 0 }
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

        var roundHistorySettings = createRoundHistoryLineGraph(sampleData, "Best round cumulative", null, 2, highestValue + 1, lowestValue - 1);
        $('#best_round_progress_graph_stats').jqxChart(roundHistorySettings);
        $('#best_round_progress_graph_stats').jqxChart('refresh');  
    }

    if ($("#best_round_in_theory_graph_stats").hasClass(currentStatMode)) {

        var bestRoundInTheory = GetBestRoundInTheoryArray();        
        var sampleData = [];

        var par = coursePar;
        if (currentCourseType === 'blue') {
            par = courseParBlue;
        }

        for (i = 0; i < 18; i++) {
            if (bestRoundInTheory[i] === null) {
                bestRoundInTheory = [];
                break;
            }
        }

        if (bestRoundInTheory.length === 0) {
            sampleData = [                
            ];
        }
        else {
            sampleData = [
                { Hole: '1', score: bestRoundInTheory[0] - par[0] },
                { Hole: '2', score: bestRoundInTheory[1] - par[1] },
                { Hole: '3', score: bestRoundInTheory[2] - par[2] },
                { Hole: '4', score: bestRoundInTheory[3] - par[3] },
                { Hole: '5', score: bestRoundInTheory[4] - par[4] },
                { Hole: '6', score: bestRoundInTheory[5] - par[5] },
                { Hole: '7', score: bestRoundInTheory[6] - par[6] },
                { Hole: '8', score: bestRoundInTheory[7] - par[7] },
                { Hole: '9', score: bestRoundInTheory[8] - par[8] },
                { Hole: '10', score: bestRoundInTheory[9] - par[9] },
                { Hole: '11', score: bestRoundInTheory[10] - par[10] },
                { Hole: '12', score: bestRoundInTheory[11] - par[11] },
                { Hole: '13', score: bestRoundInTheory[12] - par[12] },
                { Hole: '14', score: bestRoundInTheory[13] - par[13] },
                { Hole: '15', score: bestRoundInTheory[14] - par[14] },
                { Hole: '16', score: bestRoundInTheory[15] - par[15] },
                { Hole: '17', score: bestRoundInTheory[16] - par[16] },
                { Hole: '18', score: bestRoundInTheory[17] - par[17] }
            ];
        }

        var settings = createConditionalColourGraph(sampleData, 'Theorectical round', null);
        $('#best_round_in_theory_graph_stats').jqxChart(settings);
        $('#best_round_in_theory_graph_stats').jqxChart('refresh');  
    }

    if ($("#best_round_in_theory_progress_graph_stats").hasClass(currentStatMode)) {
        var bestRound = GetBestRoundInTheoryArray();

        var sampleData = [];

        var par = coursePar;
        if (currentCourseType === 'blue') {
            par = courseParBlue;
        }

        for (i = 0; i < 18; i++) {
            if (bestRound[i] === null) {
                bestRound = [];
                break;
            }
        }

        if (bestRound.length === 0) {
            sampleData = [               
            ];
        }
        else {
            sampleData = [
                { Key: '1', total: (GetTotalCumulative(bestRound, 1) - GetTotalCumulative(par, 1)), par: 0 },
                { Key: '2', total: (GetTotalCumulative(bestRound, 2) - GetTotalCumulative(par, 2)), par: 0 },
                { Key: '3', total: (GetTotalCumulative(bestRound, 3) - GetTotalCumulative(par, 3)), par: 0 },
                { Key: '4', total: (GetTotalCumulative(bestRound, 4) - GetTotalCumulative(par, 4)), par: 0 },
                { Key: '5', total: (GetTotalCumulative(bestRound, 5) - GetTotalCumulative(par, 5)), par: 0 },
                { Key: '6', total: (GetTotalCumulative(bestRound, 6) - GetTotalCumulative(par, 6)), par: 0 },
                { Key: '7', total: (GetTotalCumulative(bestRound, 7) - GetTotalCumulative(par, 7)), par: 0 },
                { Key: '8', total: (GetTotalCumulative(bestRound, 8) - GetTotalCumulative(par, 8)), par: 0 },
                { Key: '9', total: (GetTotalCumulative(bestRound, 9) - GetTotalCumulative(par, 9)), par: 0 },
                { Key: '10', total: (GetTotalCumulative(bestRound, 10) - GetTotalCumulative(par, 10)), par: 0 },
                { Key: '11', total: (GetTotalCumulative(bestRound, 11) - GetTotalCumulative(par, 11)), par: 0 },
                { Key: '12', total: (GetTotalCumulative(bestRound, 12) - GetTotalCumulative(par, 12)), par: 0 },
                { Key: '13', total: (GetTotalCumulative(bestRound, 13) - GetTotalCumulative(par, 13)), par: 0 },
                { Key: '14', total: (GetTotalCumulative(bestRound, 14) - GetTotalCumulative(par, 14)), par: 0 },
                { Key: '15', total: (GetTotalCumulative(bestRound, 15) - GetTotalCumulative(par, 15)), par: 0 },
                { Key: '16', total: (GetTotalCumulative(bestRound, 16) - GetTotalCumulative(par, 16)), par: 0 },
                { Key: '17', total: (GetTotalCumulative(bestRound, 17) - GetTotalCumulative(par, 17)), par: 0 },
                { Key: '18', total: (GetTotalCumulative(bestRound, 18) - GetTotalCumulative(par, 18)), par: 0 }
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

        var roundHistorySettings = createRoundHistoryLineGraph(sampleData, "Theoretical round cumulative", null, 2, highestValue + 1, lowestValue - 1);
        $('#best_round_in_theory_progress_graph_stats').jqxChart(roundHistorySettings);
        $('#best_round_in_theory_progress_graph_stats').jqxChart('refresh');
    }
    
    if ($("#percentage_under_par_over_graph_stats").hasClass(currentStatMode)) {

        var under = GetStatsAces(currentHole) + GetStatsBirdies(currentHole) + GetStatsEagles(currentHole);
        var par = GetStatsPars(currentHole);
        var over = GetStatsBogies(currentHole) + GetStatsDoubleBogies(currentHole) + GetStatsDoubleBogiesPlus(currentHole);

        var totalShots = under + par + over;
        
        var underPercent = percentage(under, totalShots);
        var parPercent = percentage(par, totalShots);
        var overPercent = percentage(over, totalShots);
        
        var sampleData = [];

        if (rounds.length !== 0) {
            sampleData = [
                { Score: '-', Value: underPercent },
                { Score: 'Par', Value: parPercent },
                { Score: '+', Value: overPercent }
            ]
        }

        var settings = createPieChart(sampleData, '% Under Par Over', null);
        $('#percentage_under_par_over_graph_stats').jqxChart(settings);
        $('#percentage_under_par_over_graph_stats').jqxChart('refresh');       
        $('#percentage_under_par_over_graph_stats').jqxChart('addColorScheme', 'myScheme', [COLOUR_RED, COLOUR_GREY, COLOUR_BLACK]);
        $('#percentage_under_par_over_graph_stats').jqxChart('colorScheme', 'myScheme');
        $('#percentage_under_par_over_graph_stats').jqxChart('refresh');        
    }
}

function createValueStats() {
    
    DisplayValue('No times played', 'hole_played_stats', GetStatsHolesPlayed); //Hole
    DisplayValue('No of shots', 'hole_shots_stats', GetStatsTotalShots); //Hole

    DisplayValue('No. holes played', 'holes_played_stats', GetStatsHolesPlayed); //All FullRound - WILL NOT WORK FOR FULL ROUNDS
    DisplayValue('No. shots played', 'total_shots_stats', GetStatsTotalShots); //All FullRound - WILL NOT WORK FOR FULL ROUNDS
    DisplayValue('No. full rounds', 'full_rounds_played_stats', GetStatsRoundsPlayed); //All Fullround
    DisplayValue('No. rounds', 'rounds_played_stats', GetStatsPartialRoundsPlayed); //All

    DisplayValue('Best', 'best_round_played_stats', GetBestRoundPlayed); //Fullround
    DisplayValue('Worst', 'worst_round_played_stats', GetWorstRoundPlayed); //Fullround
    DisplayValue('Average', 'average_round_stats', GetAverageFullRound); //Fullround
    DisplayValue('Best in theory', 'best_round_in_theory_stats', GetBestRoundInTheory); //Fullround

    DisplayValue('Best', 'hole_best_stats', GetLowestScoreForHole); //Hole
    DisplayValue('Worst', 'hole_worst_stats', GetHighestScoreForHole); //Hole
    DisplayValue('Average', 'hole_average_stats', GetHoleAverage); //Hole    
    
    DisplayValue('Best Hole', 'best_stats', GetStatsBestHole); //All
    DisplayValue('Worst Hole', 'worst_stats', GetStatsWorstHole); //All    
    
    DisplayValue('Hole 1', 'ave_one_stats', GetHoleAverage, 1); //All
    DisplayValue('Hole 2', 'ave_two_stats', GetHoleAverage, 2); //All
    DisplayValue('Hole 3', 'ave_three_stats', GetHoleAverage, 3); //All
    DisplayValue('Hole 4', 'ave_four_stats', GetHoleAverage, 4); //All
    DisplayValue('Hole 5', 'ave_five_stats', GetHoleAverage, 5); //All
    DisplayValue('Hole 6', 'ave_six_stats', GetHoleAverage, 6); //All
    DisplayValue('Hole 7', 'ave_seven_stats', GetHoleAverage, 7); //All
    DisplayValue('Hole 8', 'ave_eight_stats', GetHoleAverage, 8); //All
    DisplayValue('Hole 9', 'ave_nine_stats', GetHoleAverage, 9); //All
    DisplayValue('Hole 10', 'ave_ten_stats', GetHoleAverage, 10); //All
    DisplayValue('Hole 11', 'ave_eleven_stats', GetHoleAverage, 11); //All
    DisplayValue('Hole 12', 'ave_twelve_stats', GetHoleAverage, 12); //All
    DisplayValue('Hole 13', 'ave_thirteen_stats', GetHoleAverage, 13); //All
    DisplayValue('Hole 14', 'ave_fourteen_stats', GetHoleAverage, 14); //All
    DisplayValue('Hole 15', 'ave_fifteen_stats', GetHoleAverage, 15); //All
    DisplayValue('Hole 16', 'ave_sixteen_stats', GetHoleAverage, 16); //All
    DisplayValue('Hole 17', 'ave_seventeen_stats', GetHoleAverage, 17); //All
    DisplayValue('Hole 18', 'ave_eighteen_stats', GetHoleAverage, 18); //All

    DisplayValue('Aces', 'aces_stats', GetStatsAces); //All Hole
    DisplayValue('Eagles', 'eagles_stats', GetStatsEagles); //All Hole
    DisplayValue('Birdies', 'birdies_stats', GetStatsBirdies); //All Hole
    DisplayValue('Pars', 'pars_stats', GetStatsPars); //All Hole
    DisplayValue('Bogies', 'bogies_stats', GetStatsBogies); //All Hole
    DisplayValue('Double Bogies', 'double_bogies_stats', GetStatsDoubleBogies); //All Hole
    DisplayValue('Double Bogie +', 'double_bogies_plus_stats', GetStatsDoubleBogiesPlus); //All Hole
}

function DisplayValue(message, elementName, functionToCall, holeOverride) {
    if ($('#' + elementName).hasClass(currentStatMode)) {
        var value = '-';
        var hole = currentHole;
        if (holeOverride)
            hole = holeOverride;

        if (currentStatMode === 'byhole' || holeOverride != null) {

            value = functionToCall(parseInt(hole, 10));            
        }
        else {            
            value = functionToCall();            
        }
        document.getElementById(elementName + '_value').innerText = message + ": " + value;
    }
}