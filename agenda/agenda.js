/**
 * agenda.js
 *
 * Parses program data from agenda.json and automatically populated agenda page in readable format.
 *
 * @author    Kelli Rockwell <kellirockwell@mail.com>
 * @since     File available since August 10th, 2017
 * @version   1.0.0
 */

// Variable for storing all of the program data retrieved from json
let progData = {schedule: Array(0)};

// Array for storing all the different event types for creating legend
let eventTypes = [];

$.getJSON('agenda.json', function(data) {
   progData = data;
	addAgenda();
});

let addAgenda = function() {
	let output = "";
	if (!progData.schedule.length) {
		setTimeout(function() {
			console.log('trying again');
			addAgenda();
		}, 50);
	} else {
		// For each day of the schedule
		$(progData.schedule).each(function() {
			// Save current day data
			let $c = $(this)[0];
			// Begin parsing data with date title
			let currOutput = "<h1>" + $c.day + "</h1>\n";
			currOutput += "<span class='campus reference'>" + $c.college + "</span>\n";
			currOutput += "<div class='day table'>\n"
			$($c.events).each(function() {
				// Save current event
				let $e = $(this)[0];
				// Add individual event item
				currOutput += "<div class='event " + $e.sname + "'>\n";
				// Add event type designations
				currOutput += "<div class='type bubbles'>\n";
				$($e.types).each(function() {
					// If event type is not yet part of array
					if (!eventTypes.includes(this)) {
						// Add it
						eventTypes.push(this);
					}
					currOutput += "<span class='" + this + "'></span>\n";
				})
				currOutput += "</div>\n<div class='info'>";
				// Add event name
				currOutput += "<span class='name " + $e.sname + "'>" + $e.name;
				// Mark if event is Optional
				currOutput += (!$e.required) ? " <span class='optional'>(Optional)</span>" : "";
				currOutput += "</span>\n";
				// Add event time
				currOutput += "<span class='time " + $e.sname + "'>" + $e.timeStart + " - " + $e.timeEnd + "</span>";
				// Add event location
				currOutput += "<span class='place " + $e.sname + "'>" + $e.place + "</span>";
				currOutput += "</div>\n</div>\n";
			});
			currOutput += "</div>\n";
			output += currOutput;
		});
	// Fill agenda
	$('.agenda.spread').html(output);

	let legend = "";
	eventTypes.sort();
	// For each type of event
	$(eventTypes).each(function() {
		// Get event proper name
		let pn = this;
		if (this == "breakout") {
			pn = "Breakout Session";
		} else if (this == "free") {
			pn = "Free Time";
		} else if (this == "misc") {
			pn = "Misc/Special";
		} else if (this == "shuttle") {
			pn = "Shuttle Run";
		} else {
			pn = pn.charAt(0).toUpperCase() + pn.slice(1)
		}
		legend += "<div><span class='" + this + "'></span>" + pn + "</div>\n";
	});
	$('.event.types.legend').html(legend);
	}
};

// Clicking on agenda event type bubble
$('.agenda.spread').on('click', '.type.bubbles span', function() {
	if ($(window).width() <= 700) {
		if ($(this).hasClass('focused')) {
			$(this).removeClass('focused');
		} else {
			$(this).addClass('focused');
		}
	}
});

// On click anywhere outside event type bubble on mobile, close bubble
$('html').click(function(e) {
   if (!$(e.target).parents('.type.bubbles').length && $(window).width() <= 700) {
		$('.type.bubbles span').removeClass('focused');
   }
});

/* End of agenda.js */