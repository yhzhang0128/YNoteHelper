function UnixToDate(unixTime, isFull) {
    var time = new Date(unixTime + 8 * 60 * 60 * 1000);

    var ymdhis = "";
    ymdhis += time.getUTCFullYear() + "-";
    ymdhis += (time.getUTCMonth()+1) + "-";
    ymdhis += time.getUTCDate();
    if (isFull === true)
    {
        ymdhis += " " + time.getUTCHours() + ":";
        ymdhis += time.getUTCMinutes() + ":";
        ymdhis += time.getUTCSeconds();
    }
    return ymdhis;
}

function fileCount(json){
    return json.values.length;
}

function fileName(json, idx){
    return json.values[idx].name;
}

function fileCreator(json, idx){
    return json.values[idx].creator.name;
}

function fileIsDirectory(json, idx){
    return json.values[idx].dir;
}

function fileCreateTime(json, idx){
    var time = json.values[idx].createTime;
    return UnixToDate(time, true);
}

function fileUpdateTime(json, idx){
    var time = json.values[idx].lastUpdateTime;
    return UnixToDate(time, true);
}


var raw_url;
function walkDirectory(dir){
    //alert(dir);
    var url;

    if (dir == ""){
        url = raw_url.replace("FILE_PATH_BY_YUNHAO", "%2F");
    } else{
        url = raw_url.replace("FILE_PATH_BY_YUNHAO", dir);
    }

    $.get(url, function(data){
        //alert(fileCount(data));
        var num = fileCount(data);
        for(var i = 0; i < num; i++){
            //alert(fileName(data, i));
            //alert(fileIsDirectory(data, i));
            if (fileIsDirectory(data, i)){
                // directory
                walkDirectory(dir + "%2F" + fileName(data, i));
            } else{
                // file
                var entry = "<tr>" +
                    "<td>" + fileName(data, i) + "</td>" +
                    "<td>" + fileCreator(data, i) + "</td>" +
                    "<td>" + fileCreateTime(data, i) + "</td>" +
                    "<td>" + fileUpdateTime(data, i) + "</td>" +
                    "</tr>";
                $("#result").append(entry);
            }
        }
    });
}


$("#start").click(function(){
    //alert("HERE");

    
    chrome.storage.sync.get('URL', function(items) {
        // Notify that we saved.
        raw_url = items.URL;
        walkDirectory("");
    });
});
