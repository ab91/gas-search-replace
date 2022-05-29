// Copy source files in source directory to destination directory
function copyAllFilesinDir(clientName) {

  var srcFolder = DriveApp.getFolderById("1jn0MFJohHWCpYEKvL1FvWgJoQmuKh_X2");
  var destFolder = DriveApp.getFolderById("1JaunPGu8Ngbqxq_44A4gYr-GRhFu8QNB");

  // Clean Destination Directoy
  var dirtyFiles = destFolder.getFiles();
  while (dirtyFiles.hasNext()) {
    dirtyFiles.next().setTrashed(true);
  }

  // Execute copy
  var srcFiles = srcFolder.getFiles();

  while (srcFiles.hasNext()) {
    var srcFile = srcFiles.next();
    var srcFileMimeType = srcFile.getMimeType()

    if (srcFileMimeType == "application/vnd.google-apps.presentation") {
      srcFile.makeCopy(clientName + " Customized Presentation", destFolder);
    } else if (srcFileMimeType == "application/vnd.google-apps.document") {
      srcFile.makeCopy(clientName + " Customized Doc", destFolder);
    }
  }

  // Get File IDs in Destination folder
  var destFiles = destFolder.getFiles();
  var fileIDArray = []

  while (destFiles.hasNext()) {
    var destFile = destFiles.next();
    fileIDArray.push(destFile.getId());
  };

  return fileIDArray;
}

// Search and Replace function
function searchReplace(fileIDArray, searchTerms, replacementTerms) {
  for (const fileId of fileIDArray) {
    var fileMimeType = DriveApp.getFileById(fileId).getMimeType();
    if (fileMimeType == "application/vnd.google-apps.presentation") {
      slideReplaceText(fileId, searchTerms, replacementTerms);
    } else if (fileMimeType == "application/vnd.google-apps.document") {
      docReplaceText(fileId, searchTerms, replacementTerms);
    }
  }
}

// Document Search and Replace
function docReplaceText(fileId, searchTerms, replacementTerms) {
  var docBody = DocumentApp.openById(fileId).getBody();

  searchTerms.forEach((pattern, index) => {
    const argument = replacementTerms[index];
    docBody.replaceText(pattern, argument);
  });
}

// Slides Search and Replace
function slideReplaceText(fileId, searchArray, replacementArray) {
  var openedDeck = SlidesApp.openById(fileId);

  searchArray.forEach((pattern, index) => {
    const replacementText = replacementArray[index];
    openedDeck.replaceAllText(pattern, replacementText);
  });
}