var popupopen = 0;
var popupname = '';

var pageHistory = new Array();

//BUTTON CLICKS

function RefreshDashboard() {
    $.mobile.loading('show', {
        theme: 'b',
        text: "Loading...",
        textVisible: "true"
    });   
    window.setTimeout(function () { updateDashboard(); $.mobile.loading('hide'); }, 500);   
}

function Stats() {
    NavigateToInternalPage("#Stats", ChangeStatsMode);
}

function RoundHistory() {
    var last_full_round = -1;

    for (var i = rounds.length - 1; i >= 0; i--) {

        if (rounds[i].FullRound) {
            last_full_round = i;
            break;
        }
    }
    
    if (last_full_round == -1) {        
        ShowPopup('#no_round_history');
    }
    else {
        currentRoundHistoryIndex = last_full_round;        
        NavigateToInternalPage("#RoundHistory", CreateRoundHistory);
    }
}

function MainMenuClicked()
{
    ClosePopup();    
    NavigateToInternalPage("#Dashboard", RefreshDashboard);   
}

function PlayersClicked()
{
    ClosePopup();

    GetItemFromStorageWithCallBack("tempGame", function (value) {
        
        if (value === null || value === 'false') {            
            NavigateToInternalPage("#Players");
            PopulateOptionsForFriendsDropDowns();               
        }
        else {
            ShowPopup("#continuegame");
        }
        
    });           
}

function ContinueClicked() {
    ClosePopup();    
    GetItemFromStorageWithCallBack("tempGame", function (value) {        
        PopulateOptionsForFriendsDropDowns();                
        playerNames = value.playerNames;
        currentGameType = value.currentGameType;                  
        currentCourseType = value.currentCourseType;
        SetAllToggles('', currentCourseType);
        holesPlayed = value.holesPlayed; 
        playerScores = value.playerScores;        
        SetNamesAndDisableBoxes();
        NavigateToInternalPage("#Play");
    });    
}

function NewGameClicked() {
    ClosePopup();    
    playerNames = [];    
    holesPlayed = [];
    for (j = 1; j <= 4; j++) {     
        playerScores[j - 1] = [];
        for (i = 1; i <= 18; i++) {            
             playerScores[j - 1][i - 1] = null;
        }
    }    
    SetItemInStorage('tempGame', 'false');
    NavigateToInternalPage("#Players");
    PopulateOptionsForFriendsDropDowns();   
}

function ResultsClicked()
{
    ClosePopup();
    NavigateToInternalPage("#Results");
    pageHistory = new Array();
    pageHistory.push("#Dashboard");
    pageHistory.push("#Results");
    //Clear the temp game down when the game is finished
    SetItemInStorage('tempGame', 'false');
}

function PlayClicked() {
    ClosePopup();       
    holesPlayed = [];
    for (j = 1; j <= 4; j++) {
        playerScores[j - 1] = [];
        for (i = 1; i <= 18; i++) {
            playerScores[j - 1][i - 1] = null;
        }
    }    
    if (currentGameType == "custom")
    {
        NavigateToInternalPage("#ChooseHoles");
    }
    else
    {
        if (currentGameType == 'full')
            holesPlayed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        else if (currentGameType == 'front')
            holesPlayed = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        else
            holesPlayed = [10, 11, 12, 13, 14, 15, 16, 17, 18];

        SetNamesAndDisableBoxes();
        NavigateToInternalPage("#Play");
    }
}

function LeaveGameClicked()    
{
    ClosePopup();   
    NavigateToInternalPage("#Dashboard");
    pageHistory = new Array();
    pageHistory.push("#Dashboard");
    RefreshDashboard();
}

function CustomPlayClicked()
{
    SetNamesAndDisableBoxes();
    ClosePopup();
    NavigateToInternalPage("#Play");    
}

function HowToPlayClicked() {
    ClosePopup();
    NavigateToInternalPage("#HowToPlay");
}

function MapClicked() {
    ClosePopup();
    NavigateToInternalPage("#Map");
}

function TopScoresClicked() {
    ClosePopup();
    NavigateToInternalPage("#TopScores");
}

// END

function ShowPopup(name) {
    $(name).popup('open');
    $('body').on('touchmove', false);
    popupopen = 1;
    popupname = name;
}

function ClosePopup() {
    $('body').off('touchmove');
    popupopen = 0;
}

function exitApp() {
    console.log("Exiting app");
    navigator.app.exitApp();
}

function NavigateToInternalPage(pageName, callback) {
    pageHistory.push(pageName);
    Navigate(pageName, callback);
}

function NavigateBackToHome()
{
    NavigateToInternalPage("#Dashboard", RefreshDashboard);       
}

function NavigateBack() {
    
    pageHistory.pop();

    if (pageHistory.length == 0) {
        exitApp();
    }
    else {
        var lastPage = pageHistory[pageHistory.length - 1];

        if (lastPage == "#Dashboard") {
            Navigate(lastPage, RefreshDashboard);
        }
        else {
            Navigate(lastPage);
        }
    }
}

function NavigateBackDeviceButton(e) {
    e.preventDefault();

    var lastPage = pageHistory[pageHistory.length - 1];
    if (lastPage == "#Play") {
        //we are on the play page and want our back action to act as if we have pressed back on our menu
        OnLeaveGame();
    }
    else {
        if (popupopen == 0) {
            NavigateBack();
        }
        else {
            ClosePopup();
            $(popupname).popup("close")
        }
    }
}

function Navigate(pageName, callback) {
    $.mobile.pageContainer.pagecontainer("change", pageName);
    if (callback) {
        callback();
    }
}

function deviceready() {
    $(document).bind('backbutton', NavigateBackDeviceButton);
}
$(document).bind('deviceready', deviceready);