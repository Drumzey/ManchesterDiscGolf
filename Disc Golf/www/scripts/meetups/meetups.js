var mdgOnlineTodaysMeetups = "https://manchesterdiscgolf.azurewebsites.net/meetup/get?day=0";
var mdgOnlineAllMeetups = "https://manchesterdiscgolf.azurewebsites.net/meetup/getall";
var mdgOnlinePost = "https://manchesterdiscgolf.azurewebsites.net/meetup/post";
var mdgOnlineDeletePost = "https://manchesterdiscgolf.azurewebsites.net/meetup/remove?id=";

var latestXHTTP = [];

var meetupsArray = [];

function GotOnlineData() {
    if (latestXHTTP.status === 200) {
        GetAllMeetups();

        var todaysDate = new Date();
        var todaysDay = todaysDate.getDate();
        var todaysMonth = todaysDate.getMonth() + 1;
        var todaysYear = todaysDate.getFullYear();

        ShowMeetups(todaysDay + "-" + todaysMonth + "-" + todaysYear);
    }
}

function WhosPlayingTodaySuccess() {
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);
        if (response === null) {
            document.getElementById('playingtoday').innerText = '0';
        }
        else {
            document.getElementById('playingtoday').innerText = response.length;
        }
    }
    else {
        document.getElementById('playingtoday').innerText = '-';
    }
}

function FailedtoGetOnlineData() {
    document.getElementById('playingtoday').innerText = '-';
    alert("Unable to get player data, please try again later");
}

function WhoesPlayingToday() {

    CallMDGOnline(mdgOnlineTodaysMeetups, "GET", WhosPlayingTodaySuccess,
        FailedtoGetOnlineData, UpdateCalendarOnDashboard, "Getting Todays Players");
}

function UpdateCalendarOnDashboard() {

    $.mobile.loading('hide');
}

function GetMeetups() {
    $('.dropperDate').dateDropper();    
    
    CallMDGOnline(mdgOnlineAllMeetups, "GET", GotOnlineData,
        FailedtoGetOnlineData, UpdateMeetups, "Getting Todays Players");    
}

function GetAllMeetups() {
    meetupsArray = [];
    var response = JSON.parse(latestXHTTP.responseText);

    response.forEach(function (item) {

        var d = new Date(0);
        d.setMilliseconds(item.date);

        var meetupDay = d.getDate();
        var meetupMonth = d.getMonth() + 1;
        var meetupYear = d.getFullYear();

        var meetupDate = meetupDay + "/" + meetupMonth + "/" + meetupYear;

        if (meetupsArray.hasOwnProperty(meetupDate)) {
            meetupsArray[meetupDate].push(item);
        }
        else {
            meetupsArray[meetupDate] = [item];
        }
    });
}

function GetDatesMeetups(date) {
    var datesMeetups = meetupsArray[date];
    return datesMeetups;
}

function CreateEvents(meetups) {

    var events = [];

    if (meetups == null)
        return events;

    var id = 1;
    var redcourse = '#E71F0A';
    var bluecourse = '#4665F0';
    var nopreference = '#C7CCE1';

    meetups.forEach(function (item) {
        var d = new Date(0);
        d.setMilliseconds(item.date);

        var meetupDay = d.getDate();
        var meetupMonth = d.getMonth() + 1;
        var meetupYear = d.getFullYear();
        var meetupDate = meetupDay + "/" + meetupMonth + "/" + meetupYear;

        if (events.hasOwnProperty(meetupDate + "-" + item.roundType + "-" + item.time + "-" + item.timeEnd)) {
            events[meetupDate + "-" + item.roundType + "-" + item.time + "-" + item.timeEnd].notes += ", " + item.name;
        }
        else {
            var colour = nopreference;
            if (item.roundType === "Red")
                colour = redcourse;
            else if (item.roundType === "Blue")
                colour = bluecourse;

            events[meetupDate + "-" + item.roundType + "-" + item.time + "-" + item.timeEnd] =
                {
                uid: id,
                    begins: meetupYear + "-" + meetupMonth + "-" + meetupDay + ' ' + item.time,
                    ends:   meetupYear + "-" + meetupMonth + "-" + meetupDay + ' ' + item.timeEnd,
                    color:  colour,
                    notes:  item.name
                };

            id += 1;
        }

    });

    return events;
}

function UpdateMeetups() {
    $.mobile.loading('hide');
}

function Hide(name) {
    $(name).addClass('ui-screen-hidden');
}

function Show(name) {
    $(name).removeClass('ui-screen-hidden');
}

var todaysMeetupId = 0;

function DeleteMeetUp() {

    //Are you sure?
    CallMDGOnline(mdgOnlineDeletePost + todaysMeetupId, 'POST', DeleteMeetUpSuccess
        , FailedtoGetOnlineData, UpdateMeetups, 'Removing meetup');  
}

function DeleteMeetUpSuccess() {

    GetItemFromStorageWithCallBack('mymeetups', function (value) {
        var index = value.indexOf(todaysMeetupId);
        value.splice(index, 1);
        SetItemInStorage('mymeetups', value);
        //Need to remove the meetup from all all meetups array!

        var parts = document.getElementById('meetupDay').value.split("-");
        var date = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));

        var dateDay = date.getDate();
        var dateMonth = date.getMonth() + 1;
        var dateYear = date.getFullYear();
        
        var meetupDate = dateDay + "/" + dateMonth + "/" + dateYear;

        var spliceindex = -1;

        for (var i = 0; i < meetupsArray[meetupDate].length; i++) {
            if (meetupsArray[meetupDate][i].id === todaysMeetupId) {
                spliceindex = i;
                break;
            }
        }        

        meetupsArray[meetupDate].splice(spliceindex, 1);

        ShowMeetups(document.getElementById('meetupDay').value);
    });
}

