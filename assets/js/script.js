var schedule = [];

// Set the current day in the jumbotron
var setCurrentDay = function() {
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);
}

// Build new time block
var createTimeBlock = function(hour, task) {
    // Create elements that make up a time block
    var timeBlockEl = $("<li>").addClass("row time-block");
    var hourEl = $("<p>").addClass("col-1 hour").text(hour.format("hA"));
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
    var startTime = moment().hour(9);
    var endTime = moment().hour(18);

    // Create the schedule as empty if nothing is there
    if(!schedule) {
        for(var time = startTime; time.isBefore(endTime); time.add(1, "hour")) {
            createTimeBlock(time, "asdf");
        }
    }

    else {
        for(var time = startTime; time.isBefore(endTime); time.add(1, "hour")) {
            createTimeBlock(time, "");
        }
    }
}

// Helper method to set the background color based on current time
var setBackground = function(hour, descriptionEl) {
    // Determine past, present, or future and set background accordingly
    var currentHour = parseInt(moment().hour());
    var displayHour = parseInt(hour.format("H"));
    if(displayHour < currentHour) {
        descriptionEl.addClass("past");
    }
    else if(displayHour === currentHour) {
        descriptionEl.addClass("present");
    }
    else {
        descriptionEl.addClass("future");
    }
}


// Edit task description by clicking on it
$("#list").on("click", ".description", function() {
    // var className = getClassName(this);
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("form-control col-10 description").val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// Save task when save button is clicked
$("#list").on("click", "span", function() {
    var textInputEl = $(this).siblings(".description");

    // If textInputEl is a p element, that means we should not process the save
    if(textInputEl.is("p")) {
        return;
    }

    // Determine current hour and convert to moment format
    var hour = $(this).siblings(".hour").text();
    if(hour.slice(-2) === "AM") {
        hour = parseInt(hour.slice(0, -2));
    }
    else {
        hour = parseInt(hour.slice(0, -2)) + 12;
    }
    hour = moment().set("hour", hour);

    // Replace the textInputEl with the p tag
    var textInput = textInputEl.val().trim();
    var eventP = $("<p>").addClass("col-10 description").text(textInput);
    setBackground(hour, eventP);
    textInputEl.replaceWith(eventP);

    // Save schedule in local storage
    // schedule[hour] = text;
});

// On start-up, set date at the top
setCurrentDay();

// On start-up, load the schedule
loadSchedule();