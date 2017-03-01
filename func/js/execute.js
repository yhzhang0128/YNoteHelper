$("#start").click(function(){
    //alert("HERE");
    chrome.storage.sync.get('URL', function(items) {
        // Notify that we saved.
        $("#result-url").html(items.URL);
    });
});