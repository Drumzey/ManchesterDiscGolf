﻿function SettingsClicked() {
    NavigateToInternalPage("#Settings");
}

function Settings_About() {
    ShowPopup("#About");
}

function Settings_Contact() {
    ShowPopup("#Contact");
}

function Settings_Friends() {    
    NavigateToInternalPage("#Friends");
}

function Settings_Help() {
    GetItemFromStorageWithCallBack('playerName', function (value) {
        document.getElementById('userNameInHelp').value = value;
        NavigateToInternalPage("#HelpAbout");
    });
}

function UpdateUserName() {
    SetItemInStorage("playerName", document.getElementById("userNameInHelp").value);    
}

var currentSelect = undefined;

function playerValueChangedInGame(select) {
    currentSelect = select;
    if (select.value === 'New') {        
        $("#" + currentSelect.id).selectmenu("close");
        ShowPopup("#NewFriendInGame");
    }
    else {        
        $("#" + currentSelect.id).selectmenu("close");
        AddPlayer();
    }
}

function playerValueChanged(select) {
    if (select.value === 'New') {
        currentSelect = select;
        ShowPopup("#NewFriendPlayer");
    }
}

function Settings_Reset() {
    ShowPopup("#Reset");
}

function ResetData() {
    defaultSetting = 5;
    $("#Reset").popup("close");
    ClosePopup();
    pageHistory = new Array();
    NavigateToInternalPage("#Dashboard");
    ClearStorageWithCallBack(SetDefaultData);      
}

function CloseReset() {
    $("#Reset").popup("close");
    ClosePopup();
}