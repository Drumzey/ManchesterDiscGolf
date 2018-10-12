function onErrorLoadFs() {
    alert('ERROR loading file system');
}
function onErrorCreateFile() {
    alert('ERROR creating file');
}

function CreateAttachmentFileAndEmail(filename, body, contents, emails) {
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dirEntry) {
        createFile(dirEntry, filename + ".csv", body, contents, emails);
    }, onErrorLoadFs);        
}

function createFile(dirEntry, fileName, body, contents, emails) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
        writeFile(fileEntry, null, body, contents, emails);
    }, onErrorCreateFile);
}

function writeFile(fileEntry, dataObj, body, contents, emails) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
        
        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([contents], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
        var fileName = 'file:///storage/emulated/0' + fileEntry.fullPath;        
        
        window.plugins.socialsharing.shareViaEmail(
            'Scores - Disc Golf',
            body,            
            emails,
            null,
            null,
            fileName, // FILES: can be null, a string, or an array
            ShareSuccess,
            ShareFail
        );      
    });
}