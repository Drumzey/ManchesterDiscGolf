var graphsDrawn = false;

function ChangeCollectionText(collection, excludeY) {    
    //collection.forEach(function (element) {
    //    element.setAttribute("x", "10");
    //    if (excludeY != true) {
    //        var currentY = parseInt(element.getAttribute("y"), 10);
    //        var currentHeight = parseInt(element.getAttribute("height"), 10);
    //        element.setAttribute("y", currentY + currentHeight);
    //    }
    //}
    //);
}

function populateGraphPanels() {
    GetStatsRoundHistory();
    GetStatsBestRoundByHole();
    GetUnderParOverGraph();
    graphsDrawn = true;
    
    //$("div.dashboardtilebody").find("text:contains('www')").css("font-size", "6px");    
    //$("div.dashboardtilebodywide").find("text:contains('www')").css("font-size", "6px"); 
    
    var tiles = toArray($("div.dashboardtilebody").find("text:contains('www')"));
    ChangeCollectionText(tiles);    

    tiles = toArray($("div.dashboardtilebodywide").find("text:contains('www')"));
    ChangeCollectionText(tiles);
}

function toArray(obj) {
    var array = [];
    // iterate backwards ensuring that length is an UInt32
    for (var i = obj.length >>> 0; i--;) {
        array[i] = obj[i];
    }
    return array;
}

function GetStatsRoundHistory() {

    var rounds = GetLastXRounds(10);

    var courseParTotal = coursePar.reduce((a, b) => a + b, 0);

    if (currentCourseType === 'blue') {
        courseParTotal = courseParBlue.reduce((a, b) => a + b, 0);
    }
    
    var sampleData = [];
    
    for (var i = 9; i >= 0; i--) {        
        var data = {
            Key: i, total: rounds[i], par: courseParTotal
        }
        sampleData.push(data);        
    }
        
    if (graphsDrawn === false) {
        var settings = createRoundHistoryLineGraph(sampleData, null, null, 20, 100);
        $('#lastten').jqxChart(settings);        
    }
    else {
        $('#lastten').jqxChart({ source: sampleData });
        $('#lastten').jqxChart('refresh');
    }    
}

function GetStatsBestRoundByHole() {
    var bestRound = GetBestRoundArray();
    var sampleData = [];

    var courseParForStat = coursePar;

    if (currentCourseType === 'blue') {
        courseParForStat = courseParBlue;
    }

    if (bestRound.length === 0) {
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
            { Hole: '1', score: bestRound.Scores[0] - courseParForStat[0] },
            { Hole: '2', score: bestRound.Scores[1] - courseParForStat[1] },
            { Hole: '3', score: bestRound.Scores[2] - courseParForStat[2] },
            { Hole: '4', score: bestRound.Scores[3] - courseParForStat[3] },
            { Hole: '5', score: bestRound.Scores[4] - courseParForStat[4] },
            { Hole: '6', score: bestRound.Scores[5] - courseParForStat[5] },
            { Hole: '7', score: bestRound.Scores[6] - courseParForStat[6] },
            { Hole: '8', score: bestRound.Scores[7] - courseParForStat[7] },
            { Hole: '9', score: bestRound.Scores[8] - courseParForStat[8] },
            { Hole: '10', score: bestRound.Scores[9] - courseParForStat[9] },
            { Hole: '11', score: bestRound.Scores[10] - courseParForStat[10] },
            { Hole: '12', score: bestRound.Scores[11] - courseParForStat[11] },
            { Hole: '13', score: bestRound.Scores[12] - courseParForStat[12] },
            { Hole: '14', score: bestRound.Scores[13] - courseParForStat[13] },
            { Hole: '15', score: bestRound.Scores[14] - courseParForStat[14] },
            { Hole: '16', score: bestRound.Scores[15] - courseParForStat[15] },
            { Hole: '17', score: bestRound.Scores[16] - courseParForStat[16] },
            { Hole: '18', score: bestRound.Scores[17] - courseParForStat[17] }
        ];
    }    

    if (graphsDrawn === false) {
        var settings = createConditionalColourGraph(sampleData, null, null);
        $('#bestroundbyhole').jqxChart(settings);       
    }
    else {
        $('#bestroundbyhole').jqxChart({ source: sampleData });
        $('#bestroundbyhole').jqxChart('refresh');
    }    
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
} 

function GetUnderParOverGraph() {

    var under = GetStatsAces() + GetStatsBirdies() + GetStatsEagles();
    var par = GetStatsPars();
    var over = GetStatsBogies() + GetStatsDoubleBogies() + GetStatsDoubleBogiesPlus();    
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

    if (graphsDrawn === false) {
        var settings = createPieChart(sampleData, null, null);
        $('#underparover').jqxChart(settings);
        $('#underparover').jqxChart('addColorScheme', 'myScheme', [COLOUR_RED, COLOUR_GREY, COLOUR_BLACK]);        
        $('#underparover').jqxChart('colorScheme', 'myScheme');
        $('#underparover').jqxChart('refresh');
    }
    else {
        $('#underparover').jqxChart({ source: sampleData });
        $('#underparover').jqxChart('refresh');
    }    

}

