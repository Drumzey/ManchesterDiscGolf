function init() {
    pageHistory.push("#Dashboard");
    $(document).bind('backbutton', NavigateBackDeviceButton);
    SetupNavigationBar();
    SetDefaultData();    
}

var defaultSetting = 4;

function Success() {    
    defaultSetting--;

    if (defaultSetting == 0) {        
        TestWelcome();
        LoadRounds();
        LoadFriends();        
    }
}

function SetDefaultData() {        

    GetItemFromStorageWithSuccessAndFailureCallBack('playerName', Success,
        function (err) {            
            if (err.code == 2) {
                SetItemInStorageWithCallBack('playerName', 'false', Success);
            }
        }
    );

    GetItemFromStorageWithSuccessAndFailureCallBack('rounds', Success,
        function (err) {
            if (err.code == 2) {                
                SetItemInStorageWithCallBack('rounds', [] , Success);                                
            }
        }
    );

    GetItemFromStorageWithSuccessAndFailureCallBack('friends', Success,
        function (err) {
            if (err.code == 2) {                
                SetItemInStorageWithCallBack('friends', [] , Success);                
            }
        }
    );

    GetItemFromStorageWithSuccessAndFailureCallBack('tempGame', Success,
        function (err) {
            if (err.code == 2) {
                SetItemInStorageWithCallBack('tempGame', 'false', Success);
            }
        }
    );    
}