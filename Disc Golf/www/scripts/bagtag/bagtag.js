//function SetupNFC() {
//    isNFCEnabled();      
//}

//function isNFCEnabled() {
//    nfc.enabled(NFCEnabled, bagTagFailure);
//}

//function NFCEnabled() {
//    nfc.addNdefListener(
//        app.onNdef,
//        function () {
//            console.log("Listening for NDEF tags.");
//        },
//        failure
//    );   

//    if (device.platform == "Android") {

//        nfc.addTagDiscoveredListener(
//            app.onNfc,
//            function () {
//                console.log("Listening for non-NDEF tags.");
//            },
//            failure
//        );
        
//        nfc.addMimeTypeListener(
//            'text/pg',
//            app.onNdef,
//            function () {
//                console.log("Listening for NDEF mime tags with type text/pg.");
//            },
//            failure
//        );
//    }

//}

//function onNFC(nfcEvent) {

//    var tag = nfcEvent.tag;

//    console.log(JSON.stringify(nfcEvent.tag));
//    app.clearScreen();

//    tagContents.innerHTML = app.nonNdefTagTemplate(tag);
//    navigator.notification.vibrate(100);
//}

//function onNdef (nfcEvent) {

//    console.log(JSON.stringify(nfcEvent.tag));
//    app.clearScreen();

//    var tag = nfcEvent.tag;
    
//    if (tag.serialNumber) {
//        tag.id = tag.serialNumber;
//        tag.isWritable = !tag.isLocked;
//        tag.canMakeReadOnly = tag.isLockable;
//    }

//    tagContents.innerHTML = app.tagTemplate(tag);

//    navigator.notification.vibrate(100);
//}




















//function bagTagSuccess() {

//}

//function bagTagFailure() {
//    alert("Error");
//}

//function bagTagShareSuccess() {
//    nfc.readerMode(
//        nfc.FLAG_READER_NFC_A | nfc.FLAG_READER_NO_PLATFORM_SOUNDS,
//        nfcTag => console.log(JSON.stringify(nfcTag)),
//        error => console.log('NFC reader mode failed', error)
//    );
//}

//function ShareBagTag() {
//    var message = [
//        ndef.textRecord("hello, world")
//    ];

//    nfc.share(message, bagTagSuccess, bagTagFailure);
//}

//function CancelBagTag() {
//    nfc.unshare(bagTagSuccess, bagTagFailure);
//}