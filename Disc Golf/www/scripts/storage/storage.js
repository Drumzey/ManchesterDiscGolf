var keyImLookingFor = '';
var test = false;

function SuccessCallback(obj) {
    console.log("Successful set " + keyImLookingFor);
}

function FailedToGet(obj) {
    alert("Failured to get " + keyImLookingFor);
}

function FailureCallBack(obj) {
    alert(obj);
    alert(obj.code);
    alert("Failured to store " + keyImLookingFor);
}

function ClearStorage() {
    NativeStorage.clear(SuccessCallback, FailureCallBack);
}

function ClearStorageWithCallBack(success) {
    NativeStorage.clear(success , FailureCallBack);
}

function SetItemInStorage(key, value) {
    if (!test) {
        keyImLookingFor = key;        
        NativeStorage.setItem(key, value, SuccessCallback, FailureCallBack);
    }
}

function SetItemInStorageWithCallBack(key, value, callbackFunction) {
    if (!test) {
        keyImLookingFor = key;
        NativeStorage.setItem(key, value, callbackFunction, FailureCallBack);
    }
}

function GetItemFromStorageWithCallBack(key, callbackFunction) {
    if (!test) {
        keyImLookingFor = key;
        NativeStorage.getItem(key, callbackFunction, FailedToGet);
    }
}

function GetItemFromStorageWithSuccessAndFailureCallBack(key, success, failure) {
    if (!test) {
        keyImLookingFor = key;
        NativeStorage.getItem(key, success, failure);
    }
}