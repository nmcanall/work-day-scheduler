var schedule = {};

// Build new time block
var createTimeBlock = function(hour, task) {
    // Create elements that make up a time block
    var timeBlockEl = $("<li>").addClass("row time-block");
    var hourEl = $("<p>").addClass("col-1 hour").text(hour);
    var descriptionEl = $("<p>").addClass("col-10 description").text(task);
    var saveBtnEl = $("<span>").addClass("oi oi-browser col-1 saveBtn");

    // Set current time background color
    setBackground(hour, descriptionEl);

    // Add elements to the list item
    timeBlockEl.append(hourEl, descriptionEl, saveBtnEl);

    // Append to ul on the page
    $("#list").append(timeBlockEl);
};

// Load schedule
var loadSchedule = function() {
    for(var time = 0900; time <= 1700; time += 100) {
        createTimeBlock(time, "Event description");
    }
}

// Helper method to set the background color based on current time
var setBackground = function(hour, descriptionEl) {
    // Determine past, present, or future and set background accordingly
    // Later, this will use moment rather than a hard coded time
    if(hour < 1100) {
        descriptionEl.addClass("past");
    }
    else if(hour === 1100) {
        descriptionEl.addClass("present");
    }
    else {
        descriptionEl.addClass("future");
    }
}

// On start-up, load the schedule
loadSchedule();