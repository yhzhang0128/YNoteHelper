chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    var idx1 = details.url.indexOf("note.youdao.com/yws/api/group/");
    var idx2 = details.url.indexOf("file?");
    var idx3 = details.url.indexOf("listFileByPage");
    var dup = details.url;

    if (idx1 >= 0 && idx2 >=0 && idx3 >=0){
        //alert(dup);
        var record = dup.replace(/path=.*&/, "path=FILE_PATH_BY_YUNHAO&");
                        //.replace(/group\/[0-9]*/, "group/GROUP_ID_BY_YUNHAO")
        
        // save URL
        if (!record){
            //message('Error: No value specified');
            return;
        }

        chrome.storage.sync.set({'URL': record}, function() {
            // Notify that we saved.
            //message('Settings saved');
        });
    }
    return {requestHeaders: details.requestHeaders};
    //alert(details.requestHeaders);
  },

  // filters
  {
    urls: [
      "*://note.youdao.com/*"
    ]//,
    //types: ["xhr"]
  },

  // extraInfoSpec
  ["requestHeaders"]
);
