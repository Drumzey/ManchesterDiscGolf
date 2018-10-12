function populateNumberPanels() {

    //Section 1
    populateBestRound();

    //Section 2
    populateAverageRound();
    populateTotalHoles();
    populateTotalShots();
    populateFullRoundsPlayed();

    //Section 3
    //Does not include any number panels

    //Section 4
    populateAces();
    populateBirdies();
    populateEagles();    
    populateBogies();
    populateDoubleBogies();
    populateDoubleBogiesPlus();
    populateBestHole();
    populateWorstHole();

}

function populateAces() {
    var no = GetStatsAces();
    document.getElementById("aces").innerText = no;
}

function populateAlbatrosses() {
    var no = GetStatsAlbatrosses();
    document.getElementById("albatrosses").innerText = no;
}

function populateEagles() {
    var no = GetStatsEagles();
    document.getElementById("eagles").innerText = no;
}

function populateBirdies() {
    var no = GetStatsBirdies();
    document.getElementById("birdies").innerText = no;
}

function populatePars() {
    var no = GetStatsPars();
    document.getElementById("pars").innerText = no;
}

function populateBogies() {
    var no = GetStatsBogies();
    document.getElementById("bogies").innerText = no;
}

function populateDoubleBogies() {
    var no = GetStatsDoubleBogies();
    document.getElementById("doublebogies").innerText = no;
}

function populateDoubleBogiesPlus() {
    var no = GetStatsDoubleBogiesPlus();
    document.getElementById("doublebogiesplus").innerText = no;
}

function populateBestHole() {
    var no = GetStatsBestHole();
    document.getElementById("best").innerText = no;
}

function populateWorstHole() {
    var no = GetStatsWorstHole();
    document.getElementById("worst").innerText = no;
}

function populateTotalHoles() {
    var no = GetStatsHolesPlayed();
    document.getElementById("holes").innerText = no;
}

function populateTotalShots() {
    var no = GetStatsTotalShots();
    document.getElementById("shots").innerText = no;
}

function populateFullRoundsPlayed() {
    var no = GetStatsRoundsPlayed();
    document.getElementById("rounds").innerText = no;
}

function populateBestRound() {
    var no = GetBestRoundPlayed(); 
    document.getElementById("bestround").innerText = no;
}

function populateAverageRound() {
    var no = GetAverageFullRound();    
    document.getElementById("averageround").innerText = no;
}