function createRoundHistoryLineGraph(data, title, description, interval, max, min) {

    var visible = false;
    if (min == null)
        min = 0;

    var settings = {
        title: title,
        description: description,
        enableAnimations: true,
        showBorderLine: false,
        showLegend: false,
        showToolTips: false,
        padding: { left: 0, top: 10, right: 5, bottom: 20 }, //was 10
        titlePadding: { left: 0, top: 0, right: 0, bottom: 0 },
        source: data,
        colorScheme: 'scheme05',
        xAxis: {
            visible: visible,
            dataField: 'Key', //was Date
            unitInterval: 1,
            tickMarks: { visible: false, interval: 1 },
            gridLinesInterval: { visible: false, interval: 1 },
            valuesOnTicks: false,
            padding: { bottom: 0 }
        },
        valueAxis: {
            visible: true,
            unitInterval: interval,
            minValue: min,
            maxValue: max,
            formatSettings: { decimalPlaces: 0 },
            title: { visible: false, text: 'Shots' },
            labels: {
                visible: false,
                horizontalAlignment: 'right'
            }
        },
        seriesGroups:
        [
            {
                type: 'line',
                series:
                [
                    {
                        dataField: 'total',
                        symbolType: 'square',
                        enableSeriesToggle: false,
                        labels:
                        {
                            visible: true,
                            backgroundColor: '#FEFEFE',
                            backgroundOpacity: 0.2,
                            borderColor: '#7FC4EF',
                            borderOpacity: 0.7,
                            padding: { left: 5, right: 5, top: 0, bottom: 0 }
                        }
                    },
                    {
                        dataField: 'par',
                        symbolType: 'none',
                        enableSeriesToggle: false,
                        labels:
                        {
                            visible: false,
                            backgroundColor: '#FEFEFE',
                            backgroundOpacity: 0.2,
                            borderColor: '#7FC4EF',
                            borderOpacity: 0.7,
                            padding: { left: 5, right: 5, top: 0, bottom: 0 }
                        }
                    }
                ]
            }
        ]
    };
    return settings;    
}

function createConditionalColourGraph(data, title, description) {
    
    var defaultMin = 0;
    var defaultMax = 0;
    
    for (var i = 0; i < data.length; i++) {
        if (data[i].score > defaultMax) {
            defaultMax = data[i].score;
        }

        if (data[i].score < defaultMin) {
            defaultMin = data[i].score;
        }
    }

    defaultMax += 1; //go 1 above the max value;
    defaultMin -= 1; //go 1 below the max value;
    
    var settings = {
        title: title,
        description: description,
        enableAnimations: true,
        showBorderLine: false,
        showLegend: false,
        showToolTips: false,
        padding: { left: 5, top: 5, right: 5, bottom: 20 }, // was 5
        titlePadding: { left: 0, top: 0, right: 0, bottom: 0 },
        source: data,
        xAxis:
        {
            dataField: 'Hole',            
            tickMarks: {
                visible: true,
                interval: 1,
                color: '#BCBCBC'
            },
            gridLines: {
                visible: false,
                interval: 1,
                color: '#BCBCBC'
            },
            axisSize: 'auto'
        },
        valueAxis:
        {
            unitInterval: 1,
            minValue: defaultMin,
            maxValue: defaultMax,
            title: { text: '' }, 
            formatSettings: {                
                decimalPlaces: '0',
            },
            formatFunction: function (value) {
                if (value > 0)
                    return "+" + value;
                else
                    return value;
            },
            tickMarks: { color: '#BCBCBC' },
            gridLines: { color: '#BCBCBC' },
            labels: {
                horizontalAlignment: 'right',                
            },
        },
        colorScheme: 'scheme04',
        seriesGroups:
        [
            {
                type: 'column',
                columnsGapPercent: 5,
                seriesGapPercent: 5,
                enableSeriesToggle: false,
                series: [
                    {
                        dataField: 'score',
                        colorFunction: function (value, itemIndex, serie, group) {

                            if (value < -1)
                                return COLOUR_YELLOW;
                            if (value < 0)
                                return COLOUR_RED;
                            if (value < 1)
                                return COLOUR_GREY;
                            if (value < 2)
                                return COLOUR_BLACK

                            return COLOUR_BLUE;                            
                        }
                    }
                ]
            }
        ]
    };   
    return settings;
}

function createPieChart(data, title, description) {

    var settings = {
        title: title,
        description: description,
        enableAnimations: true,
        showLegend: true,
        showBorderLine: false,
        legendPosition: { left: 0, top: 0, width: 0, height: 0 },
        padding: { left: 0, top: 0, right: 0, bottom: 20 }, //was 0
        titlePadding: { left: 0, top: 0, right: 0, bottom:0 },
        source: data,
        colorScheme: 'scheme02',
        seriesGroups:
        [
            {
                type: 'pie',
                showLabels: true,
                series:
                [
                    {
                        dataField: 'Value',
                        displayText: 'Score',
                        labelRadius: 100,
                        initialAngle: 15,   
                        centerOffset: 0,
                        enableSelection: false,    
                        enableSeriesToggle: false,
                        formatSettings: { decimalPlaces: 1 }
                    }
                ]
            }
        ]
    };

    return settings;
}