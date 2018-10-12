function updateDashboard() {
    populateLocalWeather();
    populateNumberPanels();
    populateGraphPanels();
}

var latestXHTTP = '';

function populateLocalWeather() {
    CallOnline(
        function () { SuccessfulLoadOfWeather(); },
        function () { UnsuccessfulLoadOfWeather(); }
    );
}

function SuccessfulLoadOfWeather() {
    
    var response = JSON.parse(latestXHTTP.responseText);    
    var icon = response.wx_icon;
    var temp_c = response.temp_c;
    var wind = response.windspd_kmh;
    
    document.getElementById("currentweather").style.backgroundImage = "url('images/weather/" + icon + "')";    
    document.getElementById("temp").innerHTML = temp_c + "&#8451;";
    document.getElementById("wind").innerText = wind + "km/h";
}

function UnsuccessfulLoadOfWeather() {
    alert('failed weather');
}

function CallOnline(successCallback, failureCallback) {
    
    var jqxhr = $.ajax({
        url: 'http://api.weatherunlocked.com/api/current/53.4468879,-2.2947711?app_id=8bfef7bb&app_key=2d2c241ee168c23e560e9705f99a2178',
        type: 'GET',
        contentType: 'application/json',        
        success: function () {
            latestXHTTP = jqxhr;
            successCallback();
        },
        error: function () {
            latestXHTTP = jqxhr;
            failureCallback();
        },
        complete: function () {            
        }
    });
}