function ShowMeetups(dateChosen) {

    if (dateChosen === "")
        return;

    var parts = dateChosen.split("-");
    var date = new Date(parseInt(parts[2], 10),
                      parseInt(parts[1], 10) - 1,
                      parseInt(parts[0], 10));

    var dateDay = date.getDate();
    var dateMonth = date.getMonth() + 1;
    var dateYear = date.getFullYear();

    var dateDateString = dateDay + "/" + dateMonth + "/" + dateYear;
    var meetups = GetDatesMeetups(dateDateString);

    //If the user has a meetup on this day we need to show
    //the ui for editing or removing that meetup
    Hide('#delete_my_meetup');
    //Assign the solo grid css
    $('#meetupdatedelete').removeClass('my-grid-meet').addClass('my-solo-grid');

    todaysMeetupId = 0;
    GetItemFromStorageWithCallBack('mymeetups', function (value) {
        if (value.length > 0) {
            for (var i = 0; i < meetups.length; i++) {
                if (value.indexOf(meetups[i].id !== -1)) {
                    //We are scheduled to play today
                    //Show the edit controls
                    todaysMeetupId = meetups[i].id;
                    Show('#delete_my_meetup');
                    //Assign the not solo css
                    $('#meetupdatedelete').removeClass('my-solo-grid').addClass('my-grid-meet');
                }
            }
        }
    });

    var events = CreateEvents(meetups);

    var calendarEvents = [];
    for (var property in events) {
        if (events.hasOwnProperty(property)) {
            calendarEvents.push(events[property]);
        }
    }

    //Destroy the current calendar
    $('#calendar').cal('destroy');

    //Create a new calendar
    $('#calendar').cal({

        startdate: dateYear + "-" + dateMonth + "-" + dateDay,
        daystodisplay: 1,
        overlapoffset: 30,
        daytimestart: '09:00:00',
        daytimeend: '21:00:00',
        allowcreation: 'false',
        allowmove: false,
        allowresize: false,
        allowselect: true,
        allowremove: false,
        allowoverlap: true,
        allownotesedit: false,
        allowhtml: false,
        events: calendarEvents
    });
}

function InitTimeControls() {    
    $('#newMeetupStartTime').timepicker();
    $('#newMeetupEndTime').timepicker();
}

function CloseMeetups() {
    $("#AddMeetup").popup("close");
    ClosePopup();
}

function SetupNewMeetup() {

    if (todaysMeetupId != 0) {
        //we have a meetup on this day so cant add another one
        alert("You already have a meetup scheduled for today. Please remove it before adding another");
        return;
    }

    var events = document.getElementsByClassName("ui-cal-event");

    for (var i = 0; i < events.length; i++) {
        events[i].classList.remove("selected");
        events[i].style.zIndex = "0";
    }

    GetItemFromStorageWithCallBack("playerName", function (value) {

        document.getElementById('newMeetupPlayerName').value = value; 
        document.getElementById('newMeetupDate').value = document.getElementById('meetupDay').value;

        ShowPopup('#AddMeetup');
    });
}

function CreateMeetup() {

    //Post new meetup
    var name = document.getElementById('newMeetupPlayerName').value;
    var date = document.getElementById('newMeetupDate').value;
    var courseType = $("#coursePreference :radio:checked").val();
    var startTime = document.getElementById('newMeetupStartTime').value + ":00";
    var endTime = document.getElementById('newMeetupEndTime').value + ":00";

    //Get meetups date
    var parts = date.split("-");
    var dateDate = new Date(parseInt(parts[2], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[0], 10));

    var today = new Date();
    var todaysDay = today.getDate();
    var todaysMonth = today.getMonth();
    var todaysYears = today.getFullYear();

    var timeDiff = Math.abs(dateDate.getTime() - new Date(todaysYears, todaysMonth, todaysDay));
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    var body = {
        "name" : name,
        "date": diffDays,
        "roundType": courseType,
        "time": startTime,
        "timeEnd": endTime
    };

    CallACOnlineWithBodyAndWait(mdgOnlinePost, 'POST', body, PostMeetupSuccess
        , PostMeetupFailure, PostMeetupComplete, 'Posting meetup...');

    return false;    
}

function PostMeetupSuccess() {    
    var response = JSON.parse(latestXHTTP.responseText);

    var d = new Date(0);
    d.setMilliseconds(response.date);

    var meetupDay = d.getDate();
    var meetupMonth = d.getMonth() + 1;
    var meetupYear = d.getFullYear();

    var meetupDate = meetupDay + "/" + meetupMonth + "/" + meetupYear;

    if (meetupsArray.hasOwnProperty(meetupDate)) {
        meetupsArray[meetupDate].push(response);
    }
    else {
        meetupsArray[meetupDate] = [];
        meetupsArray[meetupDate].push(response);
    }

    //Store my meetup id
    GetItemFromStorageWithCallBack('mymeetups', function (value) {

        value.push(response.id);
        SetItemInStorage('mymeetups', value);
        ShowMeetups(meetupDay + "-" + meetupMonth + "-" + meetupYear);

    });
}

function PostMeetupFailure() {
    alert('Failed to post meetup information, please try later');
}

function PostMeetupComplete() {
    $.mobile.loading('hide');
    $("#AddMeetup").popup("close");
    ClosePopup();
}