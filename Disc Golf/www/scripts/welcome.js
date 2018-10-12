function TestWelcome() {
    GetItemFromStorageWithCallBack("playerName", function (value) {
        if (value === 'false') {
            ShowPopup("#Welcome");
        }
    });
}

function WelcomeComplete() {
    SetItemInStorage("playerName", document.getElementById("welcomeName").value);
    $("#Welcome").popup("close");
    ClosePopup();
    return false;
}