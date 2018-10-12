function SettingsClicked() {
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
    defaultSetting = 2;
    ClearStorageWithCallBack(SetDefaultData);  
    $("#Reset").popup("close");
    ClosePopup();
}

function CloseReset() {
    $("#Reset").popup("close");
    ClosePopup();
}