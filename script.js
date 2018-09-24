// board of sticky notes
var board = document.getElementsByClassName("grid-container")[0];

// form div and elements
var form = document.getElementById('form');
var formTitle = document.getElementById('formTitle');
var newTitle = document.getElementById('newTitle');
var newContent = document.getElementById('newContent');
var newSave = document.getElementById('newSave');
var update = document.getElementById('update');
var formSave = document.getElementById('formSave');
var formUpdate = document.getElementById('formUpdate');

// edit and del buttons on the note
var editBtn = document.getElementsByClassName('edit');
var delBtn = document.getElementsByClassName('del');

// get index of the note to update
var target;

// search input and search button
var searchBar = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');

// color index for the notes background color
var colors = ['red', 'orange', 'yellow', 'green', 'indigo', 'violet'];
var colorIndex = 0;



function resetInput() {

	// sets the input values to empty
	newTitle.value = "";
	newContent.value = "";
}

// when page loads or reloads, all titles and contents in localStorage are rendered as notes
function renderNotes() {

	board.innerHTML = "";

	var tt = localStorage.taskTitles;
	var tc = localStorage.taskContents;
	
	// if there are taskTitles in localStorage
	if (tt !== undefined && tt !== "") {

		// turn taskTitles and taskContents into arrays
		var ttArr = tt.split(",");
		var tcArr = tc.split(",");
		var note;

		// loop through the arrays of taskTitles and taskContents and form notes with every title and content
		for (var i = 0; i < ttArr.length; i++) {
			note = document.createElement('div');

			// give notes background colors
			note.style.backgroundColor = colors[colorIndex % 6];
			colorIndex += 1;
			note.className = "grid-item";
			note.innerHTML = "<h3 class='titles'>" + ttArr[i] + "</h3><h5>" + tcArr[i] + "</h5><button class='edit " + i + "'>Edit</button><button class='del " + i + "'>Delete</button>";
			board.appendChild(note);

			// call editNote or delNote function on the buttons when clicked
			editBtn[i].addEventListener("click", function() {
				editNote.call(this);
			});
			delBtn[i].addEventListener("click", function() {
				delNote.call(this);
			})
		}
	}

	resetInput();
}

renderNotes();

// when edit button is clicked
function switchForm() {

	// change form title to edit note
	if (newTitle.value === "") {
		formTitle.textContent = "New Note";
		formUpdate.style.display = "none";
		formSave.style.display = "block";
	} else {
		formTitle.textContent = "Edit Note";
		formSave.style.display = "none";
		formUpdate.style.display = "block";
	}
}

// when edit button on note is clicked
function editNote() {

	// assign target to be index of this div
	target = this.classList[1];

	// change form elements value to clicked note elements textcontent
	newTitle.value = localStorage.taskTitles.split(",")[target];
	newContent.value = localStorage.taskContents.split(",")[target];

	// change form to edit form
	switchForm();
}

// when update button in form is clicked
function updateNote() {

	// convert localStorage variables into arrays
	var tt = localStorage.taskTitles.split(",");
	var tc = localStorage.taskContents.split(",");

	// assign target array element into new form input values
	tt[target] = newTitle.value;
	tc[target] = newContent.value;

	// assign localStorage variables into arrays joined into strings
	localStorage.taskTitles = tt.join(",");
	localStorage.taskContents = tc.join(",");

	// clear board and render notes according to new localStorage variables
	renderNotes();

	// reset form inputs
	resetInput();

	// change form to new form
	switchForm();
}

// when delete button is clicked
function delNote() {

	// convert localStorage variables into arrays
	var tt = localStorage.taskTitles.split(",");
	var tc = localStorage.taskContents.split(",");

	// assign target array element into new form input values
	if (target === 0) {
		tt = [];
		tc = [];
	} else {
		tt.splice(target,1);
		tc.splice(target,1);	
	}
	
	// assign localStorage variables into arrays joined into strings
	localStorage.taskTitles = tt.join(",");
	localStorage.taskContents = tc.join(",");

	// clear board and render notes according to new localStorage variables
	renderNotes();
}

// when search button is clicked
function searchNotes() {

	// convert localStorage variables into arrays
	var tt = localStorage.taskTitles.split(",");
	var tc = localStorage.taskContents.split(",");

	if (searchBar.value === "") {
		renderNotes();
	} else {
		board.innerHTML = "";
		for (var i = 0; i < tt.length; i++) {
			if (tt[i].includes(searchBar.value)) {
				note = document.createElement('div');

				// give notes background colors
				note.style.backgroundColor = colors[colorIndex % 6];
				colorIndex += 1;
				note.className = "grid-item";
				note.innerHTML = "<h3 class='titles'>" + tt[i] + "</h3><p>" + tc[i] + "</p><button class='edit " + i + "'>Edit</button><button class='del " + i + "'>Delete</button>";
				board.appendChild(note);

				// call editNote or delNote function on the buttons when clicked
				editBtn[editBtn.length-1].addEventListener("click", function() {
					editNote.call(this);
				});
				delBtn[delBtn.length-1].addEventListener("click", function() {
					delNote.call(this);
				})
			}
		}
	}	
}



newSave.addEventListener("click", function() {

	// if title and content values in form is not empty, we can add new note
	if (newTitle.value !== "" && newContent.value !== "") {

		// if there is currently no task titles or task titles is empty in the localStorage
		if (localStorage.taskTitles === undefined || localStorage.taskTitles === "") {

			// assign task titles in localStorage to be the new title in the form directly
			localStorage.taskTitles = newTitle.value;
			localStorage.taskContents = newContent.value;
		} else {

			// add new title to task titles with a ',' in between
			localStorage.taskTitles = localStorage.taskTitles + "," + newTitle.value;
			localStorage.taskContents = localStorage.taskContents + "," + newContent.value;
		}
		renderNotes();
	}
});
update.addEventListener("click", updateNote);
searchBtn.addEventListener("click", searchNotes);

