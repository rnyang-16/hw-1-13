time_blocks = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

var timeBlocksDiv = $("#time_blocks");
for(i = 0; i <time_blocks.length; i ++){
    var newTimeblockRowDiv = $("<div>");
    newTimeblockRowDiv.attr("class", "row");

    var newTimeblockHourDiv = $("<div>" + time_blocks[i] +"</div>");
    newTimeblockHourDiv.attr("class", "col-sm-1 hour");
    newTimeblockRowDiv.append(newTimeblockHourDiv);

    var newTimeBlockTextDiv = $("<div>");
    newTimeBlockTextDiv.attr("class", "col-sm-10");
    var newTimeBlockTextArea = $("<textarea>");
    newTimeBlockTextArea.attr("id","textarea-" + i.toString());
    newTimeBlockTextArea.attr("class", "w-100");
    newTimeBlockTextArea.attr("class", "h-100");
    newTimeBlockTextDiv.append(newTimeBlockTextArea);
    newTimeblockRowDiv.append(newTimeBlockTextDiv);

    var newTimeBlockBtnDiv = $("<div>");
    newTimeBlockBtnDiv.attr("class", "col-sm-1");
    var newBlockBtn = $("<button>");
    newBlockBtn.attr("class", "saveBtn");
    newBlockBtn.attr("index",i.toString());
    newBlockBtn.attr("style","min-width: 100%");
    newBlockBtn.attr("style", "min-height: 100%");
    newTimeBlockBtnDiv.append(newBlockBtn);
    newTimeblockRowDiv.append(newTimeBlockBtnDiv);

    $(".container").append(newTimeblockRowDiv);
};

function setTime(){
    var timerInterval = setInterval(function() {
        $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
        
        for(i = 0; i < time_blocks.length; i ++){
            if(i < parseInt(moment().format("H"))){
                $("#textarea-" + i.toString()).attr("class","past");
            };
            if(i == parseInt(moment().format("H"))){
                $("#textarea-" + i.toString()).attr("class","present");
            };
            if(i > parseInt(moment().format("H"))){
                $("#textarea-" + i.toString()).attr("class","future");
            };

            var record_history = loadRecordHistory();
            if(i in record_history){
                var placeholder = record_history[i];    
            }
            else{
                var placeholder = "";
            }
            $("textarea-" + i.toString()).text(placeholder);
        }       
    
    }, 1000);
};

setTime();

function loadRecordHistory(){
    var record_history = localStorage.getItem("record_history");
    if(record_history == null){
        return {};
    }
    else{
        return JSON.parse(record_history);
    }
};

$(".saveBtn").on("click", function(){
    var index = $(this).attr("index");
    var textContent = $("#textarea-" + parseInt(index)).val();
    var record_history = loadRecordHistory();
    record_history[i] = textContent;
    localStorage.setItem("record_history", JSON.stringify(record_history));
});

